/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

        if ( typeof module === "object" && typeof module.exports === "object" ) {
                // For CommonJS and CommonJS-like environments where a proper `window`
                // is present, execute the factory and get jQuery.
                // For environments that do not have a `window` with a `document`
                // (such as Node.js), expose a factory as module.exports.
                // This accentuates the need for the creation of a real `window`.
                // e.g. var jQuery = require("jquery")(window);
                // See ticket #14549 for more info.
                module.exports = global.document ?
                        factory( global, true ) :
                        function( w ) {
                                if ( !w.document ) {
                                        throw new Error( "jQuery requires a window with a document" );
                                }
                                return factory( w );
                        };
        } else {
                factory( global );
        }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
        // Use the correct document accordingly with window argument (sandbox)
        document = window.document,

        version = "2.1.3",

        // Define a local copy of jQuery
        jQuery = function( selector, context ) {
                // The jQuery object is actually just the init constructor 'enhanced'
                // Need init if jQuery is called (just allow error to be thrown if not included)
                return new jQuery.fn.init( selector, context );
        },

        // Support: Android<4.1
        // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function( all, letter ) {
                return letter.toUpperCase();
        };

jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // Start with an empty selector
        selector: "",

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function() {
                return slice.call( this );
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function( num ) {
                return num != null ?

                        // Return just the one element from the set
                        ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

                        // Return all the elements in a clean array
                        slice.call( this );
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function( elems ) {

                // Build a new jQuery matched element set
                var ret = jQuery.merge( this.constructor(), elems );

                // Add the old object onto the stack (as a reference)
                ret.prevObject = this;
                ret.context = this.context;

                // Return the newly-formed element set
                return ret;
        },

        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function( callback, args ) {
                return jQuery.each( this, callback, args );
        },

        map: function( callback ) {
                return this.pushStack( jQuery.map(this, function( elem, i ) {
                        return callback.call( elem, i, elem );
                }));
        },

        slice: function() {
                return this.pushStack( slice.apply( this, arguments ) );
        },

        first: function() {
                return this.eq( 0 );
        },

        last: function() {
                return this.eq( -1 );
        },

        eq: function( i ) {
                var len = this.length,
                        j = +i + ( i < 0 ? len : 0 );
                return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
        },

        end: function() {
                return this.prevObject || this.constructor(null);
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: arr.sort,
        splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
                deep = target;

                // Skip the boolean and the target
                target = arguments[ i ] || {};
                i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
                target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
                target = this;
                i--;
        }

        for ( ; i < length; i++ ) {
                // Only deal with non-null/undefined values
                if ( (options = arguments[ i ]) != null ) {
                        // Extend the base object
                        for ( name in options ) {
                                src = target[ name ];
                                copy = options[ name ];

                                // Prevent never-ending loop
                                if ( target === copy ) {
                                        continue;
                                }

                                // Recurse if we're merging plain objects or arrays
                                if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                                        if ( copyIsArray ) {
                                                copyIsArray = false;
                                                clone = src && jQuery.isArray(src) ? src : [];

                                        } else {
                                                clone = src && jQuery.isPlainObject(src) ? src : {};
                                        }

                                        // Never move original objects, clone them
                                        target[ name ] = jQuery.extend( deep, clone, copy );

                                // Don't bring in undefined values
                                } else if ( copy !== undefined ) {
                                        target[ name ] = copy;
                                }
                        }
                }
        }

        // Return the modified object
        return target;
};

jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function( msg ) {
                throw new Error( msg );
        },

        noop: function() {},

        isFunction: function( obj ) {
                return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray,

        isWindow: function( obj ) {
                return obj != null && obj === obj.window;
        },

        isNumeric: function( obj ) {
                // parseFloat NaNs numeric-cast false positives (null|true|false|"")
                // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                // subtraction forces infinities to NaN
                // adding 1 corrects loss of precision from parseFloat (#15100)
                return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
        },

        isPlainObject: function( obj ) {
                // Not plain objects:
                // - Any object or value whose internal [[Class]] property is not "[object Object]"
                // - DOM nodes
                // - window
                if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
                        return false;
                }

                if ( obj.constructor &&
                                !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
                        return false;
                }

                // If the function hasn't returned already, we're confident that
                // |obj| is a plain object, created by {} or constructed with new Object
                return true;
        },

        isEmptyObject: function( obj ) {
                var name;
                for ( name in obj ) {
                        return false;
                }
                return true;
        },

        type: function( obj ) {
                if ( obj == null ) {
                        return obj + "";
                }
                // Support: Android<4.0, iOS<6 (functionish RegExp)
                return typeof obj === "object" || typeof obj === "function" ?
                        class2type[ toString.call(obj) ] || "object" :
                        typeof obj;
        },

        // Evaluates a script in a global context
        globalEval: function( code ) {
                var script,
                        indirect = eval;

                code = jQuery.trim( code );

                if ( code ) {
                        // If the code includes a valid, prologue position
                        // strict mode pragma, execute code by injecting a
                        // script tag into the document.
                        if ( code.indexOf("use strict") === 1 ) {
                                script = document.createElement("script");
                                script.text = code;
                                document.head.appendChild( script ).parentNode.removeChild( script );
                        } else {
                        // Otherwise, avoid the DOM node creation, insertion
                        // and removal by using an indirect global eval
                                indirect( code );
                        }
                }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Support: IE9-11+
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function( string ) {
                return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
        },

        nodeName: function( elem, name ) {
                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // args is for internal usage only
        each: function( obj, callback, args ) {
                var value,
                        i = 0,
                        length = obj.length,
                        isArray = isArraylike( obj );

                if ( args ) {
                        if ( isArray ) {
                                for ( ; i < length; i++ ) {
                                        value = callback.apply( obj[ i ], args );

                                        if ( value === false ) {
                                                break;
                                        }
                                }
                        } else {
                                for ( i in obj ) {
                                        value = callback.apply( obj[ i ], args );

                                        if ( value === false ) {
                                                break;
                                        }
                                }
                        }

                // A special, fast, case for the most common use of each
                } else {
                        if ( isArray ) {
                                for ( ; i < length; i++ ) {
                                        value = callback.call( obj[ i ], i, obj[ i ] );

                                        if ( value === false ) {
                                                break;
                                        }
                                }
                        } else {
                                for ( i in obj ) {
                                        value = callback.call( obj[ i ], i, obj[ i ] );

                                        if ( value === false ) {
                                                break;
                                        }
                                }
                        }
                }

                return obj;
        },

        // Support: Android<4.1
        trim: function( text ) {
                return text == null ?
                        "" :
                        ( text + "" ).replace( rtrim, "" );
        },

        // results is for internal usage only
        makeArray: function( arr, results ) {
                var ret = results || [];

                if ( arr != null ) {
                        if ( isArraylike( Object(arr) ) ) {
                                jQuery.merge( ret,
                                        typeof arr === "string" ?
                                        [ arr ] : arr
                                );
                        } else {
                                push.call( ret, arr );
                        }
                }

                return ret;
        },

        inArray: function( elem, arr, i ) {
                return arr == null ? -1 : indexOf.call( arr, elem, i );
        },

        merge: function( first, second ) {
                var len = +second.length,
                        j = 0,
                        i = first.length;

                for ( ; j < len; j++ ) {
                        first[ i++ ] = second[ j ];
                }

                first.length = i;

                return first;
        },

        grep: function( elems, callback, invert ) {
                var callbackInverse,
                        matches = [],
                        i = 0,
                        length = elems.length,
                        callbackExpect = !invert;

                // Go through the array, only saving the items
                // that pass the validator function
                for ( ; i < length; i++ ) {
                        callbackInverse = !callback( elems[ i ], i );
                        if ( callbackInverse !== callbackExpect ) {
                                matches.push( elems[ i ] );
                        }
                }

                return matches;
        },

        // arg is for internal usage only
        map: function( elems, callback, arg ) {
                var value,
                        i = 0,
                        length = elems.length,
                        isArray = isArraylike( elems ),
                        ret = [];

                // Go through the array, translating each of the items to their new values
                if ( isArray ) {
                        for ( ; i < length; i++ ) {
                                value = callback( elems[ i ], i, arg );

                                if ( value != null ) {
                                        ret.push( value );
                                }
                        }

                // Go through every key on the object,
                } else {
                        for ( i in elems ) {
                                value = callback( elems[ i ], i, arg );

                                if ( value != null ) {
                                        ret.push( value );
                                }
                        }
                }

                // Flatten any nested arrays
                return concat.apply( [], ret );
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function( fn, context ) {
                var tmp, args, proxy;

                if ( typeof context === "string" ) {
                        tmp = fn[ context ];
                        context = fn;
                        fn = tmp;
                }

                // Quick check to determine if target is callable, in the spec
                // this throws a TypeError, but we will just return undefined.
                if ( !jQuery.isFunction( fn ) ) {
                        return undefined;
                }

                // Simulated bind
                args = slice.call( arguments, 2 );
                proxy = function() {
                        return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
                };

                // Set the guid of unique handler to the same of original handler, so it can be removed
                proxy.guid = fn.guid = fn.guid || jQuery.guid++;

                return proxy;
        },

        now: Date.now,

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
        var length = obj.length,
                type = jQuery.type( obj );

        if ( type === "function" || jQuery.isWindow( obj ) ) {
                return false;
        }

        if ( obj.nodeType === 1 && length ) {
                return true;
        }

        return type === "array" || length === 0 ||
                typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,

        // Local document vars
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,

        // Instance-specific data
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function( a, b ) {
                if ( a === b ) {
                        hasDuplicate = true;
                }
                return 0;
        },

        // General-purpose constants
        MAX_NEGATIVE = 1 << 31,

        // Instance methods
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        // Use a stripped-down indexOf as it's faster than native
        // http://jsperf.com/thor-indexof-vs-for/5
        indexOf = function( list, elem ) {
                var i = 0,
                        len = list.length;
                for ( ; i < len; i++ ) {
                        if ( list[i] === elem ) {
                                return i;
                        }
                }
                return -1;
        },

        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

        // Regular expressions

        // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
        whitespace = "[\\x20\\t\\r\\n\\f]",
        // http://www.w3.org/TR/css3-syntax/#characters
        characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

        // Loosely modeled on CSS identifier characters
        // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
        // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
        identifier = characterEncoding.replace( "w", "w#" ),

        // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
        attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
                // Operator (capture 2)
                "*([*^$|!~]?=)" + whitespace +
                // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                "*\\]",

        pseudos = ":(" + characterEncoding + ")(?:\\((" +
                // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                // 1. quoted (capture 3; capture 4 or capture 5)
                "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                // 2. simple (capture 6)
                "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                // 3. anything else (capture 2)
                ".*" +
                ")\\)|)",

        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
        rwhitespace = new RegExp( whitespace + "+", "g" ),
        rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

        rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
        rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

        rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

        rpseudo = new RegExp( pseudos ),
        ridentifier = new RegExp( "^" + identifier + "$" ),

        matchExpr = {
                "ID": new RegExp( "^#(" + characterEncoding + ")" ),
                "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
                "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
                "ATTR": new RegExp( "^" + attributes ),
                "PSEUDO": new RegExp( "^" + pseudos ),
                "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
                "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
                // For use in libraries implementing .is()
                // We use this for POS matching in `select`
                "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
        },

        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,

        rnative = /^[^{]+\{\s*\[native \w/,

        // Easily-parseable/retrievable ID or TAG or CLASS selectors
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

        rsibling = /[+~]/,
        rescape = /'|\\/g,

        // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
        runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
        funescape = function( _, escaped, escapedWhitespace ) {
                var high = "0x" + escaped - 0x10000;
                // NaN means non-codepoint
                // Support: Firefox<24
                // Workaround erroneous numeric interpretation of +"0x"
                return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                                // BMP codepoint
                                String.fromCharCode( high + 0x10000 ) :
                                // Supplemental Plane codepoint (surrogate pair)
                                String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
        },

        // Used for iframes
        // See setDocument()
        // Removing the function wrapper causes a "Permission Denied"
        // error in IE
        unloadHandler = function() {
                setDocument();
        };

// Optimize for push.apply( _, NodeList )
try {
        push.apply(
                (arr = slice.call( preferredDoc.childNodes )),
                preferredDoc.childNodes
        );
        // Support: Android<4.0
        // Detect silently failing push.apply
        arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
        push = { apply: arr.length ?

                // Leverage slice if possible
                function( target, els ) {
                        push_native.apply( target, slice.call(els) );
                } :

                // Support: IE<9
                // Otherwise append directly
                function( target, els ) {
                        var j = target.length,
                                i = 0;
                        // Can't trust NodeList.length
                        while ( (target[j++] = els[i++]) ) {}
                        target.length = j - 1;
                }
        };
}

function Sizzle( selector, context, results, seed ) {
        var match, elem, m, nodeType,
                // QSA vars
                i, groups, old, nid, newContext, newSelector;

        if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
                setDocument( context );
        }

        context = context || document;
        results = results || [];
        nodeType = context.nodeType;

        if ( typeof selector !== "string" || !selector ||
                nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

                return results;
        }

        if ( !seed && documentIsHTML ) {

                // Try to shortcut find operations when possible (e.g., not under DocumentFragment)
                if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
                        // Speed-up: Sizzle("#ID")
                        if ( (m = match[1]) ) {
                                if ( nodeType === 9 ) {
                                        elem = context.getElementById( m );
                                        // Check parentNode to catch when Blackberry 4.6 returns
                                        // nodes that are no longer in the document (jQuery #6963)
                                        if ( elem && elem.parentNode ) {
                                                // Handle the case where IE, Opera, and Webkit return items
                                                // by name instead of ID
                                                if ( elem.id === m ) {
                                                        results.push( elem );
                                                        return results;
                                                }
                                        } else {
                                                return results;
                                        }
                                } else {
                                        // Context is not a document
                                        if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                                                contains( context, elem ) && elem.id === m ) {
                                                results.push( elem );
                                                return results;
                                        }
                                }

                        // Speed-up: Sizzle("TAG")
                        } else if ( match[2] ) {
                                push.apply( results, context.getElementsByTagName( selector ) );
                                return results;

                        // Speed-up: Sizzle(".CLASS")
                        } else if ( (m = match[3]) && support.getElementsByClassName ) {
                                push.apply( results, context.getElementsByClassName( m ) );
                                return results;
                        }
                }

                // QSA path
                if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
         