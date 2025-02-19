import express from "express";

const app = express();
const port = 3000;
app.use(express.json()); // we accept only  json fromat datafrom client

let userData = [];
let userId = 1;

// add a new user
app.post("/user", (req, res) => {
  const { firstName, lastName } = req.body;
  const newPerson = {
    id: userId,
    firstName: firstName,
    lastName: lastName,
  };
  userData.push(newPerson);
  userId++;
  res.status(201).send(newPerson);
});

// get all users
app.get("/users", (req, res) => {
  res.status(200).send(userData);
});

// get particular user
app.get("/users/:id", (req, res) => {
  const user = userData.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("user not found");
  }
  res.status(200).send(user);
});

// update an user
app.put("/users/:id", (req, res) => {
  const user = userData.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("user not found");
  }
  const { firstName, lastName } = req.body;
  user.firstName = firstName;
  user.lastName = lastName;
  res.status(200).send(user);
});

// delete an user
app.delete("/users/:id", (req, res) => {
  const index = userData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("user not found with this id");
  }
  userData.splice(index, 1);
  return res.send(204).send("user deleted br");
});

// just listen
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
