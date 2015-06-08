(function() {
  var Vue, camelize, components, decamelize, fs, path, simpleReload;

  path = require("path");

  fs = require("fs");

  Vue = require("vue");

  simpleReload = require("simple-reload");

  components = {};

  decamelize = function(str) {
    return str.replace(/\B([A-Z]{1})/g, function(match, chr) {
      return "-" + (chr.toLowerCase());
    });
  };

  camelize = function(str) {
    return str.replace(/-+(.)?/g, function(match, chr) {
      if (chr) {
        return chr.toUpperCase();
      } else {
        return "";
      }
    });
  };

  module.exports = function(names, options) {
    var cwd, deep, dirname, fullname, i, len, loaded, name, name1, ref, ref1, ref2, reload, stat;
    if (options == null) {
      options = {};
    }
    cwd = (ref = options.cwd) != null ? ref : "./";
    if (cwd[0] === '.') {
      dirname = module.parent.filename;
      stat = fs.statSync(dirname);
      if (stat.isFile()) {
        dirname = path.dirname(dirname);
      }
      cwd = path.resolve(dirname, cwd);
    }
    reload = (ref1 = options.reload) != null ? ref1 : false;
    deep = (ref2 = options.deep) != null ? ref2 : false;
    if (reload) {
      components = {};
    }
    for (i = 0, len = names.length; i < len; i++) {
      name = names[i];
      name = decamelize(name);
      try {
        fullname = require.resolve("" + name);
      } catch (_error) {
        fullname = require.resolve(cwd + "/" + name);
      }
      loaded = reload ? simpleReload(fullname, deep) : require(fullname);
      if (components[name1 = camelize(name)] == null) {
        components[name1] = new Vue(loaded);
      }
    }
    return components;
  };

}).call(this);
