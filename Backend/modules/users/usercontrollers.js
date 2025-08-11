const { getDB } = require('../../config/db');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
  try {
    const db = getDB();
    const {
      username,
      email,
      password,
      location,
      mobile,
      profilePhoto,
      role,
      bankDetails,
      propertiesRented
    } = req.body;

    console.log('Received data:', req.body);
    // Basic validation
    if (!username || !email || !password || !location || !mobile || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate bank details if provided
    if (bankDetails && typeof bankDetails !== 'object') {
      return res.status(400).json({ message: 'Bank details must be an object' });
    }

    // Check for duplicate email or username
    const existingUser = await db.collection('users').findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // IST Timestamp
    const utcNow = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(utcNow.getTime() + istOffset);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user document
    const newUser = {
      username,
      email,
      password: hashedPassword,
      location,
      mobile,
      profilePhoto: profilePhoto || '',
      role: role || 'customer',
      bankDetails: bankDetails || {},
      propertiesRented: propertiesRented || [],
      status: 'active',
      createdAt: istNow,
      updatedAt: istNow,
      lastLogin: null
    };

    // Insert into DB
    const result = await db.collection('users').insertOne(newUser);

    res.status(201).json({
      message: 'User added successfully',
      userId: result.insertedId
    });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const userprofile  = async (req, res) => {
  try {
    const db = getDB();
    const { email } = req.params;

    // Validate email format
    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Fetch user profile
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const db = getDB();
    const email = req.params.email;
    const updates = req.body;

    const result = await db.collection('users').updateOne(
      { email },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const changePassword = async (req, res) => {
  try {
    const db = getDB();
    const { email, currentPassword, newPassword } = req.body;

    // Validate input
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check old password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.collection("users").updateOne(
      { email },
      { $set: { password: hashedPassword, updatedAt: new Date() } }
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addUser, userprofile, updateUserProfile, changePassword };
