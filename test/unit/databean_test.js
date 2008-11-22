new TestSuite("Databean Tests", {

  testExists : function(t){
    t.assert(typeof(Utils)=="object",  "Utils not defined");
    t.assert(typeof(Utils.DataBean)=="function",  "Utils.DataBean not defined");
    
    var db= new Utils.DataBean();
    t.assert(typeof(db) == "object", "Databean ctor broked");
    t.assert(typeof(db.makeProp) == "function", "makeProp method undefined");
    t.assert(typeof(db.connect) == "function", "connect method undefined");
  },
  
  testMakeProp : function(t){
     var db= new Utils.DataBean();
     t.assert(typeof(db.someProp) == "undefined", "someProp already defined");
     
     db.makeProp("someProp");
 
     t.assert(typeof(db.someProp) == "function", "someProp not defined");
  },
  
  testGetter : function(t){
    var db= new Utils.DataBean();
    db.makeProp("someProp");  
    db.someProp("test");
    
    t.assert(db.someProp() == "test", "Incorrect value : " + db.someProp());
  },
  
  testSetter : function(t){
    var db= new Utils.DataBean();
    db.makeProp("someProp");  
    db.someProp("test");

    var mockControl = new MockControl();
    var signalsMock = mockControl.createMock(Utils.signals);
    var originalSignals = Utils.signals;
    Utils.signals = signalsMock;

    Utils.signals.expects().signal(db, "someProp", "newValue");
    db.someProp("newValue");

    Utils.signals = originalSignals;
    t.assert(db.someProp() == "newValue", "Incorrect value : " + db.someProp());
    mockControl.verify();
  },
  
  testIdempotentGetter : function(t){
    var db= new Utils.DataBean();
    db.makeProp("someProp");  
    db.someProp("test");

    var mockControl = new MockControl();
    var signalsMock = mockControl.createMock(Utils.signals);
    var originalSignals = Utils.signals;
    Utils.signals = signalsMock;

    db.someProp();

    Utils.signals = originalSignals;
    t.assert(db.someProp() == "test", "Incorrect value : " + db.someProp());
    mockControl.verify();
  },
  
  testSetterWithUndefined : function(t){
    var db= new Utils.DataBean();
    db.makeProp("someProp");  
    db.someProp("test");

    var mockControl = new MockControl();
    var signalsMock = mockControl.createMock(Utils.signals);
    var originalSignals = Utils.signals;
    Utils.signals = signalsMock;

    Utils.signals.expects().signal(db, "someProp", undefined);
    db.someProp(undefined);

    Utils.signals = originalSignals;
    t.assert(typeof(db.someProp()) == "undefined", "Incorrect value : " + db.someProp());
    mockControl.verify();
  
  },
  
  testSetterWithSameValue : function(t){
    var db= new Utils.DataBean();
    db.makeProp("someProp");  
    db.someProp("test");

    var mockControl = new MockControl();
    var signalsMock = mockControl.createMock(Utils.signals);
    var originalSignals = Utils.signals;
    Utils.signals = signalsMock;

    db.someProp("test");

    Utils.signals = originalSignals;
    t.assert(db.someProp() == "test", "Incorrect value : " + db.someProp());
    mockControl.verify();
  
  }

  
});
