
if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
} else{
  ready();
}

function ready(){



  var checkOutButton = document.getElementsByClassName("checkoutbutton")
  for(var i = 0; i < checkOutButton.length; i++){
    var button = checkOutButton[i]
    button.addEventListener('click', checkOutButtonClicked)
  }

   updateAddress();

   // Document Ready


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

function getItemsFromStorage() {
     let items;
     const itemsLS = localStorage.getItem('items');
     console.log("itemLS : " + itemsLS);
     // Get the values, if null is returned then we create an empty array
     if(itemsLS === null) {
          items = [];
          console.log("itemLS IS null")
     } else {
          items = JSON.parse( itemsLS );
          console.log("itemLS: "+ JSON.stringify('items'));
     }
     return items;
}

function getTotalPriceFormStorage() {
      let totalPrice;
      const totalPriceLS = localStorage.getItem('totalPrice');
      // Get the values, if null is returned then we create an empty array
      if(totalPriceLS === null) {
           totalPrice = 0;
      } else {
           totalPrice = JSON.parse( totalPriceLS );
           totalPrice = parseFloat(totalPrice);
      }
      return totalPrice;
}

function checkOutButtonClicked(event){
  var totalPriceElement = document.getElementsByClassName("totalMoney")[0];
  var totalPrice = parseFloat(totalPriceElement.innerText.replace('$',''))
  if(totalPrice === 0){
    alert("You haven't bought anything")
  }
  else {alert('You are all set!')}
}
