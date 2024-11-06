import { Center, useBoolean } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import logoImage from "../../public/assets/images/logo.png";
import { appConfig } from "../config";
import { AuthContext } from "../contexts/auth-context";
import { paths } from "../paths";

const LoadingScreen = () => (
  <Center h="80vh">
    <Image src={logoImage} alt={appConfig.owner} width={80} height={80} />
  </Center>
);

type usePageProtectProps = {
  allow: "AUTHENTICATED" | "UNAUTHENTICATED";
};

export default function usePageProtect({ allow }: usePageProtectProps) {
  const { authUserId } = useContext(AuthContext);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useBoolean(true);

  useEffect(() => {
    if (allow === "AUTHENTICATED" && !authUserId && router.pathname !== paths.auth.signin) {
      router.push(paths.auth.signin);
    } else if (allow === "UNAUTHENTICATED" && authUserId) {
      router.push(paths.index);
    } else {
      setIsCheckingAuth.off();
    }
  }, [allow, authUserId, router, setIsCheckingAuth]);

  return { isCheckingAuth, LoadingScreen };
}
