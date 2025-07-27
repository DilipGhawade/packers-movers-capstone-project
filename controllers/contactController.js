import Contact from "../models/contactModel.js";

const contactUs = async (req, resp) => {
  try {
    const { name, email, mobileNmber, message } = req.body;
    // validation to check the req.body the requied field is not empty if empty sending response back to user for better understanding
    if (name === "") {
      return resp.status(400).json({
        statusCode: 400,
        message: "Name should not be empty",
      });
    } else if (email === "") {
      return resp.status(400).json({
        statusCode: 400,
        message: "email should not be empty",
      });
    } else if (mobileNmber === "") {
      return resp.status(400).json({
        statusCode: 400,
        message: "please provide the mobile number to get callback form us",
      });
    }

    // saving contac detaisl in contact collection

    const contact = await Contact.create({
      name,
      email,
      mobileNmber,
      message,
    });

    // sending after saved the contact in collection
    return resp.status(201).json({
      statusCode: 201,
      message: "Contact saved successfully ",
      name: contact.name,
      email: contact.email,
      mobileNumber: contact.mobileNumber,
      message: contact.message,
    });
  } catch (error) {
    console.error(`saving contact detail failed eror is : ${error.message}`);
    return resp.status(500).json({
      statusCode: 500,
      message: `saving user is faild reason : ${error.message}`,
    });
  }
};

export default contactUs;
