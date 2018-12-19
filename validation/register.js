const Validator = require('validator')
const isEmpty = require('./is-empty') 
module.exports = function validateRegisterInput(data){
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name :'';
    data.email = !isEmpty(data.email) ? data.email :'';
    data.password = !isEmpty(data.password) ? data.password :'';
    data.password2 = !isEmpty(data.password2) ? data.password2 :'';

    if(!Validator.isLength(data.name,{min:2, max:30})){
        errors.name = 'Name Must be between 2 to 30 characters';
    }

    if(Validator.isEmpty(data.name)){
        errors.name = "Name filed is required"
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "Email filed is required"
    }

    if(!Validator.isEmail(data.email)){
        errors.email = "Email Not In format"
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password filed is required"
    }

    if(!Validator.isLength(data.password,{min:6, max:12})){
        errors.password = "Password filed has min 6 and max 12 characters required"
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm password filed is required"
    }

    if(Validator.equals(data.password2)){
        errors.password2 = "passwords must match"
    }

    return {
        errors,
        isValid:isEmpty(errors)
    };
}