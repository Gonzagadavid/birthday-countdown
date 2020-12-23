(function () {
  'use strict'

  const nome = document.getElementById('nome')
  const dia = document.getElementById('dia')
  const mes = document.getElementById('mes')
  const btn = document.getElementById('btn')
  const dados = document.getElementById('dados')
  const saudacao = document.getElementById('saudacao')

  btn.disabled = true

  // verifica se o campo do nome foi preenchido e chama a função que habilita o botão ok
  nome.addEventListener('input', verificaNome)
  function verificaNome () {
    if (nome.value.length > 2) {
      habilitaBtn()
    } else {
      btn.disabled = true
    }
  }

  // verifica se o campo do dia foi preenchido corretamente, e chama a função que habilita o botão ok
  dia.addEventListener('input', verificarDia)
  function verificarDia () {
    if (dia.value > 0 && dia.value <= 31) {
      habilitaBtn()
    } else {
      btn.disabled = true
    }
  }

  // verifica se o campo do mes foi preenchido corretamente, e chama a função que habilita o botão ok
  mes.addEventListener('input', verificaMes)
  function verificaMes () {
    if (mes.value > 0 && mes.value <= 12) {
      habilitaBtn()
    } else {
      btn.disabled = true
    }
  }

  // verifica se todos os  campos foram preenchidos e habilita o botão ok
  function habilitaBtn () {
    if (nome.value && dia.value && mes.value) {
      btn.disabled = false
    } else {
      btn.disable = true
    }
  }

  // após o botão ok ser clicado, tira a caixa de formulario, exibi a saudação ao usuário
  btn.addEventListener('click', iniciaPagina)
  function iniciaPagina (e) {
    e.preventDefault()

    dados.style.display = 'none'

    saudacao.innerHTML = `Olá, ${primeiraLetra(nome.value)} !!!`

    document.querySelector('.relogio').style.display = 'block'
  }

  // tranforma a(s) primeira(s) letra(s) do(s) nome(s) do usuário em maiúscula
  function primeiraLetra (string) {
    return string
      .split(' ')
      .map((palavra) => palavra[0].toUpperCase() + palavra.slice(1).toLowerCase())
      .join(' ')
  }

  // cria um objeto Date para o aniversário do usuário e um objeto Date para a data atual e executa o calculo
  function quantoFalta () {
    const dataAtual = new Date()
    const anoAtual = dataAtual.getFullYear()
    const dataNiver = new Date(anoAtual, mes.value, dia.value)

    const dataAtualTS = dataAtual.getTime()
    const dataNiverTS = dataNiver.getTime()

    const umSegundo = 1000
    const umMinuto = 60 * umSegundo
    const umaHora = 60 * umMinuto
    const umDia = 24 * umaHora
    let diferenca = dataNiverTS - dataAtualTS - 30 * umDia

    let dias = Math.floor(diferenca / umDia)
    diferenca = diferenca - dias * umDia

    const horas = Math.floor(diferenca / umaHora)
    diferenca = diferenca - horas * umaHora

    const minutos = Math.floor(diferenca / umMinuto)
    diferenca = diferenca - minutos * umMinuto

    const segundos = Math.floor(diferenca / umSegundo)

    if (dias < 0) { dias = dias + 365 }

    document.querySelector('.relogio p').textContent = `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`
    document.querySelector('.relogio p').style.fontSize = '45px'
  }

  // executa a função do calculo de tempo faltante a cada segundo
  setInterval(quantoFalta, 1000)

  // efetua a mudança de imagens de fundo a cada 3 segundos
  let i = 1
  function trocaImagem () {
    document.body.style.backgroundImage = `url(./img/imagem${i}.jpg)`
    document.body.style.backgroundSize = '86rem 45rem'
    i++
    if (i === 7) { i = 1 }
  }
  setInterval(trocaImagem, 5000)
})()
