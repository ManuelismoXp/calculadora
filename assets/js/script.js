var auxResult = ''

$(document).ready(function(){
    
    var operador = ''
    var algarismo1 = 0
    var algarismo2 = 0
    var valida = ''

    var cientifica = false
    var programador = false

    var baseOrigem = ''
    var garbage = ''

    $("#tela").keypress(function(event){

        var tipo = $("#tipoCalculadora").val()
        var tecla = event.key.charCodeAt()

        if((tecla == 46 || (tecla >= 48 && tecla <= 49)) && (tipo == 'programador') && baseOrigem == 'bin'){
            return true
        }
        
        if((tecla == 46 || (tecla >= 48 && tecla <= 55)) && (tipo == 'programador') && baseOrigem == 'oct'){
            return true
        }

        if((tecla == 46 || (tecla >= 48 && tecla <= 57)) && (tipo == 'normal' || tipo == 'cientifica' || (tipo == 'programador' && baseOrigem == 'dec'))){
            return true
        }

        if((tecla == 46 || (tecla >= 65 && tecla <= 70) || (tecla >= 97 && tecla <= 102) || (tecla >= 48 && tecla <= 57)) && (tipo == 'programador')  && baseOrigem == 'hex'){
            return true
        }

        return false

    })

    // Botões numericos
    $('.btn-numero').click(function(){

        $('#tela').removeClass('border-red-error')

        /** valida resultado */
        if(valida == 'done'){
            $('#tela').val('').focus()
            valida = ''
        }

        var numero = $(this).attr('numero')
        var valor_actual = $('#tela').val()

        /** validando texto erro */
        if(valor_actual == 'erro'){
            var novo_valor = numero
            $('#tela').val(novo_valor).focus()
            return
        }
        /** validando ponto em tela vazia */
        if(valor_actual.length == '0' && numero == '.' && baseOrigem != 'bin'){
            return
        }

         /** Validar existencia do ponto no numero */
         if(valor_actual.length > 0 && numero == '.'){
            var index = valor_actual.indexOf('.')
            if(index > 0){
                return
            }
         }

        /**  Validar zeros no inicio do numero */
        if(valor_actual == '0'  && baseOrigem != 'bin'){

            if(numero == '.'){
                var novo_valor = valor_actual + '' + numero
                $('#tela').val(novo_valor).focus()
                return
            }

            $('#tela').val(numero).focus()

            return
        }
        
        var novo_valor = valor_actual + '' + numero

        $('#tela').val(novo_valor).focus()
    })

    // limpar toda tela
    $("#btn-limpar").click(function(){
        $('#tela').removeClass('border-red-error')
        $('#tela').val('').focus()
    })

    // apagar digito a digito
    $("#btn-apagar").click(function(){

        $('#tela').removeClass('border-red-error')

        var valor_actual = $('#tela').val()
        var digitos = valor_actual.split('')
        var novo_valor = ''

         digitos.forEach((digito, i) => {
            if(digitos.length != i + 1)
            novo_valor += digito
         });

         $('#tela').val(novo_valor).focus()
    })
    
    // Botões operadores
    $('.btn-operador').click(function(){
        operador = $(this).attr('operador')
        var valor_actual = $('#tela').val()
        algarismo1 = Number(valor_actual)

        $('#tela').val('').focus()
    })

    // botão de igual
    $('#btn-igual').click(function(){
        var valor_actual = $('#tela').val()
        algarismo2 = Number(valor_actual)

        var resultado = ''

        switch(operador){
            case '+':
                resultado = algarismo1 + algarismo2
                break;
            case '-':
                resultado = algarismo1 - algarismo2
                break;
            case '*':
                resultado = algarismo1 * algarismo2
                break;
            case '/':
                if(algarismo2 == 0){
                    resultado = 'erro'
                } else {
                    resultado = algarismo1 / algarismo2
                }
                break;
            case 'pot':
                resultado = Math.pow(algarismo1,algarismo2)
                break;
        }

        valida = 'done'

        if(resultado == 'erro') $('#tela').addClass('border-red-error')

        $("#tela").val(resultado)
    })

    $('#btn-sqr').click(function(){
        var numero = $('#tela').val()
        var raiz = Number(numero)
        raiz = Math.sqrt(raiz)

        valida = 'done'
        $('#tela').val(raiz).focus()
    })

    // botão abs
    $(".btn-abs").click(function(){
        var valor_actual = $("#tela").val()
        var numero = Number(valor_actual) * (-1)

        $("#tela").val(numero)
    })

    $("#tipoCalculadora").change(function(){
        var tipo = $(this).val()
        
        if(tipo == 'cientifica'){
            if(!cientifica){
                if(programador){
                    $(".programador").slideUp(200);
                    programador = false
                }
                $(".cientifica").slideDown(200);
                cientifica = true
            } else {
                $(".cientifica").slideUp(200);
                cientifica = false
            }
        }

        if(tipo == 'programador'){
            if(!programador){
                if(cientifica){
                    $(".cientifica").slideUp(200);
                    cientifica = false
                }
                $(".programador").slideDown(200);
                programador = true
            } else {
                $(".programador").slideUp(200);
                programador = false
            }
        }

        if(tipo == 'normal'){
            $(".cientifica").slideUp(200);
            cientifica = false

            $(".programador").slideUp(200);
            programador = false
        }

    })

    // Alterar valor binario
    $(".valores").click(function(){
        var valor = $(this).text()

        alert(valor)
        
        if(valor == '0'){
           $(this).text('1')
        } else {
            $(this).text('0')
        }

    })

    // Activar e desactivar numeros no teclado em função da base
    $("#baseOrigem").change(function(){

        var base = $(this).val()
        $('#tela').val('').focus()

        baseOrigem = base

        switch(base){
            case '':
                $('.btn-numero').removeAttr('disabled')
                habilitarBotoes()
                break;
            case 'dec':
                $('.btn-numero').removeAttr('disabled')
                habilitarBotoes()
                break;
            case 'bin':
                $('.btn-numero').attr('disabled', 'true')
                habilitarBotoes(["0", "1", "."])
                break;
            case 'oct':
                $('.btn-numero').attr('disabled', 'true')
                habilitarBotoes(["0", "1", "2", "3", "4", "5", "6", "7", "."])
                break;
            case 'hex':
                $('.btn-numero').removeAttr('disabled')
                habilitarBotoes([], false, 'hex')
                break;
        }

        desabilitarOptions(base)

    })

    // botão de converter numero de uma base para outra
    $('#btn-converter').click(function(){

        var numero = $('#tela').val()
        auxResult = ''

        var baseOrigem = $('#baseOrigem').val()
        var baseDestino = $('#baseDestino').val()

        validaBasePreeenchida(baseOrigem, baseDestino)

        var resultado = converterBases(baseOrigem, baseDestino, numero)

        $('#tela').val(resultado).focus()

        valida = 'done'
        garbage = numero

    })

    // reiniciar a tela pela base de destino
    $('#baseDestino').change(function(){
        $('#tela').val(garbage).focus()
    })
    
})

// habilitar e desabilitar botões alfabetico e numericos
function habilitarBotoes(botoes = [], all = false,  base = ''){

    if(base != 'hex'){
        $('#hexdecimal-btn').slideUp(200)
    } else {
        $('#hexdecimal-btn').slideDown(200)
    }

    if(all){
        $('.btn-numero').attr('disabled', 'true')
        return
    }

    botoes.forEach((botao)=>{
        $('button[numero="'+botao+'"]').removeAttr('disabled')
    })

}

// Função que converte um numero de uma base para outra
function converterBases(baseOrigem, baseDestino, numero){

    var resultado = ''

    switch(baseOrigem){
        case 'dec':
            switch(baseDestino){
                case 'bin':
                    resultado = reverse(decimaParaOutra(2, Number(numero)))
                    break;
                case 'oct':
                    resultado = reverse(decimaParaOutra(8, Number(numero)))
                    break;
                case 'hex':
                    if(Number(numero) >= 10 && Number(numero) <= 15){
                        resultado = equivalencia(Number(numero))
                    } else {
                        resultado = reverse(decimaParaOutra(16, Number(numero)))
                    }
                    break;
                    
            }
    }

    return resultado

}

// Converter de decimal para qualquer base
function decimaParaOutra(baseDestino, numero){

    var resultado = numero

    if(numero < baseDestino){
        if(baseDestino == 16) numero = equivalencia(numero)
        return auxResult + numero
    }

    var resto = resultado % baseDestino
    if(resto > 9 && baseDestino == 16){
        auxResult += equivalencia(resto)
    } else {
        auxResult += resto
    }
     
    numero = parseInt(resultado / baseDestino)

    return decimaParaOutra(baseDestino, numero)

}

// Inverter string
function reverse(str){
    var strArr = (str.split('')).reverse()
    var novaStr = strArr.join('')
    return novaStr
}

// achar o equivalente em hexadecimal [10 - 15]
function equivalencia(numero){
    var letrasHexa = [{ letra: 'A', numero: 10 },{ letra: 'B', numero: 11 },{ letra: 'C', numero: 12 },
                      { letra: 'D', numero: 13 },{ letra: 'E', numero: 14 },{ letra: 'F', numero: 15 }]
    var equivalente = numero

    letrasHexa.forEach((letra)=>{
        if(letra.numero == numero){
            equivalente = letra.letra
        }
    })

    return equivalente
}

// Desabilitar option na basede origem em funçõa da base de destino
function desabilitarOptions(valor){
    $('#baseDestino option').removeAttr('disabled')
    if(valor != '')
        $('#baseDestino option[value="'+valor+'"]').attr('disabled', 'true')
}

// validar preenchimento das bases
function validaBasePreeenchida(baseOrigem, baseDestino){

    if(baseOrigem == '') alert('É obrigatório o preenchimento da base de origem')
    if(baseDestino == '') alert('É obrigatório o preenchimento da base de destino')

    $('#tela').focus()
    return

}