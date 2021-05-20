class Filme {
  constructor(nome, ano, genero, diretor, poster, descricao, premios, notas) {
    this.nome = nome;
    this.ano = ano;
    this.genero = genero;
    this.diretor = diretor;
    this.poster = poster;
    this.descricao = descricao;
    this.premios = premios;
    this.notas = notas;
  }
}

$('#form-busca').on('submit', (evento) => {
  evento.preventDefault()

  const titulo = $('#procura').val()
  const url = `http://omdbapi.com/?apikey=677ae39&t=${titulo}`;

  $.ajax({
    url,
    success: (resposta) => {

      console.log(resposta)
      let filmeObj = new Filme(
        resposta.Title,
        resposta.Year,
        resposta.Genre,
        resposta.Director,
        resposta.Poster,
        resposta.Plot,
        resposta.Awards,
        resposta.imdbRating,
      );

      if (
        resposta.Error == "Movie not found!" ||
        resposta.Error == "Incorrect IMDb ID."
      ) {
        alert("Coloque um nome de filme válido!");
        $("#procura").focus();
      } else {
        $("#filmeModal").modal("show");
        $("#filmeModalTitulo").html(filmeObj.nome);
        $("#filmeModalPoster").html(`
        <img class='img' src="${filmeObj.poster}" alt="foto">
      `);
      }

      const informacoes = $("#filmeModal .informacoes");
      const titulo = informacoes.find("#titulo");
      const diretor = informacoes.find("#diretor");
      const sinopse = informacoes.find('#sinopse');
      const premios = informacoes.find('#premios');
      const notas = informacoes.find('#notas');

      titulo.html(`<center><h1>${filmeObj.nome} (${filmeObj.ano})</h1></center>`);
      diretor.html(`<center><span>${filmeObj.diretor}</span></center>`);
      sinopse.html(`<p>${filmeObj.descricao}</p>`);
      premios.html(`<p>Awards: ${filmeObj.premios}</p>`);
      notas.html(`<p>Notes: ${filmeObj.notas}</p>`);
    },

    error: (resposta) => {
      alert('Filme/série não encontrado, tente novamente!')
    },
  })
})
























// function consultaAPI(procura = "") {

// $(".btn").on("click", () => {
//   $(".form-inline").submit(false);


//   $.ajax({
//     url: url,
//     success: dados => {
//       informacoes.append(`<h1>${dados.Title}</h1>`);
//       informacoes.append(`<h2>${dados.Director}</h2>`);
//       informacoes.append(`<p>${dados.Year}</p>`);
//     },

//     }); 
//   })};