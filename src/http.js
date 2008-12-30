
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
}


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
}

(function(){
  var counter = 0;
  
  Utils.http.scriptRequestCallback = function(scriptId){
    return function(response){
    
    }
  };

  Utils.http.scriptRequest =  function(uri, jsonp, callback, errback){
    var scriptEl = document.createElement("script");
    var scriptId = "scriptRequest_" + "" + new Date() + "_" + counter++;
    var fullUri = uri + "&"+jsonp+"=Utils.http.scriptRequestCallback(" + scriptId + ")"; //TODO: Support urls without query string
    
    scriptEl.setAttribute("id", scriptId);
    scriptEl.setAttribute("type", "text/javascript");
    scriptEl.setAttribute("src", fullUri);

    var reqTimeout = function(){
    
    }    
    
 }

})();

