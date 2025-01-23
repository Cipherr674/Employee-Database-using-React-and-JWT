const express = require('express');
const userRouter = express.Router();
const User = require('../model/userData'); 
const jwt=require('jsonwebtoken')


// Fetch all users
userRouter.get('/data', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});


//LOGIN API

userRouter.post('/login', async (req, res) => {
    try {
        const user1 = await User.findOne({ Email: req.body.Email });

        if (!user1) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Compare the password
        if (user1.Password === req.body.Password) {
            const payload = { email: user1.Email, isAdmin: user1.isAdmin }; 
            const token = jwt.sign(payload, 'blogApp'); 
            return res.status(200).send({ message: 'Login Successful', token });
        } else {
            return res.status(401).send({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ message: 'Internal Server Error', error });
    }
});




// Add a new user
userRouter.post('/add', async (req, res) => {
    try {
        const { Email, Password, isAdmin } = req.body; 
        const newUser = new User({ Email, Password, isAdmin});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error adding user', error });
    }
});

// Update a user by ID
userRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
});

// Delete a user by ID
userRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

module.exports = userRouter;
