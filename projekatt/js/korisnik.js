let session = new Session()
let session_id = session.getSession()

if(session_id!== ""){
    async function populateUserData(){
        let user = new User()
        user = await user.get(session_id)
        
        document.querySelector('#username').innerText = user['username']
        document.querySelector('#email').innerText = user['email']

        document.querySelector('#korisnicko_ime').value = user['username']
        document.querySelector('#edit_email').value = user['email']
        
    }
    populateUserData()
}
else{
    window.location.href = "index.html"
}




var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var dataParam = urlParams.get('data');

var myData = JSON.parse(decodeURIComponent(dataParam));

// window.addEventListener('load',()=>{
    
//     document.querySelector('#username').innerText = myData.Username;
//     document.querySelector('#email').innerText = myData.email;
//     getUsersPosts();
// })

getUsersPosts();

async function getUsersPosts(){
  let all_posts = new Post()
  all_posts = await all_posts.getUserPost(session_id)
  console.log('aaaa')
  all_posts.forEach(post => {
      async function getPostUser() {
         
          let user = new User()
          user = await user.get(post.user_id)

          let answer = await new User().likedPost(session_id,post.id);
          
          let comments = new Comment()
          comments = await comments.get(post.id)

          let comments_html = ''

          if(comments.length > 0){
              comments.forEach(comment => {
                comments_html += `<div class="single-comment"><span style = "color:gray" id="usernamecom">${comment.username}</span>  ${comment.content}</div>`
              })
          } 
          let html =  document.querySelector('#allPostsWrapper').innerHTML
          let delete_post_html = ''
            
            if(session_id === post.user_id){
                delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)"><i class="fa-regular fa-x"></i></button>'
            }
            let line
            if(answer =="")
                line = `<button onclick="likeDislike(this);" class="likePostJS like-btn ${answer}" ><span></span><div class="numCount"><div class="num1Count">${post.likes}</div><div class="num2Count">${post.likes}</div></div></button>`
            else
            {
                line = `<button onclick="likeDislike(this);" class="likePostJS like-btn ${answer}" ><span></span><div class="numCount"><div class="num1Count" style="transform: translateY(50px);">${post.likes-1}</div><div class="num2Count" style="transform: translateY(0px);">${post.likes}</div></div></button>`
            }
            document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                        <div class="post-content">${post.content}</div>
                                                                        
                                                                        <div class="post-actions">
                                                                            <p><b><img src= "img/profile2.jpg" width="6%" id="posttimg"></b> ${user.username}</p>
                                                                            <div>
                                                                                ${line}
                                                                                <button onclick="commentPost(this)" class="comment-btn"><span id="cspan">${comments.length}</span></button>
                                                                                ${delete_post_html}
                                                                            </div>
                                                                        </div>
                                                                    
                                                                        <div class="post-comments">
                                                                            <form>
                                                                                <input type="text" placeholder="Napisi komentar...">
                                                                                <button onclick="commentPostSubmit(event)">Comment</button>
                                                                            </form>
                                                                            ${comments_html}
                                                                        </div>
                                                                    </div>` + html;
          /*Likes*/ 
      }
      getPostUser()
  })
}
// ovo dole je za edit profile, logout i to
document.querySelector('#logout').addEventListener('click', e =>{
    e.preventDefault()
    session.destroySession()
    window.location.href = 'index.html'
})

document.querySelector('#editAccount').addEventListener('click', () =>{
    document.querySelector('.custom-modal').style.display = 'block'
})
document.querySelector('#closeModal').addEventListener('click', () =>{
    document.querySelector('.custom-modal').style.display = 'none'
})
document.querySelector('#editForm').addEventListener('submit', e =>{
    e.preventDefault()

    let user = new User()
        user.username = document.querySelector('#korisnicko_ime').value
        user.email = document.querySelector('#edit_email').value
        user.edit()   
})
document.querySelector('#deleteProfile').addEventListener('click', e =>{
    e.preventDefault()

    let text = 'Da li ste sigurni da zelite da obrisete profil?'

    if(confirm(text)===true){
        let user = new User()
        user.delete()
    }
})
