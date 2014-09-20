
class Jchart
  canvas: null
  ctw: null
  position: {}

  constructor: (@canvas, @data, @options=null, @ipo) ->
    
    # default options
    @options = {} unless @options?
    @options = _.merge
      chart:
        width: 1060
        height: 480
        paddingLeft: 5
        paddingTop: 5
        paddingRight: 5
        paddingBottom: 5
        lineWidth: 2
        font:
          style: 'normal'
          weight: 'normal'
          size: '13px'
          family: 'Arial'
        color: '#888'
        background: '#ffffff'
      graph:
        border: true
        marginLeft: 'auto'
        marginBottom: 30
        marginTop: 5
        marginRight: 20
        background: '#ffffff'
        background_stripe: '#FCFCFC'
      legend:
        font: 
          style: 'italic'
          size: '13px'
        color: 'rgba(0,0,0,0.3)'
        enable: true
        layout: 'horizontal'
        marginTop: 35
        marginBottom: 0
      xAxis:
        data: []
        title: ''
        grid: 
          enable: true
          align: 'margin' # or center
        tick:
          enable: true
          align: 'margin'
          size: 10
        label: 
          enable: true
          align: 'margin'
          font : {}
          color: '#000'
        min: null
        max: null
        breaks: 5
      yAxis:
        data: []
        title: ''
        grid: 
          enable: false
          align: 'margin' # or center
        tick: 
          enable: true
          size: 10
        label: 
          enable: true
          align: 'left' # or right
          font : {}
          color: '#000'
        min: null
        max: null
        breaks: 5
    , @options

    # canvas things
    #@canvas = new canvas @options.chart.width, @options.chart.height
    @ctx = @canvas.getContext '2d'
    @rect @ctx, 0, 0, @ctx.canvas.width, @ctx.canvas.height, 0 if @options.debug is true

    #if window
    #@device_ratio = 1
    @device_ratio = if window then @scaleRatio(@canvas) else 1

    @preprocess_style()
    @preprocess_data()

    @drawGraph()

  scaleRatio: (canvas) ->
    context = canvas.getContext("2d")
    devicePixelRatio = window.devicePixelRatio or 1
    backingStoreRatio = context.webkitBackingStorePixelRatio or context.mozBackingStorePixelRatio or context.msBackingStorePixelRatio or context.oBackingStorePixelRatio or context.backingStorePixelRatio or 1
    ratio = devicePixelRatio / backingStoreRatio
    if devicePixelRatio isnt backingStoreRatio
      oldWidth = canvas.width
      oldHeight = canvas.height
      canvas.width = oldWidth * ratio
      canvas.height = oldHeight * ratio
      canvas.style.width = oldWidth + "px"
      canvas.style.height = oldHeight + "px"
      context.scale ratio, ratio
    ratio

  preprocess_data: ->
    if @options.yAxis.min?
      @min_data = @options.yAxis.min
    if @options.yAxis.max?
      @max_data = @options.yAxis.max

    if !@options.yAxis.min? or !@options.yAxis.max?
      min_obj = _.min @data, (item) -> _min item.data
      min = _.min min_obj.data
      max_obj = _.max @data, (item) -> _max item.data
      max = _.max max_obj.data
      pad = (max-min) * 0.1
      pad = @options.yAxis.breaks if pad == 0 
      pad = 0

      @max_data = max + pad if !@options.yAxis.max?
      @min_data = min if !@options.yAxis.min?

    # auto calculate margin left from max text length
    if @options.graph.marginLeft is 'auto' # ~40
      max_text = @auto_format @max_data
      digit = max_text.length
      @options.graph.marginLeft = 10 + digit*8 + @options.yAxis.tick.size

    # assign variables
    @graph_width = @options.chart.width - @options.chart.paddingLeft - @options.chart.paddingRight
    @graph_height = @options.chart.height - @options.chart.paddingTop - @options.chart.paddingBottom
    
    @interval = @max_data - @min_data
    @inner_width = @graph_width - (@options.graph.marginLeft + @options.graph.marginRight)
    @inner_height = @graph_height - (@options.graph.marginTop + @options.graph.marginBottom)

    @pl = @options.chart.paddingLeft
    @pt = @options.chart.paddingTop

    ## build plot position
    for item in @data
      barWidth = @inner_width / (_.size(item.data)-1)
      item.plot = []
      for value in item.data
        if value?
          item.plot.push
            x: @pl + (_j)*barWidth + @options.graph.marginLeft
            y: @pt + @inner_height - (value-@min_data) / @interval * @inner_height + @options.graph.marginTop
        else
          item.plot.push null

  preprocess_style: ->
    @ctx.font = @font_format(@options.chart.font)

    if @options.legend.enable
      legend_height = parseInt(@options.legend.font.size.replace('px',''))*2 + @options.legend.marginTop + @options.legend.marginBottom
      @options.chart.paddingBottom += legend_height

  drawGraph: ->
    # c = new canvas @graph_width, @graph_height
    # ctx = c.getContext '2d'
    @ctx.strokeStyle = @options.chart.color
    if @options.graph.border
      @ctx.lineWidth = @options.chart.lineWidth
      @ctx.moveTo @pl + @options.graph.marginLeft, @pt
      @ctx.lineTo @pl + @options.graph.marginLeft, @pt + @graph_height - @options.graph.marginBottom
      @ctx.lineTo @pl + @graph_width, @pt + @graph_height - @options.graph.marginBottom
      @ctx.stroke()

    @horizontal_line()
    @vertical_line()

    for line in @data
      @addLine line

    @addFlag @ipo, "IPO\nDATE" if @ipo?
    @process_legend() if @options.legend.enable

    # @ctx.drawImage(c , @options.chart.paddingLeft, @options.chart.paddingTop, @graph_width, @graph_height)

  addLine: (data) ->
    switch data.type
      when 'line'   then @draw_line_graph data
      when 'column' then @draw_column_graph data
      
  draw_column_graph: (data) ->
    barWidth = @inner_width / _.size(data.data)
    columnWidth = barWidth / 2
    @ctx.textBaseline = 'bottom'

    for value in data.data
      if value?
        x = (_i+1) * barWidth + @options.graph.marginLeft
        if @options.xAxis.label.align is 'center' or @options.xAxis.tick.align is 'center'
          x -= barWidth/2
        y = @inner_height - (value-@min_data) / @interval * @inner_height + @options.graph.marginTop
        @ctx.fillStyle = data.style.color
        @ctx.fillRect @pl + x-columnWidth/2, @pt + y, columnWidth, (value-@min_data)/@interval * @inner_height - @options.chart.lineWidth + 1

        # add caption
        if data.caption
          @ctx.fillStyle = @options.chart.color
          @ctx.fillText value.format(2), @pl + x , @pt + y

  draw_line_graph: (data) ->
    @ctx.beginPath()
    @ctx.lineWidth = data.style.lineWidth or 2
    @ctx.strokeStyle = data.style.color or '#000'
    @ctx.fillStyle = data.style.color or '#000'
    null_count = 0
    before = data.plot[0]
    for plot in data.plot
      if plot? and before?
        null_count = 0
        if data.style.line is 'dashed' and _i != 0
          @dashedLine @ctx, before.x, before.y, plot.x, plot.y
        else if data.style.line is 'point'
          @ctx.fillRect plot.x, plot.y, 3, 3
        else # solid line
          @ctx.lineTo plot.x, plot.y
        last_data = plot
      else ## start point
        if plot? and null_count > 12
          @ctx.moveTo plot.x, plot.y
        else if plot? and last_data? and null_count < 12
          if data.style.line is 'dashed'
            @dashedLine @ctx, last_data.x, last_data.y, plot.x, plot.y
          else if data.style.line is 'point'
            @ctx.fillRect plot.x, plot.y, 1, 1
          else # solid line
            @ctx.lineTo plot.x, plot.y

      null_count++ if !plot?
      before = plot

    @ctx.stroke()
    @ctx.closePath()

  addFlag: (index, text) ->
    width = @graph_width - (@options.graph.marginLeft + @options.graph.marginRight)
    barWidth = width / _.size @data[0].data
    
    x = index*barWidth + @options.chart.paddingLeft + @options.graph.marginLeft
    y = @graph_height - @options.graph.marginBottom

    # draw
    @ctx.lineWidth = 1
    @ctx.strokeStyle = @data[0].style.color
    @dashedLine(@ctx, x, @options.chart.paddingTop, x, @options.chart.paddingTop + y)

    overlap = 0
    if @data[0]?.plot[index]?.y?
      if @data[1]?.plot[index]?.y?
        diff = Math.abs( (@data[1].plot[index].y - @data[0].plot[index].y) / @data[0].plot[index].y * 100 )
        if diff < 15
          if @data[1].plot[index-1]?.y > @data[1]?.plot[index].y
            overlap = -20
          else
            overlap = 20
      if (@data[0].plot[index].y - @pt) / @inner_height * 100 > 92
        overlap -= 15
      if (@data[0].plot[index].y - @pt) / @inner_height * 100 < 8
        overlap += 15

      # filltext
      @options.chart.font.weight = 'normal'
      @options.chart.font.size = '13px'
      @ctx.font = @font_format(@options.chart.font)
      @ctx.fillStyle = @data[0].style.color
      @ctx.textBaseline = 'bottom'
      @ctx.textAlign = 'center'
      @multiLine @ctx, text, x - 3*barWidth , @data[0].plot[index].y + overlap

  addLabel: (text, option) ->
    option = {} unless option?
    option = _.merge
      font:
        style: @options.chart.font.style
        weight: @options.chart.font.weight
        size: @options.chart.font.size
        family: @options.chart.font.family
      color: @options.chart.color
      background: null
      textAlign: 'left'
      textBaseline: 'middle'
      verticalAlign: 'middle'
      x: 0
      y: 0
      width: 200 
      height: 50
    , option
    if option.background?
      @ctx.fillStyle = option.background
      @ctx.fillRect option.x, option.y, option.width, option.height
    font = @font_format(option.font)
    @ctx.font = font
    @ctx.fillStyle = option.color
    @ctx.textBaseline = option.textBaseline
    @ctx.textAlign = option.textAlign
    switch option.textAlign
      when 'left'   then x = option.x
      when 'center' then x = option.x + option.width/2
      when 'right'  then x = option.x
    switch option.verticalAlign
      when 'top'    then y = option.y
      when 'middle' then y = option.y + option.height/2
      when 'bottom' then y = option.y + option.height
    @ctx.fillText text, x, y

  shade: () ->
    before_above = null
    above_color = 'rgba(253, 115, 109, 0.4)' # '#fd726d'
    below_color = 'rgba(0, 183, 151, 0.4)'  # '#00bd9c'
    @ctx.fillStyle = above_color
    last_change = 0
    start = false
    for i in [0..@data[0].plot.length]
      if (!@data[0].plot[i]? or !@data[1].plot[i]?) and !start
        last_change = i + 1

      else if (!@data[0].plot[i]? or !@data[1].plot[i]?) and start
        for index in [i-1..last_change]
          @ctx.lineTo @data[1].plot[index].x, @data[1].plot[index].y
        @ctx.closePath()
        @ctx.fillStyle = if before_above then above_color else below_color
        @ctx.fill()
        break

      else if @data[0].plot[i]? and @data[1].plot[i]? and !start
        @ctx.beginPath()
        @ctx.moveTo @data[0].plot[i].x, @data[0].plot[i].y
        start = true

      else
        above = if @data[0].plot[i].y < @data[1].plot[i].y then true else false
        change = if before_above? and before_above != above then true else false

        if !change
          @ctx.lineTo @data[0].plot[i].x, @data[0].plot[i].y
        else
          if @data[0].plot[i-1]? and @data[1].plot[i-1]?
            y1 = @data[0].plot[i-1].y
            y2 = @data[0].plot[i].y
            a = y1 - _min([y1, y2])
            b = y2 - _min([y1, y2])
            barWidth = @data[0].plot[i].x - @data[0].plot[i-1].x
            x = @data[0].plot[i-1].x + (a * barWidth / (a + b))
            y = _min([y1, y2]) + (a*b) / (a+b)
            @ctx.lineTo x, y
            @ctx.lineTo @data[1].plot[index].x, @data[1].plot[index].y for index in [i..last_change]
            @ctx.closePath()
            @ctx.fillStyle = if above then below_color else above_color
            @ctx.fill()

            @ctx.beginPath()
            @ctx.moveTo @data[0].plot[i-1].x, @data[0].plot[i-1].y
            @ctx.lineTo x, y
            @ctx.lineTo @data[0].plot[i].x, @data[0].plot[i].y

            last_change = i

        before_above = above

  multiLine: (ctx, text, x, y) ->
    texts = text.split '\n'
    lineHeight = @options.chart.font.size.replace 'px', ''
    for t in texts
      ctx.fillText t, x, y + _i*lineHeight

  horizontal_line: () ->
    interval = @max_data - @min_data
    lines = @options.yAxis.breaks
    @ctx.beginPath()

    height = @graph_height - (@options.graph.marginTop + @options.graph.marginBottom)

    for i in [0..@options.yAxis.breaks]
      value = @min_data + interval / lines * i
      y = height - height / lines * i + @options.graph.marginTop
      
      ## fill stripe background
      if @options.graph.background_stripe
        if i % 2 is 0
          @ctx.fillStyle = @options.graph.background_stripe
          @ctx.fillRect( @pl + @options.graph.marginLeft + @options.chart.lineWidth, @pt + y-height/lines - @options.chart.lineWidth - 1, @pl + @graph_width, @pt + height/lines - @options.chart.lineWidth - 1)
        # else
        #   @ctx.fillStyle = @options.graph.background
        #   @ctx.fillRect( @pl +@options.graph.marginLeft + @options.chart.lineWidth, @pt + y, @pl + @graph_width, @pt + height/lines - @options.chart.lineWidth)

      if @options.yAxis.grid.enable
        @ctx.strokeStyle = @options.chart.color
        @dashedLine @ctx, @pl + @options.graph.marginLeft, @pt + y, @pl + @graph_width, @pt + y, 2

      # fill text label
      if @options.yAxis.label.enable
        @ctx.fillStyle = @options.yAxis.label.color or @options.chart.label.color
        @ctx.font = @font_format(@options.yAxis.label.font)
        if @options.yAxis.label.align is 'left'
          @ctx.textAlign = 'right'
          @ctx.textBaseline = 'middle'
          start_position = @pl + @options.graph.marginLeft - 10
          start_position -= @options.yAxis.tick.size if @options.yAxis.tick.enable
        else
          @ctx.textAlign = 'left'
          @ctx.textBaseline = 'bottom'
          start_position = @pl + @options.graph.marginLeft
        @ctx.fillText @auto_format(value), start_position, @pt + y

      # draw tick
      if @options.yAxis.tick.enable
        @ctx.beginPath()
        @ctx.strokeStyle = @options.chart.color
        @ctx.moveTo @pl + @options.graph.marginLeft - @options.chart.lineWidth + 1, @pt + y
        @ctx.lineTo @pl + @options.graph.marginLeft - @options.chart.lineWidth - @options.yAxis.tick.size + 1, @pt + y
        @ctx.stroke()
        @ctx.closePath()

    @ctx.stroke()
    @ctx.closePath()

  vertical_line: () ->
    width = @graph_width - (@options.graph.marginLeft + @options.graph.marginRight)

    @ctx.beginPath()
    @ctx.textAlign = 'center'
    @ctx.fillStyle = @options.xAxis.color or @options.chart.color
    @ctx.strokeStyle = @options.xAxis.color or @options.chart.color

    if @options.xAxis.data? and @options.xAxis.data.length > 0
      barWidth = width / @options.xAxis.data.length
      for value in @options.xAxis.data
        x = (_i+1) * barWidth + @options.graph.marginLeft
        y = @graph_height - @options.graph.marginBottom

        # label
        if @options.xAxis.label.enable
          @ctx.fillStyle = @options.xAxis.label.color or @options.chart.label.color
          @ctx.font = @font_format(@options.xAxis.label.font)
          _x = x
          if @options.xAxis.label.align is 'center'
            _x = x - barWidth/2
          # if @options.xAxis.tick.enable
          _y = y + @options.xAxis.tick.size

          @ctx.textBaseline = 'top'
          @ctx.fillText value, @pl + _x, @pt + _y

        # gird
        if @options.xAxis.grid.enable
          if @options.xAxis.grid.align is 'center'
            _x = x - barWidth/2
          else
            _x = x
          @ctx.lineWidth = 0.5
          @dashedLine @ctx, @pl + _x, @pt, @pl + _x, @pt + y, 2

        # tick
        if @options.xAxis.tick.enable
          if @options.xAxis.tick.align is 'center'
            _x = x - barWidth/2
          else
            _x = x
          @ctx.beginPath()
          @ctx.lineWidth = @options.chart.lineWidth
          @ctx.moveTo @pl + _x, @pt + y
          @ctx.lineTo @pl + _x, @pt + y + @options.xAxis.tick.size
          @ctx.stroke()

    @ctx.closePath()

  process_legend: () ->
    legend_width = 150
    text_height = parseInt(@options.legend.font.size.replace('px',''))*2
    data_legend = _.filter @data, (item) -> item.legend isnt false
    for item in data_legend
      x = @options.chart.width/2 + ((_i+1)-(data_legend.length+1)/2) * legend_width
      y = @options.chart.height - @options.chart.paddingBottom + @options.legend.marginTop
      # fill text legend
      @ctx.fillStyle = @options.legend.color or @options.chart.color
      @ctx.font = @font_format(@options.legend.font)
      @ctx.textAlign = 'center'
      @ctx.textBaseline = 'top'
      @ctx.fillText item.name, x, y

      # draw line
      @ctx.strokeStyle = item.style.color
      @ctx.lineWidth = @options.chart.lineWidth
      if item.style.line is 'dashed'
        @dashedLine @ctx, x - legend_width/2.5, y + text_height, x + legend_width/2.5, y + text_height
      else
        @ctx.beginPath()
        @ctx.moveTo x - legend_width/2.5 , y + text_height
        @ctx.lineTo x + legend_width/2.5 , y + text_height
        @ctx.stroke()
  
  httpOut: (resp) ->
    resp.contentType 'image/png'
    stream = @canvas.createPNGStream()
    stream.on 'data', (chunk) ->
      resp.write chunk

    stream.on 'end', ->
      resp.end()

  writeFile: (filename, callback) ->

  #
  # drawing helper
  #
  dashedLine: (ctx, x1, y1, x2, y2, dashLen) ->
    dashLen = Math.floor @options.chart.width/250 if dashLen is undefined
    
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    
    dX = x2 - x1
    dY = y2 - y1
    dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen)
    dashX = dX / dashes
    dashY = dY / dashes
    
    q = 0
    while q++ < dashes
      x1 += dashX
      y1 += dashY
      if q % 2 is 0
        ctx.moveTo x1, y1
      else
        ctx.lineTo x1, y1

    if q % 2 == 0
      ctx.moveTo x2, y2
    else
      ctx.lineTo x2, y2
    ctx.stroke()
    ctx.closePath()

  rect: (ctx, x, y, width, height, radius=0, fill, stroke) ->
    stroke = true if stroke is undefined
    radius = 5 if radius is undefined
    ctx.beginPath()
    ctx.moveTo x+radius, y
    ctx.lineTo x+width-radius, y
    ctx.quadraticCurveTo x+width, y, x+width, y+radius
    ctx.lineTo x+width, y+height-radius
    ctx.quadraticCurveTo x+width, y+height, x+width-radius, y+height
    ctx.lineTo x+radius, y+height
    ctx.quadraticCurveTo x, y+height, x, y+height-radius
    ctx.lineTo x, y+radius
    ctx.quadraticCurveTo x, y, x+radius, y
    ctx.closePath()
    ctx.stroke() if stroke
    ctx.fill() if fill

  auto_format: (num, format) ->
    if format?
      num.format(format)
    else
      interval = @max_data-@min_data
      if interval > @options.yAxis.breaks + 2
        format = 0 
      else if interval > 1
        format = 1
      else
        format = 2
      return num.format(format)

  font_format: (font) ->
    font = _.merge @options.chart.font, font
    b = ' '
    return font.weight + b + font.style + b + font.size + b + font.family

if typeof module isnt 'undefined' and module.exports
  module.exports = Jchart
else
  this.Jchart = Jchart
