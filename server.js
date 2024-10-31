const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Load environment variables
dotenv.config();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api', require('./routes/tasks'));


//Connect to MongoDB//-

const MONGODB_USERNAME = process.env.MONGODB_USERNAME || 'iamsnk72';//+
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'Helloworld@1';//+
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER || 'clustertodolist.nle8z.mongodb.net';//+
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'ClusterToDoList';//+
//+
const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${encodeURIComponent(MONGODB_PASSWORD)}@${MONGODB_CLUSTER}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;//+
//+
mongoose.connect(MONGODB_URI)//+
  .then(() => console.log('Connected to MongoDB'))//+
  .catch(err => console.error('Could not connect to MongoDB:', err));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

