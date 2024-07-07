import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

// Define Yup schema for organisations table
const organisationSchema = yup.object().shape({
  orgId: yup.string().uuid().required().default(() => uuidv4()),
  name: yup.string().required(),
  description: yup.string(),
}).noUnknown();

export default organisationSchema;
