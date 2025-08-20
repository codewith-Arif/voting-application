const express = require('express'); // Import the express module
const router = express.Router(); // Create a new router instance using express.Router()

const User = require('./../models/user'); // Import the Person 
const {jwtAuthMiddleware, generateToken} = require('./../jwt'); 

// POST router to add person
router.post('/signup', async(req, res) => {
  try{
    const data = req.body // Assuming the requet body contains the user data

    // Create a new user document using the Mongoose model
    const newUser = new User(data);

    // Save the new user to the database
    const response = await newUser.save();
    console.log('data saved');

    const payload = {
      id: response.id,
      username: response.username
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({response: response, token: token});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Login Route 
router.post('/login', async(req, res) =>{
  try {
    // Extract aadharCardNumber and password from request body
    const {aadharCardNumber, password} = req.body;

    // Find the user by aadharCardNumber
    const user = await Person.findOne({aadharCardNumber: aadharCardNumber});

    // If user does not exist or password does not match, return erron
    if(!user || !(await user.comparePassword)){
      return res.status(401).json({error: 'Invalid username or password'});
    }

    // generate Token
    const payload = {
      id: user.id,
    }
    const token = generateToken(payload);

    // return token as response
    res.json({token})
  } catch (error) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Profile route 
router.get('/profile', jwtAuthMiddleware, async(req, res) =>{
  try {
    const userData = req.user;
    console.log("User Data : ", userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({user});
  } catch (error) {
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// PUT method to update person details
router.put('/profile/password', async (req, res) => {
  try {
    const userId = req.user; // Extract the id from the token
    const {currentPassword, newPassword} = req.body; // Extract current and new password from the request body

    // Find the user by userID
    const user = await User.findById(userId);

    // If password does not match, return error
    if(!(await user.comparePassword(currentPassword))){
      return res.status(401).json({error: 'Invalid username or password'});
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    console.log('password updated');
    res.status(200).json({message : "Password updated"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


 
module.exports = router;