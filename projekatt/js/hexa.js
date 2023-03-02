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
document.querySelector('#postForm').addEventListener('submit', e =>{
    e.preventDefault()

    async function createPost(){
        let content = document.querySelector('#postContent').value
        document.querySelector('#postContent').value = ''
        
        let post = new Post()
        post.post_content = content
        post = await post.create()

        let current_user = new User()
        current_user = await current_user.get(session_id)
        let html = document.querySelector('#allPostsWrapper').innerHTML
        
        let delete_post_html = ''
        if(session_id === post.user_id){
            delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)"><i class="fa-regular fa-x"></i></button>'
        }

        document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                    <div class="post-content">${post.content}</div>
                                                                    
                                                                    <div class="post-actions">
                                                                        <p><b><img src= "img/profile2.jpg" width="4%" id="posttimg"></b> ${current_user.username}</p>
                                                                        <div>
                                                                            <button onclick="likePost(this)" class="likePostJS like-btn"><span>${post.likes}</span>Likes</button>
                                                                            <button onclick="commentPost(this)" class="comment-btn">Comments</button>
                                                                            ${delete_post_html}
                                                                        </div>
                                                                    </div>
                                                                   
                                                                    <div class="post-comments">
                                                                        <form>
                                                                            <input type="text" placeholder="Napisi komentar...">
                                                                            <button onclick="commentPostSubmit(event)">Comment</button>
                                                                        </form>
                                                                    </div>
                                                                </div>` + html
                                                                

    }
    createPost()
})

async function getAllPosts() {
    let all_posts = new Post()
    all_posts = await all_posts.getAllPosts()

    all_posts.forEach(post => {
        async function getPostUser() {
           
            let user = new User()
            user = await user.get(post.user_id)

            let comments = new Comment()
            comments = await comments.get(post.id)

            let answer = await new User().likedPost(session_id,post.id);

            let comments_html = ''
            if(comments.length > 0){
                comments.forEach(comment => {
                    comments_html += `<div class="single-comment"><span style = "color:gray" id="usernamecom">${comment.username}</span>  ${comment.content}</div>`
                })
            } 
           

            let html =  document.querySelector('#allPostsWrapper').innerHTML;
            let delete_post_html = ''
            
            if(session_id === post.user_id){
                delete_post_html = '<button class="remove-btn" onclick="removeMyPost(this)"><i class="fa-regular fa-x"></i></button>'
            }
            
            
            document.querySelector('#allPostsWrapper').innerHTML = `<div class="single-post" data-post_id="${post.id}">
                                                                        <div class="post-content">${post.content}</div>
                                                                        
                                                                        <div class="post-actions">
                                                                            <p><b><img src= "img/profile2.jpg" width="6%" id="posttimg"></b> ${user.username}</p>
                                                                            <div>
                                                                                <button onclick="likeDislike(this);" class="likePostJS like-btn ${answer}" ><span>${post.likes} Likes</span></button>
                                                                                <button onclick="commentPost(this)" class="comment-btn">Comments ${comments.length}</button>
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
        
        }
        getPostUser()
    })
}

getAllPosts()

