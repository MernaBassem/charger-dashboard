import {
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { FaArrowRight, FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../contexts/auth-context";
import { users } from "../../data/users";
import useModal from "../../hooks/use-modal";
import { paths } from "../../paths";
import { FormData, useAuthForm } from "./use-auth-form";

export default function AuthForm() {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();
  const { errors, handleSubmit, isSubmitting, register } = useAuthForm();
  const { Modal, handleOpenModal } = useModal();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  const handleSignIn: SubmitHandler<FormData> = (data) => {
    const { email, password } = data;
    try {
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        throw new Error("Invalid email or password.");
      } else {
        signIn(user.id);
        router.push(paths.index);
      }
    } catch (error: any) {
      handleOpenModal({
        heading: "Error",
        message: error.message,
      });
    }
  };

  return (
    <>
      <Card variant="outline" maxW="md" w="full" px="space-md" py="space-2xl" bgColor="bg.clear">
        <Center flexDirection="column">
          <Icon as={FaUserShield} boxSize="8" mb="space-md" color="primary.dark" />
          <Heading as="h3" size="lg" mb="space-lg">
            Sign In
          </Heading>
          <Box
            as="form"
            display="flex"
            flexDirection="column"
            gap="space-lg"
            w="full"
            onSubmit={handleSubmit(handleSignIn)}
            noValidate
          >
            <FormControl isInvalid={Boolean(errors.email)} isRequired>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                variant="filled"
                placeholder="Enter your email"
                {...register("email")}
                autoComplete="off"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password)} isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Box position="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  variant="filled"
                  placeholder="Your password"
                  {...register("password")}
                  autoComplete="off"

                />
                <Icon
                  as={showPassword ? FaEye : FaEyeSlash}
                  position="absolute"
                  right="1.5rem"
                  top="50%"
                  transform="translateY(-50%)"
                  cursor="pointer"
                  onClick={togglePasswordVisibility}
                />
              </Box>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              colorScheme="primary"
              rightIcon={<FaArrowRight />}
              isLoading={isSubmitting}
            >
              Enter
            </Button>
          </Box>
        </Center>
      </Card>
      <Modal />
    </>
  );
}