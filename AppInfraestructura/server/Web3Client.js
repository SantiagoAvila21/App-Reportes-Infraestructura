import Web3 from 'web3'
let globalLocations;

const getContractInstance = () => {
    const provider = 'https://7972-181-237-183-47.ngrok-free.app';
    const web3 = new Web3(provider);
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_image",
                    "type": "string"
                },
                {
                    "internalType": "int256",
                    "name": "_lat",
                    "type": "int256"
                },
                {
                    "internalType": "int256",
                    "name": "_lon",
                    "type": "int256"
                },
                {
                    "internalType": "string",
                    "name": "_desc",
                    "type": "string"
                }
            ],
            "name": "addLocation",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "getLocation",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "image",
                    "type": "string"
                },
                {
                    "internalType": "int256",
                    "name": "lat",
                    "type": "int256"
                },
                {
                    "internalType": "int256",
                    "name": "lon",
                    "type": "int256"
                },
                {
                    "internalType": "string",
                    "name": "desc",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getLocationsCount",
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
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "locations",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "image",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "desc",
                    "type": "string"
                },
                {
                    "internalType": "int256",
                    "name": "lat",
                    "type": "int256"
                },
                {
                    "internalType": "int256",
                    "name": "lon",
                    "type": "int256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const contractAddress = '0xfE3733e291B76eBb40314D2e87479b2C657d6637';
    const lowerCaseAddress = contractAddress.toLowerCase();
    const contract = new web3.eth.Contract(contractABI, lowerCaseAddress);
    return { web3, contract, contractABI };
}

export const init = async (setLocations) => {
    const { contract } = getContractInstance();
    const numLocations = await contract.methods.getLocationsCount().call();
    let res = [];
    for(let i = 0; i < numLocations; i++){
        const locationDB = await contract.methods.getLocation(i).call();
        const location = {
            name: locationDB[0],
            image: locationDB[1],
            lat: locationDB[2] / 10**8,
            lon: locationDB[3] / 10**7,
            desc: locationDB[4],
        }
        res = [...res, location];
    }
    setLocations(res);
    globalLocations = res;
    return globalLocations;
};

export const uploadToEth = async (name, image, lat, lon, desc) => {
    try {
        const { web3, contract } = getContractInstance();
        const accounts = await web3.eth.getAccounts();
        const latValue = Math.round(lat * 10 ** 8);
        const lonValue = Math.round(lon * 10 ** 7);
        await contract.methods
          .addLocation(name, image, latValue, lonValue, desc)
          .send({
            from: accounts[0],
            gas: 200000, // Utiliza la primera cuenta del usuario para enviar la transacción
          });
        console.log('Transacción exitosa');
    } catch (error) {
        console.error('Error al enviar la transacción:', error);
    }
};