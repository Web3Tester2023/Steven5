import { useEffect, useState } from "react";
import { Container } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import AddIcon from "@mui/icons-material/Add";
import MinimizeIcon from "@mui/icons-material/Minimize";

import "./home.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import futureImg from "../../assets/image/ARTIST.png";
import directionImg from "../../assets/image/DIRECTION.png";
import gameImg from "../../assets/image/GAMIING.png";
import tshirtImg from "../../assets/image/tshirt.png";
import { ComponentHero } from "../com-hero/comHero";
import { roadmapList } from "./home.config";
import { Footer } from "../layouts/footer";
import Chart from "../Pie";
import faqImg from "../../assets/image/faq.png";
import faqList from "./faq.json";
// @ts-ignore
import Fade from "react-reveal/Fade";
// @ts-ignore
import Rotate from "react-reveal/Rotate";
// @ts-ignore
import Zoom from "react-reveal/Zoom";

export const HomePage = () => {
  const [sliderCount, setSliderCount] = useState(0);
  const [activeRoadmap, setActiveRoadmap] = useState(0);

  useEffect(() => {
    changeSliderCount();
    window.addEventListener("resize", changeSliderCount);
  }, []);

  const changeSliderCount = () => {
    let tempCount = 0;

    if (window.innerWidth > 1500) {
      tempCount = 4;
    } else if (window.innerWidth > 1024) {
      tempCount = 3;
    } else if (window.innerWidth > 600) {
      tempCount = 2;
    } else {
      tempCount = 1;
    }

    setSliderCount(tempCount);
  };

  return (
    <div className="flex flex-col bg-[#1b8ad2]" id="buy-ai-now">
      <ComponentHero />
      <div id="ai-token" className="ai-token">
        <Container maxWidth={"xl"} className="pt-20 md:pt-100 pb-20">
          <Zoom>
            <div className="text-[50px] text-center flex items-center justify-center">
              ABOUT APE WARRIOR
            </div>
          </Zoom>
          <div className="flex flex-col gap-30">
            <CustomDivider />

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-30 lg:gap-0">
              <div className="flex flex-col gap-30 md:gap-0">
                <div className="flex flex-col sm:flex-row justify-center gap-[100px] items-center">
                  <Fade top>
                    <img alt="" src={gameImg} className="max-w-300" />
                  </Fade>
                  <Fade right>
                    <span className="text-16 max-w-400">
                      At APEWARRIOR, we're not just another cryptocurrency project; we're a force of nature, powered by the relentless determination and strength of Apes. Our mission? To conquer the crypto jungle and aim for a staggering $100 million market cap. How do we plan to do it? By harnessing the collective power of our APE community. We're not here to monkey around; we're here to lead the way in the world of crypto.
                    </span>
                  </Fade>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-[100px] items-center">
                  <Fade left>
                    <span className="text-16 max-w-400">
                      We believe in the power of unity, and that's why APEWARRIOR is all about community-driven growth. We're committed to giving back to our investors through innovative staking solutions, exclusive benefits for presale participants, and exciting features that set us apart from the competition.
                    </span>
                  </Fade>
                  <Fade top>
                    <img alt="" src={futureImg} className="max-w-300" />
                  </Fade>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-[100px] items-center">
                  <Fade top>
                    <img alt="" src={tshirtImg} className="max-w-300" />
                  </Fade>
                  <Fade right>
                    <span className="text-16 max-w-400">
                      Our target is bold and ambitious: a $100 million market cap. When you invest in APEWARRIOR, you're joining a community that's not afraid to aim high, with the strength and determination of Apes by your side.
                    </span>
                  </Fade>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-[100px] items-center">
                  <Fade left>
                    <span className="text-16 max-w-400">
                      Don't miss your chance to be a part of the APEWARRIOR revolution. Whether you're an experienced crypto enthusiast or just starting your journey, we welcome you to our APE community. Together, we'll rise, conquer, and unlock the full potential of APEs in the crypto jungle.
                    </span>
                  </Fade>
                  <Fade top>
                    <img alt="" src={directionImg} className="max-w-300" />
                  </Fade>
                </div>
                {/* <div className="flex flex-row justify-center gap-[100px] items-center">
                  <Fade top>
                    <img alt="" src={jumpImg} className="max-w-400" />
                  </Fade>
                  <Fade right>
                    <span className="text-15 md:text-20 max-w-400">
                      Secure and Transparent: We prioritize the security of your
                      tokens and strive for complete transparency. APE WARRIOR is
                      built on a decentralized blockchain, ensuring.
                    </span>
                  </Fade>
                </div> */}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* <Container maxWidth={"xl"} className="pt-50 md:pt-80">
        <div className="flex flex-col gap-30">
          <CustomDivider />

          <div className="custom-box-border flex flex-col gap-20 p-10 md:p-25 lg:p-40">
            <Zoom>
              <div className="text-image text-40 lg:text-50 text-center font-bold">
                PLATFORM PREVIEW
              </div>
            </Zoom>

            <div className="flex flex-row gap-10 justify-between items-center px-15 py-10 border-2 border-borderColor rounded-full">
              <span className="text-12 sm:text-15 md:text-20 text-borderColor">
                When you realise that AIDOGE can turn your meme game from RUFF
                to Fantastic
              </span>

              <div className="flex flex-row gap-5 items-center">
                <img alt="" src={stickIcon} className="w-19 h-19" />

                <span className="hidden lg:flex text-image text-18 font-extrabold">
                  Generate
                </span>
              </div>
            </div>

            <div className="preview-swiper-wrapper">
              <Swiper
                loop={true}
                freeMode={true}
                slidesPerView={3}
                spaceBetween={30}
                pagination={true}
                grabCursor={true}
                effect={"coverflow"}
                centeredSlides={true}
                modules={[EffectCoverflow, Pagination]}
                className="preview-swiper-container"
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
              >
                {previewList.map((preview, key) => (
                  <SwiperSlide key={key}>
                    <div className="preview-item">
                      <img alt="" src={preview.img} className="preview-img" />

                      <img alt="" src={slideLogo} className="preview-logo" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Container> */}

      <CustomDivider />
      <div id="roadmap" className="roadmap">
        <Container maxWidth={"xl"} className="pt-50 md:pt-80">
          <div className="felx flex-col gap-80">
            <div className="flex flex-col items-center">
              <span className="text-50 md:text-80 text-borderColor font-extrabold opacity-20 leading-3">
                ROADMAP
              </span>
              <Zoom>
                <span className="text-image text-30 md:text-50 font-bold leading-none">
                  APE WARRIOR
                </span>
              </Zoom>
            </div>

            <div className="roadmap-swiper-wrapper xl:px-[40px]">
              <Swiper
                freeMode={true}
                spaceBetween={0}
                slidesPerView={sliderCount}
                navigation={true}
                pagination={true}
                modules={[Navigation, Pagination]}
                className="roadmap-swiper-container"
              >
                {roadmapList.map((item: any, key) => (
                  <SwiperSlide key={key}>
                    <div
                      key={key}
                      onClick={() => {
                        setActiveRoadmap(key);
                      }}
                      className={`flex flex-col gap-20 cursor-pointer ${
                        activeRoadmap === key ? "roadmap-active" : "opacity-50"
                      }`}
                    >
                      <div className=" h-30 md:h-50 flex flex-row items-center justify-center">
                        {key === 0 && (
                          <span className="text-image text-20 md:text-30 font-bold">
                            {item.label}
                          </span>
                        )}
                      </div>

                      <div className="roadmap-item-header" />

                      <div className="px-30 flex flex-col gap-20 pt-30">
                        <div className="text-image text-20 font-bold text-center">
                          {item.title}
                        </div>

                        <ul className="px-30">
                          {item.list.map((text: string, key: number) => (
                            <li className="text-18 text-borderColor" key={key}>
                              {text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </Container>
      </div>
      <div className="tokenomic">
        <Container maxWidth={"xl"} className="pt-50 md:pt-80 " id="tokenomic">
          <div className="flex flex-col gap-80">
            <CustomDivider />
            <div className="flex flex-col items-center">
              <Zoom center>
                <span className="text-image text-30 md:text-50 font-bold leading-none">
                  TOKEN ALLOCATION
                </span>
              </Zoom>
            </div>
            <div className="flex items-center flex-col sx:flex-row gap-20 sm:gap-40 md:gap-80 justify-center pb-[50px]">
              <Rotate>
                <Chart />
              </Rotate>
            </div>
            {/* <CustomDivider /> */}
          </div>
        </Container>
      </div>
      <div className="faq">
        <Container maxWidth={"xl"} className="pt-100 md:pt-130 " id="faq">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-30 lg:gap-0 pb-[50px]">
            <img alt="" src={faqImg} className="w-full max-w-600 m-auto" />

            <div className="flex flex-col gap-30 md:gap-50">
              <div className="text-image text-40 md:text-48 font-bold">
                Frequently Asked Questions
              </div>

              <div className="flex flex-col">
                <div className="h-1 bg-borderColor opacity-50" />

                {faqList.map((faq: any, key: number) => (
                  <FapQuestion
                    key={key}
                    answer={faq.answer}
                    title={faq.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

const CustomDivider = () => {
  return <div className="" />;
};

const FapQuestion = ({ title, answer }: { title: string; answer: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="flex flex-row justify-between items-center p-5 md:p-15 select-none cursor-pointer text-borderColor"
      >
        <div className="text-20 font-semibold">{title}</div>

        {open && <MinimizeIcon className="text-borderColor" />}

        {!open && <AddIcon className="text-borderColor" />}
      </div>

      {open && (
        <div className="text-15 md:text-16 px-15 md:px-20 py-5 md:py-10">
          {answer}
        </div>
      )}

      <div className="h-1 bg-borderColor opacity-50" />
    </div>
  );
};
