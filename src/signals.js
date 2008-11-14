
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
