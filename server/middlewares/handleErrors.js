const { CustomAPIError } = require('../errors/customError')

const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    res.status(code).send({ msg: error });
}

const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).send({ msg: formattedErrors, fields: fields });
    } else {
        res.status(code).send({ msg: errors[0], fields: fields })
    }
}

const handleCustomError = (err, res) => {
    console.log('I am custom')
    res.status(err.statusCode).json({ msg: err.message });
}

const handleErrors = (err, req, res, next) => {
    console.log('I am handling')
    console.log(err)
    try {
        if (err instanceof CustomAPIError) return err = handleCustomError(err, res);
        if (err.name === 'ValidationError') return err = handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
    } catch (err) {
        res
            .status(500)
            .send('An unknown error occurred.');
    }
}

module.exports = { handleErrors }