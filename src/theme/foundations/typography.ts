import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const fonts = {
  heading: poppins.style.fontFamily,
  body: inter.style.fontFamily,
};
