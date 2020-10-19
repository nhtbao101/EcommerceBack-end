const {check, validationResult} = require("express-validator")
exports.userValidator = [
    check("name", 'Name is required ').notEmpty(),
    check("email", 'Email must be between 6 to 32 characters ')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @ ")
        .isLength({
            min: 5, max: 32
        }),
   check("password", "Password is required ")
        .matches(/\d/)
        .withMessage("Password must contain number")
        .isLength({min:6})
        .withMessage("Password must contain at least 6 characters ")
]
    
exports.resultValidate = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const firstError = errors.array()[0];
        console.log('firsterror ', firstError.msg);
        return res.status(400).json({ error: firstError.msg }); 
    }
    next();
}
    

