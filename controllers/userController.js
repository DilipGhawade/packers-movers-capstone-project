import User from "../models/userModel.js";

const register = async (req, resp) => {
  try {
    // props getting a reques body parameter to save in database or collection the collections here is user we are getting all paramters
    const { firstName, lastName, gender, role, password, email, mobileNumber } =
      req.body;
    // check the existing user or not
    const userExits = await User.findOne({ email });
    // checking the user is regiser by using unique value email id
    if (userExits) {
      console.warn(`the user is already register for this email : ${email}`);
      return resp.status(400).json({
        statusCode: 400,
        message: "User already exists with this email",
        respDescription:
          "You have already register with this email please check email id is correct or login with this emial otherwise use antoher emial id to register. !",
      });
    }
    // creating a user in mongo db
    const user = await User.create({
      firstName,
      lastName,
      email,
      gender,
      role,
      password,
      mobileNumber,
    });
    // sending the response back to the user after successfully registration of user
    return resp.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      mobileNumber: user.mobileNumber,
      role: user.role,
    });
  } catch (error) {
    console.error(`Registration Error : ${error.message}`);
    return resp.status(500).json({
      statusCode: 500,
      message: `Registration user erro ${error.message}`,
    });
  }
};
const login = async (req, resp) => {
  try {
    const { email, password } = req.body;
    console.log(`the user emila is ${email}`);

    const user = await User.findOne({ email });
    console.log(`user found`, user);

    if (user) {
      const userPassword = user.password;
      if (password === userPassword) {
        return resp.status(200).json({
          statusCode: 200,
          message: "User login Successfully",
          user: {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        return resp.status(400).json({
          statusCode: 400,
          message: "Incorrect password. Please try again.",
        });
      }
    } else {
      return resp.status(400).json({
        statusCode: 400,
        message: "User not found. Please register first.",
      });
    }
  } catch (error) {
    console.error(`login error : ${error.message}`);
    return resp
      .status(500)
      .json({ statusCode: 500, message: "Internal Server Error" });
  }
};

export default { register, login };
