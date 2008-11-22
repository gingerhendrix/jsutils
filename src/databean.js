Utils.namespace("Utils", {
 DataBean : function(){
    this.properties = {};
    
    this.connect = function(name, obj, method){
      Utils.signals.connect(this, name, obj, method);
    }
    
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
