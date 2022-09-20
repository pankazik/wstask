const Bramki = require("../models/bramkiModel");

exports.getAllBramki = async (req, res, next) => {
  const [allBramki, ..._] = await Bramki.findAll();

  if (allBramki.length === 0) return next("table is empty");

  res.status(200).json({
    status: "success",
    data: allBramki,
  });
};

exports.addBramka = async (req, res, next) => {
  if (!req.body.name) return next("please provide a name");
  const newBramka = new Bramki(req.body);
  await newBramka.add();
  res.status(201).json({
    status: "success",
    data: newBramka,
  });
};

exports.delBramka = async (req, res, next) => {
  if (!req.params.id) return next("please provide id");
  const deletedBramka = await Bramki.delete(req.params.id);
  if (deletedBramka[0].affectedRows === 0) return next("delete failed");
  res.status(201).json({
    status: "success",
  });
};

exports.updateBramka = async (req, res, next) => {
  if (!req.params.id) return next("please provide id");
  if (!req.body.name) return next("please provide name");

  const updatedBramka = await Bramki.update(req.params.id, req.body.name);

  if (updatedBramka[0].affectedRows === 0) return next("update failed");

  res.status(201).json({
    status: "success",
  });
};
