var fs      = require('fs');
var url     = require('url');
var http    = require('http');
var exec    = require('child_process').exec;
var spawn   = require('child_process').spawn;
var $       = require('jquery');

// This rule is for 4chan
dom_elements = 'form a[target="_blank"] img';
chan = null;
storage_folder = './downloads';

module.exports = {

    loadPage: function( html_url ){

        chan = this;

        console.log("Loading " + html_url + "...");
        this.makeFolder( storage_folder );

        var html = '';

        var options = {

            host: url.parse( html_url ).host,
            port: 80,
            path: url.parse( html_url ).pathname

        }

        // Load and read file
        http.get(options, function(res){

            res.on('data', function(data){

                html += data;

            }).on('end', function(){

                // search for elements to download
                $(html).find(dom_elements).each(function(){

                    chan.downloadImage( $(this).parent().attr('href') );

                });

            });

        });

    },

    downloadImage: function( img_url ){

        // Download de fichier par :
        // http://www.hacksparrow.com/using-node-js-to-download-files.html

        img_url = 'http:' + img_url;

        var options = {
            host: url.parse( img_url ).host,
            port: 80,
            path: url.parse( img_url ).pathname
        };

        var file_name = url.parse( img_url ).pathname.split( '/' ).pop();
        var file = fs.createWriteStream( storage_folder + '/' + file_name );

        http.get( options, function( res ){

            res.on('data', function( data ){

                file.write( data );

            }).on('end', function(){

                file.end();

            });

        });

    },

    makeFolder: function( path ){

        var mkdir = 'mkdir -p ' + path;
        var child = exec(mkdir, function(err, stdout, stderr) {});

    }

}
