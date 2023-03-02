class Post {
    post_id = ''
    post_content = ''
    user_id = ''
    likes = ''
    api_url = 'https://62c9e8e64795d2d81f833412.mockapi.io' 

    async create(){
        let session = new Session()
        session_id = session.getSession()

        let data = {
            user_id: session_id,
            content: this.post_content,
            likes: 0
        }
        data = JSON.stringify(data)
        let response = await fetch(this.api_url + '/posts' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        data = await response.json()
        return data
    }

    async getAllPosts() {
        let response = await fetch(this.api_url + '/posts')
        let data = await response.json()
        return data
    }
    async getUserPost(userId) {
        let response = await fetch(this.api_url + '/posts');
        let data = await response.json();
        let res=[];
        data.forEach(e => {
            if(e.user_id==userId)
            {
                res.push(e);
            }      
        });
        
        return res;
    }
    async getLikeIds(post_id, user_id, likes)
    {
        let api_url = this.api_url + '/posts/' + post_id
        
        let response = await fetch(api_url)
        let data = await response.json()
        let users = data.like_id;
        if(users.includes(user_id)==true)
        {
            return {
            likes: likes,
            like_id: data.like_id
            }
        }
        
        else{
            return {
                likes: likes+1,
                like_id: users + ' ' + user_id
            }
        }
    }
    async dislikes(post_id, user_id, likes)
    {
        let api_url = this.api_url + '/posts/' + post_id
        
        let response = await fetch(api_url)
        let data = await response.json()
        return {
            likes: likes-1,
            like_id: data.like_id.replace(user_id,"")
        }
    }
    async like(post_id, likes,user_id){
        let data = await this.getLikeIds(post_id,user_id,likes);

        data = JSON.stringify(data)
        
        fetch(this.api_url + '/posts/'+ post_id , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
           //alert('Post je lajkovan')
        })
    }
    async dislike(post_id, likes,user_id){
        let data = await this.dislikes(post_id,user_id,likes);

        data = JSON.stringify(data)
        
        fetch(this.api_url + '/posts/'+ post_id , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
           //alert('Post je dislajkovan')
        })
    }
    delete(post_id) {
        fetch(this.api_url + '/posts/' + post_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
           //alert('Post je obrisan')
        })
    }
}