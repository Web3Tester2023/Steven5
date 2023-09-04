import React from "react";
import { Container } from "@mui/material";

import logoImg from "../../assets/image/logo.png";
import { SocialsLink } from "../com-hero/comHero";
import "./layouts.scss";

export const Footer = () => {
  return (
    <div className="pt-100 footer-top">
      <Container maxWidth={"xl"}>
        <div className="flex flex-col gap-30">
          <div className="flex flex-col">
            <div className="flex flex-row gap-20 flex-wrap items-center pb-20 md:pb-30">
              <div className="flex-1 flex flex-row justify-center">
                <img alt="" src={logoImg} className="w-[200px] h-[50px]" />
              </div>

              <SocialsLink />
            </div>

            <div className="h-2 bg-gray-500" />
          </div>

          <div className="flex flex-col sm:flex-row gap-10 md:gap-20 sm:justify-between sm:items-center px-10 md:px-30 pt-20">
            <div className="flex flex-row gap-10 md:gap-20 flex-wrap">
              Yander INC, Panama City, Panama
            </div>

            <div className="text-15 flex flex-row gap-5">
              <span className="text-borderColor">© 2023 YANDER</span>
              <span>All Rights Reserved.</span>
            </div>

            <div className="sm:text-end max-w-230">
              <span className="text-15">
                {/* Plaza 2000, Calle 50 and Marbella, Corregimiento de Bella Vista,
                Panama City, Panama */}
              </span>
            </div>
          </div>

          <div className="text-12 px-10 md:px-20 text-center pb-20">
            Cryptocurrency may be unregulated in your jurisdiction. The value of
            cryptocurrencies may go down as well as up. Profits may be subject
            to capital gains or other taxes applicable in your jurisdiction.
          </div>
        </div>
      </Container>
    </div>
  );
};
