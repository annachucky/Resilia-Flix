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

// puxando as requisições.
const myCard = document.querySelectorAll(".my-card");

requisicaoFilmes(filmesHome[0], myCard[0]);
requisicaoFilmes(filmesHome[1], myCard[1]);
requisicaoFilmes(filmesHome[2], myCard[2]);
requisicaoFilmes(filmesHome[3], myCard[3]);
requisicaoFilmes(filmesHome[4], myCard[4]);
requisicaoFilmes(filmesHome[5], myCard[5]);
requisicaoFilmes(filmesHome[6], myCard[6]);
requisicaoFilmes(filmesHome[7], myCard[7]);
requisicaoFilmes(filmesHome[8], myCard[8]);
requisicaoFilmes(filmesHome[9], myCard[9]);
requisicaoFilmes(filmesHome[10], myCard[10]);
requisicaoFilmes(filmesHome[11], myCard[11]);

//Classes
class Filme {
  constructor(nome, ano, genero, diretor, poster) {
    this.nome = nome;
    this.ano = ano;
    this.genero = genero;
    this.diretor = diretor;
    this.poster = poster;
  }
}

//Requisição AJAX
function requisicaoFilmes(id, div) {
  $.ajax({
    url: `http://omdbapi.com/?i=${id}&apikey=677ae39`,
    success: function (dados) {
      let filmeObj = new Filme(
        dados.Title,
        dados.Year,
        dados.Genre,
        dados.Director,
        dados.Poster
      );

      $(div).append(`
                <img class='img' src="${filmeObj.poster}" alt="foto" data-id="${dados.imdbID}">
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
  const id = $(this).find('img').data('id');

  $.ajax({
    url: `http://omdbapi.com/?i=${id}&apikey=677ae39`,
    success: function (dados) {
      console.log(dados);
      $('#filmeModal').modal('show');

      $('#filmeModalTitulo').html(dados.Title);
      $('#filmeModalPoster').html(`
        <img class='img' src="${dados.Poster}" alt="foto">
      `);

      const informacoes = $('#filmeModal .informacoes');
      const titulo = informacoes.find('#titulo');
      const diretor = informacoes.find('#diretor');
      const sinopse = informacoes.find('#sinopse');

      titulo.html(`<h1>${dados.Title} (${dados.Year})</h1>`);
      diretor.html(`<span>${dados.Director}</span>`);
      sinopse.html(`<p>${dados.Plot}</p>`);
    },
  });
});

// Keyboard nav
$("html body").keydown(function (e) {
  if (e.keyCode == 37) {
    // left
    $(".active").prev().trigger("click");
  } else if (e.keyCode == 39) {
    // right
    $(".active").next().trigger("click");
  }
});
