// Examples for jsUtils - namespace

// Namespace
Utils.namespace("some.name.space");
some.name.space.someFunction = function(){
  // ...
}

//Namespace with module pattern
Utils.namespace("some.name.space");
some.name.space = (function(){
  // ...
  return { someFunction : function(){ /* ... */ }  };
})();

//Namespace with extend
Utils.namespace("some.name.space");
Utils.extend(some.name.space, {
  someFunction : function(){ /* ... */ }
});
//Shorter
Utils.namespace("some.name.space", {
  someFunction : function(){ /* ... */ }
});


//Namespace with extend and module pattern

Utils.namespace("some.name.space");
Utils.extend(some.name.space, (function(){
  // ...
  return { someFunction : function(){ /* ... */ } };
})());

//Shorter (without all the parens)
Utils.namespace("some.name.space");
Utils.extend(some.name.space, function(){
  // ...
  return { someFunction : function(){ /* ... */ } };
});

//Shortest (without all the parens)
Utils.namespace("some.name.space", function(){
  // ...
  return { someFunction : function(){ /* ... */ } };
});

//Extend with multiple arguments, arrays, mixed arguments, recursion
Utils.extend(some.name.space, {  someFunction : function(){ /* ... */ } }, 
                              function(){  return { someOtherFunction : function(){}  } }
                              [{}, {}]
            );


//Replace Namespace
Utils.namespace("some.name.space", {someFunc : function(){}});
Utils.replaceNamespace("some.name.space", {someOtherFunc : function(){}});
assertUndefined(some.name.space.someFunc);

//Revert namespace
Utils.namespace("some.name.space", {someFunc : function(){}});
Utils.replaceNamespace("some.name.space", {someOtherFunc : function(){}});
var newNamespace = Utils.revertNamespace("some.name.space")

assertNotUndefined(some.name.space.someFunc);

assertNotUndefined(newNamespace.someOtherFunc);

//Extendable, Namespaceble, Revertable
Utils.namespace("some.name.space", [Utils.Extendable, Utils.Namespaceable]);
some.name.space.namespace("subspace");
some.name.space.extend({
  someFunc: function(){}
});


