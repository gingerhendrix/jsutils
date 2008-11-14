new TestSuite("Signals Tests", {
  testExists : function(t){
    t.assert(typeof(Utils)=="object",  "Utils not defined");
    t.assert(typeof(Utils.signals)=="object",  "Utils.signals not defined");
    t.assert(typeof(Utils.signals.signal)=="function",  "Utils.signals.signal not defined");
    t.assert(typeof(Utils.signals.connect)=="function",  "Utils.signals.connect not defined");
  },
  
  testSignal : function(t){
    var source = { dummy : "blah" };
    var cont = t.continueWithTimeout(function(t, that, args){
      //t.assert(that===source, "Wrong this pointer " + that);
    }, 1000);
    
    var slot = function(){
      var args = Array.prototype.slice.call(arguments)
      cont(this, args);
    }

    Utils.signals.connect(source, "sig", slot);
    Utils.signals.signal(source, "sig");

  },
  
  testMultipleSlots : function(t){
    var source = { dummy : "blah" };
    var cont = t.continueWithTimeout(function(t, slot){
      t.assert(slot=="slot1", "Wrong slot " + slot.toSource());
    }, 1000);
    
    var slot1 = function(){
      cont("slot1");
    }
    
    var slot2 = function(){
      cont("slot2");
    }

    Utils.signals.connect(source, "sig1", slot1);
    Utils.signals.connect(source, "sig2", slot2);
    Utils.signals.signal(source, "sig1");
  
  },
  
  testMultipleSources : function(t){
    var source1 = { dummy : "blah" };
    var source2 = { dummy : "blah2" };
    
    var cont = t.continueWithTimeout(function(t, slot){
      t.assert(slot=="slot1", "Wrong slot " + slot.toSource());
    }, 1000);
    
    var slot1 = function(){
      cont("slot1");
    }
    
    var slot2 = function(){
      cont("slot2");
    }

    Utils.signals.connect(source1, "sig", slot1);
    Utils.signals.connect(source2, "sig", slot2);
    Utils.signals.signal(source1, "sig");
  
  }
  
});
