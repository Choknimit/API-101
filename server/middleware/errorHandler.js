module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({
        errors: {
            status_code: statusCode,
            message: err.message,
            validation: err.validation
        }
    })
}