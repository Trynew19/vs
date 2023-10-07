var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir("./files",  {withFileTypes:true}, (err,data)=>{
    res.render('index', {data});
  })
});
//edit karne wala route
router.post('/change/:oldname', function(req, res, next) {
 fs.rename(`./files/${req.params.oldname}`, `./files/${req.body.filename}`,(err)=>{
  console.log(err)
  res.redirect("/")
 })
});

//delete route for file 
router.get('/files/delete/:filename', function(req, res, next) {
  fs.unlink(`./files/${req.params.filename}`, (err)=>{
    res.redirect("/")
  });
});
//delete route for folder
router.get('/folder/delete/:foldername', function(req, res, next) {
  fs.rmdir(`./files/${req.params.foldername}`, (err)=>{
    res.redirect("/")
  });
});



//files ya folder kholne ke liye
router.get("/files/:filename", (req, res, next)=> {
  fs.readdir("./files",{withFileTypes:true},(err,data)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf8",(err,dataa)=>{
      res.render("showfile", {data,filename:req.params.filename,dataa });
      console.log(dataa)

    });    
});   
});



//folder route
router.get("/folderCreate",(req,res,next)=>{
  fs.mkdir(`./files/${req.query.foldername}`,(err)=>{
    if(err)throw err;
    res.redirect("/");
  });
  });

  //file route
router.get("/fileCreate",(req,res,next)=>{
fs.writeFile(`./files/${req.query.filename}`,"",(err)=>{
  if(err)throw err;
  res.redirect("/");
});
});






module.exports = router;
