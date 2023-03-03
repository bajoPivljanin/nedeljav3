

const commentPostSubmit = e => {
    e.preventDefault()

    let btn = e.target
    btn.setAttribute('disabled', 'true')
    
    let main_post_el = btn.closest('.single-post')
    let post_id = main_post_el.getAttribute('data-post_id')

    //let html = main_post_el.querySelector('.post-comments').innerHTML

    let comment_value = main_post_el.querySelector('input').value
    main_post_el.querySelector('input').value = ''
    if(isNaN(comment_value))
    {
        main_post_el.querySelector('.post-comments').innerHTML +=`<div class="single-comment">${comment_value} </div>`
        Name();
    }
    async function Name(){
        let user = new User()
        user = await user.get(session_id)

        let comment = new Comment()
        
        comment.content = comment_value
        comment.user_id = session_id
        comment.post_id = post_id
        comment.username = user.username
        comment.create()
    }
        
}
const removeMyPost = btn => {
    let post_id = btn.closest('.single-post').getAttribute('data-post_id')

    btn.closest('.single-post').remove()
    let post = new Post()
    post.delete(post_id) 
}

const commentPost = btn => {
    let main_post_el = btn.closest('.single-post')
    let box = main_post_el.querySelector('.post-comments')

    if(box.style.maxHeight =="500px")
    {
        box.style.transition = "all .2s ease-out"
        box.style.maxHeight ="0px"; 
    }     
    else
    {
        box.style.maxHeight ="500px" 
        box.style.transition = "all .5s ease-in"
    }
        
    

         
}
const likeDislike = btn =>{
    if(btn.classList.contains('likedPost'))
    {
        let post_id = btn.closest('.single-post').getAttribute('data-post_id')
        let number_of_likes = parseInt(btn.querySelector('.num2Count').innerText)

        btn.querySelector('.num2Count').innerText = number_of_likes - 1+ " "

        let post = new Post()
        post.dislike(post_id,number_of_likes,session_id)
        btn.classList.remove('likedPost');
        btn.querySelector('.num1Count').style.transform="translateY(0px)";
        btn.querySelector('.num2Count').style.transform="translateY(-50px)";
    }
    else
    {
        let post_id = btn.closest('.single-post').getAttribute('data-post_id')
        let number_of_likes = parseInt(btn.querySelector('.num2Count').innerText)

        btn.querySelector('.num2Count').innerText = number_of_likes + 1 + " "

        let post = new Post()
        post.like(post_id,number_of_likes,session_id)
        btn.classList.add('likedPost');
        btn.querySelector('.num1Count').style.transform="translateY(50px)";
        btn.querySelector('.num2Count').style.transform="translateY(0px)";
    }

    
}




//Search bar nestaje
const searchBar = document.querySelector(".navsearch");
let list = document.getElementById("userneki");
// Add a click event listener to the document object
document.addEventListener("click", function(event) {
  // Check if the target of the click event is inside the search bar
  if (!searchBar.contains(event.target) && !list.contains(event.target)) {
    // If the target is not inside the search bar, hide the search bar
    list.innerHTML ="";
    list.style.maxHeight="0px";
    document.querySelector('#aa').ariaPressed="false";
  }
});

document.querySelector('#allPostsWrapper').innerHTML

document.querySelector('.navimg').addEventListener('click',()=>{
    let popup=document.querySelector('.left-side');

    if(popup.style.transform=='translateY(0px)')
    {
        popup.style.transform='translateY(-450px)';
    }
    else{
        popup.style.transform='translateY(0px)';
    }
});