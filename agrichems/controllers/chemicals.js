const { response } = require('express');
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('agrichems').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOne = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('agrichems')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNewChem = async (req, res) => {
  const chemical = {
    pesticideGroup: req.body.pesticideGroup,
    tradeName: req.body.tradeName,
    pesticideType: req.body.pesticideType,
    activeIngredient: req.body.activeIngredient,
    formulationType: req.body.formulationType,
    registrationNumber: req.body.registrationNumber,
    description: req.body.description,
    price: req.body.price,
    supplier: req.body.supplier,
    targetCrops: req.body.targetCrops,
    targetPests: req.body.targetPests
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('agrichems')
    .insertOne(chemical);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Creating Chemical - Error occurred.');
  }
};

const updateChem = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  
  const chemical = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthDate: req.body.birthDate
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('agrichems')
    .replaceOne({ _id: userId }, contact);
  console.log(result);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Updating Chemical - Error occurred.');
  }
};

const deleteChem = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('agrichems')
    .deleteOne({ _id: userId }, true);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(result.error || 'Deleting Chemical- Error occurred.');
  }
};

module.exports = { getAll, getOne, createNewChem, updateChem, deleteChem };