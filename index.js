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

// Check Connection
async function run() {
  try {
    const database = client.db("carServiceDB");
    const carsCollection = database.collection("cars");
    // create a document to insert
    const car1 = {
      title: "Toyota",
      content: "Allion",
    }
    const result = await carsCollection.insertOne(car1);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
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