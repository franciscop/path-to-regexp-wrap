/**
 * Path to regexp lib wrapper
 * @author Andrew Teologov <teologov.and@gmail.com>
 * @date 16.04.14
 * TODO AT: tests
 */
var path = require( 'path-to-regexp' );

/**
 * Routes lib
 * @type {exports}
 */
exports = module.exports = function( options ) {
    options.sensitive = options.sensitive || false;
    options.strict = options.strict || false;
    options.end = options.end || false;
    
    /**
     * String decoder
     * @param {String} str
     * @returns {*}
     */
    function decodeUri( str ) {
        try {
            str = decodeURIComponent( str );
        } catch( e ) {
            throw new Error( 'Cannot decodeURIComponent: ' + str );
        }
        return str;
    }
    
    return function( route ) {
        var keys = [],
        reg = path.apply( this, [ route, keys, options ]);
        
        return function( route, params ) {
            var res = reg.exec( route ),
            params = ( params instanceof Object ) ? params : {};
            
            if ( !res )
                return false;
            
            for ( var i = 0, l = res.length; i < l; i++ ) {
                if ( res[ i ] === undefined )
                    continue;
                params[ keys[ i ].name ] = decodeUri( res[ i ]);
            }
            
            return params;
        }
    }
};