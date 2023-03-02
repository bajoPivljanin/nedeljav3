class User {
    user_id = ''
    username = ''
    email = ''
    password = ''
    api_url = 'https://62c9e8e64795d2d81f833412.mockapi.io' 

    async create() {
        let data = {
            username: this.username,
            email : this.email,
            password: this.password
        }
        let user = new User()
        const results = await user.search('')
        let num = 0;
        results.forEach(element => {
            if(element.username == this.username || element.email==this.email)
            {
                num=1;
            }
            
        });
        if(num==1)
        {
                alert('korisnik vec postoji!');
        }
        else{
            data = JSON.stringify(data)   
            fetch(this.api_url + '/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            })
            .then(response => response.json())
            .then(data => {
                // alert('Korisnik kreiran');
                let session = new Session()
                session.user_id = data.id
                session.startSession()
                
                window.location.href = 'hexa.html' 
            })
        }
        
        
       
    }
    async get(user_id) {
       let api_url = this.api_url + '/users/' + user_id
       
       let response = await fetch(api_url)
       let data = await response.json()

       return data
       
    }
    edit(){
        let data = {
            username: this.username,
            email: this.email
        }
        data = JSON.stringify(data)

        let session = new Session()
        session_id = session.getSession()

        fetch(this.api_url + '/users/' + session_id , {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body:data
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'hexa.html'
        })
    }

    login(){
        fetch(this.api_url + '/users')
        .then(response => response.json())
        .then(data => {
           let login_successful = 0 
            data.forEach(db_user => {
                if(db_user.email === this.email && db_user.password == this.password){
                    let session = new Session()
                    session.user_id = db_user.id
                    session.startSession()
                    login_successful = 1
                    window.location.href = 'hexa.html'
                } 
            })
            if(login_successful === 0){
               alert('Pogresan email ili lozinka') 
            }
        })
    }
    delete(){
        let session = new Session()
        session_id = session.getSession()

        fetch(this.api_url + '/users/' + session_id , {
            method: 'DELETE' 
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session()
            session.destroySession()

            window.location.href = '/'
        })
    }
    async search(query) {
        const response = await fetch(`${this.api_url}/users`)
        const data = await response.json()
        const results = data.filter(user => {
            if (user.username && typeof user.username === "string") {
                return user.username.toLowerCase().includes(query.toLowerCase())
            }
            return false
        })
        return results
    }
    
    async getUserWithComments(user_id) {
        let user = await this.get(user_id)

        let posts = new Post()
        posts = await posts.getUserPost(user_id)

        let comments = new Comment()

        for (let post of posts) {
            let postComments = await comments.get(post.id)

            for (let comment of postComments) {
                let commentUser = await this.get(comment.user_id)
                comment.username = commentUser.username
            }

            post.comments = postComments
        }

        user.posts = posts

        return user
    }
    async likedPost(user_id,post_id)
    {
        let api_url = this.api_url + '/posts/' + post_id     
        let response = await fetch(api_url)
        let data = await response.json()
        let users = data.like_id;
        if(users.includes(user_id))
        {
            return "likedPost"; 
        } 
        else
        {
            return "";
        }
    }
}