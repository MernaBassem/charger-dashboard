import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import ChargersLocations from "../../components/chargers-locations/chargers-locations";
import Layout from "../../components/layout/layout";
import { appConfig } from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { chargers } from "../../types/map";
export default function Locations() {
  const PAGE_TITLE = "Locations";
const [mapData,setMapData]=useState<chargers[]>([])
useEffect(()=>{
  getMapData()
},[])
const getMapData=async()=>{
await axios.get('https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/locations').then((res)=>{

  setMapData(res.data.chargers);
}).catch((res)=>{
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Check the Internet",
  });
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

      <ChargersLocations mapData={mapData}/>
    </>
  );
}

Locations.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
