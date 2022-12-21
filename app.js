const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();
const indexRouter = require('./src/index');
const adminRouter = require('./src/admin');
const apiResponse = require('./src/helpers/apiResponse');
const fileRouter = require('./src/fileroute'); 
const cors = require('cors');
const bodyParser = require('body-parser')
const handlebars =require('express-handlebars').engine
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/temp/my')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
// DB connection
const MONGODB_URL = process.env.MONGODB_URL;
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true,dbName:'fundapp'})
    .then(() => {
      // don't show the log when it is test
      if (process.env.NODE_ENV !== 'test') {
        console.log('Connected to %s', MONGODB_URL);
        console.log('App is running ... \n');
        console.log('Press CTRL + C to stop the process. \n');
      }
    })
    .catch((err) => {
      console.error('App starting error:', err.message);
      process.exit(1);
    });
// var db = mongoose.connection;

const app = express();
  // 

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',handlebars({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}));

// app.use(upload.array());
app.use(express.static(path.join(__dirname, 'public')));

// To allow cross-origin requests
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Route Prefixes
app.use('/', indexRouter);
app.use('/api/',indexRouter);

app.use('/temp/',fileRouter)
app.use('/admin/campaign/:id/temp/',fileRouter)
app.use('/admin/campaign/temp/',fileRouter)
app.use('/admin/', adminRouter);
app.get('/ping/', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// throw 404 if URL not found

app.all('*', function(req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found');
});

app.use((err, req, res) => {
  if (err.name == 'UnauthorizedError') {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

module.exports = app;
