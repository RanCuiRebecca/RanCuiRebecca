if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
} else{
  ready();
}

function ready(){

  var bluepartLS = getItemsFromStorage();

  var bluereinforcepart = document.getElementsByClassName("column")[0];


  console.log(bluereinforcepart);
  for(var i = 0; i < bluepartLS.length; i++){
    var newItem = document.createElement('div');
    console.log("functional Location:   " + bluepartLS[i].imageLink);
    newItem.innerHTML  = `
    <!-- <script>
    bluepartLS[i].imageLink;
    </script> -->
    <div onclick = ${bluepartLS[i].imageLink}><img class="reviewitem" src="${bluepartLS[i].imageSrc}"/></div>
    `;
    bluereinforcepart.appendChild(newItem);
  }


}

function getItemsFromStorage() {
     let items = [];
     const itemsLS = localStorage.getItem('items');
     // Get the values, if null is returned then we create an empty array
     if(itemsLS === null) {
          items = [];
     } else {
          items =  JSON.parse(itemsLS);
     }
     return items;
}
