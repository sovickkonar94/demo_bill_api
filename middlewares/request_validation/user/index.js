
const Joi = require('joi');

const validate = (req,res,next,schema,body)=>{
    const { error, value } = schema.validate(body);

    if(error){
        return res.status(422).json({
            err:`Validation error: ${error.details.map(x => x.message).join(', ')}`
        })
    }else{
        req.body = value;
        next();
    }
}

exports.checkRegister = (req,res,next)=>{
    const { body } = req;
    const schema = Joi.object().keys({
        first_name:Joi.string().required(),
        last_name:Joi.string().required(),
        email:Joi.string().required(),
        phone_number:Joi.string().required(),
    })
    validate(req,res,next,schema,body);
}

