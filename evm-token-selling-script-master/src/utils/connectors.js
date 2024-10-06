import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1013]
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1013: "https://evm.globalnetwork.foundation" },
  chainId: 1013,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

export const CUSTOM_NETWORK = {
  chainId: '0x3F5', // 1013 in hexadecimal
  chainName: 'Global Network',
  nativeCurrency: {
    name: 'Global Network',
    symbol: 'GLD',
    decimals: 18
  },
  rpcUrls: ['https://evm.globalnetwork.foundation'],
  blockExplorerUrls: ['https://evm.globalnetwork.foundation']
};

export const addCustomNetwork = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [CUSTOM_NETWORK],
      });
    } catch (error) {
      console.error("Failed to add custom network:", error);
    }
  }
};