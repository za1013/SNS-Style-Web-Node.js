$('input[type="email"]').on('focusout', function(e){
    let email_reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
 
     if(!email_reg.test($(this).val())){
         this.authCheck = false;
     }else{
         this.authCheck = true;
         console.log("OK !")
     }
 });

 $('input[type="password"]').on('focusout', function(e){
    let pass_reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if(!pass_reg.test($(this).val())){
        this.authCheck = false;
    }else{
        this.authCheck = true;
        console.log("OK !")
    }
});
$('.reg-username').on('focusout', function(e){
    let name_reg = /^[A-Za-z]{2,10}$/;
    if(!name_reg.test($(this).val())){
        this.authCheck = false;
    }else{
        this.authCheck = true;
    }
})
$('.reg-nickname').on('focusout', function(e){
    let name_reg = /^[A-Za-z]{2,10}$/;
    if(!name_reg.test($(this).val())){
        this.authCheck = false;
    }else{
        this.authCheck = true;
    }
})

$('.login-submit').on('click', function(e){
    let email_auth = $('.login-email').get(0).authCheck;
    let password_auth = $('.login-password').get(0).authCheck;
    if(!(email_auth && password_auth)){
        alert('Please Value in the Box');
        e.preventDefault();
    }
});


$('.register-submit').on('click', function(e){
    let name_auth = $('.reg-username').get(0).authCheck;
    let nick_auth = $('.reg-nickname').get(0).authCheck;
    let email_auth = $('.reg-email').get(0).authCheck;
    let password_auth = $('.reg-password').get(0).authCheck;

    let password_eq_ch = $(".reg-password").val() === $(".reg-passcheck").val()
    if(!password_eq_ch){
        alert("password not equals")
    }
    if(!((name_auth && email_auth) && (password_auth && nick_auth))){
        alert('Please Value in the Box');
        e.preventDefault();
    }
})