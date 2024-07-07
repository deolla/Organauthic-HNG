import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

const userSchema = yup.object().shape({
  userId: yup.string().uuid().required().default(() => uuidv4()),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  phone: yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Phone number is not valid').required(),
}).noUnknown();

export default userSchema;
