firebase.auth().onAuthStateChanged(function(user){
    if(user){
        window.location = "pages/home/home.html";
    }
}) 


function onChangeEmail(){ 
   toggleButtonsDisable();
   toggleEmailErrors();
}

function onChangePassword(){
    toggleButtonsDisable();
    togglePasswordErrors();
}



function login(){

    const termsAccepted = form.acceptTerms().cheked;
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
           form.email().value, form.password().value
           ).then(response =>{
            hideLoading();
            window.location.href = "pages/home/home.html";
    }).catch(error=>{
        hideLoading();
        alert(getErrorMessage(error));
        
    });

    if (!termsAccepted) {
        alert("Você precisa aceitar os termos de privacidade.");
        return;
    }

}

function getErrorMessage(error){
    if (error.code == "auth/user-not-found"){
        return "Usuário não encontrado";
    }
    if (error.code == "auth/wrong-password"){
        return "Senha inválida";
    }
    return error.message;
}

function goBack() {
    window.location.href = "../../index.html";
    console.log("apertou");
  }

function register(){
  window.location.href = "pages/register/register.html";
}

function recoverPassword(){
     
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(()=> {
        hideLoading();
        alert('Email enviado com sucesso'); 
    }).catch(error=>{
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function isEmailValid(){
    const email = form.email().value;
    if (!email){
        return false;
    }
    return validateEmail(email);   
}

function toggleEmailErrors(){
    const email = form.email().value;
    form.emailRequirederror().style.display = email ? "none" : "block";

    form.emailRequirederror().style.display = validateEmail(email) ? "none" : "block";
    
}

function togglePasswordErrors(){
    const password = form.password().value;
    
    form.passwordRequiredError().style.display = password ? "none" : "block"; 

}

function toggleButtonsDisable(){
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();
    const termsAccepted =form.acceptTerms().checked;
    
    form.recoverPassword().disabled = !emailValid; 
    form.loginButton().disabled = !emailValid || !passwordValid || !termsAccepted;
    console.log(termsAccepted);
}

function isPasswordValid(){
    const password = form.password().value;
    if (!password){
       
        return false;
    }
  
    return true;
}

    const form = {
        email: ()=> document.getElementById('email'), 
        emailInvalidError: () => document.getElementById('email-invalid-error'),
        emailRequirederror: () => document.getElementById('email-required-error'),
        loginButton: () => document.getElementById('login-button'),
        password: () => document.getElementById('password'),
        passwordRequiredError: () => document.getElementById('password-required-error'),
        recoverPassword: () => document.getElementById('recover-password-button'),
        acceptTerms: () => document.getElementById('accept_terms')
    }

  