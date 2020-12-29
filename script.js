(function () {
  'use strict'

  const name = document.getElementById('name')
  const day = document.getElementById('day')
  const month = document.getElementById('month')
  const btn = document.getElementById('btn')
  const information = document.getElementById('information')
  const salutation = document.getElementById('salutation')

  btn.disabled = true

  // verifica se o campo do nome foi preenchido e chama a função que habilita o botão ok
  name.addEventListener('input', checkName)
  function checkName () {
    if (name.value.length > 2) {
      enableBtn()
    } else {
      btn.disabled = true
    }
  }

  // verifica se o campo do dia foi preenchido corretamente, e chama a função que habilita o botão ok
  day.addEventListener('input', checkDay)
  function checkDay () {
    if (day.value > 0 && day.value <= 31) {
      enableBtn()
    } else {
      btn.disabled = true
    }
  }

  // verifica se o campo do mes foi preenchido corretamente, e chama a função que habilita o botão ok
  month.addEventListener('input', checkMonth)
  function checkMonth () {
    if (month.value > 0 && month.value <= 12) {
      enableBtn()
    } else {
      btn.disabled = true
    }
  }

  // verifica se todos os  campos foram preenchidos e habilita o botão ok
  function enableBtn () {
    if (name.value && day.value && month.value) {
      btn.disabled = false
    } else {
      btn.disable = true
    }
  }

  // após o botão ok ser clicado, tira a caixa de formulario, exibi a saudação ao usuário
  btn.addEventListener('click', startPage)
  function startPage (e) {
    e.preventDefault()

    information.style.display = 'none'

    salutation.innerHTML = `Olá, ${firtLetter(name.value)} !!!`

    document.querySelector('.watch').style.display = 'block'
  }

  // tranforma a(s) primeira(s) letra(s) do(s) nome(s) do usuário em maiúscula
  function firtLetter (string) {
    return string
      .split(' ')
      .map((palavra) => palavra[0].toUpperCase() + palavra.slice(1).toLowerCase())
      .join(' ')
  }

  // cria um objeto Date para o aniversário do usuário e um objeto Date para a data atual e executa o calculo
  function regressiveTime () {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const birthday = new Date(currentYear, month.value, day.value)

    const currentDateTS = currentDate.getTime()
    const birthdayTS = birthday.getTime()

    const oneSecond = 1000
    const oneMinute = 60 * oneSecond
    const oneHour = 60 * oneMinute
    const oneDay = 24 * oneHour
    let difference = birthdayTS - currentDateTS - 30 * oneDay

    let days = Math.floor(difference / oneDay)
    difference = difference - days * oneDay

    const hours = Math.floor(difference / oneHour)
    difference = difference - hours * oneHour

    const minutes = Math.floor(difference / oneMinute)
    difference = difference - minutes * oneMinute

    const second = Math.floor(difference / oneSecond)

    if (days < 0) { days = days + 365 }

    document.querySelector('.watch p').textContent = `${days} dias, ${hours} horas, ${minutes} minutos e ${second} segundos`
    document.querySelector('.watch p').style.fontSize = '45px'
  }

  // executa a função do calculo de tempo faltante a cada segundo
  setInterval(regressiveTime, 1000)

  // efetua a mudança de imagens de fundo a cada 3 second
  let i = 1
  function exchange () {
    document.body.style.backgroundImage = `url(./img/imagem${i}.jpg)`
    document.body.style.backgroundSize = '86rem 45rem'
    i++
    if (i === 7) { i = 1 }
  }
  setInterval(exchange, 5000)
})()
