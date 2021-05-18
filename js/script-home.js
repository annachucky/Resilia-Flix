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
//funções!
function mostraModal(obj) {
  $("#filmeModal").modal("show");

  $("#filmeModalTitulo").html(obj.nome);
  $("#filmeModalPoster").html(`
        <img class='img' src="${obj.poster}" alt="foto">
      `);

  const informacoes = $("#filmeModal .informacoes");
  const titulo = informacoes.find("#titulo");
  const diretor = informacoes.find("#diretor");
  const sinopse = informacoes.find("#sinopse");

  titulo.html(`<h1>${obj.nome} (${obj.ano})</h1>`);
  diretor.html(`<span>${obj.diretor}</span>`);
  sinopse.html(`<p>${obj.descricao}</p>`);
}
//Requisições!

//Requisição search
$(".btn-procura").on("click", () => {
  $(".form-inline").submit(false);
  const url = `http://omdbapi.com/?t=${$(
    ".form-control"
  ).val()}&apikey=677ae39`;

  $.ajax({
    url: url,
    success: function (dados) {
      console.log(dados);
      let filmeObj = new Filme(
        dados.Title,
        dados.Year,
        dados.Genre,
        dados.Director,
        dados.Poster,
        dados.Plot
      );

      mostraModal(filmeObj);
    },
  });
});
//Requisição imagem Carrosel

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
const myCard = document.querySelectorAll(".my-card");
for (let i = 0; i < filmesHome.length; i++) {
  $.ajax({
    url: `http://omdbapi.com/?i=${filmesHome[i]}&apikey=677ae39`,
    success: function (dados) {
      $(myCard[i]).append(`
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

      mostraModal(filmeObj);
    },
  });
});

//Aparição Sobre Resilia Flix
$(window).scroll(() => {
  setInterval(function () {
    $(".apresentacao").removeClass("oculto");
  }, 300);
});

//Responsivo
if (window.matchMedia("(min-width: 700px)").matches) {
  $(".lista").removeClass("oculto");
  $(".botoes").removeClass("oculto");
  $(".lista2").addClass("oculto");
}
if (window.matchMedia("(max-width: 700px)").matches) {
  //header
  $(".lista").addClass("oculto");
  $(".botoes").addClass("oculto");
  $("#botao-toggler").click(() => {
    $("#botao-toggler").submit(false);
    $(".lista2").removeClass("oculto");
    if ($("#botao-toggler").hasClass("collapsed")) {
      $(".navbar").animate({ height: "250px" }, 500);
    } else if ($("#botao-toggler").hasClass(".nav-bar-toggler")) {
      $(".navbar").animate({ height: "250px" }, 500);
    } else {
      $(".navbar").animate({ height: "100px" }, 500);
    }
  });

  //carrosel
  $(".item-resp").removeClass("my-card");
}
