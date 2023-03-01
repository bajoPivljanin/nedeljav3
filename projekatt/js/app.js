let session = new Session()
session = session.getSession()

if(session!== ""){
    window.location.href = "hexa.html"
}

document.querySelector('#registracija').addEventListener('click', () =>{
    if(document.querySelector('#registracija').innerText=="Registruj se"){
        document.querySelector('.registerContainer').style.display = 'block'
        document.querySelector('.main-wrapper').style.display = 'none'
        document.querySelector('#registracija').innerText="Uloguj se"
    }else{
        document.querySelector('.registerContainer').style.display = 'none'
        document.querySelector('.main-wrapper').style.display = 'block';
        document.querySelector('#registracija').innerText="Registruj se"
    }
    
});

let config = {

    'korisnicko_ime': {
        required: true,
        minlength: 5,
        maxlength: 50
    },

    'register_email': {
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50
    },

    'register_lozinka': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'ponovi_lozinku'  
    },

    'ponovi_lozinku': {
        required: true, 
        minlength: 7,
        maxlength: 25,
        matching: 'register_lozinka'
    }

}
let validator = new Validator(config, '#registrationForm')

document.querySelector('#registrationForm').addEventListener('submit', e => {
    e.preventDefault()

    if(validator.validationPassed())
    {
        let user = new User()
            user.username = document.querySelector('#korisnicko_ime').value
            user.email = document.querySelector('#email').value
            user.password = document.querySelector('#lozinka').value
            user.create()
        
    }
    else
        alert('Polja nisu dobro popunjena')
})

let lgn = document.querySelector('#loginForm')
lgn.addEventListener('submit', e => {

    e.preventDefault()

    let email = document.querySelector('#login_email').value
    let password = document.querySelector('#login_lozinka').value
    if(isNaN(email) || isNaN(password))
    {
        let user = new User()
        user.email = email
        user.password = password
        user.login()
    }
    
    
})

