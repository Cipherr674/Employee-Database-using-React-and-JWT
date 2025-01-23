const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const employeeModel = require('../model/employeeData');

function verifytoken(req, res, next) {
    let token = req.headers.token;
    try {
      if (!token) throw 'Unauthorized access';
      const payload = jwt.verify(token, 'blogApp');
      req.user = payload; // Attach the decoded payload to req
      next();
    } catch (error) {
      res.status(403).json({ message: 'Unauthorized access' });
    }
  }




router.get('/',  async (req, res) => {
    try {
        const data = await employeeModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

router.post('/add', async (req, res) => {
    console.log(req.body); 
    try {
        const { Name, ID, Designation, Salary, Department, Location } = req.body;
        const employee = new employeeModel({ Name, ID, Designation, Salary, Department, Location });
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: 'Error adding employee', error });
    }
});



router.put('/edit/:id', verifytoken, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEmployee = await employeeModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: 'Error updating employee', error });
    }
});

router.delete('/delete/:id',verifytoken, async (req, res) => {
    try {
        const { id } = req.params;
        await employeeModel.findByIdAndDelete(id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error });
    }
});

module.exports = router;
