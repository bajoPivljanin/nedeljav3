
window.addEventListener('load',()=>{
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var dataParam = urlParams.get('data');

    var myData = JSON.parse(decodeURIComponent(dataParam));
    document.querySelector('#searchUsername').innerText = myData.Username;
    document.querySelector('#searchEmail').innerText = myData.email;
})


//Search bar nestaje
const searchBar = document.querySelector(".navsearch");
let list = document.getElementById("userneki");
// Add a click event listener to the document object
document.addEventListener("click", function(event) {
  // Check if the target of the click event is inside the search bar
  if (!searchBar.contains(event.target) && !list.contains(event.target)) {
    // If the target is not inside the search bar, hide the search bar
    list.innerHTML ="";
    list.style.opacity="0";
  }
});
