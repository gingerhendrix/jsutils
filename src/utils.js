
Utils.clone = function(objOrArray){
  return eval(objOrArray.toSource());
}


Utils.namespace("Utils.log");

Utils.log.log = function(msg){
  if(console && console.log){
    console.log("INFO: " + msg)
  }
}

Utils.log.info = function(msg){
  Utils.log.log("INFO: " + msg)
}

Utils.log.error = function(msg){
  Utils.log.log("ERROR: " + msg)
}

