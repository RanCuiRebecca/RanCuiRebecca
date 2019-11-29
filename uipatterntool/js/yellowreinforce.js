if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
} else{
  ready();
}

function ready(){

  var yellowpartLS = getItemsFromStorage();

  var yellowreinforcepart = document.getElementsByClassName("column")[0];


  console.log(yellowreinforcepart);
  for(var i = 0; i < yellowpartLS.length; i++){
    var newItem = document.createElement('div');
    console.log("functional Location:   " + yellowpartLS[i].imageLink);
    newItem.innerHTML  = `
    <!-- <script>
    bluepartLS[i].imageLink;
    </script> -->
    <div onclick = ${yellowpartLS[i].imageLink}><img class="reviewitem" src="${yellowpartLS[i].imageSrc}"/></div>
    `;
    yellowreinforcepart.appendChild(newItem);
  }


}

function getItemsFromStorage() {
     let items2 = [];
     const itemsLS = localStorage.getItem('items2');
     // Get the values, if null is returned then we create an empty array
     if(itemsLS === null) {
          items2 = [];
     } else {
          items2 =  JSON.parse(itemsLS);
     }
     return items2;
}
