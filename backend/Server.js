const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const multer = require('multer');
const path = require('path');
//importing Routes
const authRoute = require('./Routes/Auth');
const projectRoute = require('./Routes/Project')
//constants
const PORT = process.env.PORT || 8000;
const app = express();
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('from middleware ');
        cb(null,path.join(__dirname+'/Files'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/x-zip-compressed'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

dotEnv.config();
//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/Files', express.static(path.join(__dirname, 'Files')));
app.use(multer({ storage: Storage,fileFilter:fileFilter }).single('Zip_file'));


mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(res => {
        console.log('Connected to DB');
    }).catch(err => {
        console.log(err);
    })  

app.use('/projects',projectRoute)
app.use('/auth', authRoute)

app.listen(PORT, () => {
    console.log(`SERVER STARTED @ HTTP://127.0.0.1:${PORT}/`);
});