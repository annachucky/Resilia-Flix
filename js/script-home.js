// ID dos filmes da página Home
const filmesHome = [
  "tt1375666",
  "tt0427944",
  "tt0816692",
  "tt0245429",
  "tt7069210",
  "tt3021746",
  "tt0898266",
  "tt2442560",
  "tt1632701",
  "tt2560140",
  "tt5626028",
  "tt0988824",
];

//Classes
class Filme {
  constructor(nome, ano, genero, diretor, poster, descricao) {
    this.nome = nome;
    this.ano = ano;
    this.genero = genero;
    this.diretor = diretor;
    this.poster = poster;
    this.descricao = descricao;
  }
}

// puxando as requisições do carrosel.
const myCard = document.querySelectorAll(".my-card");
for (let i = 0; i < filmesHome.length; i++) {
  requisicaoFilmes(filmesHome[i], myCard[i]);
}

//Requisições!
//Requisição imagem Carrosel
function requisicaoFilmes(id, div) {
  $.ajax({
    url: `http://omdbapi.com/?i=${id}&apikey=677ae39`,
    success: function (dados) {
      $(div).append(`
                <img class='img' src="${dados.Poster}" alt="foto" data-id="${dados.imdbID}">
          `);
    },
  });
}

// Carrosel
$num = $(".my-card").length;
$even = $num / 2;
$odd = ($num + 1) / 2;

if ($num % 2 == 0) {
  $(".my-card:nth-child(" + $even + ")").addClass("active");
  $(".my-card:nth-child(" + $even + ")")
    .prev()
    .addClass("prev");
  $(".my-card:nth-child(" + $even + ")")
    .next()
    .addClass("next");
} else {
  $(".my-card:nth-child(" + $odd + ")").addClass("active");
  $(".my-card:nth-child(" + $odd + ")")
    .prev()
    .addClass("prev");
  $(".my-card:nth-child(" + $odd + ")")
    .next()
    .addClass("next");
}
// Click CARROSEL
$(".my-card").click(function () {
  $slide = $(".active").width();
  console.log("oi", $(".active").position().left);
  console.log("slide", $slide);

  if ($(this).hasClass("next")) {
    $(".card-carousel-jquery")
      .stop(false, true)
      .animate({ left: "-=" + "100px" });
  } else if ($(this).hasClass("prev")) {
    $(".card-carousel-jquery")
      .stop(false, true)
      .animate({ left: "+=" + "100px" });
  }

  $(this).removeClass("prev next");
  $(this).siblings().removeClass("prev active next");

  $(this).addClass("active");
  $(this).prev().addClass("prev");
  $(this).next().addClass("next");

  // Buscar informações do filme
  const id = $(this).find("img").data("id");

  $.ajax({
    url: `http://omdbapi.com/?i=${id}&apikey=677ae39`,
    success: function (dados) {
      let filmeObj = new Filme(
        dados.Title,
        dados.Year,
        dados.Genre,
        dados.Director,
        dados.Poster,
        dados.Plot
      );

      $("#filmeModal").modal("show");

      $("#filmeModalTitulo").html(filmeObj.nome);
      $("#filmeModalPoster").html(`
        <img class='img' src="${filmeObj.poster}" alt="foto">
      `);

      const informacoes = $("#filmeModal .informacoes");
      const titulo = informacoes.find("#titulo");
      const diretor = informacoes.find("#diretor");
      const sinopse = informacoes.find("#sinopse");

      titulo.html(`<h1>${filmeObj.nome} (${filmeObj.ano})</h1>`);
      diretor.html(`<span>${filmeObj.diretor}</span>`);
      sinopse.html(`<p>${filmeObj.descricao}</p>`);
    },
  });
});

// Keyboard nav
$("html body").keydown(function (e) {
  if (e.keyCode == 37) {
    // Esquerda
    $(".active").prev().trigger("click");
  } else if (e.keyCode == 39) {
    // Direita
    $(".active").next().trigger("click");
  }
});
