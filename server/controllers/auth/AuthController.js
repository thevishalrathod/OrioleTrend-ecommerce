import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

//Register

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User already exists with the same email! Please try again.",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User registration successfuly" });
  } catch (error) {
    console.log("ERROR IN register - AuthController.js : ", error);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

//Login

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({ success: false, message: "Inavlid credentials!" });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName, 
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    console.log("token = ", token);

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfuly",
      user: {
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (error) {
    console.log("ERROR IN login - AuthController.js : ", error);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

//Logout

export const logoutUser = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfuly" });
};

//Auth middleware

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log("Token = ", token);
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user!" });

  try {
    const decodedToken = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("ERROR IN AUTH MIDDLEWARE: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
