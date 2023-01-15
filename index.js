require('dotenv').config()
const connectToMongo = require('./db')
const express = require('express')

const cors = require('cors')
connectToMongo();
const path = require('path');
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
//API.s
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

 app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

