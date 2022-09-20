const Wejscie = require("../models/wejsciaModel");
const Bramki = require("../models/bramkiModel");

class LabelsAndData {
  labelsAndData = {
    "10:00-11:00": 0,
    "11:00-12:00": 0,
    "12:00-13:00": 0,
    "13:00-14:00": 0,
    "14:00-15:00": 0,
    "15:00-16:00": 0,
    "16:00-17:00": 0,
    "17:00-18:00": 0,
    "18:00-19:00": 0,
    "19:00-20:00": 0,
    "20:00-21:00": 0,
    "21:00-22:00": 0,
  };

  constructor(data, direction) {
    this.dataFiltered = data.filter((el) => el.kierunek === direction);
    this.dataFiltered.forEach((el, id) => {
      this.labelsAndData[el.Hours] += el.usage;
    });
  }

  get data() {
    return Object.values(this.labelsAndData);
  }

  get labels() {
    return Object.keys(this.labelsAndData);
  }
}

const getInside = (dataIn, dataOut) => {
  const sumIn = dataIn.map((val, id, arr) => {
    return arr.slice(0, id + 1).reduce((a, b) => a + b);
  });

  const sumOut = dataOut.map((val, id, arr) => {
    return arr.slice(0, id + 1).reduce((a, b) => a + b);
  });

  const currentState = sumIn.map((val, id) => {
    return val - sumOut[id];
  });

  return currentState;
};

exports.addWejscie = async (req, res, next) => {
  if (!req.body.bramkaId) return next("incorrect bramkaId");
  if (req.body.kierunek !== "in" && req.body.kierunek !== "out") {
    return next("incorrect kierunek");
  }
  const newWejscie = new Wejscie(req.body);
  try {
    await newWejscie.add();
  } catch (err) {
    return next(err.message);
  }
  res.status(201).json({
    status: "success",
    data: newWejscie,
  });
};

exports.delWejscie = async (req, res, next) => {
  if (!req.params.id) return next("please provide id");
  const [deleteWejscie, ..._] = await Wejscie.delete(req.params.id);
  if (deleteWejscie.affectedRows === 0) return next("delete failed");
  res.status(201).json({
    status: "success",
  });
};

exports.countWejscia = async (req, res, next) => {
  if (!req.body.data && !req.body.global) {
    req.body.global = true;
  }

  const [allBramki, ..._a] = await Bramki.findAll();

  [countedWejscia, ..._b] = await Wejscie.countWejscia(
    req.body.data || null,
    req.body.global
  );

  const statBramka = {};

  allBramki.forEach((el) => (statBramka[el.bramka_id] = { in: 0, out: 0 }));

  countedWejscia.forEach(
    (el) => (statBramka[el.bramka_id][el.kierunek] += el.usage)
  );

  const labelsAndDataIn = new LabelsAndData(
    Object.values(countedWejscia),
    "in"
  );
  const labelsAndDataOut = new LabelsAndData(
    Object.values(countedWejscia),
    "out"
  );

  const currentState = getInside(labelsAndDataIn.data, labelsAndDataOut.data);

  res.status(201).json({
    status: "success",
    dataIn: labelsAndDataIn.data,
    dataOut: labelsAndDataOut.data,
    currentState,
    labels: labelsAndDataIn.labels,
    statBramka,
  });
};
