import QuickQuote from "../models/quickQuote.js";
import Service from "../models/serviceModel.js";

const addQuote = async (req, resp) => {
  try {
    const { movingFrom, movingTo, serviceId } = req.body;

    if (!movingFrom || !movingTo || !serviceId) {
      return resp.status(400).json({
        statusCode: 400,
        message: "Adding quote failed: Missing fields",
      });
    }

    const service = await Service.findById(serviceId);

    console.log(`the service is : ${service}`);

    if (!service) {
      return resp.status(404).json({
        statusCode: 404,
        message: "Service not found",
      });
    }

    const quote = await QuickQuote.create({
      movingFrom,
      movingTo,
      service: service._id,
    });

    return resp.status(201).json({
      statusCode: 201,
      message: "Quote Created Successfully",
      data: quote,
    });
  } catch (error) {
    console.error(`Error occured while ading quote`);
    return resp.status(500).json({
      statusCode: 500,
      message: `Internal server Error : ${error.message}`,
    });
  }
};

const getAllQuote = async (req, resp) => {
  try {
    const allQuote = await QuickQuote.find();

    if (allQuote.length === 0) {
      return resp.status(400).json({
        statusCode: 404,
        message: "Quote Not Found",
      });
    }
    return resp.status(200).json({
      statusCode: 200,
      message: `Quote Fetched successfully`,
      data: allQuote,
    });
  } catch (error) {
    console.log(`Error while fetching quote : ${error.message}`);
    resp.status(500).json({
      statusCode: 500,
      message: `Error while fetching Quote : ${error.message}`,
    });
  }
};
const getQuoteById = async (req, resp) => {
  try {
    const id = req.query.id;
    const quote = await QuickQuote.findOne({ _id: id });

    if (allQuote.length === 0) {
      return resp.status(400).json({
        statusCode: 404,
        message: "Quote Not Found",
      });
    }
    return resp.status(200).json({
      statusCode: 200,
      message: `Quote Fetched successfully`,
      data: quote,
    });
  } catch (error) {
    console.log(`Error while fetching quote : ${error.message}`);
    resp.status(500).json({
      statusCode: 500,
      message: `Error while fetching Quote : ${error.message}`,
    });
  }
};

export default { addQuote, getAllQuote, getQuoteById };
