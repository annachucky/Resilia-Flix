$('#cep').focusout(function(){

    let cep = $('#cep').val();

    if(cep.length != 8){

        $("#errorcep").css('visibility','visible')
        $("#errorcepdados").css('visibility','hidden');
        $("#cep").css('border','2px solid red')

    }else{
        $.ajax({

            'url': `https://viacep.com.br/ws/${cep}/json/`,
            success: function(result){

                if(result.hasOwnProperty('erro')){

                    $("#errorcep").css('visibility','hidden')
                    $("#errorcepdados").css('visibility','visible');
                    $("#cep").css('border','2px solid red');

                }else{
                    $("#errorcep").css('visibility','hidden')
                    $("#errorcepdados").css('visibility','hidden');
                    $("#cep").css('border','2px solid rgb(255, 182, 18)');
                    $("#rua").val(result.logradouro)
                    $("#estado").val(result.uf)   
                    $("#cidade").val(result.localidade)   
                    $("#bairro").val(result.bairro)
                    $("#rua").css('border','2px solid rgb(255, 182, 18)');
                    $("#estado").css('border','2px solid rgb(255, 182, 18)');  
                    $("#cidade").css('border','2px solid rgb(255, 182, 18)');  
                    $("#bairro").css('border','2px solid rgb(255, 182, 18)');
                }
        }});  
    }    
});        
       

$('#olho').mouseup(function(){

    $('#password').attr("type", "text");

});

$('#olho').mouseout(function(){

    $('#password').attr("type", "password");
});

$('#olho2').mouseup(function(){

    $('#password2').attr("type", "text");

});

$('#olho2').mouseout(function(){

    $('#password2').attr("type", "password");
});

$('#nome').focusout(function(){

    let nomes = $('#nome').val()
    let espaco = 0;

    for (let j = 0; j < nomes.length; j++ ){
        
        nomes[j]==' '? espaco++ : espaco;
    }
    if(espaco == 0){

        $("#errornome").css('visibility','visible')
        $("#nome").css('border','2px solid red')

    }else{
        $("#errornome").css('visibility','hidden')
        $("#nome").css('border','2px solid rgb(255, 182, 18)')
    }
}); 


$('#email').focusout(function(){

    let email = $('#email').val()
    let arroba = 0;

    for (let i = 0; i < email.length; i++ ){
        
        email[i]=='@'? arroba+=50 : arroba
        email[i]=='.'? arroba+=10 : arroba
    }
    if(arroba >=60 && arroba < 100){

        $("#erroremail").css('visibility','hidden')
        $("#email").css('border','2px solid rgb(255, 182, 18)')

    }else{

        $("#erroremail").css('visibility','visible')
        $("#email").css('border','2px solid red')
    }
    
});

$('#password2').focusout(function(){
    let senha1= $('#password').val()
    let senha2 = $('#password2').val()

    if (senha1===senha2){

        $("#errorsenha").css('visibility','hidden')
        $("#password").css('border','2px solid rgb(255, 182, 18)')
        $("#password2").css('border','2px solid rgb(255, 182, 18)')

    }else{
        $("#errorsenha").css('visibility','visible')
        $("#password").css('border','2px solid red')
        $("#password2").css('border','2px solid red')
    }
});

$('#rgnumero').focusout(function(){
    let rg = $('#rgnumero').val()
    
    if(rg.length > 0){

        $("#errorrg").css('visibility','hidden')
        $("#rgnumero").css('border','2px solid rgb(255, 182, 18)')

    }else{
        $("#errorrg").css('visibility','visible')
        $("#rgnumero").css('border','2px solid red')
    }

});

$('#numero').focusout(function(){
    let numeroResid = $('#numero').val()
    
    if(numeroResid.length > 0){
    
        $("#errornumero").css('visibility','hidden')
        $("#numero").css('border','2px solid rgb(255, 182, 18)')

    }else{
        $("#errornumero").css('visibility','visible')
        $("#numero").css('border','2px solid red')
    }

});

