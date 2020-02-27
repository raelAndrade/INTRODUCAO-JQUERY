$("#botao-placar").click(mostraPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Israel";
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    /**
     * Se queremos achar em que posição o placar se encontra, basta selecionarmos - o e chamar a função offset
     * Essa função nos retorna a distância em que o elemento está do topo e da esquerda da página.
     * Se acessarmos o valor do topo(top), teremos o valor exato para onde queremos scrollar a página.
     */
    var posicaoPlacar = $(".placar").offset().top;
    /**
     * Para animar algo, utilizamos a função animate do jQuery.Ela recebe dois parâmetros, 
     * um objeto que contém as propriedades CSS a serem animadas e os seus valores, e o tempo de duração da animação.
     */
    $("body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    /* $(this).parent().parent().remove(); */

    /**
     * O jQuery já possui uma função que vai diminuindo a opacidade de um elemento aos poucos, até o seu total desaparecimento, essa função é a fadeOut.
     */
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function () {
        linha.remove();
    }, 1000);
}

function mostraPlacar() {
    /**
     * Antes de realizarmos a animação, paramos a que estiver acontecendo através da função stop do jQuery.
     * Essa função faz exatamente o que precisamos, a animação que estiver acontecendo no momento é interrompida, e uma próxima é iniciada.
     */
    $(".placar").stop().slideToggle(600);

}