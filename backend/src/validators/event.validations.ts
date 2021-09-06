import Joi, { ObjectSchema } from 'joi';

const createEventValidation: ObjectSchema<{
  title: string;
  date: Date;
  time: string;
  speaker: string;
  venue: string;
  flyer: string;
  description: string;
  extraDetails?: object;
  photos?: string[];
}> = Joi.object({
  title: Joi.string().required(),
  date: Joi.date(),
  time: Joi.string().required(),
  speaker: Joi.string().required(),
  venue: Joi.string().required(),
  description: Joi.string().required(),
  extraDetails: Joi.object().allow(null),
  photos: Joi.array().allow(null),
});

export { createEventValidation };
