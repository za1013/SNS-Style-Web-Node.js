$('input[type="email"]').on('focusout', function(e){
    let email_reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
 
     if(!email_reg.test($(this).val())){
         this.authCheck = true;
     }else{
         this.authCheck = true;
     }
 });

 $('input[type="password"]').on('focusout', function(e){
    let pass_reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if(!pass_reg.test($(this).val())){
        this.authCheck = false;
    }else{
        this.authCheck = true;
    }
});