import Price from "../models/priceModel.js";

const getAllPrice = async (req, res) => {
  try {
    const prices = await Price.find();
    if (!prices || prices.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "No prices found",
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "Prices fetched successfully",
      data: prices,
    });
  } catch (error) {
    console.error(`Error while fetching prices: ${error.message}`);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const addPrice = async (req, res) => {
  try {
    const { service, price, description } = req.body;

    // Validate required fields
    if (!service || !price) {
      return res.status(400).json({
        statusCode: 400,
        message: "Service name and price are required",
      });
    }

    const newPrice = new Price({
      service,
      price: Number(price),
      description: description || "",
    });

    const savedPrice = await newPrice.save();

    return res.status(201).json({
      statusCode: 201,
      message: "Price added successfully",
      data: savedPrice,
    });
  } catch (error) {
    console.error(`Error while adding price: ${error.message}`);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { service, price, description } = req.body;

    // Validate price exists
    const existingPrice = await Price.findById(id);
    if (!existingPrice) {
      return res.status(404).json({
        statusCode: 404,
        message: "Price not found",
      });
    }

    // Update fields
    if (service) existingPrice.service = service;
    if (price) existingPrice.price = Number(price);
    if (description) existingPrice.description = description;

    const updatedPrice = await existingPrice.save();

    return res.status(200).json({
      statusCode: 200,
      message: "Price updated successfully",
      data: updatedPrice,
    });
  } catch (error) {
    console.error(`Error while updating price: ${error.message}`);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default {
  getAllPrice,
  addPrice,
  updatePrice,
};
