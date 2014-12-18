
class JchartBar extends JchartCoordinate

  constructor: (@canvas, @data, @options=null, @ipo) ->

    @options = _.merge
      captionMargin: 0
    , @options

    super @canvas, @data, @options, @ipo
    @normalize_data()
    @draw()

  draw: ->
    @preprocess_style()
    @preprocess_data()

    @drawGraph()

  addLine: (data) ->
    @draw_column_graph data
    
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
          @ctx.fillText value.format(2), @pl + x , @pt + y - @options.captionMargin

Jchart.bar = JchartBar