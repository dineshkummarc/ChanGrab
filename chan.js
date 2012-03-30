var fs      = require('fs');
var url     = require('url');
var http    = require('http');
var exec    = require('child_process').exec;
var spawn   = require('child_process').spawn;
var $       = require('jquery');

module.exports = {

    storage_folder: './downloads',

    loadPage: function( html_url ){

        console.log("Loading " + html_url + "...");
        this.makeFolder( this.storage_folder );

    },

    downloadImage: function( img_url ){

        // Download de fichier par : http://www.hacksparrow.com/using-node-js-to-download-files.html

        var options = {
            host: url.parse( img_url ).host,
            port: 80,
            path: url.parse( img_url ).pathname
        };

        var file_name = url.parse( img_url ).pathname.split( '/' ).pop();
        var file = fs.createWriteStream( this.storage_folder + file_name );

        http.get( options, function( res ){

            res.on('data', function( data ){

                file.write( data );

            }).on('end', function(){

                file.end();
                console.log( file_name + ' downloaded to ' + this.storage_folder );

            });

        });

    },

    makeFolder: function( path ){

        var mkdir = 'mkdir -p ' + path;
        var child = exec(mkdir, function(err, stdout, stderr) {});

    }

}
