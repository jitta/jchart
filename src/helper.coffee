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