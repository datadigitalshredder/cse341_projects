const { response } = require('express');
const mongodb = require('../DBconnection/connection');
const ObjectId = require('mongodb').ObjectId;

// LESSON 2
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
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
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// LESSON 3

const createNewContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthDate: req.body.birthDate
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .insertOne(contact);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Creating contact - Error occurred.');
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthDate: req.body.birthDate
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(result);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Updating contact - Error occurred.');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .deleteOne({ _id: userId }, true);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Deleting contact- Error occurred.');
  }
};

module.exports = { getAll, getOne, createNewContact, updateContact, deleteContact };