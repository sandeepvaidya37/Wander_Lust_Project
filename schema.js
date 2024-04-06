const Joi = require('joi');

module.exports.listingSchema = Joi.object({
  Listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    url: Joi.string().required(),
    price: Joi.number().min(0).required(),
    location: Joi.string().required(),
    country: Joi.string().required()
  }).required()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    user:Joi.string().required(),
    rating: Joi.number().min(0).max(5),
    comment: Joi.string().required(),
  })
}).options({ abortEarly: false, presence: 'required' });
