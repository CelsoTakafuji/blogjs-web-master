var express = require('express');
var fs = require('fs');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'static/uploads');
  },
  filename: function(req, file, cb){
    //var ext = file.originalname.substr(file.originalname.lastIndexOf('.')+1);
    //cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

router.post('/uploadAvatar', upload.single('file'), function (req, res) {
  return res.sendStatus(200);
});

/* (MÉTODO ANTIGO)
router.put('/removerAvatar/:avatar', function (req, res) {
  var avatar = req.params.avatar;

  //fs.unlink('/mnt/c/Users/Celso/Desktop/blogjs-web-master/static/uploads/'+avatar);
  fs.unlink('./static/uploads/'+avatar, (err) => {
        if (err) {
            return function(resultado){
                res.sendStatus(400).json(resultado);
            }
        } else {
            return function(resultado){
                res.sendStatus(200).json(resultado);
            }
        }
  });
});
*/

router.put('/removerAvatar', function (req, res) {
  var usuario = req.body;

  fs.unlink('./static/'+usuario.avatarOriginal, (err) => {
        if (err) {
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
  });
});

module.exports = router;
