let session = new Session()
let session_id = session.getSession()

if(session_id!== ""){
    async function populateUserData(){
        let user = new User()
        user = await user.get(session_id)
        
        document.querySelector('#username').innerText = user['username']
        document.querySelector('#email').innerText = user['email']
        
     
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

window.addEventListener('load',()=>{
    
    document.querySelector('#username2').innerText = myData.Username;
    document.querySelector('#email2').innerText = myData.email;
    getUsersPosts();
})



async function getUsersPosts(){
  let all_posts = new Post()
  all_posts = await all_posts.getUserPost(myData.userId)
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
                                                                        <p><b><img src= "img/profile2.jpg" width="6%" id="posttimg"></b>${user.username}</p>
                                                                        <div>
                                                                            ${line}
                                                                            <button onclick="commentPost(this)" class="comment-btn"><span id="cspan">${comments.length}</span></button>
                                                                        </div>
                                                                    </div>
                                                                
                                                                    <div class="post-comments">
                                                                        <form>
                                                                            <input type="text" placeholder="Napisi komentar...">
                                                                            <button onclick="commentPostSubmit(event)">Comment</button>
                                                                        </form>
                                                                        ${comments_html}
                                                                    </div>
                                                                </div>` ;
          /*Likes*/ 
      }
      getPostUser()
  })
}
