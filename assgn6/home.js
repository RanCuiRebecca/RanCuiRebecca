
if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
} else{
  ready();
}

function ready(){


  var addToCartHome = document.getElementsByClassName("addtocart")
  for(var i = 0; i < addToCartHome.length; i++){
    var button = addToCartHome[i]
    button.addEventListener('click', addToCartHomeButtonClicked)
  }
   updateAddress();
  updateHome();

}



// Prints Local Storage Tweets on Load
function updateAddress(){
    console.log('localstorage is: ' + localStorage.getItem('address'))
    var changeaddresses = document.getElementsByClassName('changeaddress');

    var newAddress = localStorage.getItem('address');
    for(var i = 0; i < changeaddresses.length; i++){
      document.getElementById('changeaddressHome').innerText = 'Your address is: ' + JSON.stringify(newAddress)
    }

}

function addToCartHomeButtonClicked(event){

  var addItemToCart= event.target.parentElement.parentElement
  var nameAdded= addItemToCart.getElementsByClassName("pricetag")[0].innerText
  var amountAdded = parseInt(addItemToCart.getElementsByClassName("amountselect")[0].value)


  var button = event.target
  let shopItem = button.parentElement.parentElement.parentElement
  var title = shopItem.getElementsByClassName('hometitle')[0].innerText
  var amount = shopItem.getElementsByClassName('amountselect')[0].value
  var price = shopItem.getElementsByClassName('pricetag')[0].innerText
  var flavours = shopItem.getElementsByClassName('flavorselect')[0].value
  var img = shopItem.querySelector('img').src
console.log(img);
  var addedItem = {
      itemName: title,
      itemNo: amount,
      itemPrice: price,
      itemFlavours: flavours,
      itemImg: img
  };
  console.log("itemImg: " + img);
  console.log("addedItem: " + JSON.stringify(addedItem));
  addItemLocalStorage(addedItem);
  updateHome();

}

function updateHome() {
  var totalAmount = 0;

  var totalLS = getItemsFromStorage();
  for(var i=0;i<totalLS.length;i++){
    var thisAmount = parseInt(totalLS[i].itemNo);
    totalAmount = totalAmount + thisAmount;
  }
  document.getElementsByClassName("numCartItems")[0].innerText = totalAmount;


}

function addItemLocalStorage(item) {
    console.log("item: " + JSON.stringify(item));
     let items = getItemsFromStorage();
     for(var i = 0; i < items.length; i++) {
       if(items[i].itemName == item.itemName && items[i].itemFlavours == item.itemFlavours){
         alert("This item has already been added to the cart")
         return
       }
     }

    alert("You have added " + item.itemNo + " " + item.itemName + " " + item.itemFlavours)
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    console.log(localStorage);
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
