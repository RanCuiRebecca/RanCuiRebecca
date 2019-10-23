

if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
} else{
  ready();
}

function ready(){
  getFromLocalStorage()

  var removeButton = document.getElementsByClassName("removeItem");
  for(var i=0;i<removeButton.length;i++){
    var button = removeButton[i];
    button.addEventListener('click',removeCartItem);
  }

  var addToCartButton = document.getElementsByClassName("cartButton");
  for(var i=0;i<addToCartButton.length;i++){
    var button = addToCartButton[i];
    button.addEventListener('click',addToCartClicked);
  }

  var checkOutButton = document.getElementsByClassName("checkoutbutton")
  for(var i = 0; i < checkOutButton.length; i++){
    var button = checkOutButton[i]
    button.addEventListener('click', checkOutButtonClicked)
  }

}


function checkOutButtonClicked(event){
  var totalPriceElement = document.getElementsByClassName("totalMoney")[0];
  var totalPrice = parseFloat(totalPriceElement.innerText.replace('$',''))
  if(totalPrice === 0){
    alert("You haven't bought anything")
  }
  else {alert('You are all set!')}
}


function addToCartClicked(event){
  var button = event.target
  let shopItem = button.parentElement.parentElement
  var title = document.getElementsByClassName('title')[0].innerText
  var amount = document.getElementsByClassName('quantities')[0].value
  var price = document.getElementsByClassName('itemPrice')[0].innerText
  var flavours = document.getElementsByClassName('flavours')[0].value
  console.log(flavours)
  var img = document.querySelector('img').src
  var addedItem = {
      itemName: title,
      itemNo: amount,
      itemPrice: price,
      itemFlavours: flavours,
      itemImg: img
  };
  addItemLocalStorage(addedItem);
  updateCartTotal()
}




function getFromLocalStorage(){
    var myItems =  getItemsFromStorage();
    var cartItemContainer = document.getElementsByClassName('cartItemContainer')[0]
    for(var i = 0; i < myItems.length; i++) {
      console.log(myItems)
      var cartItem = document.createElement('div')
      var cartRowContent = `
      <div class = "cartItem">
      <p class = "cart-item-title">${myItems[i].itemName}</p>
      <p class = "cart-item-flavour">${myItems[i].itemFlavours}</p>

      <select class ="quantities2">
      <option value="${myItems[i].itemNo}">${myItems[i].itemNo}</option>
      <option value="1">1</option>
      <option value="3">3</option>
      <option value="6">6</option>
      <option value="12">12</option>
      </select>
      <p class = "priceElement">${myItems[i].itemPrice}</p>
      <div>
      <button class="removeItem">Remove</button>
      </div>
      </div>
      `
      cartItem.innerHTML = cartRowContent

      cartItem.getElementsByClassName("removeItem")[0].addEventListener('click', removeCartItem)
      cartItem.getElementsByClassName('quantities2')[0].addEventListener('change', quantityChange)
      cartItemContainer.appendChild(cartItem);
    }

    updateCartTotal()
}

function getItemsFromStorage() {
     let items;
     const itemsLS = localStorage.getItem('items');
     // Get the values, if null is returned then we create an empty array
     if(itemsLS === null) {
          items = [];
     } else {
          items = JSON.parse( itemsLS );
     }
     return items;
}

function addItemLocalStorage(item) {
    console.log(item);
     let items = getItemsFromStorage();
       console.log(items);
     for(var i = 0; i < items.length; i++) {
          console.log(items[i]);
       if(items[i].itemName == item.itemName && items[i].itemFlavours == item.itemFlavours){
         alert("This item has already been added to the cart");
         return;
       }

     }
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    addItemToCart()
  console.log(localStorage);
}

function addItemToCart(){

  var myItems =  getItemsFromStorage();
  var cartItemContainer = document.getElementsByClassName('cartItemContainer')[0]
  for(var i = 0; i < myItems.length; i++) {
    console.log(myItems)
  }

    var thisItem = myItems.pop();
    var cartItem = document.createElement('div')
    var cartRowContent = `
    <div class = "cartItem">
    <p class = "cart-item-title">${thisItem.itemName}</p>
    <p class = "cart-item-flavour">${thisItem.itemFlavours}</p>

    <select class ="quantities2">
    <option value="${thisItem.itemNo}">${thisItem.itemNo}</option>
    <option value="1">1</option>
    <option value="3">3</option>
    <option value="6">6</option>
    <option value="12">12</option>
    </select>
    <p class = "priceElement">${thisItem.itemPrice}</p>
    <div>
    <button class="removeItem">Remove</button>
    </div>
    </div>
    `
    cartItem.innerHTML = cartRowContent

    cartItem.getElementsByClassName("removeItem")[0].addEventListener('click', removeCartItem)
    cartItem.getElementsByClassName('quantities2')[0].addEventListener('change', quantityChange)
    cartItemContainer.appendChild(cartItem);
    updateCartTotal();
}

function quantityChange(event){

    var newAmount = event.target
    var newItem = newAmount.parentElement
    var newName = newItem.getElementsByClassName('cart-item-title')[0].innerText
    var newFlavour = newItem.getElementsByClassName('cart-item-flavour')[0].innerText
    var newAmount = newItem.getElementsByClassName('quantities2')[0].value
    var newPrice = document.getElementsByClassName('priceElement')[0].innerText
    var img = document.querySelector('img').src

    updateCartTotal();
    console.log(newFlavour)

    var itemLS =  getItemsFromStorage();
    for(var i = 0; i< itemLS.length; i++){
      console.log(itemLS[i].itemName + " "+ itemLS[i].itemFlavours + " " + newName + " " + newFlavour)
      if(itemLS[i].itemName === newName && itemLS[i].itemFlavours === newFlavour){
        itemLS.splice(i, 1);
        console.log(itemLS[i])
      }
    }

    var addedItem = {
        itemName: newName,
        itemNo: newAmount,
        itemPrice: newPrice,
        itemFlavours: newFlavour,
        itemImg: img
    };
    removeFromLocalStorage(newItem, newName, newFlavour)
    newItem.remove()
    addItemLocalStorage(addedItem);

}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cartItemContainer")[0];
  var cartItems = cartItemContainer.getElementsByClassName("cartItem");
  var total = 0;
  for(var i=0;i<cartItems.length;i++){
    var item = cartItems[i];
    var priceElement = item.getElementsByClassName('priceElement')[0];
    var quantityElement = item.getElementsByClassName('quantities2')[0];
    quantity = quantityElement.value
    var price = parseFloat(priceElement.innerText.replace('$',''))
    total = total + (price * quantity);
  }
  total = Math.round(total*100)/100;
  document.getElementsByClassName('totalMoney')[0].innerText = '$'+total;
}

function removeCartItem(event){

  let item, itemName, itemFlavours
  var buttonClicked = event.target
  item = buttonClicked.parentElement.parentElement
  itemName = item.getElementsByClassName('cart-item-title')[0].innerText
  itemFlavours = item.getElementsByClassName('cart-item-flavour')[0].innerText
  item.remove()
  removeFromLocalStorage(item, itemName, itemFlavours)
  console.log(localStorage)
  updateCartTotal();
}


function removeFromLocalStorage(item, name, flavour){

  let itemLS =  getItemsFromStorage();
console.log(itemLS)
  for(var i = 0; i< itemLS.length; i++){
    console.log(itemLS[i].itemName + " "+ itemLS[i].itemFlavours + " " + name + " " + flavour)
    if(itemLS[i].itemName === name && itemLS[i].itemFlavours === flavour){
      itemLS.splice(i, 1);
      console.log(itemLS[i])
    }
  }
    // Add the rest of the array
  localStorage.setItem('items', JSON.stringify(itemLS));

}
