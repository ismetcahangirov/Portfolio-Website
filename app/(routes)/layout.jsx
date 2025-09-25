"use client";

import React from "react";
import ReduxProvider from "../_redux/ReduxProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeModule from "@/components/ThemeModule";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

const RoutesLayout = ({ children }) => {
  return (
    <ReduxProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div>
          <Header />
          {children}
          <Footer />
        </div>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default RoutesLayout;
