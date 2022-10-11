
function queryString(parameter) {  
    var loc = location.search.substring(1, location.search.length);   
    var param_value = false;   
    var params = loc.split("&");   
    for (i=0; i<params.length;i++) {   
        param_name = params[i].substring(0,params[i].indexOf('='));   
        if (param_name == parameter) {                                          
            param_value = params[i].substring(params[i].indexOf('=')+1)   
        }   
    }   
    if (param_value) {   
        return param_value;   
    }   
    else {   
        return undefined;   
    }   
}

var dataEscolhida = queryString("data");

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
function retornaObjData(obj){
    var dataCompara = obj.split("/");
        var dia = parseInt(dataCompara[0]);
        var mes = parseInt(dataCompara[1]);
        var dataConvert = new Date(2022, mes, dia)
        return dataConvert
}

function signoDetalhes(xml, dataEscolhida) {
    var i;
    var msgErro = '<h4>Não foi possível encontrar signo com essa data</h4>'
    var xmlDoc = xml.responseXML
    var x = xmlDoc.getElementsByTagName("signo");
    var lista = [];
    var dtEscolhida = retornaObjData(dataEscolhida)
    for (i = 0; i < x.length; i++) {
        var obj = {
            dtIni: retornaObjData(x[i].getElementsByTagName("dataInicio")[0].childNodes[0].nodeValue),
            dtFim: retornaObjData(x[i].getElementsByTagName("dataFim")[0].childNodes[0].nodeValue),
            descricao: x[i].getElementsByTagName("descricao")[0].childNodes[0].nodeValue,
            signo: x[i].getElementsByTagName("signoNome")[0].childNodes[0].nodeValue
        }
        lista.push(obj)
    }
    for(var x = 0; x < lista.length; x ++){
        if(dtEscolhida >= lista[x].dtIni && dtEscolhida <= lista[x].dtFim){
            var text = '';
            text += `<h4>${lista[x].signo}</h4>`
            text += `<p id="descricao">${lista[x].descricao}</p>`

            return document.getElementById("resultado").innerHTML = text;
        }
        
    }
    return document.getElementById("resultado").innerHTML = msgErro
    
}
buscaSigno(dataEscolhida);
