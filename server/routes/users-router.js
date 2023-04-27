const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { body } = require('express-validator')
const passportJWT = require('../middleware/passport-jwt');
const passAdmin = require('../middleware/checkAdmin')



router.get('/', [passportJWT.isLogin, passAdmin.isAdmin], userController.index)
// router.get('/', userController.index)

router.post('/register', [
    body('name').not().isEmpty().withMessage('กรุณากรอกชื่อ'),
    body('email').not().isEmpty().withMessage('กรุณากรอกอีเมล').isEmail().withMessage('รูปแบบอีเมลไม่ถูกต้อง'),
    body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่าน').isLength({min: 6}).withMessage('รหัสผ่านมากกว่า 6 ตัวขึ้นไป'),
], userController.register)

router.get('/me', [passportJWT.isLogin], userController.me)

router.post('/login', userController.login)


module.exports = router