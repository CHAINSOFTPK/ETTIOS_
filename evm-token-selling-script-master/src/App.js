import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ChakraProvider, VStack } from '@chakra-ui/react';
import { connectors } from './utils/web3Connectors';
import WalletConnection from './components/WalletConnection';
import SwapInterface from './components/SwapInterface'; // Import SwapInterface
import './index.css';

function App() {
  return (
    <div id="central-content-id">  
    <Web3ReactProvider connectors={connectors}>
      <ChakraProvider>
        <div className="relative flex flex-col items-center justify-center min-h-screen">
          {/* Transparent glass effect content box for Wallet and Swap components */}
          <div
            className="relative p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg border w-full max-w-lg"
            style={{
              marginTop: '40px',
              marginBottom: '40px',
              borderColor: '#51c7f0', // Set border color as before
              backgroundColor: '#adcdd7', // Set box background color
            }}
          >
            {/* Wallet Connection Component */}
            <VStack spacing={8} align="stretch">
              <WalletConnection />
              <SwapInterface /> {/* Swap Interface Component */}
            </VStack>
          </div>
        </div>
      </ChakraProvider>
    </Web3ReactProvider>
    </div>
  );
}

export default App;
