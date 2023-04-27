const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff-controller');
const passportJWT = require('../middleware/passport-jwt');


router.get('/', [passportJWT.isLogin], staffController.staffAll);

// ? get by id
router.get('/:id', staffController.showbyid)

// ? delete by id
router.delete('/:id', staffController.deletestaff)

// ? Update by id
router.put('/:id', staffController.staffUpdate)

router.post('/', staffController.insert);


module.exports = router;