const express = require("express");
const mongoose = require("mongoose");
const Data = require("./models/data");
require("dotenv").config();
const app = express();

app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database!"))
  .catch((error) => console.log("Failed to connect to database!", error));

app.get("/", async (req, res) => {
    const data = await Data.find();
    res.json(data);
});

app.post('/', async (req, res) => {
    const {user,emoji,status} = req.body;
    const data = await Data.findOne({user});
    if(!data){
        res.status(400).json({message:"User not found"});
    }
    data.emoji = emoji;
    data.status = status;
    await data.save();
    res.json(data);
});

app.post('/create',async (req, res) => {
    const {user,emoji,status} = req.body;
    const data = await Data.findOne({user});
    if(data){
        res.status(400).json({message:"User already exists. Try a different username."});
    }
    const newUser = await Data.create({user,emoji,status});
    res.json(newUser);
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running!"));