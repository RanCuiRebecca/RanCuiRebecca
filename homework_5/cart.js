
if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
} else{
  ready();
}


function ready(){
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

  var quantityInput = document.getElementsByClassName("quantities")
  for(var i = 0; i < quantityInput.length; i++){
    var button = quantityInput[i]
    button.addEventListener('click', quantityChange)
  }

  var checkOutButton = document.getElementsByClassName("checkoutbutton")
  for(var i = 0; i < checkOutButton.length; i++){
    var button = checkOutButton[i]
    button.addEventListener('click', checkOutButtonClicked)
  }

  var addToCartHome = document.getElementsByClassName("addtocart")
  for(var i = 0; i < addToCartHome.length; i++){
    var button = addToCartHome[i]
    console.log(button)
    button.addEventListener('click', addToCartHomeButtonClicked)
  }

}

function addToCartHomeButtonClicked(event){
  var totalNo = parseInt(document.getElementsByClassName("numCartItems")[0].innerText)
  var addItemToCart= event.target.parentElement.parentElement
  var nameAdded= addItemToCart.getElementsByClassName("pricetag")[0].innerText
  var amountAdded = parseInt(addItemToCart.getElementsByClassName("amountselect")[0].value)
  console.log(nameAdded)
  console.log(amountAdded)
  totalNo = totalNo + amountAdded
  document.getElementsByClassName("numCartItems")[0].innerText = totalNo
  console.log(totalNo)
  alert("You have added " + amountAdded + " " + nameAdded)
}

function quantityChange(event){
  var input = event.target
  updateCartTotal();
}

function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal();
}

function addToCartClicked(event){
  var button = event.target
  let shopItem = button.parentElement.parentElement
  var title = document.getElementsByClassName('title')[0].innerText
  var amount = document.getElementsByClassName('quantities')[0].value
  var price = document.getElementsByClassName('itemPrice')[0].innerText
  var flavours = document.getElementsByClassName('flavours')[0].value
  console.log(title, price,amount,flavours)
  addItemToCart(title, price, amount,flavours)
  updateCartTotal()
}

function checkOutButtonClicked(event){
  var totalPriceElement = document.getElementsByClassName("totalMoney")[0];
  var totalPrice = parseFloat(totalPriceElement.innerText.replace('$',''))
  if(totalPrice === 0){
    alert("You haven't bought anything")
  }
  else {alert('You are all set!')}
}

function addItemToCart(title, price, amount,flavour){
  var cartItem = document. createElement('div')
  var cartItemContainer = document.getElementsByClassName('cartItemContainer')[0]
  var cartItemNames = cartItemContainer.getElementsByClassName('cart-item-title')
  var cartRowContents = `
  <div class = "cartItem">
  <p class = "cart-item-title">${title} (${flavour})</p>

  <select class ="quantities">
  <option value="${amount}">${amount}</option>
  <option value="1">1</option>
  <option value="3">3</option>
  <option value="6">6</option>
  <option value="12">12</option>
  </select>
  <p class = "priceElement">${price}</p>
  <div>
  <button class="removeItem">Remove</button>
  </div>
  </div>
  `
  cartItem.innerHTML = cartRowContents

  cartItemContainer.append(cartItem);
  cartItem.getElementsByClassName("removeItem")[0].addEventListener('click', removeCartItem)
  cartItem.getElementsByClassName('quantities')[0].addEventListener('change', quantityChange)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cartItemContainer")[0];
  var cartItems = cartItemContainer.getElementsByClassName("cartItem");
  var total = 0;
  for(var i=0;i<cartItems.length;i++){
    var item = cartItems[i];
    var priceElement = item.getElementsByClassName('priceElement')[0];
    console.log(priceElement);
    var quantityElement = item.getElementsByClassName('quantities')[0];
    quantity = quantityElement.value
    var price = parseFloat(priceElement.innerText.replace('$',''))
    total = total + (price * quantity);
  }
  total = Math.round(total*100)/100;
  document.getElementsByClassName('totalMoney')[0].innerText = '$'+total;

}
