import { db } from "./dbConnect.js";
// Imported to get timestamp (1/2)
import { FieldValue } from "firebase-admin/firestore";

const coll = db.collection('employees');

// Add employee

export async function addEmployee(req, res) {
  const newEmployee = req.body;
  // Insert timestamp
  newEmployee.createdAt = FieldValue.serverTimestamp();
  await coll.add(newEmployee);

  res.status(201).send({message: "employee successfully added."})
}

export async function getAllEmployees(req, res) {
   const employeesColl = await coll.get()  
   const employeeList = employeesColl.docs.map(employee => ({...employee.data(), id: employee.id}))

   res.status(200).send(employeeList);
}

export async function deleteEmployee(req, res) {
  const {empId} = req.params;
  
  await coll.doc(empId).delete();
  res.status(201).send({message: "Employee has been deleted"})
  
}

export async function updateEmployee(req, res) {
  const {empId} = req.params;
  const updatedValues = req.body;

  await coll.doc.update(updatedValues);
  res.status(201).send({message: "Employee has been updated"});
}
