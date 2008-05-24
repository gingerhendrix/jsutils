#README

JSUtils is a lightweight javascript library, built to encourage modular code
design.

* [Download][7] - [latest][8] | [0.1.1][9] 
* [Source @ GitHub][10]

[7]: http://projects.linode.gandrew.com/jsUtils/dist/

[8]: http://projects.linode.gandrew.com/jsUtils/dist/jsUtils.js

[9]: http://projects.linode.gandrew.com/jsUtils/dist/jsUtils-0.1.1.js

[10]: http://github.com/gingerhendrix/jsutils

## API Reference

### Utils.namespace

`<Object namespace> Utils.namespace(<String namespace> [,  extensions ])`

`namespace` creates a new global namespace object.  It takes a namespace
argument which is a dot separated string containing the name of the namespace
to be created eg. `Utils.namespace("some.name.space")`.  If the named global
object or any of the objects in the chain are not defined, it will create an
empty object with that name i.e. if no objects are defined the above code is
equivalent to `var some = {}; some.name = {}; some.name.space = {};`

Any additional arguments are passed to `extend` which is called with the
namespace object as the source.

    Utils.namespace("some.name.space", function(){ 
        // Private scope 
        return {
          someFunction : function(){ /* ... */ } 
        };
    });

### Utils.extend

`<Object source> Utils.extend(<Object source>, extension [,  extensions ])`

`extend` takes a source argument which is the object to be extended, and at
least one extension argument.  If the extension argument is an `Object` then
the properties of the extension are copied to the source argument.  If the
extension argument is a `Function` then the the function is called and the
source is extended with the return value of the function.  If the extension
argument is an `Array` or there are more than one extension arguments, the
source is extended with each of the elements in the array.

    Utils.extend(someObject, function(){ 
        // ... 
        return { 
          someFunction :  function(){ /* ... */ } 
        };
    });

### Utils.replaceNamespace

`<Object namespace> Utils.replaceNamespace(<String namespace> [,  extensions])`

`replaceNamespace` is a destructive version of `namespace`. `replaceNamespace`
will replace the namespace object (but not it's predecessors in the chain) if
it is already defined. `replaceNamespace` also records the original value of
the namespace object, so that it can be recovered with `revertNamespace`.

    Utils.replaceNamespace("SomeNamespace")

### Utils.revertNamespace

`<Object namespace> Utils.revertNamespace(<String namespace>)`

`revertNamespace` allows the namespace to be renamed in case of conflict.
This method only works if the namespace was initially created with
`replaceNamespace`.

    var NewNamespace = Utils.revertNamespace("SomeNamespace")

### Utils.Extendable

`<Extendable>.extend(extension [, extensions])`

`Extendable` is a mixin object which adds extend abilities to any object.

    Utils.extend(someObject, Utils.Extendable);
    someObject.extend({ someFunc : function(){} } );

### Utils.Namespaceable

`<Namespaceable>.namespace(name [, extensions])`

`Namespaceable` is a mixin object which adds namespace abilities to any
object. 

    Utils.namespace("SomeNamespace", Utils.Namespaceable);
    SomeNamespace.namespace("Utils");
    // SomeNamespace.Utils.someFunc = ...

### Utils.Revertable

`<Revertable>.revertNamespace()`

`Revertable` is a mixin object which adds `revertNamespace` to a namespace
object created with `replaceNamespace`.

    Utils.replaceNamespace("SomeNamespace", Utils.Revertable)
    var NewNamespace = SomeNamespace.revertNamespace()

