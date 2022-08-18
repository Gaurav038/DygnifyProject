import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MarketPlace from "../artifacts/contracts/MarketPlace.sol/MarketPlace.json"

export default function MarketPlaceArea() {

  const [data, setData] = useState([])
  const [change, setChange] = useState(false)
  const contractAddress = process.env.NEXT_PUBLIC_ADDRESS

  

  useEffect(() => {
    const Request = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_GOERLI_RPC_URL
      )
    
      const marketplace = new ethers.Contract(
              contractAddress,
              MarketPlace.abi,
              provider
      )
    
      const totalItem = await marketplace.itemCount()
      console.log(parseInt(totalItem))

      let items = []
    for (let i = 1; i <= parseInt(totalItem); i++) {
      const item = await marketplace.items(i)
        // Add item to items array
        items.push({
          itemId: parseInt(item.itemId),
          productAddress: item.ProductAddress,
          price: ethers.utils.formatEther(item.price),
          owner: item.seller,
          name: item.product,
        })
    }

      setData(items)
    }

    Request()
  },[change])

  const buyMarketItem = async (item) => {
    // await window.ethereum.request({method: 'eth_requestAccounts'})
    const Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    await Web3Provider.send('eth_requestAccounts', []); 
    const signer = Web3Provider.getSigner()

    console.log(ethers.utils.parseUnits(item.price, 18))
    const marketplace = new ethers.Contract(contractAddress, MarketPlace.abi, signer)
    const transaction = await marketplace.ProductBuyer(item.itemId, item.productAddress, { value: ethers.utils.parseUnits(item.price, 18), gasLimit: 500000})
    await transaction.wait()

    setChange(!change)
  }

  console.log(data, "0000000000000")

  return (
    <div
      className="home-container container mt-4 animate__animated animate__fadeIn animate__slow"
      style={{ marginBottom: "50px" }}
    >
      <div className="row">
        <h1 className="text-center">Market Place</h1>
      </div>
      <div className="row">
        <div className="col">
          <table className="customers-table table table-dark table-striped table-bordered border-dark mt-4">
            <thead className="text-center fs-6">
              <tr>
                <th>Product Id</th>
                <th>Owner</th>
                <th>Product Address</th>
                <th>Amount</th>
                <th>Product</th>
                <th>BUY Option</th>
              </tr>
            </thead>
            { data.map((e) =>  {
              return (
            <tbody key={e.itemId} className="text-center fs-6">
                <tr>
                  <td>{e.itemId}</td>
                  <td>{e.owner}</td>
                  <td>{e.productAddress}</td>
                  <td>{e.price}</td>
                  <td>{e.name}</td>
                  <td>
                    <button
                      color="primary"
                      variant="contained"
                      style={{ marginRight: 10 }}
                      onClick={() => buyMarketItem(e)}
                    >
                      Buy It
                    </button>
                  </td>
                </tr>
            </tbody>
              )})}
          </table>
        </div>
      </div>
    </div>
  )
}
