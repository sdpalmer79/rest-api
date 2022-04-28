const express = require('express');
const programController = require('../controllers/program');

const router = express.Router();

router.get('/',programController.getProgram);

router.put('/', programController.createProgram);

router.delete('/', programController.deleteProgram);

router.post('/', programController.updateProgram);

exports.router = router;