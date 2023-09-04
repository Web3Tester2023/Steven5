import React from "react";

import './layouts.scss'
import { Header } from "./header";
// import { Footer } from "./footer";

export const Layouts = ({ children }: ComPropsObject) => {
  return (
    <div className="layouts-wrapper">
      <Header />

      {children}

      {/* <Footer /> */}
    </div>
  )
}