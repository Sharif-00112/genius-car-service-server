const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors');

//middlewares
app.use(cors());
app.use(express.json());

//user: prodManagement1
//pass: jJg4x3Ns8wCk6HCN

const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aruppvu.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// CRUD Operation
async function run() {
  try {
    const database = client.db("carServiceDB");
    const carsCollection = database.collection("cars");
    const servicesCollection = database.collection("services");

    //POST API
    app.post('/services', async(req, res) =>{
      //getting data from frontend
      const service = req.body;

      //checking axios post
      console.log('hit the post api', service);

      //sending data to database
      const result = await servicesCollection.insertOne(service);

      console.log('Added New Service', result);
      res.json(result);
    });
   

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hellooooow World!');
}); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});