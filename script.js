
$('#buscar').on('click', (event) => {
    event.preventDefault()
    let dataEscolhida = recebeDataEscolhida();
    window.location = "signo.html?data="+dataEscolhida;
    
})

function recebeDataEscolhida() {
    let inputDate = $("input[type=date]").val()
    var dados = inputDate.split('-')
    let mes = dados[1];
    let dia = dados[2]
    let dataEscolhida = dia + '/' + mes
    return dataEscolhida;
}



