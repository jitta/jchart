###*
 * Find minimum value of an object or array
 * ============================================================
 * @name root._min
 * @param {Object} or [Array]
 * @return min_value
###

_min = (obj) ->
  min = Infinity
  for value in obj
    if value? and value < min
      min = value
  if min is Infinity
    return null
  else
    return min

###*
 * Find maximum value of an object or array
 * ============================================================
 * @name root._max
 * @param {Object} or [Array]
 * @return max_value
###

_max = (obj) ->
  max = -Infinity
  for value in obj
    if value? and value > max
      max = value
  if max is -Infinity
    return null
  else
    return max

###*
 * ????
 * ============================================================
 * @name Number.prototype.format
 * @param {????} ????
 * @param {String} ????
 * @param {String} ????
 * @return {String}
###

Number::format = format = (decimals, dec = '.', sep = ',') ->
  number = (@ + '').replace(/[^0-9+\-Ee.]/g, '')
  if number == '-99999.99' or not number?
    return '-'
  n = if not isFinite(+number) then 0 else +number
  prec = if not isFinite(+decimals) then 0 else Math.abs(decimals)
  
  return (number/1000000000).format(decimals)+'B' if number > 1000000000
  return (number/1000000).format(decimals)+'M' if number > 1000000
  
  toFixedFix = (n, prec) ->
    k = Math.pow(10, prec);
    '' + Math.round(n * k) / k;
    
  # Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (if prec then toFixedFix n, prec else '' + Math.round n).split('.');
  if s[0].length > 3
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  if (s[1] || '').length < prec 
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  s.join(dec);

###*
 * RGB to HEX color converter
 * ============================================================
###

rgbToHex = (r, g, b) ->
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

###*
 * HEX to RGB color converter
 * ============================================================
###

hexToRgb = (hex) ->
  result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  (if result
    r: parseInt(result[1], 16)
    g: parseInt(result[2], 16)
    b: parseInt(result[3], 16)
  else null)

###*
 * HEX color difference
 * ============================================================
###

color_meter = (cwith, ccolor) ->
  return  if not cwith and not ccolor
  _cwith = (if (cwith.charAt(0) is "#") then cwith.substring(1, 7) else cwith)
  _ccolor = (if (ccolor.charAt(0) is "#") then ccolor.substring(1, 7) else ccolor)
  _r = parseInt(_cwith.substring(0, 2), 16)
  _g = parseInt(_cwith.substring(2, 4), 16)
  _b = parseInt(_cwith.substring(4, 6), 16)
  __r = parseInt(_ccolor.substring(0, 2), 16)
  __g = parseInt(_ccolor.substring(2, 4), 16)
  __b = parseInt(_ccolor.substring(4, 6), 16)
  p1 = (_r / 255) * 100
  p2 = (_g / 255) * 100
  p3 = (_b / 255) * 100
  perc1 = Math.round((p1 + p2 + p3) / 3)
  p1 = (__r / 255) * 100
  p2 = (__g / 255) * 100
  p3 = (__b / 255) * 100
  perc2 = Math.round((p1 + p2 + p3) / 3)
  Math.abs perc1 - perc2

###*
 * Round data values
 * ============================================================
###

roundValues = (arrays) ->
  arrays.forEach (item) ->
    item.forEach (value, i) ->
      if (value != null)
        item[i] = parseFloat(value.toFixed(2))
        
###*
 * Date helpers
 * ============================================================
###

Date::add = (number, duration) ->
  if duration == 'days'
    @.setDate(@.getDate() + number)
  else if duration == 'months'
    @.setMonth(@.getMonth() + number)
  else
    @.setYear(@.getYear() + number)

Date::diffMonth = (d1) ->
  d2 = @
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth() + 1
  months += d2.getMonth()
  months = 0 if months < 0
  return months
