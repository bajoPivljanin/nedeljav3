var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var dataParam = urlParams.get('data');

var myData = JSON.parse(decodeURIComponent(dataParam));

window.addEventListener('load',()=>{
    
    document.querySelector('#searchUsername').innerText = myData.Username;
    document.querySelector('#searchEmail').innerText = myData.email;
    getUsersPosts();
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

async function getUsersPosts(){
  let all_posts = new Post()
  all_posts = await all_posts.getUserPost(myData.userId)
  all_posts.forEach(post => {
      async function getPostUser() {
         
          let user = new User()
          user = await user.get(post.user_id)

          
          
          let comments = new Comment()
          comments = await comments.get(post.id)

          let name = new User()
          name = await name.get(comment.user_id)
          name.username

          let comments_html = ''

          if(comments.length > 0){
              comments.forEach(comment => {
                  comments_html += `<div class="single-comment">${comment.content} autor ${comments.user_id}</div>`
              })
          } 
         await Pokusaj();
          console.log('bbbbb');
          let html =  document.querySelector('#allPostsWrapper').innerHTML
          document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                              <div class="post-content">${post.content}</div>
                                                                              
                                                                              <div class="post-actions">
                                                                                  <p><b>Autor:</b> ${user.username}</p>
                                                                                  <div>
                                                                                      <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span>Likes</button>
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
          
      }
      getPostUser()
  })
}
const likePost = btn => {
    let main_post_el = btn.closest('.single-post')
    let post_id = btn.closest('.single-post').getAttribute('data-post_id')
    let number_of_likes = parseInt(btn.querySelector('span').innerText)

    btn.querySelector('span').innerText = number_of_likes + 1
    btn.setAttribute('disabled','true')

    let post = new Post()
    post.like(post_id,number_of_likes + 1)

}
const commentPost = btn => {
    let main_post_el = btn.closest('.single-post')
    let post_id = main_post_el.getAttribute('data-post-id')

    if(main_post_el.querySelector('.post-comments').style.display=='block')
        main_post_el.querySelector('.post-comments').style.display= 'none'
    else
        main_post_el.querySelector('.post-comments').style.display = 'block'
     
}
const commentPostSubmit = e => {
  e.preventDefault()

  let btn = e.target
  btn.setAttribute('disabled', 'true')
  
  let main_post_el = btn.closest('.single-post')
  let post_id = main_post_el.getAttribute('data-post_id')

  //let html = main_post_el.querySelector('.post-comments').innerHTML

  let comment_value = main_post_el.querySelector('input').value
  main_post_el.querySelector('input').value = ''
  main_post_el.querySelector('.post-comments').innerHTML +=`<div class="single-comment"> ${comment_value}</div>`

  let comment = new Comment()
  comment.content = comment_value
  comment.user_id = session_id
  comment.post_id = post_id
  comment.create()
}
