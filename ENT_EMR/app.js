const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const { pocketVariables } = require('./helpers/pocketVars');

const mongoose = require('mongoose');
const mongodb = require('mongodb');
const isAuth = require('./middleware/is-auth');
const path = require('path');

const multer  = require('multer')
const upload = multer({ dest: './uploads/' })

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

// mongoose.connect('mongodb://localhost:27017/ent_emr_dev',{useNewUrlParser: true, useUnifiedTopology: true})
// mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect("mongodb+srv://ent_emr_admin:0tolaryngologY@cluster0-5iwfn.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("DB connected. App is listening...");
    app.listen(8080);
    // app.listen(10000);
  })
  .catch(err => {
    console.log(err);
});

app.use(
  // express.static(path.join(__dirname, "client/build"))
  express.static(path.join(__dirname, "./frontend/build"))
);
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
