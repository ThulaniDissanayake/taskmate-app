import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

// Existing registerUser and loginUser unchanged

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New function to enable 2FA and generate secret + QR code
export const enable2FA = async (req, res) => {
  try {
    const userId = req.user.id;  // assuming user is authenticated and user ID is in req.user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const secret = speakeasy.generateSecret({
      name: `YourAppName (${user.email})`
    });

    // Save the base32 secret in user model (you should add this field in your User schema)
    user.twoFASecret = secret.base32;
    await user.save();

    // Generate QR code data URL
    const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url);

    res.status(200).json({
      message: '2FA enabled',
      secret: secret.base32,      // optional to send, mostly save in DB only
      qrCodeDataURL              // send QR code to frontend for scanning
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
};

export const verify2FA = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otp } = req.body;

    const user = await User.findById(userId);
    if (!user || !user.twoFASecret) {
      return res.status(400).json({ message: '2FA is not enabled for this user' });
    }

    // Verify OTP token using speakeasy
    const verified = speakeasy.totp.verify({
      secret: user.twoFASecret,
      encoding: 'base32',
      token: otp,
      window: 1  // allow 1 step before or after (30s window)
    });

    if (verified) {
      return res.status(200).json({ message: '2FA verification successful' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
