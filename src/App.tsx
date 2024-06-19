import { CapsuleModal, Environment, CapsuleWeb } from "@usecapsule/react-sdk";
import { useState } from "react";
import "@usecapsule/react-sdk/styles.css";

const API_KEY = "d0b61c2c8865aaa2fb12886651627271";

const ENVIRONMENT = Environment.BETA;

const capsuleClient = new CapsuleWeb(ENVIRONMENT, API_KEY);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleOnClose = async () => {
    if (await capsuleClient.isFullyLoggedIn()) {
      const wallets = capsuleClient.getWallets();
      const wallet = Object.values(wallets)[0];
      setWalletAddress(wallet.address!);
    }
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      {walletAddress && <p>Capsule Wallet Address: {walletAddress}</p>}
      <button onClick={() => setIsModalOpen(true)}>Open Capsule Modal</button>
      <CapsuleModal isOpen={isModalOpen} onClose={handleOnClose} capsule={capsuleClient} />
    </div>
  );
}

export default App;
  