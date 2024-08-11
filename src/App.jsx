import "./App.css";
import Button from "./components/Button";
import Container from "./components/Container";
import WalletContainer from "./components/WalletContainer";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import { useState } from "react";
import { Buffer } from "buffer";
import { HDNodeWallet } from "ethers";
import MnemonicContainer from "./components/MnemonicContainer";

Buffer.from("anything", "base64");
Buffer.toString("anything", "string");
if (!window.Buffer) {
  window.Buffer = Buffer;
}

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [keyPair, setKeyPair] = useState([]);

  const onGenerateMnemonic = () => {
    const generate = generateMnemonic();
    setMnemonic(generate);
  };

  const onCreateWallet = () => {
    if (!mnemonic) {
      onGenerateMnemonic();
    }
    const seed = mnemonicToSeedSync(mnemonic);
    const i = keyPair.length;
    const path = `m/44'/501'/${i}'/0'`;
    const wallet = HDNodeWallet.fromSeed(seed);
    const newWallet = wallet.derivePath(path);
    let arr;
    arr = [
      ...keyPair,
      { publicKey: newWallet.publicKey, privateKey: newWallet.privateKey },
    ];
    setKeyPair(arr);
  };

  return (
    <>
      <Container>
        <h1>Web Based Wallet</h1>
        <div className="row">
          <Button onClickHandler={onGenerateMnemonic}>Generate Mnemonic</Button>
          <Button onClickHandler={onCreateWallet}>Create Wallet</Button>
        </div>

        <MnemonicContainer>
          {mnemonic &&
            mnemonic.split(" ").map((word, key) => (
              <div>
                {key + 1}. {word}
              </div>
            ))}
        </MnemonicContainer>

        <WalletContainer>
          {keyPair.length > 0
            ? keyPair.map((pair, key) => <div key={key}>{pair.privateKey}</div>)
            : "No Wallet"}
        </WalletContainer>
      </Container>
    </>
  );
}

export default App;
