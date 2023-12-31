import React from "react";
import NewInventoryForm from "./NewInventoryForm";
import MasterStock from "./MasterStockList";
import { v4 } from 'uuid';
import UpdateInventoryForm from "./UpdateInventoryForm";
import Cart from "./Cart";

class InventoryControl extends React.Component {

  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      addFormVisibleOnPage: false,
      updateFormVisibleOnPage: false,
      cartVisibleOnPage: false,
      selectedId: null,
      mainInventoryList: [
        {
          name: 'My Bloody Valentine- "Loveless" Vinyl LP',
          price: '$30',
          leftInStock: '20',
          imgSrc: "img/vinyl.jpeg",
          id: v4()
        },
        {
          name: 'Sonic Youth "Washing Machine" T-shirt',
          price: '$15',
          leftInStock: '25',
          imgSrc: "img/tshirt.jpeg",
          id: v4()
        },
        {
          name: 'Pavement Tour Hoodie',
          price: '$45',
          leftInStock: '10',
          imgSrc: "img/hoodie.png",
          id: v4()
        }
      ],
      cartItems: []
    };
  }

  //THIS FUNCTION IS WHAT YOU'RE WORKING ON

  handleAddClick = () => {
    if (this.state.updateFormVisibleOnPage === false) {
      this.setState(prevState => ({ addFormVisibleOnPage: !prevState.addFormVisibleOnPage }));
    } else {
      this.setState(prevState => ({ updateFormVisibleOnPage: !prevState.updateFormVisibleOnPage }));
    }
  }

  handleCartClick = () => {
    this.setState(prevState => ({ cartVisibleOnPage: !prevState.cartVisibleOnPage }));
  }

  handleUpdateClick = (id) => {
    this.setState(prevState => ({
      updateFormVisibleOnPage: !prevState.updateFormVisibleOnPage,
      selectedId: id
    }));
  };



  handleAddingNewInventoryToList = (newInventory) => {
    const newMainInventoryList = this.state.mainInventoryList.concat(newInventory);
    this.setState({
      mainInventoryList: newMainInventoryList,
      addFormVisibleOnPage: false
    });
  };

  handleUpdatingInventory = (updatedInventory) => {
    const updatedList = this.state.mainInventoryList.map(item => {
      if (item.id === this.state.selectedId) {
        return {
          ...item,
          name: updatedInventory.name,
          price: updatedInventory.price,
          leftInStock: updatedInventory.leftInStock
        };
      }
      return item;
    });

    this.setState({
      mainInventoryList: updatedList,
      updateFormVisibleOnPage: false
    });
  };

  addToCart = (itemName, itemPrice, itemImgSrc) => {
    const newItem = { name: itemName, price: itemPrice, id: v4(), imgSrc: itemImgSrc };
    console.log(newItem);
    this.setState(prevState => ({
      cartItems: [...prevState.cartItems, newItem]
    }));
  };

  removeFromCart = (itemId) => {
    const updatedCart = this.state.cartItems.filter((item) => item.id !== itemId);
    console.log(updatedCart);
    this.setState({ cartItems: updatedCart });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    let cartButtonText = null;
    if (this.state.addFormVisibleOnPage) {
      currentlyVisibleState = <NewInventoryForm onNewInventoryCreation={this.handleAddingNewInventoryToList} />;
      buttonText = "Return to Storefront";
    } else if (this.state.updateFormVisibleOnPage) {
      currentlyVisibleState = <UpdateInventoryForm onUpdateInventoryCreation={this.handleUpdatingInventory} />;
      buttonText = "Return to Storefront";
    } else if (this.state.cartVisibleOnPage) {
      cartButtonText = "Return to Storefront"
      currentlyVisibleState = (
        <>
          <Cart
            cartItems={this.state.cartItems}
            removeFromCart={this.removeFromCart}
          />
          <button onClick={this.handleCartClick} > {cartButtonText}</button>
        </>)
    } else {
      buttonText = "Add New Inventory";
      cartButtonText = "View Cart"
      currentlyVisibleState = (
        <>
          <MasterStock
            addToCart={this.addToCart}
            handleUpdate={this.handleUpdateClick}
            itemsInStock={this.state.mainInventoryList}
          />
          <div className="centerButtons">
            <button onClick={this.handleAddClick}>{buttonText}</button>
            <button onClick={this.handleCartClick}>{cartButtonText}</button>
          </div>
        </>)


    }
    return (
      <React.Fragment>
        {currentlyVisibleState}

      </React.Fragment>
    );
  }

}

export default InventoryControl;