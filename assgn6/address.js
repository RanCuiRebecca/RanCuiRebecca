
if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
} else{
  ready();
}

function ready(){
  var clickSaveAddress = document.getElementsByClassName('placeSearch')[0]
  clickSaveAddress.addEventListener('click', newADD)
}


function newADD(event) {
     event.preventDefault();
     // Read the textarea value
     const ADD = document.getElementById('addInput').value;
     localStorage.setItem('address', ADD);

     // Print the alert
     window.location.href = "./Home.html";
     alert('Address Added');
}
