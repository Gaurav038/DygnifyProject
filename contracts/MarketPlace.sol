// SPDX-License-Identifier: MIT

pragma solidity >0.7.0 <=0.9.0;
import "hardhat/console.sol";

contract MarketPlace {

    uint public itemCount; 

    struct Item {
        uint itemId;
        address ProductAddress;
        uint price;
        address payable seller;
        string product;
    }

  // itemId -> Item
    mapping(uint => Item) public items;

    event ProductInvoice(
        string product,
        uint price,
        address indexed owner,
        address indexed seller,
        address ProductAddress,
        uint timestamp
    );

    function createProduct(
        string memory productName,
        uint productPrice
    ) public {
        Product newProduct = new Product(productName, productPrice, msg.sender );

        itemCount++;

        items[itemCount] = Item (
            itemCount,
            address(newProduct),
            productPrice,
            payable(msg.sender),
            productName
        );

        emit ProductInvoice(
            productName,
            productPrice,
            msg.sender,
            msg.sender,
            address(newProduct),
            block.timestamp
        );
    }

    function ProductBuyer(uint _itemId, address _ProductAdd) public payable {
    //   console.log(msg.value,  msg.sender);
        Item storage item = items[_itemId];
        Product A = Product(_ProductAdd);
        uint amount = A.getRequiredAmount();
        address payable owner = A.getOwner();
        string memory name = A.getproductName();

        // require(amount <= msg.value, "required Amount Not FullFilled ...");

        owner.transfer(msg.value);
        A.changeOwner(msg.sender);


      // update item Owner
        item.seller = payable(msg.sender);

        emit ProductInvoice(
            name,
            amount,
            msg.sender,
            owner,
            _ProductAdd,
            block.timestamp
        );
    }

}

contract Product {
    string public product;
    uint public price;
    address payable public owner;

    constructor(
        string memory productName,
        uint productPrice,
        address productOwner
    ) {
        product = productName;
        price = productPrice * (1 ether);
        owner = payable(productOwner);
    }


    function changeOwner(address _ProductBuyer) external {
        console.log( _ProductBuyer);
        owner = payable(_ProductBuyer);
    }

    function getRequiredAmount() external view returns (uint256) {
        return price;
    }

    function getOwner() external view returns (address payable) {
        return owner;
    }

    function getproductName() external view returns (string memory) {
        return product;
    }


}