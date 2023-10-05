import { useState, useEffect } from "react";
import { Container, Divider } from "@mui/material";
import { ethers } from "ethers";
import "./comHero.scss";
import bnbIcon from "../../assets/image/coins/bnb.svg";
import claimIcon from "../../assets/image/coins/claim.png";
import usdtIcon from "../../assets/image/coins/usdt.svg";
import instagramIcon from "../../assets/image/socials/instagram.svg";
import twitterIcon from "../../assets/image/socials/twitter.svg";
import discordIcon from "../../assets/image/socials/discord.svg";
import telegramIcon from "../../assets/image/socials/telegram.svg";
import siktokIcon from "../../assets/image/socials/tiktok.svg";
import { ProgressBar } from "react-rainbow-components";
// import slideLogo from "../../assets/image/preview/slide-logo.svg";
import slideLogo from "../../assets/image/preview/a2.png";

import { getSubString } from "../../util";
import { useWallet } from "../../hooks/useWallet";
import WalletModal from "../WalletModal";

import { presaleContract, usdtContract, getProgress } from "../../contracts";
import { toBigNum } from "../../utils";
import { NotificationManager } from "react-notifications";
// @ts-ignore
import Fade from "react-reveal/Fade";
// @ts-ignore
import Zoom from "react-reveal/Zoom";
// ----------------------------------------------------------------------

import Countdown from "react-countdown";

export const ComponentHero = () => {
  return <ComponentHeroContainer />;
};

const ComponentHeroContainer = () => {
  const { active, account, library } = useWallet();
  const [deadline, setDeadline] = useState(new Date("2023-10-09T00:00:00"));
  const [walletOpen, setWalletOpen] = useState(false);

  const [tokenPrice, setTokePrice] = useState(0);
  const [tokenUsdtPrice, setTokeUsdtPrice] = useState(0);
  const [payAmount, setPayAmount] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [tokenUsdtAmount, setTokenUsdtAmount] = useState(0);

  const [claimTokenAmount, setClaimTokenAmount] = useState(0);

  const [isClaim, setClaim] = useState(false);

  const [tapState, setTapState] = useState(1);
  const [progressStatus, setProgressStatus] = useState(0);
  const [totalSaled, setTotalSaled] = useState(0);

  const countdownComplete = () => {
    // setIsFinished(true);
  };

  useEffect(() => {
    const getPrice = async () => {
      let tokenPrice = Number(await presaleContract.ethBuyHelper(1e10)) / 1e10;
      setTokePrice(tokenPrice);

      let tokenUsdtPrice =
        Number(await presaleContract.usdtBuyHelper(1e10)) / 1e10;
      setTokeUsdtPrice(tokenUsdtPrice);

      console.log("token price", tokenPrice);
      console.log("token usdt price", tokenUsdtPrice);
    };
    getPrice();
  }, []);

  useEffect(() => {
    const getProgressStatus = async () => {
      const progress = await getProgress();
      console.log("current progress", progress);
      setProgressStatus(progress[0]);
      setTotalSaled(progress[1]);
    };
    getProgressStatus();
  }, []);

  const getClaimTokenAmount = async (address: string) => {
    if (address) {
      console.log(address);
      let tokenAmount =
        Number(await presaleContract.getClaimAmount(account)) / 1e18;
      setClaimTokenAmount(tokenAmount);
    }
  };

  useEffect(() => {
    const getClaimstatus = async () => {
      let status = await presaleContract.getClaimStatus();
      setClaim(status);
    };

    getClaimTokenAmount(account || "");
    getClaimstatus();
  }, [account]);

  const toggleOpen = () => {
    console.log("open modal");
    setWalletOpen(!walletOpen);
  };

  const onPayAmountChange = (e: any) => {
    try {
      if (e.target.value === "") {
        setPayAmount(0);
        setTokenAmount(0);
      } else {
        let amount = e.target.value;
        amount = amount.toString().replace(/^0+/, "");
        if (amount.length === 0) amount = "0";
        if (amount[0] === ".") amount = "0" + amount;
        setTokenAmount(amount * tokenPrice);
        setTokenUsdtAmount(amount * tokenUsdtPrice);
        setPayAmount(amount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onBuy = async () => {
    try {
      if (payAmount <= 0) {
        NotificationManager.error("Please input ETH amount");
        return;
      }
      let provider = library.provider;
      const prov = new ethers.providers.Web3Provider(provider);
      let signer = await prov.getSigner();

      let signedPresaleContract = presaleContract.connect(signer);

      if (tapState === 1) {
        let tx = await signedPresaleContract.buy({
          value: toBigNum(payAmount, 18),
        });
        await tx.wait();
      } else if (tapState === 2) {
        let signedUSDTContract = usdtContract.connect(signer);
        await signedUSDTContract.approve(
          presaleContract.address,
          payAmount * 1e6
        );
        await presaleContract.buyWithUSDT(payAmount * 1e6);
      }
      NotificationManager.success("Buy Success");
    } catch (error: any) {
      if (error["code"] === "ACTION_REJECTED")
        NotificationManager.error("User Rejected transaction.");
      else NotificationManager.error("Insufficient funds.");
      console.log("error ----------->", error["code"]);
    }
  };

  const onClaim = async () => {
    try {
      if (!isClaim) {
        NotificationManager.error("Claim is not allowed yet.");
        return;
      }

      if (claimTokenAmount <= 0) {
        NotificationManager.error("Please input token amount");
        return;
      }
      let provider = library.provider;
      const prov = new ethers.providers.Web3Provider(provider);
      let signer = await prov.getSigner();

      let signedPresaleContract = presaleContract.connect(signer);
      let tx = await signedPresaleContract.claimUserToken();
      await tx.wait();
      NotificationManager.success("Claim Success");
    } catch (error: any) {
      if (error["code"] === "ACTION_REJECTED")
        NotificationManager.error("User Rejected transaction.");
      else NotificationManager.error("Claim Error.");
      console.log("error ----------->", error["code"]);
    }
  };

  return (
    <>
      <WalletModal open={walletOpen} setOpen={setWalletOpen} />
      <div className="flex flex-col gap-30">
        <div className="hero-wrapper pt-88">
          <Container maxWidth={"xl"}>
            <div className="flex justify-center lg:flex-row gap-20 mm:justify-between md:pt-100 lg:pt-30 items-center">
              <div className="hidden mm:flex flex-col gap-50 pt-[20px]">
                <Fade left>
                  <h1 className="text-[50px]">
                    <span className="text-thin-blue">APE WARRIOR </span>{" "}
                    <br />Unleash the Power of APEs
                  </h1>
                  <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-5">
                      <div className="text-[#ffffffcc] flex flex-row gap-10 items-center">
                        <svg
                          width="20"
                          height="15"
                          viewBox="0 0 12 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#ffe200]"
                        >
                          <path
                            d="M1 5.375L3.72727 8L11 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-[16px]">
                          Aim for the Stars, Ride with APEs
                          
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5 ">
                      <div className="text-[#ffffffcc] flex flex-row gap-10 items-center">
                        <svg
                          width="20"
                          height="15"
                          viewBox="0 0 12 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#ffe200]"
                        >
                          <path
                            d="M1 5.375L3.72727 8L11 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-[16px]">
                          Profit While You HODL.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="text-[#ffffffcc] flex flex-row gap-10 items-center">
                        <svg
                          width="20"
                          height="15"
                          viewBox="0 0 12 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#ffe200]"
                        >
                          <path
                            d="M1 5.375L3.72727 8L11 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-[16px]">
                          Join the APEWARRIOR Revolution.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[160px] h-[46px]">
                    <button className="btn-primary !p-[8px] !bg-[#8fd7a8]">
                      <a
                        className="text-[18px]"
                        href="https://pdfhost.io"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Whitepaper
                      </a>
                      <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0012 1L15 6L10.0012 11M1 6H14.86"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </Fade>
              </div>
              <Fade right>
                <div className="buy-box max-w-500 w-full flex flex-col gap-50 text-black h-[100%]">
                  <div className="flex flex-col gap-30 p-5 bg-white rounded-lg border-[2px] border-solid boder-[#d4dadf]">
                    <div className="hero-header rounded-lg p-25 font-semibold text-center text-white text-[30px]">
                      <p className="flex flex-row gap-[5px]">
                        Presale ends in
                        <Countdown
                          date={deadline}
                          onComplete={countdownComplete}
                        />
                      </p>
                    </div>

                    <div className="flex flex-col gap-20 px-20">
                      <div className="font-semibold text-center text-[#01b6f5]">
                        Total Sold: {Math.floor(totalSaled).toLocaleString()}
                        /500,000,000,000
                      </div>
                      <ProgressBar
                        value={progressStatus}
                        assistiveText="test"
                      />
                      <div className="relative">
                        <div className="px-30 text-15 font-semibold text-center">
                          1 $APE = $0.00001
                        </div>

                        <Divider className="absolute w-full top-[50%]" />
                      </div>
                      <div className="grid grid-cols-3 gap-20">
                        <div
                          onClick={() => {
                            setTapState(1);
                          }}
                          className={`cursor-pointer bg-bgLight h-44 flex flex-row gap-5 items-center p-5 rounded-md hover:opacity-75 ${
                            tapState === 1 ? "border-2 border-[#3980B9]" : ""
                          }`}
                        >
                          <img
                            alt=""
                            src={bnbIcon}
                            className="h-25 w-25 rounded-full"
                          />
                          <span className="text-18 font-bold">BNB</span>
                        </div>

                        <div
                          onClick={() => {
                            setTapState(2);
                          }}
                          className={`cursor-pointer bg-bgLight h-44 flex flex-row gap-5 items-center p-5 rounded-md hover:opacity-75 ${
                            tapState === 2 ? "border-2 border-[#3980B9]" : ""
                          }`}
                        >
                          <img
                            alt=""
                            src={usdtIcon}
                            className="h-25 w-25 rounded-full"
                          />
                          <span className="text-18 font-bold">USDT</span>
                        </div>

                        <div
                          onClick={() => {
                            setTapState(3);
                          }}
                          className={`cursor-pointer bg-bgLight h-44 flex flex-row gap-5 items-center p-5 rounded-md hover:opacity-75 ${
                            tapState === 3 ? "border-2 border-[#3980B9]" : ""
                          }`}
                        >
                          <img
                            alt=""
                            src={claimIcon}
                            className="h-25 w-25 rounded-full"
                          />
                          <span className="text-18 font-bold">Claim</span>
                        </div>
                      </div>
                      <Divider />
                      {tapState < 3 && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                            <div className="flex flex-col">
                              <div className="flex flex-row justify-between">
                                <span className="text-15 opacity-80">
                                  Amount in{" "}
                                  {tapState === 1 ? (
                                    <span className="font-semibold">BNB</span>
                                  ) : (
                                    <span className="font-semibold">USDT</span>
                                  )}{" "}
                                  you pay
                                </span>
                              </div>

                              <div className="relative h-50 flex flex-row items-center px-5 bg-bgLight rounded-md">
                                <input
                                  value={payAmount}
                                  className="default-input flex-1"
                                  onChange={onPayAmountChange}
                                />

                                <div className="w-30 h-30">
                                  {tapState === 1 ? (
                                    <img
                                      alt=""
                                      src={bnbIcon}
                                      className="w-full h-full"
                                    />
                                  ) : (
                                    <img
                                      alt=""
                                      src={usdtIcon}
                                      className="w-full h-full"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col">
                              <div className="flex flex-row justify-between">
                                <span className="text-15 opacity-80">
                                  <span className="font-semibold">$APE</span>{" "}
                                  you receive
                                </span>
                              </div>

                              <div className="relative h-50 flex flex-row items-center px-5 bg-bgLight rounded-md">
                                {tapState === 1 ? (
                                  <input
                                    value={tokenAmount.toFixed(3)}
                                    className="default-input flex-1"
                                    readOnly
                                  />
                                ) : (
                                  <input
                                    value={tokenUsdtAmount.toFixed(3)}
                                    className="default-input flex-1"
                                    readOnly
                                  />
                                )}{" "}
                                <div className="w-30 h-30">
                                  <img
                                    alt=""
                                    src={slideLogo}
                                    className="w-full h-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-15 text-center">
                            Reserve some BNB for gas fees. The actual amount
                            used will depend on the network.
                          </div>

                          {active && (
                            <div className="flex flex-row justify-center items-center">
                              <div
                                className="w-[70%] py-10 bg-bgBtn text-center rounded-full cursor-pointer hover:opacity-75 select-none"
                                onClick={onBuy}
                              >
                                <span className="text-white text-15">Buy</span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {tapState === 3 && (
                        <>
                          <div className="flex flex-col">
                            <div className="flex flex-row justify-between">
                              <span className="text-15 opacity-80">
                                Token Amount that you will can claim.
                              </span>
                            </div>

                            <div className="relative h-50 flex flex-row items-center px-5 bg-bgLight rounded-md">
                              <input
                                type="number"
                                value={claimTokenAmount}
                                className="default-input flex-1"
                                readOnly
                              />

                              <div className="w-30 h-30">
                                <img
                                  alt=""
                                  src={slideLogo}
                                  className="w-full h-full"
                                />
                              </div>
                            </div>
                          </div>

                          {!isClaim && (
                            <div className="text-13 text-center text-red-500">
                             Claim is not yet available
                            </div>
                          )}

                          {active && (
                            <div className="flex flex-row justify-center items-center">
                              <div
                                onClick={onClaim}
                                className={`w-[70%] py-10 text-center rounded-full cursor-pointer hover:opacity-75 select-none ${
                                  isClaim ? "bg-bgBtn" : "bg-bgBtn/70"
                                }`}
                              >
                                <span className="text-white text-15">
                                  Claim
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {active && (
                        <div className="flex flex-row justify-center items-center">
                          <div
                            onClick={toggleOpen}
                            className="w-[70%] py-10 border border-borderColor text-center rounded-full cursor-pointer hover:opacity-75 select-none"
                          >
                            <span className="text-15">
                              {getSubString(account || "")}
                            </span>
                          </div>
                        </div>
                      )}
                      {!active && (
                        <div className="flex flex-row justify-center items-center">
                          <div
                            onClick={toggleOpen}
                            className="w-[70%] py-10 bg-bgBtn text-center rounded-full cursor-pointer hover:opacity-75 select-none"
                          >
                            <span className="text-white text-15">
                              Connect Wallet
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="text-15 text-center pb-15">
                        Stage 1 price: $0.0000100
                      </div>
                    </div>
                  </div>

                  <SocialsLink />
                </div>
              </Fade>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export const SocialsLink = () => {
  return (
    <div className="flex flex-row gap-10 items-center justify-center">
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt=""
          src={instagramIcon}
          className="w-40 h-40 cursor-pointer hover:opacity-75"
        />
      </a>
      <a
        href="https://twitter.com/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt=""
          src={twitterIcon}
          className="w-40 h-40 cursor-pointer hover:opacity-75"
        />
      </a>
      <a href="https://discord.gg/" target="_blank" rel="noreferrer">
        <img
          alt=""
          src={discordIcon}
          className="w-40 h-40 cursor-pointer hover:opacity-75"
        />
      </a>
      <a
        href="https://t.me/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt=""
          src={telegramIcon}
          className="w-40 h-40 cursor-pointer hover:opacity-75"
        />
      </a>
      <a
        href="https://www.tiktok.com/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt=""
          src={siktokIcon}
          className="w-30 h-30 cursor-pointer hover:opacity-75"
        />
      </a>
    </div>
  );
};
