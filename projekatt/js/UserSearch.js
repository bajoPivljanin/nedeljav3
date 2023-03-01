class UserSearch {
  constructor() {
    this.searchInput = document.querySelector('#search-input')
    this.searchBtn = document.querySelector('#aa')
    this.resultContainer = document.querySelector('#userneki')
    this.user = new User()
  }

  async search(query) {
    const results = await this.user.search(query)
    console.log(results)
    this.displayResults(results)
    this.addNames(results)
  }

  displayResults(results) {
    let html = ''

    results.forEach(user => {
      html += `<div class ="singleitemsearchh">
                  <img src="img/profile2.jpg" alt="" srcset="" id="searchimg">
                  <h4>${user.username}</h4>
                  <p>${user.email}</p>
               </div>`
    })

    if (results.length === 0) {
      html = '<p style="margin-left:25%;margin-top:20%;">No results found :/</p>'
    }

    this.resultContainer.innerHTML = html
  }
  async displayUser(userId) {
    const user = await this.user.get(userId);
    const usernameElem = document.querySelector('#username');
    const emailElem = document.querySelector('#email');

    usernameElem.innerHTML = user.username;
    emailElem.innerHTML = user.email;
}


  
  init() {
    this.searchBtn.addEventListener('click', () => {
      const query = this.searchInput.value
      this.search(query)
      this.resultContainer.style.opacity='1';
    })
  }
  addNames(userId){
    let useri = document.querySelectorAll('.singleitemsearchh');
        useri.forEach((e,i) => {
            e.addEventListener('click',()=>{
                
                let myData = {Username:`${e.querySelector('h4').innerHTML}`,
                email:`${e.querySelector('p').innerHTML}`,
                userId:userId[i].id}
                let queryParams = encodeURIComponent(JSON.stringify(myData));
                window.location.href = 'userpage.html?data='+queryParams;
            })
        }) 
  }
}

const userSearch = new UserSearch()
userSearch.init()
