
Utils.namespace("Utils", {
 /**
  * A simple value-object, with functions for property accessors and mutators.  
  * Mutator also fires a signal when the property changes.
  *
  * @class Utils.DataBean
  * @constructor
  * @global
  */
 DataBean : function(){
    this.properties = {};
    
    /**
     * Connect to a properties slot.
     * 
     * @method connect
     * @param name {String} the name of the property
     * @param listener {Function} the function to call when the signal is fired.
     */    
    this.connect = function(name, method){
      Utils.signals.connect(this, name, method);
    }
    
    /** 
     * Add a property to this object.
     * After calling dataBean.makeProp('attribute'), the dataBean will have a new method dataBean.attribute(), 
     * this method when called with no-args acts as an accessor, and when called with args it acts like a mutator.
     * The mutator will also fire a signal (with the name of the attribute) when the value changes.
     *
     * @method makeProp
     * @param attribute {String} the name of the attribute to create
     */
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
