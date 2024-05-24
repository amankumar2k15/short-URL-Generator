const express = require("express");
const path = require("path")
const { connectToMongoDB } = require("./connection");
const PORT = 8000

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter")

//initializing app
const app = express()

//for ejs
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


//Middleware
app.use(express.json())       // we will support json data
app.use(express.urlencoded({ extended: false }))  // we will support form data that are coming from frontend

app.use("/url", urlRoute)
app.use("/", staticRouter)


//Connecting to MongoDB
connectToMongoDB("mongodb+srv://amankumar2k15:amankumar2662@clustor0.9bcinws.mongodb.net/shortURl?retryWrites=true&w=majority&appName=clustor0")
    .then(() => console.log("MongoDB Connected"))


app.listen(PORT, () => console.log("Server Started at " + PORT))