// component/chargers/charger-form.tsx
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { paths } from "../../paths";
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Map from "../../pages/map/index"
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import {MyFormValues} from "../schema/scChargerForm";
import {formschema} from "../schema/scChargerForm"


export default function ChargerForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [owners, setOwners] = useState<{ ownerId: string }[]>([]);
  const router=useRouter()
  const location = useSelector((state: RootState) =>state.location );


  const getOwners = async () => {
    try {
      const response = await axios.get(
        "https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/owners"
      );
        setOwners(response.data.data.owners);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "Check the internet",
        confirmButtonColor: "red"
      });    }
  };

  useEffect(() => {
    getOwners();
  }, []);

  const initialValues: MyFormValues = {
    ID: "",
    password: "",
    ConnectorID: 1,
    connectorName: "",
    capacity: 0,
    type: "",
    owners: "",
  
  };

  const registercharger = async (ID: string, password: string,
     owners: string, ConnectorID: number, 
     connectorName: string, capacity: number, type: string) => {
      if (capacity !== 0 && location.lat !== 0 && location.lng !== 0 && ConnectorID !== 0) {

  
       await axios.post("https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/register", {
        chargePointId: ID,
        password
      }).then(async(res)=>{

      const { message } = res.data;
      if (message === "Charger Registerd Successfully") {
        await registerRestData(ID, owners, ConnectorID, connectorName, capacity, type);
      }else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: 'Your ID is unique, ensuring no duplicates exist ',
          confirmButtonColor:"red"
  
  
        })
      }
      }).catch((error)=>{    
   if(error.response.data.message==="Dublicate key, the element with this chargePointId is already exist."){

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: 'Your ID is unique, ensuring no duplicates exist ',
        confirmButtonColor:"red"


      })}else{
        Swal.fire({
          icon: "error",
          // title: "Oops...",
          title: "Something went wrong!",
          text: 'Check the Internet oioi',
          confirmButtonColor: "red"
        })
      }})
    
  } else {
      Swal.fire({
          icon: "error",
          // title: "Oops...",
          title: "Something went wrong!",
          text: 'Make sure capacity or Latitude or Longitude or ConnectorID not equal zero ',
          confirmButtonColor: "red"
      });
  }
  }
  const registerRestData = async (ID: string,  owners?: string, ConnectorID?: number, connectorName?: string,
      capacity?: number, type?: string) => {
    try {
            const res = await axios.post("https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers", {
                id: ID,
                owner: owners,
                capacity ,
                connectors: [
                    {
                        connectorId: Number(ConnectorID),
                        name: connectorName,
                        
                        type
                    }
                ],
                latitude: location.lat,
                longitude: location.lng ,
                street:location.street ,
                city:location.city
            });

            if (res.data.message === "Charger added successfully") {
              Swal.fire({
                icon: "success",
                title: "Charger added successfully",
                showConfirmButton: false,
                timer: 900,
              });
                router.push("/chargers", { scroll: false });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonColor: "red"
                });
            }
        

    } catch (error) {
      console.log("loctaipon",location)
      Swal.fire({
        
        icon: "error",
        title: "Oops...",
        text: "Make sure you add charger location",
        confirmButtonColor: "red"
      });
    }
}

  const addOwner = async (ownerid: string, title: string) => {
    
        
         
            await axios.post(
              "https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/owners",
              {
                ownerId: ownerid,
                title: title,
              }
            ).then((res)=>{
              if (res.data.message === "Owner successfully added") {
              getOwners();
            }else if(res.data.message ==="Duplicate key, the element with this field already exists."){
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: 'the new owner is already exists '
              });
            } 
            }).catch((error)=>{
              if(error.response.data.message==="Invalid Input: The id of the owner is required., Owner title is required and must be a string."){
     Swal.fire({
              icon: "error",
              // title: "Oops...",
              title: "Something went wrong!",
              text: "Invalid Input",
              confirmButtonColor: "red"
    
            });
              }
              // else if(error.response.data.message===){

              // }
              
              
              
              else{
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Check the Internet, can't add data",
                  confirmButtonColor: "red"
                });
              }
            })
   
      }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={formschema}
        onSubmit={(values, actions) => {
          const { ID, password, owners, ConnectorID, connectorName, capacity, type } = values;
          registercharger(ID, password, owners, ConnectorID, connectorName, capacity, type);
          actions.setSubmitting(false);
          // actions.resetForm();
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
                    <FormControl isInvalid={!!errors.ID && touched.ID}>
                      <FormLabel htmlFor="ID">ID</FormLabel>
                      <Field as={Input} autoComplete="off" name="ID" id="ID" />
                      {errors.ID && touched.ID ? (
                        <Box color="red.500">{errors.ID}</Box>
                      ) : null}
                    </FormControl>
                    <FormControl isInvalid={!!errors.password && touched.password}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field as={Input} type="password" name="password" id="password" autoComplete="new-password" />
                      {errors.password && touched.password ? (
                        <Box color="red.500">{errors.password}</Box>
                      ) : null}
                    </FormControl>
                  </Box>
                </CardBody>
              </Card>
              <Card>
                <CardHeader bgColor="neutral.100" fontWeight="semibold">
                  Location
                </CardHeader>
                <CardBody>
                  <Box display="grid" gridTemplateColumns={{ base: "1fr", lg: "1fr " }} gap="space-md">
                  <Map/>
                  </Box>
                </CardBody>
              </Card>
              <Card>
                <CardHeader bgColor="neutral.100" fontWeight="semibold">
                  Details
                </CardHeader>
                <CardBody>
                  <Box display="grid" gridTemplateColumns={{ base: "3fr", lg: "2fr 2fr" }} gap="space-md">
                    <FormControl isInvalid={!!errors.owners && touched.owners}>
                      <FormLabel htmlFor="owners">Owners</FormLabel>
                      <Field as={Select} id="owners" name="owners">
                        <option value="" disabled>Select Owner</option>
                        {owners.map((owner, index) => (
                          <option key={index} value={owner.ownerId}>
                            {owner.ownerId}
                          </option>
                        ))}
                      </Field>
                      {errors.owners && touched.owners ? (
                        <Box color="red.500">{errors.owners}</Box>
                      ) : null}
                    </FormControl>
                    <div>
                      <Button mt="space-lg" onClick={onOpen}>
                        Add Owner
                      </Button>
                    </div>
                    <FormControl isInvalid={!!errors.capacity && touched.capacity}>
                      <FormLabel htmlFor="capacity"> Charging Capacity</FormLabel>
                      <Field as={Input} type="number" name="capacity" id="capacity" />
                      {errors.capacity && touched.capacity ? (
                        <Box color="red.500">{errors.capacity}</Box>
                      ) : null}
                    </FormControl>
                  </Box>
                </CardBody>
              </Card>
              <Card>
                <CardHeader bgColor="neutral.100" fontWeight="semibold">
                  Power Specialist
                </CardHeader>
                <CardBody>
                  <Box display="grid" gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="space-md">
                    <FormControl isInvalid={!!errors.ConnectorID && touched.ConnectorID}>
                         <FormLabel htmlFor="ConnectorID">Connector ID</FormLabel>
  <Field as={Input} name="ConnectorID" id="ConnectorID"  >
    
  </Field>
                      {errors.ConnectorID && touched.ConnectorID ? (
                        <Box color="red.500">{errors.ConnectorID}</Box>
                      ) : null}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!errors.connectorName && touched.connectorName
                      }
                    >
                      <FormLabel htmlFor="connectorName">Connector Name</FormLabel>
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
                  {/* <ArrowBackIcon /> */}
                   Back to charger
                </Button>
                <Button type="submit" colorScheme="green" size="md" alignSelf="flex-start">
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Owner</ModalHeader>
          <hr />
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="space-sm">
              <FormLabel>OwnerID</FormLabel>
              <Input name="ownerid" id="ownerid"/>
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input id="title" name="title"/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={() => {
              const owneridInput = document.getElementById("ownerid") as HTMLInputElement;
              const titleInput = document.getElementById("title") as HTMLInputElement;
              const ownerid = owneridInput?.value || "";
              const title = titleInput?.value || "";
              addOwner(ownerid, title);
              onClose();
            }}>
              Add
            </Button>
          <Button colorScheme="gray" onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}


