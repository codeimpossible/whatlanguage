define(function(){
  var api_url = "https://api.github.com/";

  var parseDataObjectToQueryString = function(data) {
    var q = "";
    if(data){
      for(var p in data) {
        if( data.hasOwnProperty(p) ) {
          q += "&" + p + "=" + data[p];
        }
      }
    }
    return q;
  };

  var isArray = function(o) { return o.constructor === Array; }

  var format_url = function (method, data) {
    var prefix = api_url, suffix = "?callback=define";
    return url = prefix + method + suffix + parseDataObjectToQueryString(data);
  }

  return {
    get: function(method, fnCallback, data) {
      // TODO: maybe we should cache these in localStorage???
      urls = [];
      if( isArray(method) ) {
        // we can declare a dependency on many api calls
        for(var i = -1, l = method.length; ++i < method.length; ) {
          // build up our api calls
          urls.push( format_url( method[i].method, method[i].data ) );
        }
      } else {
        urls.push( format_url(method, data) );
      }

      console.log(urls);

      require(urls, function(){
        // here is where the "magic"
        // happens. Build out an object that mashes
        // all of the requests together
        var args = {};
        for(var i = -1, l = arguments.length; ++i < l; ) {
          var methodInfo = method[i];
          if( methodInfo ) {
            // thank god requirejs keeps the order
            args[ methodInfo.key ] = arguments[i];
          }
        }
        fnCallback.call(this, args); // keep scoping intact
      });
    }
  };
});
