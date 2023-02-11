//botón para seleccionar mascota
const btnPet = document.getElementById('btn-pet');
//botones para ataque
/* const btnFire = document.getElementById('button-fire');
const btnWater = document.getElementById('button-water');
const btnEarth = document.getElementById('button-earth'); */
//sección de reiniciar
const sectionRestart = document.querySelector('.section-restart');
//botón para reiniciar juego
const btnRestart = document.getElementById('btn-restart');

//Contenedores para seleccionar mascota y ataque respectivamente
const containerSelectPet = document.getElementById('select-pet');
const containerSelectAttack = document.getElementById('select-attack');
const containerMokepons = document.getElementById('container-cards');
const containerBtnsAttack = document.getElementById('container-btns-attack');

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

let mokepons = [];
let optionsMokepons;
let attackPlayer;
let attackEnemy;
//mokepons
let inputAudino;
let inputBellossom;
let inputBounsweet;
let inputCelebi;
let inputChansey;
let inputCharmander;
let mokeponPlayer = [];
let optionsAttack;
let btnFire;
let btnWater;
let btnEarth;
let attacks = [];
let livesPetPlayer = 3;
let livesPetEnemy = 3;

class Mokepon {
  constructor({name, photo, live, state = false}){
    this.name = name,
    this.photo = photo,
    this.live = live,
    this.state = state,
    this.attacks = []
  }
}

const audino = new Mokepon({name: 'Audino', photo: 'imgs/audino.png', live: 3});
const bellossom = new Mokepon({name: 'Bellossom', photo: 'imgs/bellossom.png', live: 5});
const bounsweet = new Mokepon({name: 'Bounsweet', photo: 'imgs/bounsweet.jpg', live: 4, attacks: []});
const celebi = new Mokepon({name: 'Celebi', photo: 'imgs/celebi.png', live: 5});
const chansey = new Mokepon({name: 'Chansey', photo: 'imgs/chansey.gif', live: 4});
const charmander = new Mokepon({name: 'Charmander', photo: 'imgs/charmander.png', live: 5});

audino.attacks.push(
  {
    id: 'button-fire',
    name: '🔥',
    count: 1
  },
  {
    id: 'button-water',
    name: '🌊',
    count: 3
  },
  {
    id: 'button-earth',
    name: '🌎',
    count: 1
  }
);

bellossom.attacks.push(
  {
    id: 'button-earth',
    name: '🌎',
    count: 3 
  },
  {
    id: 'button-water',
    name: '🌊',
    count: 1 
  },
  {
    id: 'button-fire',
    name: '🔥',
    count: 1 
  }

);

bounsweet.attacks.push(
  {
    id: 'button-earth',
    name: '🌎',
    count: 3 
  },
  {
    id: 'button-water',
    name: '🌊',
    count: 1 
  },
  {
    id: 'button-fire',
    name: '🔥',
    count: 1 
  }
);

celebi.attacks.push(
  {
    id: 'button-water',
    name: '🌊',
    count: 3 
  },
  {
    id: 'button-earth',
    name: '🌎',
    count: 1 
  },
  {
    id: 'button-fire',
    name: '🔥',
    count: 1 
  }
);

chansey.attacks.push(
  {
    id: 'button-fire',
    name: '🔥',
    count: 3 
  },
  {
    id: 'button-earth',
    name: '🌎',
    count: 1 
  },
  {
    id: 'button-water',
    name: '🌊',
    count: 1 
  }
);

charmander.attacks.push(      
  {
    id: 'button-fire',
    name: '🔥',
    count: 3 
  },
  {
    id: 'button-earth',
    name: '🌎',
    count: 1 
  },
  {
    id: 'button-water',
    name: '🌊',
    count: 1 
  }
);

mokepons.push(audino, bellossom, bounsweet, celebi, chansey, charmander);

audino.attacks.find(attack => {
    attacks.push(attack.name)
});

let min = 0;
let max = mokepons.length - 1;

function startPlay() {
  mokepons.find((mokepon) => {
    optionsMokepons = `
      <div class="card-pet">
        <img src=${mokepon.photo} alt="mascota ${mokepon.name}" />
        <label for=${mokepon.name}>${mokepon.name}</label>
        <input type="radio" name="pet" id=${mokepon.name} />
      </div>
    `
    containerMokepons.innerHTML += optionsMokepons;
  });

  inputAudino = document.getElementById('Audino');
  inputBellossom = document.getElementById('Bellossom');
  inputBounsweet = document.getElementById('Bounsweet');
  inputCelebi = document.getElementById('Celebi');
  inputChansey = document.getElementById('Chansey');
  inputCharmander = document.getElementById('Charmander');
  
  btnPet.addEventListener('click', selectPlayerMokepon);
  btnRestart.addEventListener('click', restart)
}

function randomNumber(min, max) {
  let result;
  result = Math.floor(Math.random()*(max-min+1)+min);
  return result;
}

function extractDataMokeponSelect(inputSelect) {
  mokeponPlayer = mokepons.find(mokepon => mokepon.name == inputSelect);
  mokeponPlayer.state = true;
  livesPetPlayer = mokeponPlayer.live;

  extractAttack();
}

function extractAttack() {
  let attacksMokeponPlayer = mokeponPlayer.attacks;
  attacksMokeponPlayer.find((attack) => {
    optionsAttack = `
    <button class="btn-attack" id=${attack.id}>${attack.name}</button>
    `
    containerBtnsAttack.innerHTML += optionsAttack;
  })

  btnFire = document.getElementById('button-fire');
  btnWater = document.getElementById('button-water');
  btnEarth = document.getElementById('button-earth');

  btnFire.addEventListener('click', attackFire);
  btnWater.addEventListener('click', attackWater);
  btnEarth.addEventListener('click', attackEarth);
}

function selectPlayerMokepon() {

  if(inputAudino.checked){
    playerNamePet.innerText = inputAudino.id;
    extractDataMokeponSelect(inputAudino.id);
  } else if(inputBellossom.checked) {
    playerNamePet.innerText = inputBellossom.id;
    extractDataMokeponSelect(inputBellossom.id);
  } else if(inputBounsweet.checked){
    playerNamePet.innerText = inputBounsweet.id;
    extractDataMokeponSelect(inputBounsweet.id);
  } else if(inputCelebi.checked){
    playerNamePet.innerText = inputCelebi.id;
    extractDataMokeponSelect(inputCelebi.id);
  } else if(inputChansey.checked){
    playerNamePet.innerText = inputChansey.id;
    extractDataMokeponSelect(inputChansey.id);
  } else if(inputCharmander.checked){
    playerNamePet.innerText = inputCharmander.id;
    extractDataMokeponSelect(inputCharmander.id);
  } else {
    alert('Debes seleccionar una mascota');
    return;
  }

  containerSelectPet.style.display = 'none';
  containerSelectAttack.style.display = 'flex';
  spanLivesPetPlayer.innerText = livesPetPlayer;
  selectEnemyPet();
  
}

function selectEnemyPet() {
  let petSelectRandom = mokepons[randomNumber(min, max)];
  livesPetEnemy = petSelectRandom.live;
  enemyNamePet.innerText = petSelectRandom.name;
  spanLivesPetEnemy.innerText = livesPetEnemy;
}

function attackFire(){
  attackPlayer = attacks[0];
  attackRandomEnemy();
}

function attackWater() {
  attackPlayer = attacks[1];
  attackRandomEnemy();
}

function attackEarth() {
  attackPlayer = attacks[2];
  attackRandomEnemy();
}

function attackRandomEnemy() {
  attackEnemy = attacks[randomNumber(min,attacks.length -1)];

  combat();
}

function combat() {
  let result;

    if(attackPlayer == attackEnemy){
      result = 'EMPATASTE';
    } else if(attackPlayer == attacks[0] && attackEnemy == attacks[2]){
      result = 'GANASTE';
      livesPetEnemy--;
    } else if(attackPlayer == attacks[1] && attackEnemy == attacks[0]){
      result = 'GANASTE';
      livesPetEnemy--;
    } else if(attackPlayer == attacks[2] && attackEnemy == attacks[1]){
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
