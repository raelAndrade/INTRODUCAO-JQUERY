var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

/* Atalho para a função ready é utilizar: $(function(){ // Código omitido para toda vez que incializar a página // }); */
$(document).ready(function () {
    atualizaTamanhoFrase();
    incializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo); /* A função click é um atalho do jQuery ao invés de .on("click", function({ // Código omitido })); */
});

function atualizaTamanhoFrase() {
    var frase = jQuery(".frase").text();
    /**
     * Para quebrar uma string em espaços, podemos utilizar a conhecida função .split() do JavaScript tradicional, 
     * que nos retorna um array com as palavras separadas.Como queremos separar pelo espaço em branco(" "), 
     * passaremos ele como parâmetro em split()
     */
    var numPalavras = frase.split(" ").length;
    /**
     * O parâmetro .text() do jQuery tem dois comportamentos, o primeiro, 
     * quando passamos sem nenhum parâmetro, o retorno será o valor de texto do elemento, 
     * e o segundo, quando passamos com um parâmetro, altera o valor de texto do elemento.
     */
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

/**
 * O Evento input
 * 
 * No entanto, para atualizar os contadores, temos sempre que clicar dentro do campo, quando usa o evento de click.
 * O ideal seria que o contador fosse atualizado enquanto o usuário digita.
 * E para isso existe um evento específico de quando digitamos, colocamos dados em um campo: input:
 */
function incializaContadores() {
    campo.on("input", function () {
        /**
         * No caso do textarea, o conteúdo não estará na propriedade text e sim no value, ou como é chamado pelo jQuery: val.
         * Lembrando que o val nos dá acesso ao que está dentro de uma tag de input, como as tags input e textarea.
         * Já o text nos dá acesso ao que está dentro de uma tag de texto, como p, span e h1.
         */
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
        /**
         * Expressão Regular
         * se pressionarmos várias vezes a barra de espaço, o contador irá considerar que um deles equivale a uma palavra.
         * Isso tem relação com o modo que estamos contando as palavras, fazendo um split em um espaço vazio.
         * Para sermos mais precisos na contagem, utilizaremos a função replace com uma expressão regular em vez dos espaço vazio.
         * A expressão regular será responsável por buscar qualquer caractere, exceto espaço vazio: /\s+/g.
         */
        //Retira os espaço da String 
        var conteudoSemEspaco = conteudo.replace(/\s+/g, '');
        var qtdCaracteres = conteudoSemEspaco.length;
        $('#contador-caracteres').text(qtdCaracteres);
    });
}

/**
 * Evento focus
 * 
 * há um evento específico para quando entramos dentro de um campo, que é o evento focus, que é quando o campo ganha o foco no programa, 
 * ou seja, é selecionado de alguma maneira.
 * 
 * A cada segundo que se passar, temos que subtrair 1 do nosso tempo restante. Para tal, vamos utilizar a função setInterval() do JavaScript, 
 * que faz com que uma determinada ação(passada como primeiro parâmetro) seja executada em um intervalo de tempo(passado como segundo parâmetro, no nosso caso, 1 segundo, ou 1000 milissegundos)
 * Dentro de setInterval podemos subtrair 1 do nosso tempo restante a cada segundo que passe, logo: tempoRestante--;
 * 
 * Como queremos adicionar um atributo, o jQuery nos auxilia disponibilizando a função attr.
 * Essa função funciona de maneira semelhante à função text, podendo pegar o valor de um atributo ou modificá - lo.
 * 
 * Mas ainda temos um bug, porque o tempo continua decrescendo depois do 0, ou seja, ele fica negativo.
 * Temos que fazer com que a função setInterval pare quando o tempo for 0.
 * Para isso, existe a função clearInterval, que recebe o id do setInterval como parâmetro.Vamos colocá - la dentro do nosso if: clearInterval(id).
 * Toda função setInterval() retorna o seu próprio id, logo, basta guardarmos esse id em uma variável e passá - lo para a função clearInterval.
 * 
 * A função on fica escutando o evento o tempo todo, e para que ela funcione somente na primeira vez, existe a função one, que funciona exatamente como a função on, só que só escuta o evento uma única vez:
 * 
 */
function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function () {
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroId = setInterval(function () {
            tempoRestante--;
            console.log(tempoRestante);
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroId);
                $("#botao-reiniciar").attr("disabled", false);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelho");
        } else {
            campo.addClass("borda-vermelho");
            campo.removeClass("borda-verde");
        }
    });
}

/**
 * Essa ação de adicionar e remover classes se tornou uma tarefa tão comum, que o jQuery criou uma função específica para isso, a toggleClass().
 * Ela funciona da seguinte maneira: se no momento que a função for chamada, o elemento possuir a classe, ela será removida.
 * Mas se o elemento não possuir a classe, ela será adicionada.
 */
function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelho");
    campo.removeClass("borda-verde");
}