var fs = require('fs');
var path = require('path');
var urlp = require('url');
var http = require('http');

imageManager = function (){
  this._dir = null;
  this._files = null;

  this.setDir = function(directory){
    this._dir = directory;
  }

  this.getDir = function(){
    return this._dir;
  }
  this.createDir=function(es){
    if(!fs.existsSync(this._dir + '/' +(es.mtime.getYear()+1900).toString())){
      console.log('directory created');
      fs.mkdirSync(this._dir + '/' +(es.mtime.getYear()+1900).toString())
    }else{
      console.log('directory not created');
      //console.log(es);
    }
  }

}
//change the way it renames the images
testImageManager = function(dir){
  var count = 0;
  im = new imageManager();
  //console.log(dir);
  if(typeof(dir) !== 'undefined'){
    im.setDir(dir);
    fs.readdir(im.getDir(),function(err,files){
      if(!err){
        files.forEach(function(e){
          console.log(e);
          fs.stat(im.getDir() + '/' + e, function(err,es){
            if(!err){
            im.createDir(es);
            if(es.isDirectory()){
              console.log('directory detected');
            }else{
              fs.rename(im.getDir() + '/'+e, im.getDir() +'/'+(es.mtime.getYear()+1900).toString() + '/' + es.mtime.toString() + '_'+Math.floor(Math.random()*(1000000-1))+1 + path.extname(e),function(err){
                if(err){
                  console.log(err);
                }else{
                  console.log('name  changed');
                }
              });
              count++
            }
          }else{
            console.log(e);
          }
          })//end stat
        })//end forEach
      }else{
        console.log(err);
      }
    })//end readdir

  }else{
    console.log('undefined path type');
  }
}


function routeRequests(req, res){
  //console.log("req.url: " + req.url);
  var urlObj = urlp.parse(req.url, true);

  // TODO

      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream('view/index.html').pipe(res);
      //console.log("---------");
      //console.log(path.parse(urlObj.query));
      //console.log(path.parse(urlObj.query.URL).dir + "/test1_1.html");
      //request.get(urlObj.query.URL).pipe(fs.createWriteStream('page.txt'));
      //console.log("---------");
      console.log(typeof(urlObj.query.URL));
      /*if (req.url != '/'){
        try {

          startCrawling(req,res, urlObj.query );
        } catch (e) {

        } finally {

        }

      }*/

      testImageManager(urlObj.query.URL);

      //res.end();

}
http.createServer(routeRequests).listen(8081);

//testImageManager();
