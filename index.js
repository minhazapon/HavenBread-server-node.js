const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json());


console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)


app.get('/', (req, res) => {
  res.send('HavenBread Server')
})


//mongoDB//
///------------------------------


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
     

    //CRUD//
         
       const database = client.db('usersDB')
       const userCollection = database.collection('users');

     //create// 
       
     app.post('/users', async(req, res) => {

        const users = req.body 
        console.log(users)
        const result = await userCollection.insertOne(users) 
        console.log(result)

     
    }) 
    //create//

    //read//
      

    app.get('/users', async(req, res) => {

        const cursor = userCollection.find()
        const result = await cursor.toArray();
        res.send(result)
   
    }) 

    //read//


    //delete//

    app.delete('/users/:id', async(req, res) => {

      const id = req.params.id 
      const query = { _id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query)
      res.send(result)
 
    }) 


    //delete//


    //update//

    app.get('/users/:id', async(req, res) => {

      const id = req.params.id 
      const query = { _id: new ObjectId(id)}
      const result = await userCollection.findOne(query)
      res.send(result)
 
    }) 

    app.put('/users/:id', async(req, res) => {

      const id = req.params.id 
      const upDateUsers = req.body 
      console.log(id, upDateUsers)
      const filter = { _id: new  ObjectId(id)}
      const option = {upsert: true}
      const upSer = {
         $set: {

             name: upDateUsers.name,
             Chef: upDateUsers.Chef,
             Supplier: upDateUsers.Supplier,
             PhotoUrl: upDateUsers.PhotoUrl,
             Taste: upDateUsers.Taste,
             Category: upDateUsers.Category,
             Details: upDateUsers.Details

         }
      }

      const result = await userCollection.updateOne(filter, upSer, option)
      res.send(result)
 
    }) 
    



    //update//



    //CRUD//


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


//mongoDB//
///------------------------------

app.listen(port, () => {
  console.log(`HavenBread Server port >>>> ${port}`)
})