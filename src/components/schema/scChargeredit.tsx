
import * as Yup from 'yup';

export interface MyFormValues {
    city: string;
    street: string;
    latitude: number;
    longitude: number;
    capacity: number;
    connectors: {
      connectorId: number; 
      name: string;
      type: string;
    }[];
    owners: string;
  }
 

  export const formSchema = Yup.object().shape({
    city: Yup.string().required('City is required'), 
       street: Yup.string().min(2, "Too Short!").max(70, "Too Long!").required("Required"),
    latitude: Yup.number().required("Required"),
    longitude: Yup.number().required("Required"),
    capacity: Yup.number().required("Required"),  // Corrected capacity validation
  
    connectors: Yup.array().of(
      Yup.object().shape({
        connectorId: Yup.number().required("Required"),
        name: Yup.string().min(2, "Too Short!").max(30, "Too Long!").required("Required"),
        type: Yup.string().oneOf(["AC", "DC"], "Invalid Type").required("Required"),
      })
    ),
    owners: Yup.string().required("Required"),
  });


  