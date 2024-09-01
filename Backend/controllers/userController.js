const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path according to your folder structure

// Function to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// User registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user
    const user = await User.create({ name, email, password });

    // If user creation is successful
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      // Generate JWT token
      const token = generateToken(user._id);

      // Set the JWT token in an HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,  // Prevents JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
        sameSite: 'strict',  // Helps prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 1000,  // Cookie expiry time (e.g., 1 day)
      });

      // Send user details (without the token in the response body)
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Logout user
const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'User logged out successfully' });
};

// Get user details
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check login status
const getLoginStatus = (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("Token from request:", token); // Log the token for debugging

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log("Token verification failed:", err.message); // Log verification error
          return res.status(401).json({ isLoggedIn: false, message: 'Invalid signature' });
        } else {
          console.log("Token verified successfully:", decoded); // Log decoded token
          return res.json({ isLoggedIn: true });
        }
      });
    } else {
      console.log("No token found in cookies"); // Log if no token is present
      return res.json({ isLoggedIn: false });
    }
  }
   catch (error) {
    console.error("Error in getLoginStatus:", error.message); // Log unexpected errors
    res.status(500).json({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update photo
const updatePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.photo = req.body.photo || user.photo;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all functions
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  getLoginStatus,
  updateUser,
  updatePhoto,
};
