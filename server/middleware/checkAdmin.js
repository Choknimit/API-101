const validationResult = require('express-validator')


// module.exports.isAdmin = (req, res, next) => {
//     const { role } = req.user
//     if (role === 'admin') {
//         next();
//     } else {
//         return res.status(403).json({
//             error: {
//                 message: 'ไม่มีสิทธ์'
//             }
//         })
//     }
// }

module.exports.isAdmin = (req, res, next) => {
    try {
        const { role } = req.user
        if ( role !== 'admin') {
            const error = new Error('ไม่มีสิทธิ์เข้าใช้งาน')
            error.statusCode = 401
            throw error
        } 

        next()
    
        
    } catch (error) {
        next(error)
        
    }
}