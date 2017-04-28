
class JchartLine extends JchartCoordinate

  constructor: (@canvas, @data, @options=null, @ipo, @volume) ->

    @options = _.merge
      line_dash: [6,2]
    , @options

    super @canvas, @data, @options, @ipo, @volume
    @normalize_data()
    @draw()
    if @options.chart.linePoint?.enable is true
      @addMouseHoverEvent()

  draw: ->
    @preprocess_style()
    @preprocess_data()

    @drawGraph()

  addLine: (data) ->
    @draw_line_graph data

  addMouseHoverEvent: ->
    circles = []
    original_datas = []
    for data in @data
      # convert data object to array of value that sorted by key
      original_data = Object.keys(data.original_data).map((key) ->
        return Object.assign(data.original_data[key], {'date': key})
      )

      original_datas = original_datas.concat(original_data)

      lineWidth = data.style.lineWidth or 2
      index = 0
      firstHit = false
      for plot in data.plot
        if plot?
          if not firstHit
            circles.push({'plot': plot, 'lineWidth': lineWidth})
            firstHit = true
          else
            hasChanged = data.original_data?[data.hasedIndexArray?[index]]
            circles.push({'plot': plot, 'lineWidth': lineWidth}) if hasChanged isnt undefined
        index++

    @canvas.addEventListener('mousemove', ((e) ->
      rect = this.canvas.getBoundingClientRect()
      x = e.clientX - rect.left
      y = e.clientY - rect.top
      if circles.length > 0
        i = 0
        for circle in circles
          lineWidth = parseInt(circle.lineWidth, 10)
          plot = circle.plot
          r = parseInt(@options.chart.linePoint?.size or 5, 10)
          r += lineWidth

          if (x >= plot.x - r && x <= plot.x + r) && (y >= plot.y - r && y <= plot.y + r)
            hoverCircleEvent = new CustomEvent('data-hover', {'detail': {status: 'on', data: original_datas[i], position: plot}});
            this.canvas.dispatchEvent(hoverCircleEvent);
            return
          i++
        hoverCircleEvent = new CustomEvent('data-hover', {'detail': {status: 'off'}});
        this.canvas.dispatchEvent(hoverCircleEvent);
      ).bind(this)
    )

  draw_line_graph: (data) ->
    if data.style.fill_area
      @fillArea data

    @ctx.beginPath()
    @ctx.lineWidth = data.style.lineWidth or 2
    @ctx.strokeStyle = data.style.color or '#000'
    @ctx.fillStyle = data.style.color or '#000'
    if data.style.line is 'dashed'
      @ctx.setLineDash @options.line_dash
    else
      @ctx.setLineDash []

    null_count = 0
    #before = data.plot[0]

    circles = []
    index = 0
    firstHit = false

    for plot in data.plot

      if plot?
        null_count = 0
        if not firstHit
          circles.push(plot)
          firstHit = true
        if data.style.line is 'point'
          @ctx.fillRect plot.x, plot.y, 3, 3
        else
          @ctx.lineTo plot.x, plot.y
          hasChanged = data.original_data?[data.hasedIndexArray?[index]]
          circles.push(plot) if hasChanged isnt undefined
        last_data = plot
      else ## start point
        if plot?
          @ctx.moveTo plot.x, plot.y

      null_count++ if !plot?
      index++

    @ctx.stroke()
    @ctx.closePath()

    if @options.chart.linePoint?.enable is true
      @ctx.setLineDash []
      @ctx.fillStyle = @options.chart.linePoint?.fill or '#FFF'
      for plot in circles
        @ctx.beginPath()
        @ctx.arc plot.x, plot.y, @options.chart.linePoint?.size or 5, 0, 2*Math.PI
        @ctx.fill()
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
    @ctx.setLineDash([3,2]);
    @ctx.beginPath()
    @ctx.moveTo x, @options.chart.paddingTop
    @ctx.lineTo x, @options.chart.paddingTop + y
    @ctx.stroke()
    @ctx.setLineDash([]);

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

  multiLine: (ctx, text, x, y) ->
    texts = text.split '\n'
    lineHeight = @options.chart.font.size.replace 'px', ''
    for t in texts
      ctx.fillText t, x, y + _i*lineHeight

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

  fillArea: (data) ->
    ctx = @ctx

    if hexToRgb data.style.color
      color = hexToRgb data.style.color
    else
      color = data.style.color

    ctx.fillStyle = 'rgba('+color.r+', '+color.g+', '+color.b+', 0.2)' # '#EAF8FC'
    ctx.globalCompositeOperation = @options.chart.fillBlendMode or 'multiply'

    ctx.beginPath()

    dataToFill = []
    data.plot.forEach (item) ->
      if item
        dataToFill.push item

    if dataToFill.length
      ctx.beginPath()
      ctx.moveTo dataToFill[0].x, @options.chart.height - ( @options.chart.paddingBottom + @options.graph.marginBottom )

      dataToFill.forEach (item) ->
        ctx.lineTo item.x, item.y

      ctx.lineTo dataToFill[dataToFill.length-1].x, @options.chart.height - ( @options.chart.paddingBottom + @options.graph.marginBottom )

      ctx.closePath()
      ctx.fill()

  drawVolume: (volume) ->
    ctx =  @ctx
    max = _.max volume.data
    min = _.min volume.data
    interval = max-min
    width = @graph_width - (@options.graph.marginLeft)
    max_height = (@graph_height-(@options.graph.marginTop + @options.graph.marginTop)) / 5
    if @options.chart.stretch
      barWidth = width / _.size(@.data[0].processed_hased_index)
    else
      barWidth = width / _.size(volume.data)
    columnWidth = barWidth / 2
    _i = 0
    for value in volume.data
      if value?
        x = (_i+1) * barWidth - barWidth/2 + @options.chart.paddingLeft + @options.graph.marginLeft
        y = @options.chart.height - (value-min+1) / interval * max_height - @options.graph.marginBottom - @options.chart.paddingBottom
        ctx.fillStyle = volume.color or '#000'
        if @options.chart.stretch
          try
            ctx.fillRect @.data[0].plot[_i].x - barWidth / 4, y, columnWidth, (value-min+1)/interval*max_height - @options.chart.lineWidth+1
        else
          ctx.fillRect x-columnWidth/2, y, columnWidth, (value-min+1)/interval*max_height - @options.chart.lineWidth+1
      _i++

Jchart.line = JchartLine
