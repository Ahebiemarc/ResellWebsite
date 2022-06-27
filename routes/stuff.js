const express = require('express');
const router = express.Router();

const {createThing, updateThing, deleteThing, getOneThing, getThings, thingId} = require('../controllers/stuff');
const {auth, verifyItem} = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, createThing);
router.put('/:thingId', auth, verifyItem, multer, updateThing);
router.delete('/:thingId', auth, verifyItem, deleteThing);
router.get('/:thingId', getOneThing);
router.get('/', getThings);

router.param('thingId', thingId);


module.exports = router;