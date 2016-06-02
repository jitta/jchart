
class JchartCoordinate extends Jchart
  
  constructor: (@canvas, @data, @options=null, @ipo) ->

    @options = _.merge
      legend:
        width: 75
        lineWidth: 2
        font: 
          style: 'italic'
          weight: '400'
          size: '11px'
        color: 'rgba(0,0,0,0.3)'
        enable: true
        layout: 'horizontal'
        marginTop: 35
        marginBottom: 0
      xAxis:
        data: []
        title: ''
        border:
          enable: true
          color: "#888"
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
          prefix: ''
          suffix: ''
        min: null
        max: null
        breaks: 5
      yAxis:
        data: []
        title: ''
        border:
          enable: true
          color: "#888"
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
          prefix: ''
          suffix: ''
        min: null
        max: null
        breaks: 5
        rightAlign: false
    , @options

    super @canvas, @data, @options, @ipo

  convertToJChartArray: (data, key_value) ->
    
    monthly = {}
    temp = padZeroMonth(data)
    keys = Object.keys(temp)
    i = 0
    
    for key in keys
      last_key = keys[i-1]
      if temp[key]? and temp[last_key]?
        last_year_value = temp[last_key].value
        this_year_value = temp[key].value
        run_month = new Date("#{last_key}")
        monthly[last_key] = {}
        monthly[last_key][key_value] = last_year_value
        diff_month = (new Date("#{key}")).diffMonth(new Date("#{last_key}")) + 1
        for month in [1..diff_month]
          break if run_month > key
          run_month.add(1, 'months')
          key_monthly = run_month.getFullYear() + '-' + (parseInt(run_month.getMonth())+1)
          monthly[key_monthly] = {}
          monthly[key_monthly][key_value] = null #prevent undefined
          if last_year_value is null
            monthly[key_monthly][key_value] = null
          else if this_year_value or this_year_value is 0
            monthly[key_monthly][key_value] = last_year_value + (this_year_value-last_year_value)/diff_month * month
          monthly[key_monthly][key_value] = 0 if monthly[key_monthly] < 0
      i++

    currentValue = null
    originalArrayFillValue = null
    nullRightPad = 0
    nullRightPadoriginalArrayFillValue = 0
    newValuesArray = []
    newValuesArray.push(null)
    hasedIndexArray = []
    hasedIndexArray.push(null)
    originalArrayFill = []
    originalArrayFill.push(null)

    for year in @options.xAxis.data
      for num in [1..12]
        key = year + '-' + num
        hasedIndexArray.push(key)
        
        if monthly.hasOwnProperty(key)
          currentValue = monthly[key][key_value]
          if key_value is 'formatted'
            currentValue = if (currentValue is null) or (currentValue is undefined) then null else currentValue.toFixed(2)
          nullRightPad = 0
        nullRightPad++
        
        if data.hasOwnProperty(key)
          originalArrayFillValue = data[key][key_value]
          nullRightPadoriginalArrayFillValue = 0
        nullRightPadoriginalArrayFillValue++
          
        newValuesArray.push(currentValue)
        originalArrayFill.push(originalArrayFillValue)

    nullCount = 1
    for value, key in newValuesArray
      if nullCount < nullRightPad
        newValuesArray[(newValuesArray.length - 1) - key] = null
      else
        break
      nullCount++

    return {
      newValuesArray: newValuesArray
      nullPadRight: nullRightPad
      hasedIndexArray: hasedIndexArray
      originalArrayFill: originalArrayFill
    }
    
  normalize_data: ->
    
    this.options.xAxis.data = [new Date().getFullYear()] unless this.options.xAxis.data.length isnt 0
    
    #find min and keys to pad arrays
    keys = []
    years = []
    for data_item,key in @data
      if !Array.isArray data_item.data
        keys = keys.concat(Object.keys(data_item.data))

    for k in keys
      years.push parseInt(k.substring(0, k.indexOf('-')))

    @options.xAxis.hash_min_year = _.min years
    @options.xAxis.hash_max_year = _.max years
    min_pad = []
    max_pad = []

    if @options.xAxis.hash_min_year < _.min(@options.xAxis.data)
      y =  _.min(@options.xAxis.data) - @options.xAxis.hash_min_year
      current = @options.xAxis.hash_min_year
      min_pad = Array.apply(null, {length: y}).map(Number.call, -> current++)
      @options.xAxis.padMinArraySize = y*12
      @options.xAxis.padMinArray = true

    if @options.xAxis.hash_max_year > _.max(@options.xAxis.data)
      y =  @options.xAxis.hash_max_year - _.max(@options.xAxis.data)
      current = _.max(@options.xAxis.data)
      max_pad = Array.apply(null, {length: y}).map(Number.call, -> ++current)
      @options.xAxis.padMaxArraySize = y*12
      @options.xAxis.padMaxArray = true

    newXAxis = min_pad.concat(@options.xAxis.data, max_pad)
    @options.xAxis.data = newXAxis

    raw_data = []
    nullPadLefts = []
    nullPadRights = []
    for data_item,key in @data
      if Array.isArray data_item.data
        #pad arrays if have new x-axis
        if @options.xAxis.hasOwnProperty('padMinArray')
          min_pad = Array.apply(null, {length: @options.xAxis.padMinArraySize}).map(Number.call, -> null)
          newPadMin = min_pad.concat(data_item.data)
          @data[key].data = newPadMin
          @.ipo = @.ipo + @options.xAxis.padMinArraySize/2 unless @.ipo is null #ipo position shift

        if @options.xAxis.hasOwnProperty('padMaxArray')
          max_pad = Array.apply(null, {length: @options.xAxis.padMaxArraySize}).map(Number.call, -> null)
          newPadMax = data_item.data.concat(max_pad)
          @data[key].data = newPadMax

        raw_data.push data_item.data
      else
        try
          @data[key].formatted = @convertToJChartArray(data_item.data, 'formatted').newValuesArray
        @data[key].original_data = data_item.data
        converted = @convertToJChartArray(data_item.data, 'value')
        @data[key].data = converted.newValuesArray
        @data[key].nullPadRight = converted.nullPadRight
        @data[key].hasedIndexArray = converted.hasedIndexArray
        @data[key].originalArrayFill = converted.originalArrayFill
        raw_data.push data_item.data
        nullPadRights.push @data[key].nullPadRight

    max_obj = _.max @data, (item) -> _max item.data
    max = _.max max_obj.data
    if max >= 1.00
      roundValues raw_data
      
    if @options.chart.stretch
      for data_item,key in @data
        data_item.nullPadLeft = 0
        data_item.data.some (item) ->
          if item is null 
            data_item.nullPadLeft++ 
            return false
          else 
            return true
        nullPadLefts.push data_item.nullPadLeft
      
      minNullPadLefts = _.min nullPadLefts
      minNullPadRight = _.min nullPadRights
      for key, data_item of @data
        if data_item.processed_data is undefined
          data_item.processed_data = data_item.data.slice()
          data_item.processed_data.splice 0, minNullPadLefts
          data_item.processed_data.splice (data_item.processed_data.length + 1) - minNullPadRight, minNullPadRight
          data_item.data = data_item.processed_data
          
          data_item.processed_hased_index = data_item.hasedIndexArray.slice()
          data_item.processed_hased_index.splice 0, minNullPadLefts
          data_item.processed_hased_index.splice (data_item.processed_hased_index.length + 1) - minNullPadRight, minNullPadRight
          data_item.hasedIndexArray = data_item.processed_hased_index
          
          data_item.processed_originalArrayFill = data_item.originalArrayFill.slice()
          data_item.processed_originalArrayFill.splice 0, minNullPadLefts
          data_item.processed_originalArrayFill.splice (data_item.processed_originalArrayFill.length + 1) - minNullPadRight, minNullPadRight
          data_item.originalArrayFill = data_item.processed_originalArrayFill
        else
          data_item.data = data_item.processed_data
          data_item.processed_hased_index = data_item.hasedIndexArray
          data_item.processed_originalArrayFill = data_item.originalArrayFill
      
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
    
    # round y-axis values 
    base10 = Math.pow( 10, Math.floor ( Math.log10 ( @max_data )) )
    @max_data = Math.ceil( @max_data / base10 ) * base10
    
    # auto calculate margin left from max text length
    if @options.graph.marginLeft is 'auto' # ~40
      if @auto_format(@max_data).indexOf(".") > 0
        @options.graph.marginLeft = @options.graph.marginLeftIfDecimalPoints
      else
        @max_data = Math.round(@max_data) if @max_data > 10
        max_text = @options.yAxis.label.prefix + @max_data + @options.yAxis.label.suffix
        digit = max_text.replace('.','').length
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

    @xAxiz_zero_position = @pt + @inner_height - (0-@min_data) / @interval * @inner_height + @options.graph.marginTop

  preprocess_style: ->
    @ctx.font = @font_format(@options.chart.font)

    if @options.legend.enable
      legend_height = parseInt(@options.legend.font.size.replace('px',''))*2 + @options.legend.marginTop + @options.legend.marginBottom
      @options.chart.paddingBottom += legend_height

  drawGraph: ->
    @ctx.strokeStyle = @options.chart.color
    @horizontal_line()
    @vertical_line()

    if @volume
      @drawVolume @volume

    for line in @data
      @addLine line

    @addFlag @ipo, "IPO\nDATE" if @ipo?
    @process_legend() if @options.legend.enable

    # @ctx.drawImage(c , @options.chart.paddingLeft, @options.chart.paddingTop, @graph_width, @graph_height)

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
          @ctx.fillRect( @pl + @options.graph.marginLeft + @options.chart.lineWidth, @pt + y-height/lines - @options.chart.lineWidth - 1, @pl + @.inner_width - @options.chart.paddingRight, @pt + height/lines - @options.chart.lineWidth - 1)
        # else
        #   @ctx.fillStyle = @options.graph.background
        #   @ctx.fillRect( @pl +@options.graph.marginLeft + @options.chart.lineWidth, @pt + y, @pl + @graph_width, @pt + height/lines - @options.chart.lineWidth)

      if @options.yAxis.grid.enable
        @ctx.strokeStyle = @options.chart.color
        @ctx.setLineDash([2,1]);
        @ctx.beginPath()
        @ctx.moveTo @pl + @options.graph.marginLeft, @pt + y
        @ctx.lineTo @pl + @graph_width, @pt + y, 2
        @ctx.stroke()
        @ctx.setLineDash([]);

      # fill text label
      if @options.yAxis.label.enable
        @ctx.fillStyle = @options.yAxis.label.color or @options.chart.label.color
        @ctx.font = @font_format(@options.yAxis.label.font)
        leftOffset = if @options.yAxis.rightAlign then @graph_width - @options.graph.marginRight + @options.graph.marginLeft + @options.chart.lineWidth + @options.yAxis.tick.size  else @options.graph.marginLeft
        if @options.yAxis.label.align is 'left'
          @ctx.textAlign = 'right'
          @ctx.textBaseline =  @options.yAxis.label.textBaseline or 'middle'
          yAxisLabelOffset = this.options.yAxis.label.offset || -12;
          start_position = @pl + leftOffset + yAxisLabelOffset
          start_position -= @options.yAxis.tick.size if @options.yAxis.tick.enable
        else
          @ctx.textAlign = 'left'
          @ctx.textBaseline =   @options.yAxis.label.textBaseline or 'bottom'
          start_position = @pl + leftOffset
        @ctx.fillText @options.yAxis.label.prefix + @auto_format(value) + @options.yAxis.label.suffix, start_position, @pt + y

      # draw tick
      if @options.yAxis.tick.enable
        leftOffset = if @options.yAxis.rightAlign then @graph_width - @options.graph.marginRight + @options.yAxis.tick.size else @options.graph.marginLeft
        @ctx.beginPath()
        @ctx.strokeStyle = @options.chart.color
        @ctx.moveTo @pl + leftOffset - @options.chart.lineWidth + 1, @pt + y
        @ctx.lineTo @pl + leftOffset - @options.chart.lineWidth - @options.yAxis.tick.size + 1, @pt + y
        @ctx.stroke()
        @ctx.closePath()

    @ctx.stroke()

    if @options.xAxis.border.enable
      @ctx.strokeStyle = @options.xAxis.border.color
      @ctx.lineWidth = @options.chart.lineWidth
      @ctx.moveTo @pl + @options.graph.marginLeft, @xAxiz_zero_position
      @ctx.lineTo @pl + @graph_width - @options.graph.marginRight, @xAxiz_zero_position
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
          else if @options.xAxis.label.align is 'right'
            _x = x
          # if @options.xAxis.tick.enable
          _y = y + @options.xAxis.tick.size

          @ctx.textBaseline = 'top'
          @ctx.fillText @options.xAxis.label.prefix + value + @options.xAxis.label.suffix, @pl + _x, @pt + _y

        # grid
        if @options.xAxis.grid.enable
          if @options.xAxis.grid.align is 'center'
            _x = x - barWidth/2
          else
            _x = x
          @ctx.lineWidth = 0.5
          @ctx.setLineDash([2,1]);
          @ctx.beginPath()
          @ctx.moveTo @pl + _x, @pt
          @ctx.lineTo @pl + _x, @pt + y
          @ctx.stroke()
          @ctx.setLineDash([]);

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
          @ctx.stroke() unless (@graph_width - @options.graph.marginRight) == _x

    if @options.yAxis.border.enable
      leftOffset = if @options.yAxis.rightAlign then @graph_width - @options.graph.marginRight else @options.graph.marginLeft
      @ctx.strokeStyle = @options.yAxis.border.color
      @ctx.lineWidth = @options.chart.lineWidth
      @ctx.moveTo @pl + leftOffset, @pt
      @ctx.lineTo @pl + leftOffset, @pt + @graph_height - @options.graph.marginBottom
      @ctx.stroke()

    @ctx.closePath()
