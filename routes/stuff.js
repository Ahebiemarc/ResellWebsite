const express = require('express');
const router = express.Router();

const {createThing, updateThing, deleteThing, getOneThing, getThings, thingId} = require('../controllers/stuff');
const {auth, verifyItem} = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const {userById} = require('../controllers/user')

router.post('/', auth, multer, createThing);
router.put('/:thingId', auth, verifyItem, multer, updateThing);
router.delete('/:thingId/:userById', auth, verifyItem, deleteThing);
router.get('/:thingId', getOneThing);
router.get('/', getThings);

router.param('thingId', thingId);
router.param('userById', userById)


module.exports = router;