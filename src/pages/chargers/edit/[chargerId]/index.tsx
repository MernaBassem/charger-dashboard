import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../../../components/layout/layout";
import { appConfig } from "../../../../config";
import { paths } from "../../../../paths";
import ChargerEdit from "../../../../components/chargers/charger-edit";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditCharger() {
  const { query: { chargerId ,chargerIdId} } = useRouter();
  const router = useRouter();

  const normalizedChargerId = Array.isArray(chargerId) ? chargerId[0] : chargerId ?? '';
  const normalizedChargerIdid = Array.isArray(chargerIdId) ? chargerIdId[0] : chargerIdId ?? '';

  const PAGE_TITLE = `Edit Charger `;

  async function handledelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Charger has been deleted.",
          icon: "success",
          confirmButtonColor:"red"


        });

        await axios.delete(`https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers/${normalizedChargerId}`).then((res) => {
         
          if (res.status === 204) {
            router.push("/chargers");
          }else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: 'This Charger not found '
              
            });
          }
        }).catch(()=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: 'This Charger not found ',
            confirmButtonColor:"red"

            
          });
        })
      }
    });
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
          {PAGE_TITLE} (Charger Id: {normalizedChargerIdid})
        </Heading>
      </Box>

      <Box p="space-md">
        <Flex minWidth='max-content' alignItems='center'>
          <Button
            as={Link}
            href={{ pathname: paths.chargers.addConnectors, query: { chargerId: normalizedChargerId ,chargerIdId:normalizedChargerIdid} }}
            colorScheme="secondary"
            mb="space-md"
          >
            Add Connectors
          </Button>
          <Spacer />
          <ButtonGroup>
            <Button colorScheme="red" onClick={handledelete}>
              Delete Charger
            </Button>
          </ButtonGroup>
        </Flex>
        <ChargerEdit chargerId={normalizedChargerId}></ChargerEdit>
      </Box>
    </>
  );
}

EditCharger.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
