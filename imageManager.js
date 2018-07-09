var fs = require('fs');

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
testImageManager = function(){
  var count = 0;
  im = new imageManager();
  im.setDir('./0.jpg/2014');
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
            fs.rename(im.getDir() + '/'+e, im.getDir() +'/'+(es.mtime.getYear()+1900).toString() + '/' + es.mtime.toString() + '_'+Math.floor(Math.random()*(1000000-1))+1 + '.jpg',function(err){
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
}

testImageManager();
