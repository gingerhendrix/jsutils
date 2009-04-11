/** 
  * The main jsUtils http helpers namespace. 
  * 
  * @class Utils.http
  * @static
  * @global
  */
  
Utils.namespace("Utils.http");

/**
  * A low-level utility method for obtaining a new XMLHttpRequest 
  * in a cross-browser manner.
  *
  * @method createXMLHttpRequst
  * @return {XMLHttpRequest} an implementation of XMLHttpRequest
*/
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

/**
  * A simple method for performing an asynchonous GET request via xhr
  *
  * @method get
  * @param uri {String} the uri to retrieve
  * @param callback {Function} the function to call when the data is available, the function will be called with xhr object as its first argument.
  * @param errback {Function} the function to call an error occurs or the request.status != 200, the function will be called with xhr object as its first argument.
*/
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

/**
  * A simple method for performing an asynchonous jsonp GET request via the script tag.
  * This can be used for loading data cross-domain.  The data provider must support json requests.
  *
  * @method scriptRequest
  * @param uri {String} the uri to retrieve
  * @param jsonp {String} the request-parameter to use to provide the jsonp callback to the service
  * @param callback {Function} the function to call when the data is available, the function will be called with the deserialized json as its first argument.
  * @param errback {Function} the function to call when an error occurs
  * @param timeout an optional time before the scriptRequest gives up and calls the errback.
*/
  Utils.http.scriptRequest =  function(uri, jsonp, callback, errback, timeout){
    timeout = timeout || 2000;
    var scriptEl = document.createElement("script");
    var scriptId = "scriptRequest_" + "" + Date.now() + "_" + counter++;
    var fullUri = uri + "&"+jsonp+"=Utils.http.scriptRequestCallback(\"" + scriptId + "\")"; //TODO: Support urls without query string
    
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
 
