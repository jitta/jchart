
class JchartLine extends JchartCoordinate

  constructor: (@canvas, @data, @options=null, @ipo) ->

    super @canvas, @data, @options, @ipo
    @normalize_data()
    @draw()

  draw: ->
    @preprocess_style()
    @preprocess_data()

    @drawGraph()

  addLine: (data) ->
    @draw_line_graph data
    if data.style.fill_area
      @fillArea data

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

Jchart.line = JchartLine