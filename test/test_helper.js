function assertObjectEquals(t, var1, var2, msg) {
    var type;
    var msg = msg || '';
    var isSame = (var1 === var2);
    //shortpath for references to same object
    var isEqualType = ( (type = typeof(var1)) == typeof(var2) );
    if (isEqualType && !isSame) {
        var isEqual = false;
        switch (type) {
            case 'String':
            case 'Number':
                isEqual = (var1 == var2);
                break;
            case 'Boolean':
            case 'Date':
                isEqual = (var1 === var2);
                break;
            case 'RegExp':
            case 'Function':
                isEqual = (var1.toString() === var2.toString());
                break;
            default: //Object | Array
                var i;
                if (isEqual = (var1.length === var2.length))
                    for (i in var1)
                        assertObjectEquals(t, var1[i], var2[i], msg + ' found nested ' + type + '@' + i + '\n');
        }
        t.assert(isEqual, 'Expected ' + var1 + ' but was ' + var2);
    }else{
      t.assert(isEqualType, msg + " Expected " + typeof(var1) + " but was " + typeof(var2));
    }
}
