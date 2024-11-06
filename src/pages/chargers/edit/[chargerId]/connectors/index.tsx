import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../../../../components/layout/layout";
import { appConfig } from "../../../../../config";
import Link from "next/link";
import { paths } from "../../../../../paths";
import * as Yup from 'yup';
import { Field, Formik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { MdArrowBackIos } from "react-icons/md";


interface MyFormValues {
 
  connectorId: number;
  connectorName: string;
  capacity: number;
  type: string;
 

}
const formschema = Yup.object().shape({
  connectorId: Yup.number()
  .required('Required'),
connectorName: Yup.string()
  .min(2, 'Too Short!')
  .max(30, 'Too Long!')
  .required('Required'),
capacity: Yup.number()
  .required('Required'),
type: Yup.string()
  .oneOf(["AC", "DC"], 'Invalid Type')
  .required('Required')
});

export default function EditCharger() {
  const initialValues: MyFormValues = {
    connectorId: 0,
    connectorName: "",
    capacity: 0,
    type: ""
  
  };
  const {
    query: { chargerId , chargerIdId },
  } = useRouter();
  const PAGE_TITLE = `Add Connectors (Charger Id: ${chargerIdId})`;
  const router=useRouter()
const addconnector= async (connectorId: number, connectorName: string, capacity: number, type: string)=>{
  if(capacity !==0 && connectorId !==0){
 await axios.post(`https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/connectors/${chargerId}`,{
  connectorId: connectorId,
  name: connectorName,
  voltage: capacity,
  type: type
 }).then((res)=>{
 const {message}=res.data
 if(message ==="Charger updated successfully"){

    Swal.fire({
      // position: "top-end",
      icon: "success",
      title: "Connector Added Successfully",
      showConfirmButton: false,
      timer: 900
    });
    router.push("/chargers");
   
 }
 }).catch(()=>{
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    footer: 'Connector Id is already exists ',
    confirmButtonColor:"red"

  })
 })}else{
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    footer: 'Make sure capacity Or ConnectorId not equal zero ',
    confirmButtonColor:"red"

  })
 }

}
  return (
    <>
      <Head>
        <title>{`${PAGE_TITLE} | ${appConfig.title}`}</title>
      </Head>

      <Box
        as="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="space-md"
        px="space-md"
        py="space-sm"
      >
        <Heading as="h1" size="lg">
          {PAGE_TITLE}
        </Heading>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={formschema}
        onSubmit={(values, actions) => {
          const {  connectorId, connectorName, capacity, type } = values;
          console.log(values);
          addconnector( connectorId, connectorName, capacity, type);
          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="space-md">
              <Card>
            <CardHeader bgColor="neutral.100" fontWeight="semibold">
              Identity
            </CardHeader>
            <CardBody>
              <Box display="grid" gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="space-md">
              <FormControl isInvalid={!!errors.connectorId && touched.connectorId}>
                      <FormLabel htmlFor="connectorId">Connector ID</FormLabel>
                      <Field as={Input} autoComplete="off" type="number" name="connectorId" id="connectorId" />
                      {errors.connectorId && touched.connectorId ? (
                        <Box color="red.500">{errors.connectorId}</Box>
                      ) : null}
                    </FormControl>
              </Box>
            </CardBody>
          </Card>
          <Card>
            <CardHeader bgColor="neutral.100" fontWeight="semibold">
              Specifications
            </CardHeader>
            <CardBody>
              <Box display="grid" gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="space-md">
              <FormControl
                      isInvalid={
                        !!errors.connectorName && touched.connectorName
                      }
                    >
                      <FormLabel htmlFor="connectorName">Name</FormLabel>
                      <Field as={Select} name="connectorName" id="connectorName">
                        <option value="" disabled>Select  ConnectorName</option>
                        <option value="CCS 2">CCS 2</option>
                        <option value="CHADEMO">CHADEMO</option>
                        <option value="Type 2">Type 2</option>
                        <option value="GB/T">GB/T</option>
                      </Field>
                      {errors.connectorName && touched.connectorName ? (
                        <Box color="red.500">{errors.connectorName}</Box>
                      ) : null}
                    </FormControl>

                    <FormControl isInvalid={!!errors.capacity && touched.capacity}>
                      <FormLabel htmlFor="capacity">Charging Capacity</FormLabel>
                      <Field as={Input} type="number" name="capacity" id="capacity" />
                      {errors.capacity && touched.capacity ? (
                        <Box color="red.500">{errors.capacity}</Box>
                      ) : null}
                    </FormControl>
                     <FormControl isInvalid={!!errors.type && touched.type}>
                      <FormLabel htmlFor="type">Power Type</FormLabel>
                      <Field as={Select} id="type" name="type">
                        <option value="" disabled>Select  Type</option>
                        <option value="AC">AC</option>
                        <option value="DC">DC</option>
                      </Field>
                      {errors.type && touched.type ? (
                        <Box color="red.500">{errors.type}</Box>
                      ) : null}
                    </FormControl>
              </Box>
            </CardBody>
          </Card>
          <Box p="space-md">
                <Spacer/>
                <Button
                  m={2}
                  colorScheme="gray"
                  as={Link}
                  href={{ pathname: paths.chargers.index }}
                  size="md"
                  alignSelf="flex-start"
                  fontSize={16}
                >
                 <Text fontSize='md' p={1}> <MdArrowBackIos /></Text>

                   Back to Charger
                </Button>
                  <Button type="submit" colorScheme="green" size="md" alignSelf="flex-start">
                    Add 
                  </Button>
                </Box>
        </Box>
     
        </form>
        )}
      </Formik>
    </>
  );
}

EditCharger.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
