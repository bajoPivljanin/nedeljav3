class UserSearch {
  constructor() {
    this.searchInput = document.querySelector('#search-input')
    this.searchBtn = document.querySelector('#aa')
    this.resultContainer = document.querySelector('#userneki')
    this.user = new User()
  }

  async search(query) {
    const results = await this.user.search(query)
    this.displayResults(results)
    this.addNames()
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
    console.log('displayUser called with userId', userId);
    const user = await this.user.get(userId);
    console.log('user data:', user);
    const usernameElem = document.querySelector('#username');
    console.log('username element:', usernameElem);
    const emailElem = document.querySelector('#email');
    console.log('email element:', emailElem);

    usernameElem.innerHTML = user.username;
    emailElem.innerHTML = user.email;

    window.location.href = 'userpage.html';
}


  
  init() {
    this.searchBtn.addEventListener('click', () => {
      const query = this.searchInput.value
      this.search(query)
      this.resultContainer.style.opacity='1';
    })
  }
  addNames(){
    let useri = document.querySelectorAll('.singleitemsearchh');
        useri.forEach(e => {
            e.addEventListener('click',()=>{
                document.querySelector('#searchUsername').innerHTML = e.querySelector('h4').innerHTML;
                document.querySelector('#searchEmail').innerHTML = e.querySelector('p').innerHTML       
            })
        }) 
  }
}

const userSearch = new UserSearch()
userSearch.init()
