
class JchartLine extends JchartCoordinate

  constructor: (@canvas, @data, @options=null, @ipo) ->

    super @canvas, @data, @options, @ipo
    @draw()

  draw: ->
    @preprocess_style()
    @preprocess_data()

    @drawGraph()

  addLine: (data) ->
    @draw_line_graph data

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

Jchart.line = JchartLine