const User = require('../models/user-model')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/index')


exports.index = async (req, res) => {

    const user = await User.find().sort( '-_id' );
    res.status(200).json({
        users: user
    })
}

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        // if(!(email && password && name)) {
        //     // res.status(409).send("All input is require")
        //     const error = new Error('กรุณากรอกข้อมูลให้ครบทุกช่อง')
        //     error.statusCode = 409;
        //     throw error;
        // }

        // ? validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง')
            error.statusCode = 422;
            error.validation = errors.array()
            throw error;
        }

        // ? เช็คอีเมลซ้ำ 
        const oldUser = await User.findOne({ email: email })
        if(oldUser) {
            const error = new Error('อีเมลนี้มีผู้ใช้งานแล้ว')
            error.statusCode = 409;
            throw error;
        }


        let user = new User()
        user.name = name
        user.email = email
        user.password = await user.encryptPassword(password)

        // ? save data to database
        await user.save()

        res.status(200).json({
            status: 'ok',
            message: 'ลงทะเบียนสำเร็จ',
            user: user
        })

    } catch (error) {
        next(error)
    }
}


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // ? checkmail ในระบบ
        const userMail = await User.findOne({ email: email })
        if (!userMail) {
            const error = new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
            error.statusCode = 404;
            throw error;
        }

        // ? ตรวจสอบรหัสผ่าน ถ้าไม่ตรงให้โยน error ออกไป
        const isValid = await userMail.checkPassword(password)
        if (!isValid) {
            const error = new Error('รหัสผ่านไม่ถูกต้อง')
            error.statusCode = 401;
            throw error
        }

        // ? สร้าง token 
        const token = await jwt.sign({
            id: userMail._id,
            role: userMail.role
        }, config.JWT_SECRT , { expiresIn: '3h' })


        // ? decode วันนหมดอายุ
        const expires_in = jwt.decode(token)

        res.status(200).json({
            access_token: token,
            expires_in: expires_in.exp,
            token_type: 'Bearer'
        })

    } catch (error) {
        next(error)
        
    }

}


exports.me = (req, res, next) => {
    try {
        const { _id, name, email, role } = req.user

        return res.status(200).json([{
            user: {
                id: _id,
                name: name,
                email: email,
                role: role
            }
    }])

        
    } catch (error) {
        next(error)
        
    }
}