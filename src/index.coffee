Vue = require "vue"
simpleReload = require "simple-reload"
components = {}
module.exports = (names, options={}) ->
  cwd = options.cwd ? "./"
  reload = options.reload ? false
  deep = options.deep ? false
  components = {} if reload
  for name in names
    fullname =  require.resolve("#{name}")
    fullname ?= require.resolve("#{cwd}#{name}")
    loaded if reload then simpleReload(fullname, deep) else require(fullname)
    components[name] ?= new Vue(loaded)
  return components
