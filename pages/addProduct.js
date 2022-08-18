import {useState} from 'react'
import { ethers } from 'ethers';
import MarketPlace from "../artifacts/contracts/MarketPlace.sol/MarketPlace.json"
import { TailSpin } from 'react-loader-spinner';
import Link from 'next/link';


export default function AddProduct() {

    const contractAddress = process.env.NEXT_PUBLIC_ADDRESS
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [etherscanLink, setEtherscanLink] = useState("")
    const [loading, setLoading] = useState(false)


    console.log(name,price, "------")
    const createProduct = async(e) => {
      e.preventDefault()
      setLoading(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []); 
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
            contractAddress,
            MarketPlace.abi,
            signer
        );
              
        const campaignData = await contract.createProduct(
            name,
            ethers.utils.parseEther(price)
        );
        
        const receipt = await campaignData.wait();
        setEtherscanLink(
          `https://goerli.etherscan.io/tx/${receipt.transactionHash}`,
        )
    }
    
  return (
    <>
    { loading == true ? 
        etherscanLink == "" ?
                        <div style={{width:"100%",
                          height:"80vh",
                          display:"flex" ,
                          justifyContent:"center",
                          alignItems:"center"}}>
                            <TailSpin />
                        </div>
                        : <div style={{ width:"100%",
                                  height:"80vh",
                                  display:"flex" ,
                                  display:"flex" ,
                                  flexDirection:"column",
                                  alignItems:"center" }}> 
                             <h1> SuccessFully Created</h1> 
                            <Link passHref href={`${etherscanLink}`}><button>Go To payment status</button></Link>
                          </div>
                
     : <div
      className="home-container container mx-8 mt-4"
      style={{ margin: "5rem", width: "30rem" }}
    >
   <form>
  <div className="mb-3">
    <label className="form-label">Product Name</label>
    <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control" aria-describedby="emailHelp" />
    <div className="form-text">this name will visible in List.</div>
  </div>
  <div className="mb-3">
    <label className="form-label">Product Selling Price</label>
    <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" className="form-control" />
  </div>
  <button onClick={createProduct} className="btn btn-primary">Create And Sell Product</button>
</form>
</div>}
  </>
  )
}


