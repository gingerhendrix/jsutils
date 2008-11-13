
Utils.namespace("Utils.signals", (function(){
  
  var observers = [];
  
  return {
    signal : function(src, signal){
    Utils.log.info("Singal " + signal + " sent from " + src + " " + observers.length + " observers")
    for(var i=0; i<observers.length; i++){
      var ob = observers[i];
      if(ob.source === src && ob.signal == signal){
        (function(ob){//Get a new scope
          window.setTimeout(function(ob){
            ob.listener.apply(ob.src);
          });
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
