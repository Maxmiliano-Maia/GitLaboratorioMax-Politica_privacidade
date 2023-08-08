const menino = document.getElementById('menino');
const iphone = document.getElementById('iphone');
const placarElement = document.getElementById('placar');
const numeroElement = document.getElementById('numero');
const valorInput = document.getElementById('valorInput');
const confirmarBotao = document.getElementById('confirmarBotao');
let placar = 0;
let numero = 0;
let ismeninoMoving = false;

menino.addEventListener('mousedown', iniciarArraste);

function iniciarArraste(event) {
  const offsetX = event.clientX - menino.getBoundingClientRect().left;
 

  document.addEventListener('mousemove', movermenino);
  document.addEventListener('mouseup', pararArraste);

  function movermenino(event) {
    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;

    menino.style.left = x + 'px';
    menino.style.top = y + 'px';
  }

  function pararArraste() {
    document.removeEventListener('mousemove', movermenino);
    document.removeEventListener('mouseup', pararArraste);
  }
}
confirmarBotao.style.opacity = 0;
valorInput.style.opacity = 0;

iphone.addEventListener('click', () => {
  if (ismeninoMoving) return;

  confirmarBotao.style.opacity = 1; // Exibe o botão de confirmação
  valorInput.style.opacity = 1; // Exibe o campo de entrada
  valorInput.focus(); // Coloca o foco no campo de entrada

  confirmarBotao.addEventListener('click', () => {
    const valorDigitado = parseFloat(valorInput.value);
    if (!isNaN(valorDigitado)) {
      placar += valorDigitado;
      placarElement.textContent = `Iphone: ${placar}`;
    }

    // Reinicializa os elementos
    confirmarBotao.style.opacity = 0;
    valorInput.style.opacity = 0;
    valorInput.value = '';
  });
});


iphone.addEventListener('click', () => {
  if (ismeninoMoving) return;

  const meninoX = menino.getBoundingClientRect().left;
  const meninoY = menino.getBoundingClientRect().top;

  const iphoneX = iphone.getBoundingClientRect().left;
  const iphoneY = iphone.getBoundingClientRect().top;

  const deltaX = iphoneX - meninoX;
  const deltaY = iphoneY - meninoY;

  const startTime = performance.now();
  ismeninoMoving = true;

  function animarMovimento(timestamp) {
    const progress = (timestamp - startTime) / 1000; // Tempo decorrido em segundos
    if (progress < 1) {
      const newX = meninoX + deltaX * progress;
      const newY = meninoY + deltaY * progress;

      menino.style.left = `${newX}px`;
      menino.style.top = `${newY}px`;

      requestAnimationFrame(animarMovimento);
    } else {
      menino.style.left = `${iphoneX}px`;
      menino.style.top = `${iphoneY}px`;

      setTimeout(() => {
        const returnStartTime = performance.now();

        function retornarObjeto(timestamp) {
          const returnProgress = (timestamp - returnStartTime) / 1000; // Tempo decorrido em segundos
          if (returnProgress < 1) {
            const returnX = meninoX + deltaX * (1 - returnProgress);
            const returnY = meninoY + deltaY * (1 - returnProgress);

            menino.style.left = `${returnX}px`;
            menino.style.top = `${returnY}px`;

            requestAnimationFrame(retornarObjeto);
          } else {
            menino.style.left = '0';
            menino.style.top = '0';
            ismeninoMoving = false;
          }
        }

        requestAnimationFrame(retornarObjeto);
      }, 300);

      placar++;
      placarElement.textContent = `Iphone: ${placar}`;

      numero++;
      numeroElement.textContent = `Número: ${numero}`;
    }
  }

  requestAnimationFrame(animarMovimento);
});

document.addEventListener('click', (event) => {
  if (!ismeninoMoving && event.target !== iphone && event.target !== menino) {
    const x = event.clientX;
    const y = event.clientY;

    const meninoX = menino.getBoundingClientRect().left;
    const meninoY = menino.getBoundingClientRect().top;

    const deltaX = x - meninoX;
    const deltaY = y - meninoY;

    const startTime = performance.now();
    ismeninoMoving = true;

    function animarMovimento(timestamp) {
      const progress = (timestamp - startTime) / 1000; // Tempo decorrido em segundos
      if (progress < 1) {
        const newX = meninoX + deltaX * progress;
        const newY = meninoY + deltaY * progress;

        menino.style.left = `${newX}px`;
        menino.style.top = `${newY}px`;

        requestAnimationFrame(animarMovimento);
      } else {
        menino.style.left = `${x}px`;
        menino.style.top = `${y}px`;

        setTimeout(() => {
          const returnStartTime = performance.now();

          function retornarObjeto(timestamp) {
            const returnProgress = (timestamp - returnStartTime) / 1000; // Tempo decorrido em segundos
            if (returnProgress < 1) {
              const returnX = meninoX + deltaX * (1 - returnProgress);
              const returnY = meninoY + deltaY * (1 - returnProgress);

              menino.style.left = `${returnX}px`;
              menino.style.top = `${returnY}px`;

              requestAnimationFrame(retornarObjeto);
            } else {
              menino.style.left = '0';
              menino.style.top = '0';
              ismeninoMoving = false;
            }
          }

          requestAnimationFrame(retornarObjeto);
        }, 300);
      }
    }

    requestAnimationFrame(animarMovimento);
  }
});