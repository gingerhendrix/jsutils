new TestSuite("Http Tests", {
  testExists : function(t){
    t.assert(typeof(Utils)=="object",  "Utils not defined");
    t.assert(typeof(Utils.http)=="object",  "Utils.http not defined");
    t.assert(typeof(Utils.http.createXMLHttpRequest)== "function",  "Utils.http.createXMLHttpRequest not defined");
    t.assert(typeof(Utils.http.get) == "function",  "Utils.http.get not defined");
  },
  
  testCreateXMLHttpRequest : function(t){
    var xhr = Utils.http.createXMLHttpRequest();
    t.assert(xhr != undefined, "xhr is not defined");
    t.assert(typeof(xhr.open) == "function", "XHR does not have an open function");
  },
  
  testHttpGet : function(t){
    var mockControl = new MockControl();
		xhr = mockControl.createMock(Utils.http.createXMLHttpRequest());
		var oldXHRFn = Utils.http.createXMLHttpRequest;
		Utils.http.createXMLHttpRequest = function(){ return xhr; }

		xhr.expects().open("GET", "URI", true);
		xhr.expects().send(null);
		
    var callback = function(){ };
    var errback = function(){ };

    Utils.http.get("URI", callback, errback);

		Utils.http.createXMLHttpRequest = oldXHRFn;

		mockControl.verify();
		

  },
  
  testHttpGetSuccess : function(t){
    var mockControl = new MockControl();
		xhr = mockControl.createMock(Utils.http.createXMLHttpRequest());
		var oldXHRFn = Utils.http.createXMLHttpRequest;
		Utils.http.createXMLHttpRequest = function(){ return xhr; }
		
		xhr.expects().open("GET", "URI", true);
		xhr.expects().send(null);
		var callbackCalls = 0;
		
    var callback = function(req){ 
       callbackCalls++; 
       t.assert(req == xhr, "Callback called with wrong param " + req); 
    };
   
    var errback = function(){ t.fail("Errback called"); };

    Utils.http.get("URI", callback, errback);

    xhr.readyState = 2;
    xhr.onreadystatechange();

    xhr.readyState = 4;
    xhr.status = 200;
    xhr.onreadystatechange();

		Utils.http.createXMLHttpRequest = oldXHRFn;
		mockControl.verify();
		t.assert(callbackCalls==1, "Expected callback to be called once - called " + callbackCalls + " times");
		
  },

  testHttpGetFailure : function(t){
    var mockControl = new MockControl();
		xhr = mockControl.createMock(Utils.http.createXMLHttpRequest());
		Utils.http.createXMLHttpRequest = function(){ return xhr; }

		xhr.expects().open("GET", "URI", true);
		xhr.expects().send(null);
		var errbackCalls = 0;
		
    var errback = function(req){ 
       errbackCalls++; 
       t.assert(req == xhr, "errback called with wrong param " + req); 
    };
   
    var callback = function(){ t.fail("callback called"); };

    Utils.http.get("URI", callback, errback);

    xhr.readyState = 2;
    xhr.onreadystatechange();

    xhr.readyState = 4;
    xhr.status = 404;
    xhr.onreadystatechange();

		mockControl.verify();
		t.assert(errbackCalls==1, "Expected errback to be called once - called " + errbackCalls + " times");
  },  
  
  testScriptRequest : function(t){
    var scriptId = Utils.http.scriptRequest("URI", "jsonp", function(){ /* Callback */}, function(){ /* Errback */ })
    //TODO: Write some actual tests
    // Test script element is appended.
    // Test correct url
    // Test callback function
    // Test timeout
  }
  
});
