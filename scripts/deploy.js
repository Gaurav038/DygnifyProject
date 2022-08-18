const {ethers} = require('hardhat')

async function main() {
    const marketFactory = await ethers.getContractFactory("MarketPlace")
    const MarketPlace = await marketFactory.deploy()

    await MarketPlace.deployed()

    console.log("MarketPlace deployed to: " ,MarketPlace.address)
}

main()
    .then(() => process.exit(0) )
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })