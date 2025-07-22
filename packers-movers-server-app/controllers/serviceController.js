import Service from "../models/serviceModel.js";
import User from "../models/userModel.js";

// const addService = async (req, resp) => {
//   try {
//     const { title, description } = req.body;
//     const file = req.file;
//     // const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//     console.log(`image url ${file}`);
//     if (!file) {
//       return resp.status(400).json({
//         statusCode: 400,
//         message: "Image upload failed or missing",
//       });
//     }
//     const imageUrl = `/uploads/${file.filename}`;
//     console.log(`image url final ${imageUrl}`);

//     const isServiceExits = await Service.findOne({ title });

//     console.log(`the service form db is : ${isServiceExits}`);
//     if (isServiceExits) {
//       console.log(
//         `the service is already exits please add new service or update existing`
//       );
//       return resp.status(400).json({
//         statusCode: 400,
//         message:
//           "the service is already exits please add new service or update existing",
//       });
//     } else {
//       const imageUrl = `/uploads/${image.imageUrl}`;
//       const service = Service.create({
//         title,
//         description,
//         imageUrl,
//       });

//       return resp.status(201).json({
//         statusCode: 201,
//         message: "Service added successfully",
//         title: service.title,
//         description: service.description,
//         imageUrl: service.imageUrl,
//       });
//     }
//   } catch (error) {
//     console.error(`Failed to add service ${error.message}`);
//     return resp.status(500).json({
//       statusCode: 500,
//       message: `Internal Server Error : ${error.message}`,
//     });
//   }
// };
const addService = async (req, resp) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
      return resp.status(400).json({
        statusCode: 400,
        message: "Image upload failed or missing",
      });
    }

    const imageUrl = `/uploads/${file.filename}`;

    const isServiceExits = await Service.findOne({ title });

    if (isServiceExits) {
      return resp.status(400).json({
        statusCode: 400,
        message:
          "The service already exists. Please add a new service or update the existing one.",
      });
    }

    const service = await Service.create({
      title,
      description,
      imageUrl,
    });

    return resp.status(201).json({
      statusCode: 201,
      message: "Service added successfully",
      data: {
        title: service.title,
        description: service.description,
        imageUrl: service.imageUrl,
      },
    });
  } catch (error) {
    console.error(`Failed to add service ${error.message}`);
    return resp.status(500).json({
      statusCode: 500,
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

const getAllService = async (req, resp) => {
  try {
    // const role = req.role;
    const email = req.query.email;

    const user = await User.findOne({ email });

    console.log(`user ${user}`);
    console.log(`the provide user role is ${user.role}`);

    if (user.role === "admin") {
      const allService = await Service.find();
      if (allService.length === 0) {
        return resp.status(200).json({
          statusCode: 200,
          message: "No services found",
        });
      }

      return resp.status(200).json({
        statucCode: 200,
        message: "All services fetched successfully",
        allService,
      });
    } else {
      return resp.status(403).json({
        statusCode: 403,
        message: "Unauthorized access. Admins only.",
      });
    }
  } catch (error) {
    console.error(`Error fetching service ${error.message}`);
    return resp.status(500).json({
      statusCode: 500,
      message: `Server error: ${error.message}`,
    });
  }
};

const updateService = async (req, resp) => {
  try {
    const { title, description } = req.body;
    let imageUrl = "";

    if (!title || title.trim() === "") {
      return resp.status(400).json({
        statusCode: 400,
        message: "Title is required to update a service.",
      });
    }

    const service = await Service.findOne({ title });

    if (!service) {
      return resp.status(404).json({
        statusCode: 404,
        message: "Service not found. Please add it first.",
      });
    }

    // Only now it's safe to access service.imageUrl
    if (req.file && req.file.filename) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else {
      imageUrl = service.imageUrl; // fallback
    }

    const updates = {};
    if (description) updates.description = description;
    if (imageUrl) updates.imageUrl = imageUrl;

    if (Object.keys(updates).length === 0) {
      return resp.status(400).json({
        statusCode: 400,
        message: "No new data provided to update.",
      });
    }

    await Service.updateOne({ _id: service._id }, { $set: updates });

    return resp.status(200).json({
      statusCode: 200,
      message: "Service updated successfully!",
      service: {
        title,
        ...updates,
      },
    });
  } catch (error) {
    console.error(`error while updating the service`, error);
    return resp.status(500).json({
      statusCode: 500,
      message: `Error while updating the service Error : ${error.message}`,
    });
  }
};

const deleteSerciveById = async (req, resp) => {
  try {
    const _id = req.query.id;
    if (!_id) {
      return resp.status(400).json({
        statusCode: 400,
        message: "Id is required to delete the service",
      });
    }

    const result = await Service.deleteOne({ _id: _id });

    if (result.deletedCount === 0) {
      return resp.status(404).json({
        statusCode: 404,
        message: "Service not found or already deleted",
      });
    }

    return resp.status(200).json({
      statusCode: 200,
      message: "Service delted succesfully",
    });
  } catch (error) {
    console.error(`Error while deleting service Error ${error.message}`);
    return resp.status(500).json({
      statusCode: 500,
      message: `Error while deleting the service Error : ${error.message}`,
    });
  }
};

export default { addService, getAllService, updateService, deleteSerciveById };
