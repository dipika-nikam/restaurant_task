import Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string()
        .pattern(/^\d+$/, { invert: true })
        .min(3)
        .max(155)
        .trim(true)
        .required(),
    email: Joi.string()
        .email()
        .trim(true)
        .required(),
    password: Joi.string()
        .pattern(new RegExp((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)))
        .min(7)
        .trim(true)
        .required(),    
});