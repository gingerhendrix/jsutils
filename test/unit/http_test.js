new TestSuite("Http Tests", {
  testExists : function(t){
    t.assert(typeof(Utils)=="object",  "Utils not defined");
    t.assert(typeof(Utils.http)=="object",  "Utils.http not defined");
    t.assert(typeof(Utils.http.createXMLHttpRequest)== "function",  "Utils.http.createXMLHttpRequest not defined");
    t.assert(typeof(Utils.http.get) == "function",  "Utils.http.get not defined");
  }
});
