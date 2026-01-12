import { Roboto, Roboto_Flex } from "next/font/google";

export const robotoSans = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const robotoFlex = Roboto_Flex({
    weight: ["400", "700"],
    subsets: ["latin"],
});