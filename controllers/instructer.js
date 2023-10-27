const Instructer = require("../models/instructer");

exports.getInstructerById = (req, res, next, id) => {
  Instructer.findById(id).exec((err, inst) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    req.instructer = inst;
    next();
  });
};

exports.createInstructer = (req, res) => {
  console.log({ body: req.body });
  const instructer = new Instructer(req.body);
  instructer.save((err, instructer) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json({ instructer });
  });
};

exports.getInstructer = (req, res) => {
  return res.json(req.instructer);
};

exports.getAllInstructer = (req, res) => {
  Instructer.find().exec((err, instructers) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json(instructers);
  });
};

exports.updateInstructer = (req, res) => {
  const instructer = req.instructer;
  instructer.name = req.body.name;

  instructer.save((err, updatedInstructer) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json(updatedInstructer);
  });
};

exports.removeInstructer = (req, res) => {
  const instructer = req.instructer;

  instructer.remove((err, instructer) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json({
      message: `Successfully deleted ${instructer}`,
    });
  });
};
