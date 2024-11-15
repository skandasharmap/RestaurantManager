// npm install express mongoose cors body-parser
var express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
var app = express();
app.use(cors());

// Connect to DB
var mongoDB = 'mongodb://127.0.0.1/MyDB';
mongoose.connect(mongoDB).then(() => {
    console.log("DB Connection is successful...");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// Start server
app.listen(8003, function () {
    console.log("Server is listening at http://localhost:8003");
});

// Define the schema
var Schema = mongoose.Schema;
var RestaurantSchema = new Schema({
    "id": Number,
    "name": String,
    "type": String,
    "rating": Number,
    "top_food": String,
    "location": String
});
const RestaurantTable = mongoose.model('restaurant', RestaurantSchema);

// Get all the menus
app.get("/getAllMenus", function (req, res) {
    RestaurantTable.find().then((data) => {
        console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

// Middleware to parse JSON
app.use(express.json());

// For inserting a record in the table
app.post("/insertData", async function (req, res) {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const type = req.body.type;
        const rating = req.body.rating;
        const location = req.body.location;
        const top_food = req.body.top_food;
    
        const restaurantObj = new RestaurantTable({
            "id": id,
            "name": name,
            "type": type,
            "rating": rating,
            "location": location,
            "top_food": top_food
        });

        const result = await restaurantObj.save(); // Save without callback.
        
        res.status(201).json({
            message: "Record inserted successfully",
            data: result
        });
    } catch (err) {
        console.error("Error inserting record:", err);
        res.status(540).json({
            error: "Error inserting record",
        });
    }
});
//For updating a record in the table.
app.put('/updateRestaurant/:id', async function(req, res) {
    try {
      const restaurant = await RestaurantTable.findOneAndUpdate(
        { id: req.params.id },
        {
          name: req.body.name,
          type: req.body.type,
          location: req.body.location,
          rating: req.body.rating,
          top_food: req.body.top_food
        },
        { new: true }
      );
  
      if (!restaurant) {
        return res.status(404).send('Restaurant not found');
      }
  
      res.status(200).send('Restaurant updated successfully');
    } catch (err) {
      console.error('Error updating restaurant:', err);
      res.status(400).send('Error updating restaurant: ' + err.message);
    }
});
  
    //Delete a record based on a condition.
app.delete ("/deleteRecord/:id", function (req, res) {
    const {id} = req.params;
    console.log ("Given id to delete is: "+id);
    RestaurantTable.deleteMany ({"id":id}).then (function () { console.log("Record deleted successfully...");
    res.status(200).send ("Record deleted Successfully...");
    }).catch(function (error) {
    console.error(err);
    res.status (400).send (err);
    })
    });