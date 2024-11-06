import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  Heading,
  Input,
  Select,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../../../components/layout/layout";
import { appConfig } from "../../../../config";
import Link from "next/link";
import { paths } from "../../../../paths";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Transaction from "./transaction";
import { MdArrowBackIos } from "react-icons/md";

// Define the type for connectors
interface Connector {
  connectorId: number;
  name: string;
  voltage: number;
  type: string;
  _id: string;
}

export default function ChargerOCPP() {
  const { query: { chargerId, charger_id } } = useRouter();
  const [connectorsdata, setconnectorsdata] = useState<Connector[]>([]);
  
  useEffect(() => {
    getchargerdata();
  }, []);
  
  const getchargerdata = async () => {
    try {
      const res = await axios.get(`https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/${charger_id}`);
      if (res.status === 200) {
        setconnectorsdata(res.data.data.charger.connectors);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: 'Please check your internet connection',
        confirmButtonColor: "red"
      });
    }
  };
  
  const [data, setData] = useState({
    GetConfiguration: " ",
    ChangeConfiguration: "",
    connector:""
  });
  
  const handleChange = () => {
    const { ChangeConfiguration } = data;
    changeconfg(ChangeConfiguration);
  };
  const handleGetConfiguration = () => {
    const { GetConfiguration } = data;
    getconfg(GetConfiguration);
  };


  const PAGE_TITLE = `OCPP - ChargerId: ${chargerId}`;

  const changeconfg = async (ChangeConfiguration?: string) => {
    await axios
      .post(
        "https://7j5ryusgqi.execute-api.eu-central-1.amazonaws.com/ocpp/change-configuration",
        {
          chargePointId: chargerId,
          key: ChangeConfiguration,
          value: "true",
        }
      )
      .then((res) => {
        if (
          res.data.message === "Change-Configuration request sent successfully"
        ) {
          Swal.fire({
            icon: "success",
            title: "Configuration has been successfully changed",
            showConfirmButton: false,
            timer: 1200,
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);

        if (
          error.response.data.message ===
          "Charge Point has no active WebSocket connection"
        ) {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "The charger is currently offline",
            confirmButtonColor: "red",
          });
        } else if( error.response.data.message === "Invalid Input: Please provide the key, must be string less than 50 chars."){
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Please make sure you select a configuration option before proceeding",
            confirmButtonColor: "red",
          });  
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text:"check the Internet",
            confirmButtonColor: "red",
          });
        }
      });
  };
  const getconfg = async (GetConfiguration?: string) => {
   
    await axios
      .post(
        "https://7j5ryusgqi.execute-api.eu-central-1.amazonaws.com/ocpp/get-configuration",
        {
          chargePointId: chargerId,
          key: [GetConfiguration],
        }
      )
      .then((res) => {
        if (
          res.data.message === "Get-Configuration request sent successfully"
        ) {
          Swal.fire({
            icon: "success",
            title: "Get-Configuration request sent successfully",
            showConfirmButton: false,
            timer: 1200,
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);

        if (
          error.response.data.message ===
          "Charge Point has no active WebSocket connection"
        ) {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "The charger is currently offline",
            confirmButtonColor: "red",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Please make sure you select a  configuration option before proceeding",
            confirmButtonColor: "red",
          });
        }
      });
  };
   const numberToWords = (num: number) => {
    const words = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    return words[num] || num.toString(); 
  };
const handleUnlockConnector=async()=>{
  const{connector}=data
  
  await axios.post("https://7j5ryusgqi.execute-api.eu-central-1.amazonaws.com/ocpp/unlock-connector",{
    chargePointId:chargerId,
    connectorId: +connector
  }).then((res)=>{
  
    if(res.data.message==="Unlock-Connector request sent successfully"){
      Swal.fire({
        icon: "success",
        title: "Unlock configuration operation was successfully",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  }).catch((error) => {
    console.log(error.response.data.message);
    if (
      error.response.data.message ===
      "Charge Point has no active WebSocket connection"
    ) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "The charger is currently offline",
        confirmButtonColor: "red",
      });
    } 
    else if(error.response.data.message === "Invalid Input: Please provide the connectorId, must be a number greater than 0."){
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please make sure you choose a connector",
        confirmButtonColor: "red",
      });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Check the Internet",
        confirmButtonColor: "red",
      });
    }
  })
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
  
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        gap="space-md"
        p="space-md"
      >
        <Card>
          <CardBody
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="space-sm"
          >
            <Heading as="h6" fontSize="md">
              Unlock Connector
            </Heading>
           
              <Select
                name="connectors"
                id="connector"
                value={data.connector}
                onChange={(e) =>
                  setData({ ...data, connector: e.target.value })
                }
              >
                <option value="" disabled> Select a connector</option>
                 {connectorsdata.map((conn, i) => (
                <option key={i} value={conn.connectorId}>{numberToWords(i )}</option> ))}
              </Select>
           
            <Button colorScheme="blue" onClick={handleUnlockConnector}>
            Unlock Connector
            </Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="space-sm"
          >
            <Heading as="h6" fontSize="md">
              Get Configuration
            </Heading>
  
            <Select
              name="GetConfiguration"
              id="GetConfiguration"
              value={data.GetConfiguration}
              onChange={(e) =>
                setData({ ...data, GetConfiguration: e.target.value })
              }
            >
                <option value="" disabled>Select configuration</option>
              <option value=" " > Get all configuration</option>
              <option value="ConnectionTimeOut (in seconds)">
                ConnectionTimeOut (in seconds)
              </option>
              <option value="Config 2">Config 2</option>
            </Select>
  
            <Button colorScheme="blue" onClick={handleGetConfiguration}>
              Get Configuration
            </Button>
          </CardBody>
        </Card>
        <Card>
          <CardBody
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="space-sm"
          >
            <Heading as="h6" fontSize="md">
              Change Configuration
            </Heading>
            <Select
              name="ChangeConfiguration"
              id="ChangeConfiguration"
              value={data.ChangeConfiguration}
              onChange={(e) =>
                setData({ ...data, ChangeConfiguration: e.target.value })
              }
            >
  <option value="" disabled>Select configuration to change</option>
  <option value="ConnectionTimeOut (in seconds)">
                ConnectionTimeOut (in seconds)
              </option>
              <option value="Config 2">Config 2</option>
            </Select>
            <Button colorScheme="blue" onClick={handleChange}>
              Change Configuration
            </Button>
          </CardBody>
        </Card>

        <Transaction chargerId={chargerId} charger_id={charger_id}></Transaction>
      </Box>
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
    </>
  );
}

ChargerOCPP.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
