const express = require('express');
const app = express();
const port = 3001;

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
      const service = {
        "name": "Replace Tire",
        "price": 2000,
        "details": "lorem ipsum bja shiman fyu uas eefh jned djbw hdb hbdej djw 2owo.",
        "time": 2,
        "img": "https://i.ibb.co/44FQRHQ/img-1.jpg"
      }

      const result = await servicesCollection.insertOne(service);

      // console.log('Got New Service', newService);
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