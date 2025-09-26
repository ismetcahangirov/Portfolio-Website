"use client";

import React from "react";
import ReduxProvider from "../_redux/ReduxProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeModule from "@/components/ThemeModule";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import WelcomeMessage from "@/components/WelcomeMessage";

const RoutesLayout = ({ children }) => {
  return (
    <ReduxProvider>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      > */}
      <WelcomeMessage>
        <Header />
        {children}
        <Footer />
      </WelcomeMessage>
      <Toaster richColors={true} />
      <ScrollToTopButton />
      {/* </ThemeProvider> */}
    </ReduxProvider>
  );
};

export default RoutesLayout;
