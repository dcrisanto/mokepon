let attackPlayer;
let attackEnemy;
let attack = ['FUEGO', 'AGUA', 'TIERRA'];
let livesPetPlayer = 3;
let livesPetEnemy = 3;

function startPlay() {
  let btnPet = document.getElementById('btn-pet');
  btnPet.addEventListener('click', selectPlayerPet);

  let btnFire = document.getElementById('button-fire');
  btnFire.addEventListener('click', attackFire);
  let btnWater = document.getElementById('button-water');
  btnWater.addEventListener('click', attackWater);
  let btnEarth = document.getElementById('button-earth');
  btnEarth.addEventListener('click', attackEarth);

  let btnRestart = document.getElementById('btn-restart');
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
  let audino = document.getElementById('audino');
  let bellossom = document.getElementById('bellossom');
  let bounsweet = document.getElementById('bounsweet');
  let celebi = document.getElementById('celebi');
  let chansey = document.getElementById('chansey');
  let charmander = document.getElementById('charmander');
  let playerNamePet = document.getElementById('name-pet-player');
  let spanLivesPetPlayer = document.getElementById('lives-pet-player');
  let containerSelectAttack = document.getElementById('select-attack');
  let containerSelectPet = document.getElementById('select-pet');

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
  
  const datePetSelect = elementSelect.map(item => {
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
  let enemyNamePet = document.getElementById('name-pet-enemy');
  let spanLivesPetEnemy = document.getElementById('lives-pet-enemy');
  let petSelectRandom = pets[randomNumber(min, max)];
  enemyNamePet.innerText = petSelectRandom.name;
  spanLivesPetEnemy.innerText = livesPetEnemy;
}

function createMessages(result) {
  let containerResultRestart = document.getElementById('result-restart');
  let resultAttack = document.getElementById('message-end-attack');
  let attacksPlayer = document.getElementById('attacks-player');
  let attacksEnemy = document.getElementById('attacks-enemy');
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
  let spanLivesPetPlayer = document.getElementById('lives-pet-player');
  let spanLivesPetEnemy = document.getElementById('lives-pet-enemy');
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

function reviewLives() {
  let resultRestart = document.getElementById('result-restart');
  if(livesPetPlayer == 0){
    messageEnd('LO SIENTO PERDISTE');
    resultRestart.style.display = 'flex';
  } else if(livesPetEnemy == 0){
    messageEnd('FELICITACIONES GANASTE');
    resultRestart.style.display = 'flex';
  }
}

function messageEnd(result) {
  let containerMessageEnd = document.getElementById('message-end-attack');
  let btnRestart = document.getElementById('btn-restart');
  let btnPet = document.getElementById('btn-pet');
  btnPet.disabled = true;
  let btnFire = document.getElementById('button-fire');
  btnFire.disabled = true;
  let btnWater = document.getElementById('button-water');
  btnWater.disabled = true;
  let btnEarth = document.getElementById('button-earth');
  btnEarth.disabled = true;
  containerMessageEnd.innerText = `¡${result} EL JUEGO!`;
  btnRestart.style.display = 'block';
}

function restart(){
  location.reload();
}

window.addEventListener('load', startPlay)
