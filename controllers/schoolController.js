const School = require("../models/schoolModel.js");
const apiFeatures = require("../utils/apiFeatures.js");
const { success, fail, schoolStatuses } = require("../utils/constants.js");

module.exports = {
  /*** Add School to Database ***/
  addSchool: async (req, res) => {
    try {
      const { name, address } = req.body;
      let data = { name, address };
      const school = await School.create(data);
      res.status(201).json({ status: `${success}`, data: { school } });
    } catch (error) {
      res.status(400).json({ status: `${fail}`, message: error.message });
    }
  },

  /*** Get School from Database ***/
  getSchool: async (req, res) => {
    try {
      // Create a new instance of ApiFeatures with the query and queryString parameters
      const features = new apiFeatures(School.find(), req.query);

      // Apply the necessary methods for filtering, pagination, sorting, and limiting fields
      const filteredFeatures = features
        .filter()
        .Paginate()
        .sort()
        .LimitFields();

      // Execute the modified query
      const school = await filteredFeatures.query;

      res.status(200).json({
        status: `${success}`,
        results: school.length,
        data: {
          school,
        },
      });
    } catch (err) {
      res.status(401).json({ status: `${fail}`, message: err.message });
    }
  },

  /*** Get a School  ***/
  singleSchool: async (req, res) => {
    try {
      const school = await School.findById(req.params.id);
      res.status(200).json({
        status: `${success}`,
        data: {
          school,
        },
      });
    } catch (err) {
      res.status(401).json({ status: `${fail}`, message: err.message });
    }
  },
  /*** Update a School  ***/
  updateSchool: async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    let record = await School.findById(id);
    if (!record) {
      return res.status(404).json({
        status: `${fail}`,
        message: `${schoolStatuses.invalidId}`,
      });
    }
    const school = await School.findByIdAndUpdate(id, data, {
      new: true,
    }).select("-__v");
    try {
      res.status(200).json({
        status: `${success}`,
        data: school,
      });
    } catch (err) {
      res.status(400).json({
        status: `${fail}`,
        message: err.message,
      });
    }
  },
  removeSchool: async (req, res) => {
    const id = req.params.id;
    let record = await School.findById(id);
    console.log(record);
    if (!record) {
      return res.status(404).json({
        status: `${fail}`,
        message: `${studentStatuses.invalidId}`,
      });
    }
    const school = await School.findByIdAndDelete(id);
    try {
      res.status(200).json({
        status: `${success}`,
        data: null,
      });
    } catch (err) {
      res.status(400).json({
        status: `${fail}`,
        message: err.message,
      });
    }
  },
};
