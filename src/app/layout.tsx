import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Listagem de posts",
  description: "Desafio da imersão full cycle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: 'black' }}>
        <AppRouterCacheProvider>
          <Box sx={{
            width: "100%",
            height: "100%"
          }}>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
