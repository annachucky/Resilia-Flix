$('#emailrecupera').focusout(function(){

    let emailRecupera = $('#emailrecupera').val()
    let arrobaRecupera = 0;

    for (let i = 0; i < emailRecupera.length; i++ ){
        
        emailRecupera[i]=='@'? arrobaRecupera+=50 : arrobaRecupera
        emailRecupera[i]=='.'? arrobaRecupera+=10 : arrobaRecupera
    }
    if(arrobaRecupera >=60 && arrobaRecupera < 100){

        $("#errorEmailRecupera").css('visibility','hidden')
        $("#emailrecupera").css('border','2px solid rgb(255, 182, 18)')

        $('#botaoRecupera').click(function(){

            $("#spanRecupera").css('visibility','visible')
            $("#spanRecupera").css('color','rgb(255, 182, 18)')
                
        });

    }else{

        $("#errorEmailRecupera").css('visibility','visible')
        $("#emailrecupera").css('border','2px solid red')
    }
    
});



