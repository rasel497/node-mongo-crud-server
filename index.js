const express = require('express');
const cors = require('cors');
const { use } = require('express/lib/router');

const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('Hello from node mongo crud');
})

app.listen(port, () => {
    console.log(`Listing to port: ${port}`);
})
