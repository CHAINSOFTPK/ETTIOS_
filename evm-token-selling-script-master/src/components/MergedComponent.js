import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Box, VStack, HStack, Text, Select, Input, Button, useToast, Spinner, IconButton } from '@chakra-ui/react';
import { metaMask, addCustomNetwork, CUSTOM_NETWORK } from '../utils/web3Connectors';
import { FixedPriceDEXABI } from '../utils/FixedPriceDEXABI';
import { ERC20ABI } from '../utils/ERC20ABI';

const dexContractAddress = "0x9381D40FD3BFF3910a87582628890A5bf8495E4b";
const tokenAddresses = {
  USDT: "0x9C06DA970eea7D6539B58f0E132aF3eAc51aAd08",
  USDC: "0x9C06DA970eea7D6539B58f0E132aF3eAc51aAd08",
  MATIC: "0x9C06DA970eea7D6539B58f0E132aF3eAc51aAd08",
  TOKEN: "0xFe9abbf56D36D8385EcaC37A0218F1024Da46694"
};
const tokenDecimals = {
  USDT: 18,
  USDC: 18,
  MATIC: 18,
  TOKEN: 18
};

function MergedComponent() {
  const { account, isActive, connector, chainId, provider } = useWeb3React();
  const [fromToken, setFromToken] = useState('USDT');
  const [toToken, setToToken] = useState('TOKEN');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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

  const estimateSwap = useCallback(async () => {
    if (!fromAmount || !account || !provider) return;
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(dexContractAddress, FixedPriceDEXABI, signer);
      let estimatedAmount;
      const amountIn = ethers.parseUnits(fromAmount, tokenDecimals[fromToken]);
      
      if (fromToken === 'TOKEN') {
        const tokenPrice = await contract.tokenPrice();
        estimatedAmount = (amountIn * tokenPrice) / ethers.parseUnits("1", tokenDecimals.TOKEN);
        const fee = (estimatedAmount * BigInt(await contract.feePercentage())) / BigInt(10000);
        estimatedAmount -= fee;
      } else {
        const tokenPrice = await contract.tokenPrice();
        estimatedAmount = (amountIn * ethers.parseUnits("1", tokenDecimals.TOKEN)) / tokenPrice;
      }
      
      setToAmount(ethers.formatUnits(estimatedAmount, tokenDecimals[toToken]));
    } catch (err) {
      console.error('Error estimating swap:', err);
      toast({
        title: "Estimation Error",
        description: "Error estimating swap. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [fromAmount, fromToken, toToken, account, provider, toast]);

  useEffect(() => {
    if (account && provider && fromAmount) {
      estimateSwap();
    }
  }, [account, provider, fromAmount, estimateSwap]);

  const handleSwap = async () => {
    if (!account || !provider) {
      toast({
        title: "Connection Error",
        description: "Please connect your wallet first.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    // Implement Swap Logic
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <Box border="1px solid" borderColor="teal.400" borderRadius="lg" p={6} maxWidth="400px" margin="auto" boxShadow="md">
      <VStack spacing={4} align="stretch">
        <div className="flex flex-col items-center justify-center mb-4 text-center">
          <Text fontSize="xl" fontWeight="bold">Connection Status: {isActive ? 'Connected' : 'Disconnected'}</Text>
          <Text fontSize="md" fontWeight="bold">Chain ID: {chainId}</Text>
          {isActive ? (
            <>
              <Text fontSize="md" fontWeight="bold">Connected with <b>{account}</b></Text>
              <Button
                onClick={disconnect}
                colorScheme="red"
                variant="solid"
              >
                Disconnect
              </Button>
            </>
          ) : (
            <Button
              onClick={connect}
              bgGradient="linear(to-r, teal.500, blue.500)"
              color="white"
              _hover={{ bgGradient: "linear(to-r, teal.300, blue.300)" }}
            >
              Connect to MetaMask
            </Button>
          )}
        </div>

        <Text fontSize="xl" fontWeight="bold">Swap</Text>
        <VStack spacing={2} align="stretch">
          <HStack>
            <Select 
              value={fromToken} 
              onChange={(e) => setFromToken(e.target.value)}
              width="40%"
            >
              <option value="TOKEN">TOKEN</option>
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
              <option value="MATIC">MATIC</option>
            </Select>
            <Input 
              type="number" 
              value={fromAmount} 
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              width="60%"
            />
          </HStack>
          <HStack justifyContent="center">
            <IconButton
              aria-label="Switch tokens"
              icon={<span>&#8597;</span>}
              onClick={switchTokens}
              size="sm"
            />
          </HStack>
          <HStack>
            <Select 
              value={toToken} 
              onChange={(e) => setToToken(e.target.value)}
              width="40%"
            >
              <option value="TOKEN">TOKEN</option>
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
              <option value="MATIC">MATIC</option>
            </Select>
            <Input 
              type="number" 
              value={toAmount} 
              readOnly
              placeholder="0.0"
              width="60%"
            />
          </HStack>
        </VStack>

        <Button 
          onClick={handleSwap} 
          isLoading={isLoading}
          loadingText="Swapping"
          bgGradient="linear(to-r, teal.500, blue.500)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, teal.300, blue.300)",
          }}
        >
          {isLoading ? <Spinner size="sm" /> : 'Swap'}
        </Button>
      </VStack>
    </Box>
  );
}

export default MergedComponent;
