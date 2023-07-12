const Joi = require('joi');

// Joi schema for validation
const taskValidation = Joi.object({
  name: Joi.string().required().min(2).max(50),
  completed: Joi.boolean(),
});
const taskUpdationValidation = Joi.object({
  name: Joi.string().min(2).max(50),
  completed: Joi.boolean(),
});


module.exports= {taskValidation,taskUpdationValidation};