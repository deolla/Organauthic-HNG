import * as yup from 'yup';

const userOrgSchema = yup.object().shape({
    userId: yup.string().required('User ID is required'),
  })
export default userOrgSchema;