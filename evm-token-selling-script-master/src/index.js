import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import { ChakraProvider } from '@chakra-ui/react';
import { connectors } from './utils/web3Connectors';

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);