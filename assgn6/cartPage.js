if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
} else{
  ready();
}

function ready(){
  getFromLocalStorage()
  updateCartPage()
  var removeButtonCart = document.getElementsByClassName("removeFromCart");
  for(var i=0;i<removeButtonCart.length;i++){
    var button = removeButtonCart[i];
    button.addEventListener('click',removeCartItem2);
  }


    var quantityInput = document.getElementsByClassName("quantities")
    for(var i = 0; i < quantityInput.length; i++){
      var button = quantityInput[i]
      button.addEventListener('click', quantityChange)
    }


}

function removeCartItem2(event){
  let item, itemName, itemFlavours
  var buttonClicked = event.target
  item = buttonClicked.parentElement
  itemName = item.getElementsByClassName('cartItemName')[0].innerText
  itemFlavours = item.getElementsByClassName('flavorCartSelect')[0].innerText
  item.remove()
  removeFromLocalStorage(item, itemName, itemFlavours)
  updateCartPage()
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

function getFromLocalStorage(){
    var myItems =  getItemsFromStorage();
    var cartItemContainer = document.getElementsByClassName('itemsInCart')[0]
    for(var i = 0; i < myItems.length; i++) {
      console.log(myItems)
      var cartItem = document.createElement('div')
      var priceValue = parseFloat(myItems[i].itemPrice.replace('$',''))
      console.log(priceValue)
      var subPrice = Math.round(myItems[i].itemNo * priceValue*100)/100
      cartItem.innerHTML  = `
      <div class = "item1">
      <a class="cartimages"><img src="${myItems[i].itemImg}" alt ="img"></a>
        <div class = "section">
          <p class ="cartItemName">${myItems[i].itemName}</p>
          <p class ="flavorCartSelect">${myItems[i].itemFlavours}</p>
          <p class ="cartItemPrice">${myItems[i].itemPrice}</p>

        </div>
        <select class= "amountCartSelect">
          <option value="${myItems[i].itemNo}">${myItems[i].itemNo}</option>
          <option value ="3">3</option>
          <option value ="1">1</option>
          <option value="6">6</option>
          <option value="12">12</option>
        </select>

        <p class = "subPrice">$${subPrice}</p>
        <button class="removeFromCart">Remove</button>
        </div>
      `

      cartItem.getElementsByClassName("removeFromCart")[0].addEventListener('click', removeCartItem2)
      cartItem.getElementsByClassName('amountCartSelect')[0].addEventListener('change', quantityChange)
      cartItemContainer.appendChild(cartItem);

    }

    document.getElementsByClassName('totalMoney')[0].innerText = '$'+localStorage.getItem('totalPrice');
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

function quantityChange(event){
  var input = event.target
  var item = input.parentElement

  var name = item.getElementsByClassName('cartItemName')[0].innerText
  var flavour = item.getElementsByClassName('flavorCartSelect')[0].innerText
  var priceElement = item.getElementsByClassName('cartItemPrice')[0];
  var quantity = item.getElementsByClassName('amountCartSelect')[0].value;
  var img = document.querySelector('img').src

  updateCartPage();
  console.log(flavour)

  var itemLS =  getItemsFromStorage();
  for(var i = 0; i< itemLS.length; i++){
    console.log(itemLS[i].itemName + " "+ itemLS[i].itemFlavours + " " + name + " " + flavour)
    if(itemLS[i].itemName === name && itemLS[i].itemFlavours === flavour){
      itemLS.splice(i, 1);
      console.log(itemLS[i])
    }
  }
  var addedItem = {
      itemName: name,
      itemNo: quantity,
      itemPrice: priceElement.innerText,
      itemFlavours: flavour,
      itemImg: img
  };

  removeFromLocalStorage(item, name, flavour)
  item.remove()

  addItemLocalStorage(addedItem);

  var subprice = parseFloat(priceElement.innerText.replace('$',''))* quantity
  subprice = Math.round(subprice*100)/100

  item.getElementsByClassName('subPrice')[0].innerText = '$'+ subprice

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
  var cartItemContainer = document.getElementsByClassName('itemsInCart')[0]
  for(var i = 0; i < myItems.length; i++) {
    console.log(myItems)
  }

    var thisItem = myItems.pop();
    var cartItem = document.createElement('div')

    console.log(thisItem.itemPrice.innerText)
    var subPrice = parseFloat(thisItem.itemPrice.replace('$',''))* parseInt(thisItem.itemNo)
    subPrice = Math.round(subPrice*100)/100

    cartItem.innerHTML = `
    <div class = "item1">
    <a class="cartimages"><img src="${thisItem.itemImg}" alt ="img"></a>
      <div class = "section">
        <p class ="cartItemName">${thisItem.itemName}</p>
        <p class ="flavorCartSelect">${thisItem.itemFlavours}</p>
        <p class ="cartItemPrice">${thisItem.itemPrice}</p>

      </div>
      <select class= "amountCartSelect">
        <option value="${thisItem.itemNo}">${thisItem.itemNo}</option>
        <option value ="3">3</option>
        <option value ="1">1</option>
        <option value="6">6</option>
        <option value="12">12</option>
      </select>

      <p class = "subPrice">$${subPrice}</p>
      <button class="removeFromCart">Remove</button>
      </div>
    `

    cartItem.getElementsByClassName("removeFromCart")[0].addEventListener('click', removeCartItem2)
    cartItem.getElementsByClassName('amountCartSelect')[0].addEventListener('change', quantityChange)
    cartItemContainer.appendChild(cartItem);
    updateCartPage();
}

function updateCartPage(){
  var cartItemContainer = document.getElementsByClassName("itemsInCart")[0];
  var cartItems = cartItemContainer.getElementsByClassName("item1");
  var total = 0;

  for(var i=0;i<cartItems.length;i++){
    var item = cartItems[i];
    var priceElement = item.getElementsByClassName('cartItemPrice')[0];
    var quantityElement = item.getElementsByClassName('amountCartSelect')[0];
    quantity = quantityElement.value
    var subprice = parseFloat(priceElement.innerText.replace('$',''))* quantity
    total = total + subprice;
  }

  total = Math.round(total*100)/100;
  document.getElementsByClassName('totalMoney')[0].innerText = '$'+total;
  localStorage.setItem('totalPrice', total)
}

function getTotalPriceFormStorage() {
      let totalPrice;
      const totalPriceLS = localStorage.getItem('totalPrice');
      // Get the values, if null is returned then we create an empty array
      if(totalPriceLS === null) {
           totalPrice = 0;
      } else {
           totalPrice = JSON.parseFloat( totalPriceLS );
      }
      return totalPrice;
}
