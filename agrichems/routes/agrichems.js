const express = require('express');
const router = express.Router();

const chemsController = require('../controllers/chemicals');

// LESSON 5
router.get('/', chemsController.getAll);

router.get('/:id', chemsController.getOne);

router.post('/', chemsController.createNewChem);

// LESSON 6

// router.put('/:id', chemsController.updateChem);

// router.delete('/:id', chemsController.deleteChem);


module.exports = router;