const express = require('express');
const multer = require('multer');
// EJS -> Embedded JavaScript
const ejs = require('ejs');
// path -> Core Node module (did not have to install)
const path = require('path');

// Set Storage Enginer
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize Upload
const upload = multer({
  // Storage from const storage above
  storage: storage,
  // Limit file size to 1MB
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
  // Single for single file
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Initialize app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
  // res.send('test); -> Sends text to the browser
  upload(req, res, (err) => {
    if(err) {
      res.render('index', {
        msg: err
      });
    } else {
      // console.log(req.file);
      // res.send('test');
      if(req.file == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
    } else {
      res.render('index', {
        msg: 'File Uploaded!',
        file: `uploads/${req.file.filename}`
      });
      }
    }
  });
});

const port = 3004;

app.listen(port, () => console.log(`Server up on port ${port}`));
