import React, { useCallback, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { metaMask, addCustomNetwork, CUSTOM_NETWORK } from '../utils/web3Connectors';
import { VStack, HStack, Text, Button } from '@chakra-ui/react';

function WalletConnection() {
  const { account, isActive, connector, chainId } = useWeb3React();

  const connect = useCallback(async () => {
    try {
      await metaMask.activate();
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      if (connector?.deactivate) {
        await connector.deactivate();
      } else {
        await connector.resetState();
      }
    } catch (ex) {
      console.log(ex);
    }
  }, [connector]);

  useEffect(() => {
    if (isActive && chainId !== parseInt(CUSTOM_NETWORK.chainId, 16)) {
      addCustomNetwork();
    }
  }, [isActive, chainId]);

  return (
    <VStack spacing={4} align="center">
      {/* Display Connection Status and Chain ID */}
      <HStack spacing={2} justify="center">
        <Text fontSize="lg" fontWeight="bold">Connection Status:</Text>
        <Text fontSize="md" color="gray.600">{isActive ? 'Connected' : 'Disconnected'}</Text>
      </HStack>

      <HStack spacing={2} justify="center">
        <Text fontSize="lg" fontWeight="bold">Chain ID:</Text>
        <Text fontSize="md" color="gray.600">{chainId ? chainId : 'N/A'}</Text>
      </HStack>

      {/* Center "Connected with" and its value on a new line */}
      {isActive && (
        <VStack spacing={1} align="center">
          <Text fontSize="lg" fontWeight="bold">Connected with:</Text>
          <Text fontSize="md" color="gray.600" textAlign="center">
            {account}
          </Text>
        </VStack>
      )}

      {/* Connect/Disconnect Button */}
      {isActive ? (
        <Button 
          onClick={disconnect} 
          colorScheme="red" 
          size="md" 
          variant="solid"
        >
          Disconnect
        </Button>
      ) : (
        <Button 
          onClick={connect} 
          bgGradient="linear(to-r, #51c7f0, #14456a)" 
          _hover={{
            bgGradient: "linear(to-r, #48b2da, #12385a)"
          }}
          color="white" 
          size="md"
        >
          Connect to MetaMask
        </Button>
      )}
    </VStack>
  );
}

export default WalletConnection;
