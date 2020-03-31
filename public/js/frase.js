$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

/* function fraseAleatoria() {
    $.get("http://localhost:3000/frases", traocaFraseAleatoria);
} */

/* function fraseAleatoria() {
    $.get("http://localhost:3000/frases", function(data){
        console.log(data);
        var frase = $(".frase");
        frase.text(data[0].texto);
    });
} */

function fraseAleatoria() {
    $("#spinner").show();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria).fail(function () {
        $("#erro").show();
        setTimeout(function () {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);

    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {
    $("#spinner").show();
    var fraseId = $("#frase-id").val();
    var dados = { id: fraseId };
    $.get("http://localhost:3000/frases", dados,trocaFrase)
    .fail(function () {
        $("#erro").show();
        setTimeout(function () {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}