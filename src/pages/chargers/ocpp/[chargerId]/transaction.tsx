import { Box, Button, Card, CardBody, Heading, Input, Select, Text } from '@chakra-ui/react';
import axios from 'axios';
import { error } from 'console';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

type id={
  chargerId:any,
  charger_id:any
}
interface Connector {
  connectorId: number;
  name: string;
  voltage: number;
  type: string;
  _id: string;
}

const Transaction = ({chargerId, charger_id}: id) => {
  const [connectorsdata, setconnectorsdata] = useState<Connector[]>([]);
  
  useEffect(() => {
    getchargerdata();
  }, []);

  const [transdata, settransdata] = useState({
    Reset: " ",
    triggerMessage: "",
    connectors: {  
      remoteStartTransaction: "",
      remoteStopTransaction: "",
      triggerMessage: "",
    },
    emails:{
      emailStart:"",
      emailEnd:""
    }
  });

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

  const numberToWords = (num: number) => {
    const words = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    return words[num] || num.toString();
  };

  const handleTriggerMessage = async () => {
    const { triggerMessage, connectors } = transdata;
  
    await axios.post('https://7j5ryusgqi.execute-api.eu-central-1.amazonaws.com/ocpp/trigger-message', {
      chargePointId: chargerId,
      connectorId: +connectors.triggerMessage,  // Use the correct connector state
      message: triggerMessage
    }).then((res) => {
      if(res.data.message.includes("request sent successfully")){
        Swal.fire({
          icon: "success",
          title: "Trigger Message Sent Successfully",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    }).catch((error) => {
      if (error.response.data.message === "Charge Point has no active WebSocket connection") {
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
          // text: "Please select either a soft reset or a hard reset for your charger",
          confirmButtonColor: "red",
        });
      }
    })
  

  }

  const handlerest = async () => {
    const { Reset } = transdata;
    console.log(Reset);
    Swal.fire({
      title: "Do you want to reset the charger ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "reset",
      denyButtonText: `Don't reset`
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.post("https://7j5ryusgqi.execute-api.eu-central-1.amazonaws.com/ocpp/reset", {
          chargePointId: chargerId,
          type: Reset
        }).then((res) => {
          if (res.data.message === "Reset request sent successfully") {
            Swal.fire("Your reset request has been sent successfully", "");
          }
        }).catch((error) => {
          if (error.response.data.message === "Charge Point has no active WebSocket connection") {
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
              text: "Please select either a soft reset or a hard reset for your charger",
              confirmButtonColor: "red",
            });
          }
        })
      } else if (result.isDenied) {
        Swal.fire("The charger is not reset", "", "info");
      }
    });
  }
  const handleStartTransc=async()=>{
    const{connectors,emails}=transdata
    console.log(connectors.remoteStartTransaction);
    console.log(emails.emailStart);
    await axios.post('https://7j5ryusgqi.execute-api.eu-central-1.amazonaws.com/ocpp/remote-start-transaction',
      {
        chargePointId: chargerId,
        connectorId: +connectors.remoteStartTransaction,
        email:emails.emailStart
      }
    ).then((res)=>{
   if(res.data.message==="Remote start transaction request sent"){
   Swal.fire({
          icon: "success",
          title: "Your charging session has successfully started",
          showConfirmButton: false,
          timer: 1200,
        });
        }
    }).catch((error)=>{
   console.log(error);
    if(error.response.data.message.includes(`Invalid Input`) ){
     Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "Invalid Input",
              confirmButtonColor: "red",
            });
    }
    else if(error.response.data.message==="Charge Point has no active WebSocket connection"){
     Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "The charger is currently offline",
              confirmButtonColor: "red",
            });
    }
    else if(error.response.data.message.includes("no user registered ")){
     Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "Email not registered",
              confirmButtonColor: "red",
            });
    }
    else{
     Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "Check the Internet",
              confirmButtonColor: "red",
            });}
    })
  }
  const handleEndTransc=async()=>{
  const{emails}=transdata

  await axios.post("https://7j5ryusgqi.execute-api.eu-central-1.amazonaws.com/ocpp/remote-stop-transaction",{
  chargePointId: chargerId,
 email:emails.emailEnd
 }).then((res)=>{
  console.log(res);
  
   Swal.fire({
          icon: "success",
          title: "Your charging session has successfully ended",
          showConfirmButton: false,
          timer: 1200,
        });



 }).catch((error)=>{
  console.log(error);
 console.log(error.response.data.message);
 if(error.response.data.message.includes(`Invalid Input`)){
  Swal.fire({
    icon: "error",
    title: "Something went wrong!",
    text: "Invalid Input",
    confirmButtonColor: "red",
  });
} 
else if(error.response.data.message.includes("already ended")){
 Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "The last transaction is already ended",
              confirmButtonColor: "red",
            });
}else if(error.response.data.message ==="Charge Point has no active WebSocket connection"){
 Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "The charger is currently offline",
              confirmButtonColor: "red",
            });
} 
else if(error.response.data.message.includes("no user registered ")){
  Swal.fire({
           icon: "error",
           title: "Something went wrong!",
           text: "Email not registered",
           confirmButtonColor: "red",
         });
 }
else if(error.response.data.message.includes("No transaction found ")){
  Swal.fire({
           icon: "error",
           title: "Something went wrong!",
           text: "No transaction found for this Email",
           confirmButtonColor: "red",
         });
 }

else{
 Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "Check the Internet",
              confirmButtonColor: "red",
            });
}
 }) }

  return (
    <>
      <Card>
        <CardBody
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="space-md"
        >
          <Heading as="h6" fontSize="md">
            Remote Start Transaction
          </Heading>
          <Select
            name="remoteStartTransaction"
            id="remoteStartTransaction"
            value={transdata.connectors.remoteStartTransaction}
            onChange={(e) =>
              settransdata({
                ...transdata,
                connectors: { ...transdata.connectors, remoteStartTransaction: e.target.value }
              })
            }
          >
            <option value="" disabled>Select a connector</option>
            {connectorsdata.map((conn, i) => (
              <option key={i} value={conn.connectorId}>{numberToWords(i)}</option>
            ))}
          </Select>
          <Input placeholder="Email"  value={transdata.emails.emailStart} onChange={(e) =>
              settransdata({
                ...transdata,
                emails: { ...transdata.emails, emailStart: e.target.value }
              })
          }/>
          <Button colorScheme="blue" onClick={handleStartTransc}>Remote Start Transaction</Button>
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
            Remote Stop Transaction
          </Heading>
          <Select
            name="remoteStopTransaction"
            id="remoteStopTransaction"
            value={transdata.connectors.remoteStopTransaction}
            onChange={(e) =>
              settransdata({
                ...transdata,
                connectors: { ...transdata.connectors, remoteStopTransaction: e.target.value }
              })
            }
          >
            <option value="" disabled>Select a connector</option>
            {connectorsdata.map((conn, i) => (
              <option key={i} value={conn.connectorId}>{numberToWords(i)}</option>
            ))}
          </Select>
          <Input placeholder="Email"  value={transdata.emails.emailEnd} onChange={(e)=>{
          settransdata({
          ...transdata,emails:{...transdata.emails,emailEnd:e.target.value}})
          }} />
          <Button colorScheme="blue" onClick={handleEndTransc}>Remote Stop Transaction</Button>
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
            Trigger Message
          </Heading>
          <Select
            name="triggerMessage"
            id="triggerMessage"
            value={transdata.triggerMessage}
            onChange={(e) =>
              settransdata({ ...transdata, triggerMessage: e.target.value })
            }
          >
            <option value="" disabled>Select Message</option>
            <option value="StatusNotification">StatusNotification</option>
           <option value="DiagnosticsStatusNotification">Diagnostics Status Notification</option>
            <option value="FirmwareStatusNotification">Firmware Status Notification</option>
            <option value="Heartbeat">Heartbeat</option>
            <option value="MeterValues">MeterValues</option> 

          </Select>
          <Select
            name="triggerMessageConnector"
            id="triggerMessageConnector"
            value={transdata.connectors.triggerMessage}
            onChange={(e) =>
              settransdata({
                ...transdata,
                connectors: { ...transdata.connectors, triggerMessage: e.target.value }
              })
            }
          >
            <option value="" disabled>Select a connector</option>
            {connectorsdata.map((conn, i) => (
              <option key={i} value={conn.connectorId}>{numberToWords(i)}</option>
            ))}
          </Select>
          <Button colorScheme="blue" onClick={handleTriggerMessage}>Trigger Message</Button>
        </CardBody>
      </Card>

      <Card>
        <CardBody
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="space-md"
        >
          <Heading as="h6" fontSize="md">
          </Heading>
          <Text>
            <b>Attention</b>: The <b>soft</b> reset will occur after the charging operation completes, while the <b>hard</b> reset will be performed before the completion of the charging operation.
          </Text>
        </CardBody>
      </Card>

      <Card>
        <CardBody
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="space-md"
        >
          <Heading as="h6" fontSize="md">
            Reset
          </Heading>
          <Select
            name="GetConfiguration"
            id="GetConfiguration"
            value={transdata.Reset}
            onChange={(e) =>
              settransdata({ ...transdata, Reset: e.target.value })
            }
          >
            <option value=" " disabled>Select reset type</option>
            <option value="Soft">Soft</option>
            <option value="Hard">Hard</option>
          </Select>
          <Button colorScheme="red" onClick={handlerest}>Reset</Button>
        </CardBody>
      </Card>
    </>
  );
}

export default Transaction;
