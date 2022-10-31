const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// user: dbUser2
// password: G7yuqRqYddhxXaSj


const uri = "mongodb+srv://dbUser2:G7yuqRqYddhxXaSj@cluster0.mpr3cem.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('nodeMongoCrud').collection('users');

        // Read data from CRUD operation [CRUD, > Find Multiple Document, operation mongoDB website > Multiple user]
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        //  03.Update data from CRUD operation > Find a Document [from mongodb website]
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        // 04. PUT 
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const user = req.body;
            const option = { upsert: true }; // jodi data pao thle update kore dao na pele New user crete koro
            // console.log(updateUser);
            const updateUser = {
                $set: {
                    name: user.name,
                    address: user.address,
                    email: user.email
                }
            }
            const result = await userCollection.updateOne(filter, updateUser, option);
            res.send(result);
        })


        // 01.Create data from CRUD operation [CRUD, Insert operation mongoDB website >Find Multiple user]
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);

            const result = await userCollection.insertOne(user)
            res.send(result);
        });

        // 02.Delete from CRUD operation
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            // console.log('trying to delete', id);
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        });

    }

    finally {

    }
}

run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello from node MongoDB crud');
})

app.listen(port, () => {
    console.log(`Listing to port: ${port}`);
})
