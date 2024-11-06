import {
  Box,
  Button,
  Card,
  Heading,
  Input,
  Spinner,
  useToast,
  Text,
  Spacer,
  Link,
  Flex,
  Center,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import { appConfig } from "../../config";
import { Customer } from "../../types/customer";
import Swal from "sweetalert2";
import { MdArrowBackIos } from "react-icons/md";
import { paths } from "../../paths";

export default function EditCustomer() {
  const PAGE_TITLE = "Edit Customer Email";
  const router = useRouter();
  const { email } = router.query;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const toast = useToast();

  const fetchCustomer = async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/users`
    );
    const data = await res.json();
    const foundCustomer = data.data.users.find(
      (user: Customer) => user.email === email
    );
    setCustomer(foundCustomer);
    setNewEmail(foundCustomer.email);
    setIsLoading(false);
  };

  useEffect(() => {
    if (email) fetchCustomer();
  }, [email]);

  // Handle delete customer
  const deleteCustomer = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(
            `https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/users/${email}`,
            {
              method: "DELETE",
            }
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          router.push(paths.customers.index);
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting the session.",
            icon: "error",
          });
        }
      }
    });
  };

  const isValidEmail = (email: string) =>
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);


  const updateCustomer = async () => {
    if (!newEmail.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Email",
        text: "Please Enter an New Email Address.",
        confirmButtonColor: "red",
      });
      return;
    }

    if (!isValidEmail(newEmail)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email Format",
        text: "Please enter a valid email address.",
        confirmButtonColor: "red",
      });
      return;
    }
    if (!customer) return;
    try {
      const res = await fetch(
        `https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/users/update`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentEmail: customer.email,
            newEmail: newEmail,
          }),
        }
      );
      if (res.ok) {
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "User updated successfully",
          showConfirmButton: false,
          timer: 900,
        });
        router.push("/customers");
      } else {
        console.error("Failed to update customer:", res.statusText);
        throw new Error("Failed to update customer");
      }
    } catch (error) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    footer: "The email might already exist or there's a connection issue.",
    confirmButtonColor: "red",
  });    }
  };

  return (
    <>
      <Head>
        <title>{`${PAGE_TITLE} | ${appConfig.title}`}</title>
      </Head>
      <Box p="space-md">
        <Flex minWidth="max-content" alignItems="center">
          <Heading as="h2" size="md" mb="space-md">
            Edit User
          </Heading>
          <Spacer />
          <Button colorScheme="red" onClick={deleteCustomer}>
            Delete User
          </Button>
        </Flex>
      </Box>
      <Card bgColor="bg.clear" p="space-lg" mx="space-md">
        {isLoading ? (
          <Center w="100%" h="10rem">
            <Spinner size="lg" />
          </Center>
        ) : (
          <>
            <Box p="space-md">
              <Heading as="h3" size="sm" mb="space-sm">
                New Email
              </Heading>
              <Box mb="space-sm">
                <Input
                  placeholder="New Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </Box>

              <Box>
                <Spacer />
                <Button
                  m={2}
                  colorScheme="gray"
                  onClick={() => router.push(paths.customers.index)}
                  size="md"
                  alignSelf="flex-start"
                  fontSize={16}
                >
                  <Text fontSize="md" p={1}>
                    {" "}
                    <MdArrowBackIos />
                  </Text>
                  Back to Users
                </Button>
                <Button colorScheme="blue" onClick={updateCustomer}>
                  Save Changes
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Card>
    </>
  );
}

EditCustomer.getLayout = function (page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
