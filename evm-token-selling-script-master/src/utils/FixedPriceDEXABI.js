export const FixedPriceDEXABI = 
    [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "usdtAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "usdcAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "maticAmount",
                    "type": "uint256"
                }
            ],
            "name": "addLiquidity",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "maticAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "minTokensExpected",
                    "type": "uint256"
                }
            ],
            "name": "buyWithMatic",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "usdcAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "minTokensExpected",
                    "type": "uint256"
                }
            ],
            "name": "buyWithUSDC",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "usdtAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "minTokensExpected",
                    "type": "uint256"
                }
            ],
            "name": "buyWithUSDT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_token",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_usdt",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_usdc",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_matic",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_maticPriceFeed",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_tokenPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_feePercentage",
                    "type": "uint256"
                }
            ],
            "name": "initialize",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "InvalidInitialization",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "NotInitializing",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "oldFeePercentage",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "newFeePercentage",
                    "type": "uint256"
                }
            ],
            "name": "FeePercentageUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint64",
                    "name": "version",
                    "type": "uint64"
                }
            ],
            "name": "Initialized",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "provider",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "usdtAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "usdcAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "maticAmount",
                    "type": "uint256"
                }
            ],
            "name": "LiquidityAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "provider",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "usdtAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "usdcAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "maticAmount",
                    "type": "uint256"
                }
            ],
            "name": "LiquidityRemoved",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "pause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "Paused",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "usdtAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "usdcAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "maticAmount",
                    "type": "uint256"
                }
            ],
            "name": "removeLiquidity",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "minMaticExpected",
                    "type": "uint256"
                }
            ],
            "name": "sellForMatic",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "minUSDCExpected",
                    "type": "uint256"
                }
            ],
            "name": "sellForUSDC",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "minUSDTExpected",
                    "type": "uint256"
                }
            ],
            "name": "sellForUSDT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_feePercentage",
                    "type": "uint256"
                }
            ],
            "name": "setFeePercentage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tokenPrice",
                    "type": "uint256"
                }
            ],
            "name": "setTokenPrice",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "oldPrice",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "newPrice",
                    "type": "uint256"
                }
            ],
            "name": "TokenPriceUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "currency",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "currencyAmount",
                    "type": "uint256"
                }
            ],
            "name": "TokensPurchased",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "currency",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "currencyAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "fee",
                    "type": "uint256"
                }
            ],
            "name": "TokensSold",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "unpause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "Unpaused",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "feePercentage",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "maticAmount",
                    "type": "uint256"
                }
            ],
            "name": "getMaticToUSDTAmount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "usdtAmount",
                    "type": "uint256"
                }
            ],
            "name": "getUSDTToMaticAmount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "matic",
            "outputs": [
                {
                    "internalType": "contract IERC20Upgradeable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "maticLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "maticPriceFeed",
            "outputs": [
                {
                    "internalType": "contract AggregatorV3Interface",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "paused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "token",
            "outputs": [
                {
                    "internalType": "contract IERC20Upgradeable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "tokenLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "tokenPrice",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "usdc",
            "outputs": [
                {
                    "internalType": "contract IERC20Upgradeable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "usdcLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "usdt",
            "outputs": [
                {
                    "internalType": "contract IERC20Upgradeable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "usdtLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];