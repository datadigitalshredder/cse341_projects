const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// LESSON 2
router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getOne);

// LESSON 3
router.post('/', contactsController.createNewContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);


module.exports = router;