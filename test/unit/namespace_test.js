new TestSuite("Utils Tests", {
  testUtils : function(t){
    t.assert(typeof(Utils)=="object",  "Utils not defined");
  },
  
  testUtilsIsRevertable : function(t){
    var _utils = Utils.revertNamespace();
    t.assert(typeof(Utils)=="undefined",  "Utils is not revertable");
    Utils = _utils;
  }
});

new TestSuite("Namespace Tests",{
  testNamespace : function(t){
    delete some_namespace;
    Utils.namespace("some_namespace");
    assertObjectEquals(t, {}, some_namespace);
  },
  
  testNamespaceDoesntOverwrite : function(t){
    some_namespace = {dontDelete : true};
    var _some_namespace = some_namespace;
    Utils.namespace("some_namespace");
    assertObjectEquals(t, _some_namespace, some_namespace);
  },
  
  testNamespaceReturnsNamespace : function(t){
    delete some_namespace;
    var ret = Utils.namespace("some_namespace");
    t.assert(some_namespace === ret, "Return not same object as namespace");
  },
  
  testMultipartNamespace : function(t){
    delete some_namespace;
    Utils.namespace("some_namespace.subnamespace");
    assertObjectEquals(t, { subnamespace: {} } , some_namespace);
  },
  
  testNamespaceWithExtend : function(t){
    delete some_namespace;
    Utils.namespace("some_namespace", {a : "test"}, function(){ return {b : "test"}; });
    assertObjectEquals(t, {a : "test", b : "test"} , some_namespace);
  },
  
  testReplaceNamespace : function(t){
    some_namespace = {removeMe : "removeMe"};
    Utils.replaceNamespace("some_namespace", {a : "test"});
    assertObjectEquals(t, {a : "test"} , some_namespace);
  },
  
  testReplaceNamespaceOnlyReplacesLeaf : function(t){
    some_namespace = {keepMe : "keepMe"};
    some_namespace.subspace = {removeMe : "removeMe"};
    Utils.replaceNamespace("some_namespace.subspace");
    assertObjectEquals(t, {keepMe : "keepMe", subspace : {}}, some_namespace);
  },
  
  testRevertNamespace : function(t){
    some_namespace = {keepMe : "keepMe"};
    _some_namespace = some_namespace
    Utils.replaceNamespace("some_namespace");
    Utils.revertNamespace("some_namespace");
    t.assert(_some_namespace === some_namespace, "Namespace not reverted");
  }
});


new TestSuite("Extend Tests",{
  testExtends : function(t){
    var obj = {};
    Utils.extend(obj, {a : "test"});
    assertObjectEquals(t, {a: "test"}, obj);
  },
  
  testExtendsPreservesProperties : function(t){
    var obj = {a : "test"};
    Utils.extend(obj, {b : "test"});
    assertObjectEquals(t, {a: "test", b : "test"}, obj);
  },
  
  testExtendsOverwritesIntersection : function(t){
    var obj = {a : "test"};
    Utils.extend(obj, {a : "changed"});
    assertObjectEquals(t, {a: "changed"}, obj);
  },
  
  testExtendsWithFunctionArg : function(t){
    var obj = {a : "test"};
    Utils.extend(obj, function(){ return {a : "changed"}; });
    assertObjectEquals(t, {a: "changed"}, obj);
  },
  
  testExtendsWithMultipleArgs : function(t){
    var obj = {a : "test"};
    Utils.extend(obj, {a: "changed"}, {b : "new"});
    assertObjectEquals(t, {a: "changed", b : "new"}, obj);
  },
  
  testExtendsWithArrayArgs : function(t){
    var obj = {a : "test"};
    Utils.extend(obj, [{a: "changed"}, {b : "new"}]);
    assertObjectEquals(t, {a: "changed", b : "new"}, obj);
  },
  
  testExtendsOrder : function(t){
    var obj = {a : "test"};
    Utils.extend(obj, [{a: "1"}, {a : "2", b : "1"}], {a: "3", b : "2", c : "1"});
    assertObjectEquals(t, {a: "3", b : "2", c: "1"}, obj);
  },
});

new TestSuite("Extendable Tests", {
  testExtendable : function(t){
    delete some_namespace;
    Utils.namespace("some_namespace", Utils.Extendable);
    t.assert(typeof(some_namespace.extend) == "function", "Extend not a function: " + some_namespace.extend);
  },
  
  testExtendableExtends : function(t){
    delete some_namespace;
    Utils.namespace("some_namespace", Utils.Extendable);
    some_namespace.extend({a : "test"});
    assertObjectEquals(t, {a: "test"}, some_namespace);
  }
});

new TestSuite("Namespaceable Tests", {
  testNamespaceable : function(t){
    delete some_namespace;
    Utils.namespace("some_namespace", Utils.Namespaceable);
    t.assert(typeof(some_namespace.namespace) == "function", "namespace not a function: " + some_namespace.namespace);
  },
  
  testNamespaceableNamespaces : function(t){
    delete some_namespace;
    Utils.namespace("some_namespace", Utils.Namespaceable);
    some_namespace.namespace("subspace");
    assertObjectEquals(t, {subspace : {}}, some_namespace);
  }
});


new TestSuite("Revertable Tests", {
  testRevertable : function(t){
    delete some_namespace;
    Utils.namespace("some_namespace", Utils.Revertable);
    t.assert(typeof(some_namespace.revertNamespace) == "function", "revertNamespace not a function: " + some_namespace.namespace);
  },
  
  testNamespaceableNamespaces : function(t){
    some_namespace = {keepMe : "keepMe"};
    var _some_namespace = some_namespace;
    Utils.replaceNamespace("some_namespace", Utils.Revertable);
    some_namespace.revertNamespace();
    t.assert(_some_namespace === some_namespace, "Namespace not reverted");
  }
});
