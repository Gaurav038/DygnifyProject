import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import MarketPlace from "../artifacts/contracts/MarketPlace.sol/MarketPlace.json"

export default function Index() {

  const [data, setData] = useState([])
  const contractAddress = process.env.NEXT_PUBLIC_ADDRESS

  useEffect(() => {
    const Request = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_GOERLI_RPC_URL
      )
    
      const contract = new ethers.Contract(
          contractAddress,
          MarketPlace.abi,
          provider
      )
    
      const getAllInvoice = contract.filters.ProductInvoice()
      const AllInvoice = await contract.queryFilter(getAllInvoice)

      const AllInvoices = AllInvoice.reverse()
      const AllData = AllInvoices.map((e) => {
        return {
          product: e.args.product,
          price: ethers.utils.formatEther(e.args.price),
          owner: e.args.owner,
          seller: e.args.seller,
          ProductAddress: e.args.ProductAddress,     
          timestamp: parseInt(e.args.timestamp),
        }
      })

      setData(AllData)
    }

    Request()
  },[])

  console.log(data)
  return (
    <div
      className="home-container container mt-4 animate__animated animate__fadeIn animate__slow"
      style={{ marginBottom: "50px" }}
    >
      <div className="row">
        <h1 className="text-center">ALL Transaction List</h1>
      </div>
      <div className="row">
        <div className="col">
          <table className="customers-table table table-dark table-striped table-bordered border-dark mt-4">
            <thead className="text-center fs-6">
              <tr>
                <th>Product Name</th>
                <th>BuyerPAN</th>
                <th>SellerPAN</th>
                <th>Invoice Amount</th>
                <th>Invoice Date</th>
              </tr>
            </thead>
            { data.map((e) =>  {
              return (
            <tbody key={e.timestamp} className="text-center fs-6">
                <tr>
                  <td>{e.product}</td>
                  <td>{e.owner}</td>
                  <td>{e.seller}</td>
                  <td>{e.price}</td>
                  <td>{new Date(parseInt(e.timestamp * 1000)).toLocaleString()}</td>
                </tr>
            </tbody>
              )})}
          </table>
        </div>
      </div>
    </div>
  )
}
