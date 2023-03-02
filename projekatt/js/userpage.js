let session = new Session()
let session_id = session.getSession()

if(session_id!== ""){
}
else{
    window.location.href = "index.html"
}




var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var dataParam = urlParams.get('data');

var myData = JSON.parse(decodeURIComponent(dataParam));

window.addEventListener('load',()=>{
    
    document.querySelector('#username').innerText = myData.Username;
    document.querySelector('#email').innerText = myData.email;
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
                  comments_html += `<div class="single-comment">${comment.content} autor ${comment.username}</div>`
              })
          } 
          let html =  document.querySelector('#allPostsWrapper').innerHTML
          document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                              <div class="post-content">${post.content}</div>
                                                                              
                                                                              <div class="post-actions">
                                                                                  <p><b>Autor:</b> ${user.username}</p>
                                                                                  <div>
                                                                                      <button onclick="likePost(this)" class="likePostJS like-btn" ${answer}><span>${post.likes}</span></button>
                                                                                      <button onclick="commentPost(this)" class="comment-btn">Comments</button>
                                                                                  </div>
                                                                              </div>
                                                                          
                                                                              <div class="post-comments">
                                                                                  <form>
                                                                                      <input type="text" placeholder="Napisi komentar...">
                                                                                      <button onclick="commentPostSubmit(event)">Comment</button>
                                                                                  </form>
                                                                                  ${comments_html}
                                                                              </div>
                                                                          </div>` + html
          /*Likes*/ 
      }
      getPostUser()
  })
}

