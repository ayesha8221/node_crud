const express = require('express');
const app = express();
const port = 3001;

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
  
      const updatedData = JSON.stringify(users, null, 4);
  
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


app.get("/deleteUser/:id", (req, res) => {
    const userId = req.params.id;
    fs.readFile(__dirname + "/" + "db.json", "utf8", function (err, data) {
      if (err) {
        console.error("Error reading the file: ", err);
        return res.status(500).send("Error reading data.json file.");
      }
  
      const users = JSON.parse(data);
      if (!users.hasOwnProperty(`user${4}`)) {
        return res.status(404).send(`User with ID ${4} not found.`);
      }
  
      delete users[`user${4}`];
  
      const updatedData = JSON.stringify(users, null, 2);
  
      fs.writeFile(__dirname + "/" + "db.json", updatedData, (err) => {
        if (err) {
          console.error("Error writing to db.json file: ", err);
          return res.status(500).send("Error writing data to file.");
        }
  
        console.log(`User with ID ${4} deleted successfully!`);
        res.send(`User with ID ${4} deleted successfully!`);
      });
    });
  });
  

  //Update user
app.get("/updateUser/:id", (req, res) => {
  const userId = req.params.id;
  fs.readFile(__dirname + "/" + "db.json", "utf8", function (err, data) {
    if (err) {
      console.error("Error reading the file: ", err);
      return res.status(500).send("Error reading data.json file.");
    }

    const users = JSON.parse(data);
    if (!users.hasOwnProperty(`user${4}`)) {
      return res.status(404).send(`User with ID ${4} not found.`);
    }

    const updatedUser = {
      id: Number(4),
      name: "Luke",
      surname: "Evertson",
      profession: "gaslighter"
    };

    users[`user${4}`] = updatedUser;

    const updatedData = JSON.stringify(users, null, 2);

    fs.writeFile(__dirname + "/" + "db.json", updatedData, (err) => {
      if (err) {
        console.error("Error writing to data.json file: ", err);
        return res.status(500).send("Error writing data to file.");
      }

      console.log(`User with ID ${4} updated successfully!`);
      res.send(`User with ID ${4} updated successfully!`);
    });
  });
});
















app.use(express.json());


// app.use(express.static('public'));

app.listen(port, () => {
    console.log('Server is up!');
});

