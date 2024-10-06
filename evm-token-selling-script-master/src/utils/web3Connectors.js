import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'

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
}

export const [metaMask, metaMaskHooks] = initializeConnector((actions) => new MetaMask({ actions }))

export const connectors = [
  [metaMask, metaMaskHooks],
]

export const addCustomNetwork = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [CUSTOM_NETWORK],
      })
    } catch (error) {
      console.error("Failed to add custom network:", error)
    }
  }
}