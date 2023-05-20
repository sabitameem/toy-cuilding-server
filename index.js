const express =require('express');
const cors = require('cors');
require('dotenv').config()
const app= express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sgocvky.mongodb.net/?retryWrites=true&w=majority`;

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
    //await client.connect();

   const addAToyCollections = client.db('addAtoyDB').collection('addAToy');
   




    // app.get('/addAToy', async(req,res)=>{
    //     const cursor =addAToyCollections.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })

    // //to get the data of toys
    // // ...

    // app.get('/addAToy', async (req, res) => {
    //     console.log(req.query.email);
    //     let query = {};
    //     if (req.query?.email) {
    //         query = { email: req.query.email }
    //     }
    //     const result = await addAToyCollections.find(query).toArray();
    //     res.send(result);
    // })
  
    
    // app.get('/addAToy', async (req, res) => {
    //     const cursor = addAToyCollections.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    //   });

    //   app.get('/addAToy', async (req, res) => {
    //     console.log(req.query.email);
    //     let query = {};
    //     if (req.query?.email) {
    //       query = { email: req.query.email };
    //     }
    //     const result = await addAToyCollections.find(query).toArray();
    //     res.send(result);
    //   });

//..........................

    app.get('/addAToy', async (req, res) => {
        const cursor = addAToyCollections.find();
        const result = await cursor.toArray();
        res.send(result);
      });
   

      app.get('/addAToy/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const toyData = await addAToyCollections.findOne(query);
        res.send(toyData);
      });
      

    //didn't work properly
    app.get('/addAToy', async(req,res)=>{
        console.log(req.query);
        // let query={};
        // if(req.query?.sellerEmail){
        //     query={sellerEmail: req.query.sellerEmail}
        // }
        const result = await addAToyCollections.find().toArray()
        res.send(result);
    })
    
   
    


  
    

  app.post('/addAToy', async (req, res) => {
    const allToys = req.body;
  
    try {
      await addAToyCollections.insertOne(allToys);
      res.status(201).json({ message: 'Toy added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding toy' });
    }
  });


 
  
  // ......................................................
  






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('hello from toy building server')
})

app.listen(port,()=>{
    console.log(`running on port ${port}`)
})