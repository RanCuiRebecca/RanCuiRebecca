
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
}

function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal();
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
    var price = parseFloat(priceElement.innerText.replace('$',''));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }
  document.getElementsByClassName('totalMoney')[0].innerText = '$'+total;
}
