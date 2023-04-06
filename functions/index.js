import functions from "firebase-functions"; //makes as cloud func
import express from "express";
import cors from "cors";
import { addEmployee, deleteEmployee, getAllEmployees, updateEmployee } from "./src/employees.js";

const app = express();
app.use(cors());
app.use(express.json()); //needed for POST and PATCH

app.get('/test', (req, res) => {
  res.send("My cloud function API is working! 😀")
})

app.get('/hello', (req, res) => {
  res.send("Hello there!");
})

app.post("/employee", addEmployee);
app.get("/employee", getAllEmployees);
app.delete("/employee/:empId", deleteEmployee);
app.patch("/employee/:empId", updateEmployee);

export const api = functions.https.onRequest(app); //makes as cloud func



// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
