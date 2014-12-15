
class Jchart
  canvas: null
  ctw: null
  position: {}

  constructor: (@canvas, @data, @options=null, @ipo) ->

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
          weight: '400'
          size: '13px'
          family: 'Arial,sans-serif'
        color: '#888'
        background: '#ffffff'
      graph:
        border: true
        marginLeft: 'auto'
        marginBottom: 25
        marginTop: 5
        marginRight: 20
        background: '#ffffff'
        background_stripe: '#FCFCFC'
    , @options

    # default options
    @options = {} unless @options?
    
    # canvas things
    #@canvas = new canvas @options.chart.width, @options.chart.height
    @ctx = @canvas.getContext '2d'
    @rect @ctx, 0, 0, @ctx.canvas.width, @ctx.canvas.height, 0 if @options.debug is true

    #if window
    #@device_ratio = 1
    @device_ratio = if (typeof window isnt 'undefined') then @scaleRatio(@canvas) else 1

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

  process_legend: () ->
    legend_width = @options.legend.width
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
