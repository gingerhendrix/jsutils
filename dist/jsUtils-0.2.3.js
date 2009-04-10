
(function(){

    var _savedNamespaces = {}
  _savedNamespaces["Utils"] = Utils;
  Utils = {};

  function getNamespace(nameParts){
    var root = window;
    for(var i=0; i<nameParts.length; i++){
      root = root[nameParts[i]];
    }
    return root;
  }


  Utils.namespace = function(name /*, extensions */){
    var nameParts = name.split(".");
    var root = (this != Utils) ? this : window;
    var extend =  Array.prototype.slice.call(arguments, 1)

    for(var i=0; i<nameParts.length; i++){
      if(typeof(root[nameParts[i]]) == "undefined"){
        root[nameParts[i]] = {};
      }
      Utils.extend(root[nameParts[i]], {__NAMESPACE__ : name}, extend);
      root = root[nameParts[i]];
    }
    return root;
  }


  Utils.replaceNamespace = function(name /*, extensions */){
    Utils.namespace(name);

    var head = name.split(".").slice(0, -1);
    var tail = name.split(".").slice(-1)[0];

    var parent = getNamespace(head);
    _savedNamespaces[name] = parent[tail];
    parent[tail] = {};
    Utils.extend(parent[tail], {__NAMESPACE__ : name}, Array.prototype.slice.call(arguments, 1));

    return parent[tail];
  }

  Utils.revertNamespace = function(name){
    if(arguments.length==0){
      name = "Utils";
    }
    var head = name.split(".").slice(0, -1);
    var tail = name.split(".").slice(-1);
    var parent = getNamespace(head);
    var namespace = parent[tail]
    parent[tail] = _savedNamespaces[name];
    return namespace;
  }

  Utils.extend = function(obj, extension /*, extensions */){
    if(arguments.length > 2){
      for(var i=1; i<arguments.length; i++){
        Utils.extend(obj, arguments[i])
      }
      return;
    }
    if(extension.constructor == Array){
      for(var i=0; i<extension.length; i++){
        Utils.extend(obj, extension[i])
      }
      return;
    }
    if(typeof(extension) == "function"){
      Utils.extend(obj, extension.call())
    }

    for(var prop in extension){
      obj[prop] = extension[prop];
    }
    return obj;
  }

  Utils.Extendable = {
    extend : function(extension /*, extensions */){
      return Utils.extend(this,  Array.prototype.slice.call(arguments));
    }
  }

  Utils.Namespaceable = {
    namespace : function(namespace /*, extensions */){
     return  Utils.namespace.apply(this, Array.prototype.slice.call(arguments));
    }
  }

  Utils.Revertable = {
    revertNamespace : function(){
      return Utils.revertNamespace(this.__NAMESPACE__);
    }
  }

Utils.namespace("Utils.signals", (function(){

  var observers = [];

  return {
    signal : function(src, signal){
    for(var i=0; i<observers.length; i++){
      var ob = observers[i];
      if(ob.source === src && ob.signal == signal){
        (function(observer){//Get a new scope
          window.setTimeout(function(){
            observer.listener.apply(observer.src);
          }, 0);
        })(ob);
      }
    }
  },

  connect : function(src, signal, listener){
    var ident = { source : src, signal :  signal, listener : listener};
    observers.push(ident);
  }
 }

})() );

Utils.namespace("Utils.http");


Utils.http.createXMLHttpRequest = function(){
  //Borrowed form Ajax Cookbook - http://ajaxcookbook.org/xmlhttprequest/
  //Might be better off a fully-fledged wrapper like Sergey Illinsky's

  if (typeof XMLHttpRequest != "undefined") {
      return new XMLHttpRequest();
  } else if (typeof ActiveXObject != "undefined") {
      return new ActiveXObject("Microsoft.XMLHTTP");
  } else {
      throw new Error("XMLHttpRequest not supported");
  }
};


Utils.http.get = function(uri, callback, errback){
  var req = Utils.http.createXMLHttpRequest();
  req.open('GET', uri, true);
  req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
      if(req.status == 200){
        // Utils.log.info("Loaded " + uri);
         if(callback && ((typeof callback) == "function")){
           callback(req);
        }
      }else{
        // Utils.log.info("Error loading " + uri);
        if(errback && ((typeof errback) == "function")){
          errback(req);
        }
      }
    }
  };
  req.send(null);
};

(function(){

  var counter = 0;
  var scriptRequests = {};

  Utils.http.scriptRequestCallback = function(scriptId){
    var scriptEl = document.getElementById(scriptId);
    scriptEl.parentNode.removeChild(scriptEl);
    window.clearTimeout(scriptRequests[scriptId].errTimer);
    return scriptRequests[scriptId].callback;
  };

  Utils.http.scriptRequestErrback = function(scriptId){
    var scriptEl = document.getElementById(scriptId);
    scriptEl.parentNode.removeChild(scriptEl);
    scriptRequests[scriptId].errback();
  };

  Utils.http.scriptRequest =  function(uri, jsonp, callback, errback, timeout){
    timeout = timeout || 2000;
    var scriptEl = document.createElement("script");
    var scriptId = "scriptRequest_" + "" + Date.now() + "_" + counter++;
    var fullUri = uri + "&"+jsonp+"=Utils.http.scriptRequestCallback(" + scriptId + ")"; //TODO: Support urls without query string

    scriptEl.setAttribute("id", scriptId);
    scriptEl.setAttribute("type", "text/javascript");
    scriptEl.setAttribute("src", fullUri);

    var errTimer = window.setTimeout(function(){Utils.http.scriptRequestErrback(scriptId);}, timeout);

    scriptRequests[scriptId] =
      { callback : callback,
        errback : errback,
        errTimer : errTimer };

    document.getElementsByTagName("head")[0].appendChild(scriptEl);

    return scriptId;
 }

})();

  Utils.namespace("Utils", {
 DataBean : function(){
    this.properties = {};

    this.connect = function(name, obj, method){
      Utils.signals.connect(this, name, obj, method);
    }

    this.makeProp = function(prop){

      this[prop] = function(val){
        if(arguments.length > 0 && val != this.properties[prop]){
          this.properties[prop] = val;
          Utils.signals.signal(this, prop, val);
        }
        return this.properties[prop];
      }

    }
  }
});
  //Get artist name from URL
function QueryString(qs){
  this.parts = {};
  var self = this;

  if(qs.indexOf("?")==0){
    qs = qs.substring(1);
  }

  qs.split("&").forEach(function(pair){
    var bits = pair.split("=");
    self.parts[bits[0]] = bits[1];
  });

}

QueryString.fromLocation = function(){
  return new QueryString(window.location.search);
}
})();