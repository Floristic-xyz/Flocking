import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7",
    rpcTarget: "https://rpc2.sepolia.org", // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
    };

const web3auth = new Web3Auth({
    clientId: "BDrb6OlrgopcKZ88bSawxNmCN8Hqwkyw2eL98O6RH-eS2j81XQW5GsYIo3HKlZhZgLBjDbFgd6DFMnlQ6VFX3TU", // Get your Client ID from the Web3Auth Dashboard
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET, // import {WEB3AUTH_NETWORK} from "@web3auth/base";
    chainConfig,
    uiConfig: {
      appName: "Flocking",
      mode: "auto", // light, dark or auto
      loginMethodsOrder: ["google", "twitter", "facebook", "github", "email", "apple"],
      logoLight: "../assets/Logo_Flocking.svg",
      logoDark: "../assets/Logo_Flocking.svg",
      defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl, tr
      loginGridCol: 3,
      primaryButton: "socialLogin", // "externalLogin" | "socialLogin" | "emailLogin"
    },
    modalZIndex: "99998",
    privateKeyProvider : new EthereumPrivateKeyProvider({
        config : { chainConfig },
    })
});

export { web3auth };