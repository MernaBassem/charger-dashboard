import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { paths } from "../../paths";
import { Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ChargerModel } from "../../Redux/Slices/Chargers";
import { TbTrash } from "react-icons/tb";
import { useRouter } from "next/router";
import { MdArrowBackIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import Map from "../../pages/map";
import Image from "next/image";
import { MyFormValues } from "../schema/scChargeredit";
import {formSchema} from  "../schema/scChargeredit"; 


type ChargerEditProps = {
  chargerId: string;
};

export default function ChargerEdit({ chargerId }: ChargerEditProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [owners, setOwners] = useState<{ ownerId: string }[]>([]);
  const router = useRouter();
  const [chargerdata, setChargerData] = useState<ChargerModel | null>(null);
  const location = useSelector((state: RootState) =>state.location );

  useEffect(() => {
    getOwners();
    getDataCharger();
  }, []);

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
        confirmButtonColor: "red",
      });
    }
  };

  async function getDataCharger() {
    try {
      const response = await axios.get(
        `https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/${chargerId}`
      );
      setChargerData(response.data.data.charger);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "This charger not found",
        confirmButtonColor: "red",
      });
    }
  }

  const initialValues: MyFormValues = {
    city: chargerdata?.city || "",
    street: chargerdata?.street || "",
    latitude: chargerdata?.latitude || 0,
    longitude: chargerdata?.longitude || 0,
    capacity: chargerdata?.capacity || 0,
    connectors: chargerdata?.connectors.map(connector => ({
      ...connector,
      connectorId: Number(connector.connectorId), // Ensure connectorId is treated as number
    })) || [],
    owners: chargerdata?.owner || "",
  };
  

  const registerRestData = async (
    city?: string,
    longitude?: number,
    latitude?: number,
    street?: string,
    owners?: string,
   capacity?: number,
    connectors?: { connectorId: number; name: string; type: string; }[]
  ) => {
    if (latitude !== 0 && longitude !== 0 ) {
      try {
        const response = await axios.patch(
          `https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/${chargerId}`,
          {
            owner: owners,
            latitude: location.lat,
            longitude: location.lng ,
            street:location.street ,
            city:location.city,
            capacity,
            connectors,
          }
        );
        if (response.data.message === "Charger updated successfully") {
          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "Charger updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/chargers");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "Try Again",
          confirmButtonColor: "red",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "Make sure any value you added is not equal to zero",
        confirmButtonColor: "red",
      });
    }
  };

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
        } else if (res.data.message === "Duplicate key, the element with this field already exists.") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "The new owner is already exists",
          });
        }}).catch((error)=>{
          if(error.response.data.message==="Invalid Input: The id of the owner is required., Owner title is required and must be a string."){
 Swal.fire({
          icon: "error",
          // title: "Oops...",
          title: "Something went wrong!",
          text: "Invalid Input",
          confirmButtonColor: "red"

          // footer: "The new owner already exists",
        });
          }else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Check the Internet",
              confirmButtonColor: "red"
    
              // footer: "The new owner already exists",
            });
          }
        })

     
    
  };

  const handleDelete = async (connectorId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "green",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/connectors/${chargerId}`,
            {
              data: { connectorId },
            }
          );
          if (response.data.message === "Connector deleted successfully") {
            getDataCharger();
            Swal.fire({
              title: "Deleted!",
              text: "Your Connector has been deleted.",
              icon: "success",
              confirmButtonColor: "red",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "This connector not found",
            confirmButtonColor: "red",
          });
        }
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          const { city, longitude, latitude, street, owners, connectors, capacity} = values;
          registerRestData(city, longitude, latitude, street, owners,capacity ,connectors);
          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit, errors, touched, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {chargerdata ? (
              <Box display="flex" flexDirection="column" gap="space-md">
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
                    <Box display="grid" gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="space-md">
                      <FormControl isInvalid={!!errors.owners && touched.owners}>
                        <FormLabel htmlFor="owners">Owners</FormLabel>
                        <Field as={Select} id="owners" name="owners">
                          <option value="" disabled>
                            Select Owner
                          </option>
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
                      <FormControl>
                                <FormLabel htmlFor="capacity"> Charging Capacity</FormLabel>
                                <Field
                                  as={Input}
                                  type="number"
                                  name="capacity"
                                  id="capacity"
                                />
                              </FormControl>
                    </Box>
                  </CardBody>
                </Card>
                <FieldArray name="connectors">
                  {({ remove, push }) => (
                    <>
                      {values.connectors.map((connector, i) => (
                        <Card key={i}>
                          <CardHeader bgColor="neutral.100" fontWeight="semibold">
                            <Flex minWidth="max-content" alignItems="center">
                              {i + 1} - Connector
                              <Spacer />
                              <Button
                                color="red"
                                fontSize={24}
                                onClick={() => handleDelete(connector.connectorId)}
                              >
                                <TbTrash />
                              </Button>
                            </Flex>
                          </CardHeader>
                          <CardBody>
                            <Box
                              display="grid"
                              gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                              gap="space-md"
                            >
                              <FormControl>
                                <FormLabel htmlFor={`connectors.${i}.connectorId`}>
                                  Connector ID
                                </FormLabel>
                                <Field
                                  as={Input}
                                  autoComplete="off"
                                  type="number"
                                  name={`connectors.${i}.connectorId`}
                                  id={`connectors.${i}.connectorId`}
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel htmlFor={`connectors.${i}.name`}>Name</FormLabel>
                                <Field
                                  as={Select}
                                  name={`connectors.${i}.name`}
                                  id={`connectors.${i}.name`}
                                >
                                  <option value="" disabled>
                                    Select your ConnectorName
                                  </option>
                                  <option value="CCS 2">CCS 2</option>
                                  <option value="CHADEMO">CHADEMO</option>
                                  <option value="Type 2">Type 2</option>
                                  <option value="GB/T">GB/T</option>
                                </Field>
                              </FormControl>
                        
                              <FormControl>
                                <FormLabel htmlFor={`connectors.${i}.type`}>Power Type</FormLabel>
                                <Field
                                  as={Select}
                                  id={`connectors.${i}.type`}
                                  name={`connectors.${i}.type`}
                                >
                                  <option value="" disabled>
                                    Select your Type
                                  </option>
                                  <option value="AC">AC</option>
                                  <option value="DC">DC</option>
                                </Field>
                              </FormControl>
                            </Box>
                          </CardBody>
                        </Card>
                      ))}
                    </>
                  )}
                </FieldArray>
                <Box p="space-md">
                  <Spacer />
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
                    Save
                  </Button>
                </Box>
              </Box>
            ) : (
              <Center h="20rem" w="75rem">
              <Image src="/favicon-32x32.png" alt="img" width={37} height={20} />
              </Center>
            )}
          </Form>
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
              <FormLabel>ID</FormLabel>
              <Input name="ownerid" id="ownerid" />
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input id="title" name="title" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              colorScheme="green"
              onClick={() => {
                const owneridInput = document.getElementById("ownerid") as HTMLInputElement;
                const titleInput = document.getElementById("title") as HTMLInputElement;
                const ownerid = owneridInput?.value || "";
                const title = titleInput?.value || "";
                addOwner(ownerid, title);
                onClose();
              }}
            >
              Save
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}


       