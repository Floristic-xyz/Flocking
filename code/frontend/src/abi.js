const abi = 
[
    {
     "inputs": [
      {
       "internalType": "string",
       "name": "label",
       "type": "string"
      }
     ],
     "name": "register",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address",
       "name": "_feeRecipient",
       "type": "address"
      }
     ],
     "name": "setFeeRecipient",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "uint256",
       "name": "_registrationFee",
       "type": "uint256"
      }
     ],
     "name": "setRegistrationFee",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address",
       "name": "_nameWrapper",
       "type": "address"
      },
      {
       "internalType": "address",
       "name": "_resolver",
       "type": "address"
      },
      {
       "internalType": "bytes32",
       "name": "_parentNode",
       "type": "bytes32"
      },
      {
       "internalType": "uint256",
       "name": "_registrationFee",
       "type": "uint256"
      },
      {
       "internalType": "address",
       "name": "_feeRecipient",
       "type": "address"
      }
     ],
     "stateMutability": "nonpayable",
     "type": "constructor"
    },
    {
     "anonymous": false,
     "inputs": [
      {
       "indexed": true,
       "internalType": "bytes32",
       "name": "parentNode",
       "type": "bytes32"
      },
      {
       "indexed": false,
       "internalType": "string",
       "name": "label",
       "type": "string"
      },
      {
       "indexed": true,
       "internalType": "address",
       "name": "owner",
       "type": "address"
      }
     ],
     "name": "SubdomainRegistered",
     "type": "event"
    },
    {
     "inputs": [],
     "name": "feeRecipient",
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
     "name": "nameWrapper",
     "outputs": [
      {
       "internalType": "contract INameWrapper",
       "name": "",
       "type": "address"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "registrationFee",
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
     "name": "resolver",
     "outputs": [
      {
       "internalType": "address",
       "name": "",
       "type": "address"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    }
   ];

   export default abi;