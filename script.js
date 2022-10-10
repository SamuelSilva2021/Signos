
$('#buscar').on('click', () => {
    let dataEscolhida = recebeDataEscolhida();
    buscaSigno(dataEscolhida);
})

function recebeDataEscolhida() {
    let inputDate = $("input[type=date]").val()
    var dados = inputDate.split('-')
    let mes = dados[1];
    let dia = dados[2]
    let dataEscolhida = dia + '/' + mes
    return dataEscolhida;
}

function buscaSigno(dataEscolhida) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        //Se a resposta da requisição for "OK" e o status 200
        if (this.readyState == 4 && this.status == 200) {
            signoDetalhes(this, dataEscolhida)
        }
    }
    xmlHttp.open("GET", "signos.xml", true);
    xmlHttp.send();
}
function signoDetalhes(xml, dataEscolhida) {
    var i;
    var msgErro = '<h4>Não foi possível encontrar signo com essa data</h4>'
    var xmlDoc = xml.responseXML
    let signo;
    let descricao;
    var x = xmlDoc.getElementsByTagName("signo");
    for (i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("dataInicio")[0].childNodes[0].nodeValue == dataEscolhida) {
            signo = x[i].getElementsByTagName("signoNome")[0].childNodes[0].nodeValue;
            descricao = x[i].getElementsByTagName("descricao")[0].childNodes[0].nodeValue;
            var textHtml = '';
            textHtml += `<h4 id="signo">${signo}</h4>`
            textHtml += `<p id="descricao">${descricao}</p>`
            console.log(textHtml)
            return document.getElementById("resultado").innerHTML = textHtml;
        }
    }

    return document.getElementById("resultado").innerHTML = msgErro
}

