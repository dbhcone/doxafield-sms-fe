import Joi, { ObjectSchema } from 'joi';
import { IHealthDetails, IPersonalDetails, ISchoolHistory } from '../interfaces/admissions.interface';

// Admission
const admissionValidation: ObjectSchema<{
  personalDetails: IPersonalDetails,
  schoolHistory?: ISchoolHistory,
  healthDetails?: IHealthDetails  
}> = Joi.object({
  year: Joi.string().required(),
  term: Joi.string().required(),
  commenceDate: Joi.date().required().label('commence date').greater(Joi.ref('endDate')),
  endDate: Joi.date().allow(null).label('end date'),
});


export { admissionValidation };
