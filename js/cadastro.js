$('#cep').focusout(function(){
    
    $.ajax({
        'url': `https://viacep.com.br/ws/${$('#cep').val()}/json/`,
        success: function(result){
            
            $("#rua").val(result.logradouro)
            $("#estado").val(result.uf)   
            $("#cidade").val(result.localidade)   
            $("#bairro").val(result.bairro)   
        }
        
    })

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

$('#email').focusout(function(){

    let email = $('#email').val()
    let arroba = 0;

    for (let i = 0; i < email.length; i++ ){
        
        if(email[i] == '@' || email[i] == '.' ) {
            arroba++
        }
    }
    console.log(arroba)
  //  if(arroba==1){

   // }
})