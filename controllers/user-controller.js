const User = require('../db/models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmpassword } = req.body;
    if (
      !firstname?.trim() ||
      !lastname?.trim() ||
      !email?.trim() ||
      !password ||
      !confirmpassword
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: 'email already taken' });
    }

    if (password != confirmpassword) {
      return res.status(400).json({ message: 'password does not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ firstname, lastname, email, password: hashedPassword });
    return res.status(200).json({ message: 'user Registered successfully' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
module.exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!email?.trim() || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: 'password or email incorrect' });
    }

    const isMatching = await bcrypt.compare(password, user.password);

    if (!isMatching) {
      return res.status(400).json({ message: 'password or email incorrect' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '24h',
    });

    return res.status(200).json({ message: 'login successfull', token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
module.exports.getbyid = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await User.findById(id);
    if (!response) {
      return res.status(400).json('id not found');
    }
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
