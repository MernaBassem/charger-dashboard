import * as Yup from 'yup';

 export interface MyFormValues {
    ID: string;
    password: string;
    ConnectorID: number;
    connectorName: string;
    capacity: number;
    type: string;
    owners: string;
  
  }  
  export const formschema = Yup.object().shape({
    ID: Yup.string()
      .min(2, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required'),
      password: Yup.string()
      .min(8, 'Too Short!')
      .max(30, 'Too Long!')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase character')
      .matches(/[a-z]/, 'Password must contain at least one lowercase character')
      .matches(/^(?=.*[!@#$%^&*])/, 'Password must contain at least one symbol')
      .required('Required'),
    ConnectorID: Yup.number()
      .required('Required'),
    connectorName: Yup.string()
      .min(2, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required'),
    capacity: Yup.number()
      .required('Required'),
    type: Yup.string()
      .oneOf(["AC", "DC"], 'Invalid Type')
      .required('Required'),
    owners: Yup.string()
      .required('Required'),
  
  });