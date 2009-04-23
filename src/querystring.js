
//TODO: Namespace and document.  Also consider query string generator.

function QueryString(qs){
  this.parts = {};
  var self = this;
  
  if(qs.indexOf("?")==0){
    qs = qs.substring(1);
  } 
  
  qs.split("&").forEach(function(pair){
    var bits = pair.split("=");
    self.parts[bits[0]] = bits[1];
  });

}

QueryString.fromLocation = function(){
  return new QueryString(window.location.search);
}   
