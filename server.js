const express = require('express');
const app = express();
const port = 3000;

var fs = require("fs");

// Add User
app.get("/addUser", (req, res) => {
    fs.readFile(__dirname + "/" + "db.json", "utf8", function (err, data) {
      if (err) {
        console.error("Error reading the file: ", err);
        return res.status(500).send("Error reading db.json file.");
      }
  
      const users = JSON.parse(data);
      const newUser = {
        id: 4,
        "name" : "Ethan",
        "surname" : "Lesar",
        "profession" : "entrepreneur"
      };
  
      users["user4"] = newUser;
  
      const updatedData = JSON.stringify(users, null, 2);
  
      fs.writeFile(__dirname + "/" + "db.json", updatedData, (err) => {
        if (err) {
          console.error("Error writing to db.json file: ", err);
          return res.status(500).send("Error writing data to file.");
        }
  
        console.log("User added successfully!");
        res.send("User added successfully!");
      });
    });
  });

//   List Items
app.get('/listItems', function (req, res) {
    fs.readFile( __dirname + "/" + "db.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);

    });
})

// Delete User

// var id = 2

// users["id"] = deletedUser

app.get("/deleteUser/:id", (req, res) => {
    const userId = req.params.id;
    fs.readFile(__dirname + "/" + "db.json", "utf8", function (err, data) {
      if (err) {
        console.error("Error reading the file: ", err);
        return res.status(500).send("Error reading data.json file.");
      }
  
      const users = JSON.parse(data);
      if (!users.hasOwnProperty(`user${userId}`)) {
        return res.status(404).send(`User with ID ${userId} not found.`);
      }
  
      delete users[`user${userId}`];
  
      const updatedData = JSON.stringify(users, null, 2);
  
      fs.writeFile(__dirname + "/" + "db.json", updatedData, (err) => {
        if (err) {
          console.error("Error writing to db.json file: ", err);
          return res.status(500).send("Error writing data to file.");
        }
  
        console.log(`User with ID ${userId} deleted successfully!`);
        res.send(`User with ID ${userId} deleted successfully!`);
      });
    });
  });
  
















app.use(express.json());


// app.use(express.static('public'));

app.listen(port, () => {
    console.log('Server is up!');
});

