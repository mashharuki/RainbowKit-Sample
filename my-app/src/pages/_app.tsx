import "@rainbow-me/rainbowkit/styles.css";

import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { createConfig, WagmiConfig, configureChains } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import {
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { AppProps } from "next/app";

// get chains & publicClient data
const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [
    alchemyProvider({ 
      apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}` 
    }),
    publicProvider(),
  ]
);

// connecttosの設定
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      walletConnectWallet({ chains }),
      metaMaskWallet({ chains }),
    ],
  },
]);

// wagmi用の設定
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

/**
 * App Component
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}