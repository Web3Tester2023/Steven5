// import Modal from 'antd/lib/modal/Modal';
import { memo } from "react";
import { useWallet } from "../../hooks/useWallet";
import IconMenu from "../Icons";
import Modal from '../Modal';
import './walletmodal.scss';

const walletList = [
  { label: "MetaMask", icon: "MetaMaskWallet", type: "injected" },
  { label: "WalletConnect", icon: "MobileWallet", type: "walletconnect" },
  { label: "Coinbase Wallet", icon: "CoinBaseWallet", type: "walletlink" },
];

const WalletModal = ({ open, setOpen }: any) => {
  const { connect } = useWallet();
  const handleConnect = async (key: any) => {
    try {
      await connect(key);
      setOpen(false);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <>
      {open && (
        <Modal
          open={open}
          setOpen={setOpen}
          title="Connect"
          className="2xs:w-[360px] xs:w-[440px] "
        >
          <div className="wallet-main-container">
            {walletList.map((item, ind) => {
              return (
                <div
                  key={ind}
                  className="wallet-item"
                  onClick={() => handleConnect(item.type)}
                >
                  <p>{item.label}</p>
                  <div className="wallet-icon">
                    <IconMenu icon={item.icon} size={30} />
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      )}
    </>
  );
};

export default memo(WalletModal);
