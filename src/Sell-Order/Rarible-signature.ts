export type OrderAssetType = {
	tp: string
	data: string
}

export type OrderAsset = {
	assetType: OrderAssetType
	amount: string
}

export type Order = {
	maker: string
	makeAsset: OrderAsset
	taker: string
	takeAsset: OrderAsset
	salt: string
	start: string
	end: string
	data: string
	dataType: string
}

// RINKEBY
const signable = {
	types: {
     AssetType: [
       { name: "tp", type: "bytes4" },
       { name: "data", type: "bytes" }
     ],
     Asset: [
       { name: "assetType", type: "AssetType" },
       { name: "amount", type: "uint256" }
     ],
     Order: [
       { name: "maker", type: "address" },
       { name: "makeAsset", type: "Asset" },
       { name: "taker", type: "address" },
       { name: "takeAsset", type: "Asset" },
       { name: "salt", type: "uint256" },
       { name: "start", type: "uint256" },
       { name: "end", type: "uint256" },
       { name: "dataType", type: "bytes4" },
       { name: "data", type: "bytes" }
     ],
     EIP712Domain: [
       { type: "string", name: "name" },
       { type: "string", name: "version" },
       { type: "uint256", name: "chainId" },
       { type: "address", name: "verifyingContract" }
     ]
  },
	domain: {
     name: "Exchange",
     version: "2",
     chainId: 4,
     verifyingContract: ""
  },
	message: Order,
	primaryType: "Order"
}

// use this function to sign structure from above
function signTypedData(web3: any, from: string, data: any) {
  const msgData = JSON.stringify(data);
  return new Promise<any>((resolve, reject) => {
    function cb(err: any, result: any) {
      if (err) return reject(err);
      if (result.error) return reject(result.error);
      const sig = result.result;
      const sig0 = sig.substring(2);
      const r = "0x" + sig0.substring(0, 64);
      const s = "0x" + sig0.substring(64, 128);
      const v = parseInt(sig0.substring(128, 130), 16);
      resolve({ data, sig, v, r, s });
    }
  
  return web3.currentProvider.sendAsync({
      method: "eth_signTypedData_v3",
      params: [from, msgData],
      from 
    }, cb);
  })
}
