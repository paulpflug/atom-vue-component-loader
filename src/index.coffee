# out: ../lib/index.js

path = require "path"
fs = require "fs"
Vue = require "vue"
simpleReload = require "simple-reload"
components = {}

decamelize = (str) ->
  str.replace /\B([A-Z]{1})/g, (match, chr) ->
    "-#{chr.toLowerCase()}"

camelize = (str) ->
  str.replace /-+(.)?/g, (match, chr) ->
    if chr
      chr.toUpperCase()
    else
      ""

module.exports = (names, options={}) ->
  cwd = options.cwd ? "./"
  if cwd[0] == '.'
    dirname = module.parent.filename
    stat = fs.statSync dirname
    if stat.isFile()
      dirname = path.dirname dirname
    cwd = path.resolve dirname, cwd
  reload = options.reload ? false
  deep = options.deep ? false
  components = {} if reload
  for name in names
    name = decamelize(name)
    try
      fullname =  require.resolve("#{name}")
    catch
      fullname = require.resolve("#{cwd}/#{name}")
    loaded = if reload then simpleReload(fullname, deep) else require(fullname)
    components[camelize(name)] ?= new Vue(loaded)
  return components
