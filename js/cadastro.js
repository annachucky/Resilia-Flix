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

