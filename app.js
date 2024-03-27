// 1 import mongoclint for create server instance
const { MongoClient } = require("mongodb");
// 2 this is our url for local server in our machine
const url = "mongodb://localhost:27017";
// 3 giv a url to the server for worck
const server = new MongoClient(url);
const connect = async () => {
  server.connect();
  const database = server.db("Yanfa");
  database.createCollection("Courses");
  database.createCollection("Catigorey");
};

// 4 for creat rout i need import express routes

const express = require("express");
const app = express();
app.use(express.json());
//  import cors
const cors = require("cors");
app.use(cors());

// Users rauting =================================================================
//  users git
app.get("/api/Users", async (req, res) => {
  const db = await server.db("Yanfa");
  const collection = await db.collection("Users");
  const data = await collection.find().toArray();
  console.log(data);

  res.json(data);
});
// get one user
app.get("/api/Users/:username", async (req, res) => {
  const userID = req.params.username;
  const db = await server.db("Yanfa");
  const collection = await db.collection("Users");
  // console.log(userID);
  const data = await collection.findOne({ name: `${userID}` });
  // console.log(data);

  res.json(data);
});
//  users post
app.post("/api/Users", async (req, res) => {
  const db = await server.db("Yanfa");
  const collection = await db.collection("Users");
  // console.log(req);
  await collection.insertOne(req.body);
  res.json({
    msg: " addsuccess",
  });
  // res.end();
});
//  users deleate
app.delete("/api/Users/:username", (req, res) => {
  const user = +req.params.username;
  const db = server.db("Yanfa");
  const collection = db.collection("Users");
  collection.deleteOne({ _id: user });
  res.json({ msg: " deleat success" });
});
//  users git
// Courses rauting =======================================================================

//  Courses git
// get all
app.get("/api/Courses", async (req, res) => {
  const db = await server.db("Yanfa");
  const collection = await db.collection("Courses");
  const data = await collection.find().toArray();
  res.json(data);
});
//  get one
app.get("/api/Courses/:CoursName", async (req, res) => {
  const name = req.params.CoursName;
  const db = await server.db("Yanfa");
  const collection = await db.collection("Courses");
  const data = await collection.findOne({ name: `${name}` });
  res.json(data);
});
//  Courses post
app.post("/api/Courses", async (req, res) => {
  const db = await server.db("Yanfa");
  const collection = await db.collection("Courses");
  const data = await collection.insertOne(req.body);
  // console.log(req);
  res.json({ msg: "success adding courses" });
  // res.end();
});

//  Courses deleate
app.delete("/api/Courses/:CoursName", async (req, res) => {
  const name = req.params.CoursName;
  const db = server.db("Yanfa");
  const collection = db.collection("Courses");
  collection.deleteOne({ name: `${name}` });
  res.json({ msg: " deletd  is success" });
});

// Catigorey rauting =================================================================================================
//  Catigorey git
// get all
app.get("/api/Catigorey", async (req, res) => {
  const db = await server.db("Yanfa");
  const collection = await db.collection("Catigorey");
  const data = await collection.find().toArray();
  res.json(data);
  // res.end();
});
// get one
app.get("/api/Catigorey/:categoryName", async (req, res) => {
  const name = req.params.categoryName;
  const db = await server.db("Yanfa");
  const collection = await db.collection("Catigorey");
  const data = await collection.findOne({ name: `${name}` });
  // console.log(data);
  res.json(data);
});
//  Catigorey post
app.post("/api/Catigorey", async (req, res) => {
  const db = await server.db("Yanfa");
  const collection = await db.collection("Catigorey");
  const data = await collection.insertOne(req.body);
  // console.log(req);
  res.json({ msg: " catigorey is successfully added." });
  // res.end();
});
//  Catigorey deleate
app.delete("/api/Catigorey/:Name", async (req, res) => {
  const name = req.params.Name;
  const db = await server.db("Yanfa");
  console.log(name);
  const collection = await db.collection("Catigorey");
  const data = await collection.deleteOne({ name: `${name}` });
  res.json({ msg: " delet  category success" });
});

// 1 open a server
app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
connect();
