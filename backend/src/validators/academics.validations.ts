import Joi, { ObjectSchema } from 'joi';

// Calendar

const calendarValidation: ObjectSchema<{
  year: string;
  term: string;
  commenceDate: Date;
  endDate: Date;
}> = Joi.object({
  year: Joi.string().required(),
  term: Joi.string().required(),
  endDate: Joi.date().allow(null),
  commenceDate: Joi.date().required().greater(Joi.ref('endDate')),
});

// Subject
const subjectValidation: ObjectSchema<{
  fullName: string;
  shortName: string;
  description: String;
}> = Joi.object({
  fullName: Joi.string().required(),
  shortName: Joi.string().required(),
  description: Joi.string().allow(null),
});

// Class
const classValidation: ObjectSchema<{
  fullName: string;
  shortName: string;
  description: string;
  rank: number;
}> = Joi.object({
  fullName: Joi.string().required(),
  shortName: Joi.string().required(),
  description: Joi.string().allow(null),
  rank: Joi.number().allow(null)
});

export { calendarValidation, subjectValidation, classValidation };
