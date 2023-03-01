
window.addEventListener('load',()=>{
    console.log('aaaaa')
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var dataParam = urlParams.get('data');

    var myData = JSON.parse(decodeURIComponent(dataParam));
    console.log(myData.Username);
    document.querySelector('#searchUsername').innerText = myData.Username;
    document.querySelector('#searchEmail').innerText = myData.email;
})