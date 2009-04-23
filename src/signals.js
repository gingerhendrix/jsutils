/** 
  * The main jsUtils signals helpers namespace. 
  * Signals are a method for asynchronous notification.
  * Signals are sent to a slot which is made up of a source object 
  * and a signal name.  Listeners can connect to slot to receive any
  * signals sent there.
  * 
  * @class Utils.signals
  * @static
  * @global
  */
Utils.namespace("Utils.signals", (function(){
  
  var observers = [];
  
  return {
  
  /**
  * Send an asynchronous signal to a slot.
  *
  * @method signal
  * @param src {Object} the source of the slot
  * @param signal {String} the name of the slot
  */
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
  
    /**
     * Connect a listener to a slot.
     * 
     * @method connect
     * @param src {Object} the source of the slot
     * @param signal {String} the name of the slot
     * @param listener {Function} the function to be called when a signal is sent to this slot.
     */
    connect : function(src, signal, listener){
      var ident = { source : src, signal :  signal, listener : listener};
     observers.push(ident);
    }
   }
})() );
