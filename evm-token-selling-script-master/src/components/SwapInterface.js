import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Box, VStack, HStack, Text, Select, Input, Button, useToast, Spinner, IconButton } from '@chakra-ui/react';

// Import your ABIs
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

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function SwapInterface() {
  const { account, provider } = useWeb3React();
  const [fromToken, setFromToken] = useState('USDT');
  const [toToken, setToToken] = useState('TOKEN');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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

  const waitForTransaction = async (tx) => {
    const minedTx = await tx;
    console.log(`Transaction sent: ${minedTx.hash}`);
    
    let txReceipt = null;
    while (txReceipt === null) {
      txReceipt = await provider.getTransactionReceipt(minedTx.hash);
      await sleep(1000);
    }
    
    console.log(`Transaction mined: ${txReceipt.transactionHash}`);
    return txReceipt;
  };

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
    setIsLoading(true);
    try {
      const signer = await provider.getSigner();
      const dexContract = new ethers.Contract(dexContractAddress, FixedPriceDEXABI, signer);
      const fromTokenContract = new ethers.Contract(tokenAddresses[fromToken], ERC20ABI, signer);

      const amountIn = ethers.parseUnits(fromAmount, tokenDecimals[fromToken]);
      const minOut = ethers.parseUnits(toAmount, tokenDecimals[toToken])
        * BigInt(99) / BigInt(100);

      if (fromToken !== 'TOKEN') {
        const allowance = await fromTokenContract.allowance(account, dexContractAddress);
        if (allowance < amountIn) {
          const approveTx = await fromTokenContract.approve(dexContractAddress, amountIn);
          await waitForTransaction(approveTx);
        }
      } else {
        const tokenContract = new ethers.Contract(tokenAddresses.TOKEN, ERC20ABI, signer);
        const allowance = await tokenContract.allowance(account, dexContractAddress);
        if (allowance < amountIn) {
          const approveTx = await tokenContract.approve(dexContractAddress, amountIn);
          await waitForTransaction(approveTx);
        }
      }

      let swapTx;
      if (fromToken === 'TOKEN') {
        if (toToken === 'USDT') {
          swapTx = await dexContract.sellForUSDT(amountIn, minOut);
        } else if (toToken === 'USDC') {
          swapTx = await dexContract.sellForUSDC(amountIn, minOut);
        } else if (toToken === 'MATIC') {
          swapTx = await dexContract.sellForMatic(amountIn, minOut);
        }
      } else {
        if (fromToken === 'USDT') {
          swapTx = await dexContract.buyWithUSDT(amountIn, minOut);
        } else if (fromToken === 'USDC') {
          swapTx = await dexContract.buyWithUSDC(amountIn, minOut);
        } else if (fromToken === 'MATIC') {
          swapTx = await dexContract.buyWithMatic(amountIn, minOut);
        }
      }

      await waitForTransaction(swapTx);

      toast({
        title: "Swap Successful",
        description: "Swap completed successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFromAmount('');
      setToAmount('');
    } catch (err) {
      console.error('Error during swap:', err);
      toast({
        title: "Swap Error",
        description: `Error during swap: ${err.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFromTokenChange = (value) => {
    setFromToken(value);
    setToToken(value === 'TOKEN' ? 'USDT' : 'TOKEN');
    setFromAmount('');
    setToAmount('');
  };

  const handleToTokenChange = (value) => {
    setToToken(value);
    setFromToken(value === 'TOKEN' ? 'USDT' : 'TOKEN');
    setFromAmount('');
    setToAmount('');
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
        <Text fontSize="xl" fontWeight="bold">Swap</Text>
        <VStack spacing={2} align="stretch">
          <HStack>
            <Select 
              value={fromToken} 
              onChange={(e) => handleFromTokenChange(e.target.value)}
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
              _placeholder={{ color: 'blackAlpha.600' }}
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
              onChange={(e) => handleToTokenChange(e.target.value)}
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
              _placeholder={{ color: 'blackAlpha.600' }}
            />
          </HStack>
        </VStack>
        <Button 
          onClick={handleSwap} 
          isLoading={isLoading}
          loadingText="Swapping"
          spinnerPlacement="start"
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

export default SwapInterface;
