var chan = require('./chan');

process.argv.forEach(function (val, index, array) {

    if ( index > 1 )
    {
        chan.loadPage( val );
    }

});
