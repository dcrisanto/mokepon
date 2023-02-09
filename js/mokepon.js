//botón para seleccionar mascota
const btnPet = document.getElementById('btn-pet');
//botones para ataque
const btnFire = document.getElementById('button-fire');
const btnWater = document.getElementById('button-water');
const btnEarth = document.getElementById('button-earth');
//sección de reiniciar
const sectionRestart = document.querySelector('.section-restart');
//botón para reiniciar juego
const btnRestart = document.getElementById('btn-restart');

//mokepons
const audino = document.getElementById('audino');
const bellossom = document.getElementById('bellossom');
const bounsweet = document.getElementById('bounsweet');
const celebi = document.getElementById('celebi');
const chansey = document.getElementById('chansey');
const charmander = document.getElementById('charmander');

//Contenedores para seleccionar mascota y ataque respectivamente
const containerSelectPet = document.getElementById('select-pet');
const containerSelectAttack = document.getElementById('select-attack');

//Nombre mascota del juegador y del enemigo
const playerNamePet = document.getElementById('name-pet-player');
const enemyNamePet = document.getElementById('name-pet-enemy');
//Vidas del jugador y enemigo respectivamente
const spanLivesPetPlayer = document.getElementById('lives-pet-player');
const spanLivesPetEnemy = document.getElementById('lives-pet-enemy');

const containerResultRestart = document.getElementById('result-restart');
const resultAttack = document.getElementById('message-end-attack');
const attacksPlayer = document.getElementById('attacks-player');
const attacksEnemy = document.getElementById('attacks-enemy');
const containerMessageEnd = document.getElementById('message-end-attack');


let attackPlayer;
let attackEnemy;
const attack = ['FUEGO', 'AGUA', 'TIERRA'];
let livesPetPlayer = 3;
let livesPetEnemy = 3;

function startPlay() {
  btnPet.addEventListener('click', selectPlayerPet);
  btnFire.addEventListener('click', attackFire);
  btnWater.addEventListener('click', attackWater);
  btnEarth.addEventListener('click', attackEarth);
  btnRestart.addEventListener('click', restart)
}

function randomNumber(min, max) {
  let result;
  result = Math.floor(Math.random()*(max-min+1)+min);
  return result;
}

function selectPlayerPet() {
  let petPlayer = {
    name: '',
    power: ''
  }
 
  let pets = [
    {
      name: 'audino',
      state: audino.checked,
      power: 'agua'
    },
    {
      name: 'bellossom',
      state: bellossom.checked,
      power: 'tierra'
    },
    {
      name: 'bounsweet',
      state: bounsweet.checked,
      power: 'fuego'
    },
    {
      name: 'celebi',
      state: celebi.checked,
      power: 'agua y fuego'
    },
    {
      name: 'chansey',
      state: chansey.checked,
      power: 'agua y tierra'
    },
    {
      name: 'charmander',
      state: charmander.checked,
      power: 'tierra y fuego'
    }
  ]

  const elementSelect = pets.filter(item => item.state == true);

  if(elementSelect.length == 0) {
    alert('Debes seleccionar una mascota');
    return;
  } 

  containerSelectPet.style.display = 'none';
  containerSelectAttack.style.display = 'flex';
  
  elementSelect.map(item => {
      petPlayer.name = item.name;
      petPlayer.power = item.power;
  });

  playerNamePet.innerText = petPlayer.name;
  spanLivesPetPlayer.innerText = livesPetPlayer;
  selectEnemyPet(pets);
  
}

function selectEnemyPet(pets) {
  let min = 0;
  let max = pets.length -1;
  let petSelectRandom = pets[randomNumber(min, max)];
  enemyNamePet.innerText = petSelectRandom.name;
  spanLivesPetEnemy.innerText = livesPetEnemy;
}

function attackFire(){
  attackPlayer = attack[0];
  attackRandomEnemy();
}

function attackWater() {
  attackPlayer = attack[1];
  attackRandomEnemy();
}

function attackEarth() {
  attackPlayer = attack[2];
  attackRandomEnemy();
}

function attackRandomEnemy() {
  let min = 0;
  let max = 2;
  attackEnemy = attack[randomNumber(min,max)];

  combat();
}

function combat() {
  let result;

    if(attackPlayer == attackEnemy){
      result = 'EMPATASTE';
    } else if(attackPlayer == attack[0] && attackEnemy == attack[2]){
      result = 'GANASTE';
      livesPetEnemy--;
    } else if(attackPlayer == attack[1] && attackEnemy == attack[0]){
      result = 'GANASTE';
      livesPetEnemy--;
    } else if(attackPlayer == attack[2] && attackEnemy == attack[1]){
      result = 'GANASTE';
      livesPetEnemy--;
    } else {
      result = 'PERDISTE';
      livesPetPlayer--;
    }

    spanLivesPetPlayer.innerText = livesPetPlayer;
    spanLivesPetEnemy.innerText = livesPetEnemy;

    createMessages(result);

    reviewLives();
  
}

function createMessages(result) {
  containerResultRestart.style.display = 'flex';
  attacksPlayer.style.display = 'flex';
  attacksEnemy.style.display = 'flex';
  let attackPlayerSelect = document.createElement('p');
  attackPlayerSelect.classList.add('result-attack');
  attackPlayerSelect.innerText = `${attackPlayer}`;
  attacksPlayer.appendChild(attackPlayerSelect);
  let attackEnemyRandom = document.createElement('p');
  attackEnemyRandom.classList.add('result-attack');
  attackEnemyRandom.innerText = `${attackEnemy}`;
  attacksEnemy.appendChild(attackEnemyRandom);
  resultAttack.innerText = result;
}

function reviewLives() {
  if(livesPetPlayer == 0){
    messageEnd('LO SIENTO PERDISTE');
    containerMessageEnd.style.display = 'flex';
  } else if(livesPetEnemy == 0){
    messageEnd('FELICITACIONES GANASTE');
    containerMessageEnd.style.display = 'flex';
  }
}

function messageEnd(result) {
  btnPet.disabled = true;
  btnFire.disabled = true;
  btnWater.disabled = true;
  btnEarth.disabled = true;
  containerMessageEnd.innerText = `¡${result} EL JUEGO!`;
  sectionRestart.classList.add('show');
}

function restart(){
  location.reload();
}

window.addEventListener('load', startPlay)
