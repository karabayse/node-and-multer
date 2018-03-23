const express = require('express');
const multer = require('multer');
// ejs -> embedded javascript
const ejs = require('ejs');
// path -> core node module (did not have to install)
const path = require('path');

// Init app
const app = express();
const port = 3004;

app.listen(port, () => console.log(`Server up on port ${port}`));
