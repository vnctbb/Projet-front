"use strict";

window.addEventListener("DOMContentLoaded", function () {

  // Récupération du canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

//
// -----------------------------------------------------------
// -----------------------------------------------------------
// ------------------- Partie MENU ---------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------


  // Objet regroupe booléens pour vérifier des états
  // -----------------------
const comparateur = {
  play : false, // jeu non lancé
  runGame : false, // jeu en pause
  loose : false, // perdu
  win : false, // gagné
  runSound : true, // son en marche
  firstNoel : 'first', // vérifie si première fois version noel
  noel : false, // version Noel
  device : false // detection device
  };

  // Detection device
  // -----------------------

  function detectionDevice() {
    if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)){
   comparateur.device = true;
 }
};

detectionDevice()


  // Gestion du score et des niveaux
  // -----------------------

const level = {
  texteScore : 'Score : ',
  score : 0,
  speedUp : false,
  texteBestScore : 'Meilleur score : ',
  bestScore : 0,
  niveau : 1, 
  scoreNiveau : 20,
  unlock : ['EXP','SKILLS','TECH'],
}

function calcBestScore () {
  if(level.score > level.bestScore){
    level.bestScore = level.score;
  }
}

  // Objet contenant les références HTML des boutons et pages des menus
  // ------------------------------------------------------------------
const menu = {
  menuHome : document.getElementById('menuHome'),
  laFusée : document.getElementById('laFusée'),
  menuBtnPlay : document.getElementById('homePlay'),
  menuBtnHelp : document.getElementById('homeHelp'),
  menuHelp : document.getElementById('menuHelp'),
  menuHelpNoel : document.getElementById('menuHelpNoel'),
  menuHelpNoelCross : document.getElementById('helpNoelCross'),
  menuBtnSetting : document.getElementById('homeSetting'),
  menuSetting : document.getElementById('menuSetting'),
  menuSettingCross : document.getElementById('settingCross'),
  menuHelpCross : document.getElementById('helpCross'),
  inGamePlay : document.getElementById('buttonPlay'),
  inGameSetting : document.getElementById('buttonSetting'),
  inGameScore : document.getElementById('scoreInGame'),
  pvBoss : document.getElementById('pvBoss'),
  vieFusée : document.getElementById('vieFusée'),
  menuPerdu : document.getElementById('menuPerdu'),
  perduScore : document.getElementById('perduScore'),
  perduBestScore : document.getElementById('perduBestScore'),
  perduBtnRejouer : document.getElementById('perduRejouer'),
  perduBtnRetour : document.getElementById('perduRetour'),
  imagePerdu : document.getElementsByClassName('imagePerdu'),
  menuWin : document.getElementById('menuWin'),
  menuWinBoss : document.getElementById('menuWinBoss'),
  okBoss : document.getElementById('okBoss'),
  winScore : document.getElementById('winScore'),
  winBtnNiveauSuivant : document.getElementById('niveauSuivant'),
  winBtnRetour : document.getElementById('winRetour'),
  winMessageA : document.getElementById('winMessageA'),
  winMessageB : document.getElementById('winMessageB'),
  inGameHelp : document.getElementById('buttonHelp'),
  btnNoel : document.getElementById('buttonNoel'),
  btnClassique : document.getElementById('buttonClassique'),
  range1 : document.getElementById('soundRange1'),
  range2 : document.getElementById('soundRange2'),
  soundOn : document.getElementById('soundOn'),
  soundOff : document.getElementById('soundOff'),
  affichageMobile : document.getElementById('affichageMobile'),
};

  // Objet audio, avec sources
  // -------------------------
const audio = {
  etoile :new Audio('audio/etoile_normale.mp3'),
  etoileBonus : new Audio('audio/etoile_bonus.mp3'),
  loose : new Audio('audio/computer.mp3'),
  background : new Audio('audio/floor.mp3'),
  tirFusée : new Audio('audio/rocket.mp3'),
  tirUfo : new Audio('audio/heat.mp3'),
  boomUfo : new Audio('audio/blaser.mp3'),
  clic1 : new Audio('audio/click_01.mp3'),
  clic2 : new Audio('audio/click_02.mp3'),
  saveRange1 : 0,
  saveRange2 : 0
};

audio.background.preload;

audio.background.loop = 'true';
audio.background.volume = '0.4';



// résolution problème de delai son / image sur safari
// - vérifie le navigateur
// si le navigateur est safari, le son de pick up n'est pas joué

let onSafari = false;

function checkNavigateur() {
  let checkUn = navigator.userAgent.search(/AppleWebKit/i);
  let checkDeux = navigator.userAgent.search(/Chrome/i);
  if(checkUn > 0 && checkDeux < 0) {
    onSafari = true;
  } else {
    onSafari = false;
  }
};

checkNavigateur();

// fonction qui lance un audio si le navigateur n'est pas safari
function checkAudio (unAudio) {
  if(!onSafari){
    unAudio.pause();
    unAudio.currentTime = 0;
    unAudio.play();
  }
};

// fonction qui joue un audio quand on clique sur les boutons
// bouton qui lance quelque chose
function onButton () {
  audio.clic1.pause();
  audio.clic1.play();
};
// bouton qui ferme quelque chose
function offButton () {
  audio.clic2.pause();
  audio.clic2.play();
};


// -----------------------------------------------------------
// -----------------------------------------------------------
// ------------- Gestion clique menu -------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

  // fonction qui lance une partie
  function lanceUnePartie (){
    audio.background.play();
    comparateur.play = true;
    comparateur.runGame = true;
    comparateur.loose = false;
    menu.menuHome.style.display = 'none';
    menu.inGameScore.className = '';
    menu.inGameScore.innerHTML = level.texteScore;
    menu.inGameHelp.className = 'far fa-question-circle';
    menu.inGamePlay.className = 'far fa-pause-circle';
    menu.inGameSetting.className = 'fas fa-sliders-h';
  };

  // Bouton Play depuis menu -> lance le jeu
  menu.menuBtnPlay.addEventListener('click', function() {
    onButton();
    if(comparateur.noel && comparateur.firstNoel == 'first'){
      comparateur.firstNoel = true;
      menu.menuHome.style.display = 'none';
      menu.menuHelpNoel.style.display = 'block'
    } else {
      lanceUnePartie();
    }
  });

  // Cross depuis menu Help Noel
  menu.menuHelpNoelCross.addEventListener('click', function(){
    onButton();
    menu.menuHelpNoel.style.display = 'none'
    if(comparateur.firstNoel == 'true'){
      comparateur.firstNoel = false;
      lanceUnePartie();
    } else {
      if(comparateur.play){
        offButton();
        closeHelpSettingFull();
        comparateur.runGame = 'true';
        menu.inGamePlay.className = 'far fa-play-circle';
      } else {
        menu.menuHome.style.display = 'block';
        closeHelpSettingFull();
      }
    }
  })

  // Bouton Setting depuis le menu -> ouvre page setting
  menu.menuBtnSetting.addEventListener('click', function() {
    onButton();
    menu.menuHome.style.display = 'none';
    menu.menuSetting.style.display = 'block';
  });

  // Bouton Help depuis le menu -> ouvre page help
  menu.menuBtnHelp.addEventListener('click', function() {
    onButton();
    if(!comparateur.noel){
      menu.menuHome.style.display = 'none';
      menu.menuHelp.style.display = 'block';
    } else {
        menu.menuHome.style.display = 'none';
        menu.menuHelpNoel.style.display = 'block'
    }
  });

  // Croix dans help // setting -> referme la page ouverte

  // fonction qui ferme les menu help, setting et help noel
  function closeHelpSetting () {
    if(menu.menuHelp.style.display == 'block'){
      menu.menuHelp.style.display = 'none';
    }
    if(menu.menuSetting.style.display == 'block'){
      menu.menuSetting.style.display = 'none';
    }
    if(menu.menuHelpNoel.style.display == 'block'){
      menu.menuHelpNoel.style.display = 'none';
    }
  }

  // fonction qui ferme les menu help, setting & help noel
  // prend en compte si une partie est lancée
  function closeHelpSettingFull (){
    if(comparateur.play){
      closeHelpSetting();
      comparateur.runGame = 'true';
      menu.inGamePlay.className = 'far fa-play-circle';
    } else {
      menu.menuHome.style.display = 'block';
      if(menu.menuHelp.style.display == 'block'){
        menu.menuHelp.style.display = 'none';
      }
      if(menu.menuSetting.style.display == 'block'){
        menu.menuSetting.style.display = 'none';
      }
    }
  }

  // Cross depuis le menu help
  menu.menuHelpCross.addEventListener('click', function() {
    offButton();
    closeHelpSettingFull();
  });

  // Cross depuis le menu setting
  menu.menuSettingCross.addEventListener('click', function() {
    offButton();
    closeHelpSettingFull();
  });

  // Retour depuis le menu perdu -> retour au menu Home
  menu.perduBtnRetour.addEventListener('click', function(){
    offButton();
    menu.menuPerdu.style.display = 'none';
    menu.menuWin.style.display = 'none';
    menu.menuHome.style.display = 'block';
  });

  // Rejouer depuis le menu perdu -> relance une partie
  menu.perduBtnRejouer.addEventListener('click', function(){
    onButton();
    menu.menuPerdu.style.display = 'none';
    lanceUnePartie();
  });

  // Retour depuis le menu win -> retour au menu Home
  menu.winBtnRetour.addEventListener('click', function(){
    offButton();
    menu.menuWin.style.display = 'none';
    menu.menuHome.style.display = 'block';
  });

  // Niveau suivant depuis le menu win -> relance une partie
  menu.winBtnNiveauSuivant.addEventListener('click', function(){
    onButton();
    if(level.niveau > 3 && level.niveau <5){
      console.log('ok');
      menu.menuWin.style.display = 'none';
      menu.menuWinBoss.style.display = 'block';
    } else {
      menu.menuWin.style.display = 'none';
      lanceUnePartie();
    }
  });

  // Bouton Ok depuis explication niveau Boss -> lance une partie 
  menu.okBoss.addEventListener('click', function(){
    onButton();
      menu.menuWinBoss.style.display = 'none';
      lanceUnePartie();
  });

  // Bouton play InGame -> mets la partie en pause ou en lecture
  menu.inGamePlay.addEventListener('click', function() {
    onButton();
    if (!comparateur.runGame) {
      comparateur.runGame = true;
      menu.inGamePlay.className = 'far fa-play-circle';
      closeHelpSetting();
    } else {
      comparateur.runGame = false;
      menu.inGamePlay.className = "far fa-pause-circle";
    }
  });

  // Bouton help InGame -> ouvre le menu help pendant la partie
  menu.inGameHelp.addEventListener('click', function(){
    onButton();
    if(comparateur.runGame){
      comparateur.runGame = false;
      menu.inGamePlay.className = "far fa-play-circle";
    }
    if(menu.menuSetting.style.display = 'block'){
      menu.menuSetting.style.display = 'none';
    }
    if(!comparateur.noel){
      menu.menuHelp.style.display = 'block';
    } else {
      menu.menuHelpNoel.style.display = 'block';
    }
    menu.inGamePlay.className = 'far fa-pause-circle';
  });

  // Bouton setting InGame -> ouvre le menu setting pendant la partie
  menu.inGameSetting.addEventListener('click', function(){
    onButton();
    if(comparateur.runGame){
      comparateur.runGame = false;
      menu.inGamePlay.className = "far fa-play-circle";
    }
    if(menu.menuHelp.style.display == 'block' || menu.menuHelpNoel.style.display == 'block'){
      menu.menuHelp.style.display = 'none';
      menu.menuHelpNoel.style.display = 'none';
    }
    menu.menuSetting.style.display = 'block';
    menu.inGamePlay.className = 'far fa-pause-circle';
  });

  // Fonction audio
  function gèreAudio () {
    // 
    if(!comparateur.runSound){
      // récupère la valeur sauvegarder des sliders 
      menu.range1.value = audio.saveRange1;
      menu.range2.value = audio.saveRange2;
      menu.soundOn.style.color = '#FFF';
      menu.soundOff.style.color = 'rgba(0, 0, 0, 0.5)';
      comparateur.runSound = true;
    } else {
      // enregistre la valeur des sliders dans une variable, et la met à 0
      audio.saveRange1 = menu.range1.value;
      audio.saveRange2 = menu.range2.value;
      menu.range1.value = 0;
      menu.range2.value = 0;
      menu.soundOff.style.color = '#FFF';
      menu.soundOn.style.color = 'rgba(0, 0, 0, 0.5)';
      comparateur.runSound = false;
    }
    // Applique la value des sliders au volume de l'audio
    audio.background.volume = menu.range1.value * 0.2;
    audio.etoile.volume = menu.range2.value * 0.2;
    audio.etoileBonus.volume = menu.range2.value * 0.2;
    audio.loose.volume = menu.range2.value * 0.2;
    audio.tirUfo.volume = menu.range2.value * 0.2;
    audio.boomUfo.volume = menu.range2.value * 0.2;
    audio.clic1.volume = menu.range2.value * 0.2;
    audio.clic2.volume = menu.range2.value * 0.2;
  };
  // Clique son ON
  menu.soundOn.addEventListener('click', function(){
    onButton();
    gèreAudio();
  });

  // Clique son OFF
  menu.soundOff.addEventListener('click', function(){
    offButton();
    gèreAudio();
  });

  // Réglage volume musique (sliders 1)
  menu.range1.addEventListener('click', function(){
    if(comparateur.runSound){
      audio.background.volume = menu.range1.value * 0.2;
    } else {
      menu.range1.value = 0;
    }
  })

  // Réglage volume effets jeu (sliders 2)
  menu.range2.addEventListener('click', function(){
    if(comparateur.runSound){
      audio.etoile.volume = menu.range2.value * 0.2;
      audio.etoileBonus.volume = menu.range2.value * 0.2;
      audio.loose.volume = menu.range2.value * 0.2;
      audio.tirUfo.volume = menu.range2.value * 0.2;
      audio.boomUfo.volume = menu.range2.value * 0.2;
      audio.clic1.volume = menu.range2.value * 0.2;
      audio.clic2.volume = menu.range2.value * 0.2;
    } else {
      menu.range2.value = 0;
    }
  })

//
// -----------------------------------------------------------
// ------------------- Partie JEU ----------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------


  // Appel des images
  // Objet image, avec sources
  // -------------------------
const image = {
  fusée : new Image(),
  feu : new Image(),
  etoile : new Image(),
  etoile2 : new Image(),
  alien : new Image(),
  alienVert : new Image(),
  planète : new Image(),
  ufo : new Image(),
  boule : new Image(),
  background : new Image(),
};

image.fusée.src = 'img/fusée.png';
image.feu.src = 'img/feu.png';
image.etoile.src = 'img/etoile1.png';
image.etoile2.src = 'img/etoile2.png';
image.alien.src = 'img/alien.png';
image.alienVert.src = 'img/alienvert.png';
image.planète.src = 'img/lune.png';
image.ufo.src = 'img/ufo.png';
image.boule.src = 'img/boule.png';
image.background.src = 'img/background2.jpg';

// position Y du background pour le défilement
// 2 position Y, car défilement est fait avec deux image qui se suivent
image.background.positionY = 0;
image.background.positionYB = -600;

  // Fonction dessin du background
  let drawBackground = function() {
    ctx.drawImage(image.background, 0, image.background.positionY, 400, 600);
    ctx.drawImage(image.background, 0, image.background.positionYB, 400, 600);
    image.background.positionY += 2;
    image.background.positionYB += 2;
    if(image.background.positionY == 600){
      image.background.positionY = 0;
      image.background.positionYB = -600;
    };
  };


  // Objet fusée
  // -----------------------------------------------------------
  const fusée = {
    img : image.fusée,
    imgTir : image.feu,
    audioTir : audio.tirFusée,
    // Valeurs de l'image à la source
    imgPX: 313,
    imgPY: 0,
    imgX: 272,
    imgY: 568,
    // Valeurs de l'image dans le canvas
    sizeX: 45,
    sizeY: 95,
    posX: canvas.width / 2 - 30,
    posY: 490,
    speed: 8,
    vie: 3,
    // tableau regroupant les tirs de la fusée
    desTirs : [
      {
        posX : 0,
        posY : 0,
        enCours : false,
      },
      {
        posX : 0,
        posY : 0,
        enCours : false,
      },
      {
        posX : 0,
        posY : 0,
        enCours : false,
      },
    ],
    // Fonction dessin de la fusée
    drawFusée: function () {
      ctx.drawImage(this.img, this.imgPX, this.imgPY, this.imgX, this.imgY, this.posX, this.posY, this.sizeX, this.sizeY);
    },
    // Fonction déplacement gauche
    goLeft: function () {
      if (this.posX > 0) {
        this.imgPX = 0;
        this.imgX = 300;
        this.sizeX = 50;
        this.posX -= this.speed;
      }
    },
    // Fonction déplacement droite
    goRight: function () {
      if (this.posX < canvas.width - this.sizeX) {
        this.imgPX = 600;
        this.imgX = 300;
        this.sizeX = 50;
        this.posX += this.speed;
      }
    },
    // Fonction retour image défaut
    goUp: function(){
      if(!direction.left && !direction.right){
        this.imgPX = 313;
        this.imgX = 272;
        this.sizeX = 45;
      }
    },
    // Initialise le tir
    initialiseTir : function (unTir){
      checkAudio(fusée.audioTir);
      unTir.posX =  fusée.posX + fusée.sizeX / 2;
      unTir.posY = fusée.posY;
      unTir.enCours = true;
    },
    // Fonction vérifie si un tir est en cours, si non, lance la fonction drawTir
    shoot : function() {
      if(this.desTirs[0].enCours){
        this.drawTir(this.desTirs[0]);
      }
      if(this.desTirs[1].enCours){
        this.drawTir(this.desTirs[1]);
      }
      if(this.desTirs[2].enCours){
        this.drawTir(this.desTirs[2]);
      }
    },
    // Fonction tir de la fusée
    drawTir : function(unTir) {
      ctx.drawImage(this.imgTir, unTir.posX, unTir.posY, 15,15)
      unTir.posY -= 5;
      if(unTir.posY < 0) {
        unTir.enCours = false;
      }
    }
  };

  // Fonction constructeur étoile
  // -----------------------------------------------------------
  let FabricantEtoile = function (x,y) {
    this.img = image.etoile;
    this.sizeX = 35;
    this.sizeY = 35;
    this.posX = x;
    this.posY = y;
    this.speed = 5;
    this.points = 1;
    this.sound = audio.etoile;
  };

  // Fonction dessine une etoile
  // prend en argument un objet etoile, et une valeur sur l'axe des Y pour position random
  FabricantEtoile.prototype.drawEtoile = function (uneEtoile,valeurAxeY) {
    ctx.drawImage(uneEtoile.img, uneEtoile.posX, uneEtoile.posY, uneEtoile.sizeX, uneEtoile.sizeY);
    // déplacement de l'étoile
    if (comparateur.runGame) {
      uneEtoile.posY += uneEtoile.speed;
    }
    // reset de l'étoile si sort du canvas par le bas
    if (uneEtoile.posY > canvas.height) {
      uneEtoile.posX = Math.random() * (canvas.width - 50);
      uneEtoile.posY = Math.random() * - 200;
    };
    // collision avec la fusée
    if (
      uneEtoile.posY + uneEtoile.sizeY >= fusée.posY &&
      uneEtoile.posX + uneEtoile.sizeX - 20 > fusée.posX &&
      uneEtoile.posX + 20 < fusée.posX + fusée.sizeX
    ) {
      checkAudio(uneEtoile.sound);
      // reset de l'étoile après collision et incrémentation des points
      uneEtoile.posX = Math.random() * (canvas.width - 50);
      uneEtoile.posY = Math.random() * - valeurAxeY;
      // incrémentation du score
      level.score += uneEtoile.points;
      menu.inGameScore.innerHTML = level.texteScore + level.score;
    }
  };

  // Fonction constructeur Etoile bonus
  // -----------------------------------------------------------
  let FabricantEtoileBonus = function() {
    this.img = image.etoile2;
    this.sizeX = 60;
    this.sizeY = 60;
    this.posX = 200;
    this.posY = -7000;
    this.speed = 7;
    this.points = 5;
    this.sound = audio.etoileBonus;
  };

  // Fonction constructeur d'alien
  // -----------------------------------------------------------
  let FabricantAlien = function (uneImage,x,y) {
    this.img = uneImage;
    this.sizeX = 35;
    this.sizeY = 35;
    this.posX = x;
    this.posY = y;
    this.speed = 8;
  };

  // Fonction dessine un Ennemi
  // prend en argument un Ennemi ou une planète
  // prend en argument valeur position x et y et une valeur ajustement
  // des collisions
  FabricantAlien.prototype.drawEnnemi = function (unEnnemi,resetX,resetYa,resetYb,ajustement) {
    ctx.drawImage(unEnnemi.img, unEnnemi.posX, unEnnemi.posY, unEnnemi.sizeX, unEnnemi.sizeY);
    // déplacement de l'alien
    if (comparateur.runGame) {
      unEnnemi.posY += unEnnemi.speed;
    }
    // reset de l'alien
    if (unEnnemi.posY > canvas.height) {
      unEnnemi.posX = Math.random() * (canvas.width - resetX);
      unEnnemi.posY = - resetYa + Math.random() * - resetYb;
    };
    // collision avec la fusée
    if (
      unEnnemi.posY + unEnnemi.sizeY - ajustement >= fusée.posY && // collision bottom
      unEnnemi.posY + ajustement < fusée.posY + fusée.sizeY && // collison top
      unEnnemi.posX + unEnnemi.sizeX - 20 > fusée.posX && // collision droite
      unEnnemi.posX + 20 < fusée.posX + fusée.sizeX // collision gauche
    ) {
      if(level.niveau >= 3 || comparateur.noel){
        calcBestScore();
      }
      if(level.niveau == 4 && !comparateur.noel){
        if(fusée.vie > 1){
          fusée.vie -= 1;
          unEnnemi.posX = Math.random() * (canvas.width - resetX);
          unEnnemi.posY = - resetYa + Math.random() * - resetYb;
        } else {
          audio.background.pause();
          audio.loose.play();
          comparateur.loose = true;
          comparateur.play = false;
          menu.perduScore.innerHTML =level.texteScore + level.score;
          menu.inGameScore.className = 'none';
          menu.inGameHelp.className = 'far fa-question-circle none';
          menu.inGamePlay.className = 'far fa-pause-circle none';
          menu.inGameSetting.className = 'fas fa-sliders-h none';
          menu.menuPerdu.style.display = 'block';
          ufo.tir.posY = 10;
          ufo.vie = 75;
          fusée.vie = 3;
        }
      } else {
        audio.background.pause();
        audio.loose.play();
        comparateur.loose = true;
        comparateur.play = false;
        menu.perduScore.innerHTML =level.texteScore + level.score;
        menu.inGameScore.className = 'none';
        menu.inGameHelp.className = 'far fa-question-circle none';
        menu.inGamePlay.className = 'far fa-pause-circle none';
        menu.inGameSetting.className = 'fas fa-sliders-h none';
        menu.menuPerdu.style.display = 'block';
        if(level.niveau >= 4 || comparateur.noel){
          menu.perduBestScore.className ='';
          menu.perduBestScore.innerHTML = level.texteBestScore + level.bestScore;
        }
      } 
    }
  };

  // Objet planète
  // -----------------------------------------------------------
  let FabricantDePlanète = function (x,y) {
    this.img = image.planète;
    this.sizeX = 200;
    this.sizeY = 200;
    this.posX = x;
    this.posY = y;
    this.speed = 5;
  };

  // Objet Ufo
  // -----------------------------------------------------------
  const ufo = {
    img : image.ufo,
    audioTir : audio.tirUfo,
    audioBoom : audio.boomUfo,
    sizeX : 175,
    sizeY : 125,
    posX : canvas.width/2 - 100,
    posY : 15,
    speed : 2,
    vie : 75,
    isDead : false,
    // fonction lorsque ufo est touché par un tir
    perdUnPV : function () {
      menu.inGameScore.innerHTML = level.texteScore + level.score;
      checkAudio(this.audioBoom);
    },
    // objet tir de l'ufo
    tir : {
      img : image.boule,
      posX : 50,
      posY : 25,
      sizeX : 20,
      sizeY : 40,
      speed : 10,
      enCours : true,
    },
    // fonction tir de l'ufo
    tirUfo : function(){
      // initialise la position du tir
      if(this.tir.posY == 10){
        this.tir.posX = this.posX + this.sizeX / 2;
        this.tir.posY += this.tir.speed;
      }
      // incrementation position Y du tir
      this.tir.posY += this.tir.speed;
      // si la vie est supérieur à 45 pv, ufo lance 1 tir
      if(this.vie >= 45){
        ctx.drawImage(this.tir.img, this.tir.posX, this.tir.posY,this.tir.sizeX,this.tir.sizeY);
     } else {
       // sinon ufo lance 2 tir
        ctx.drawImage(this.tir.img, this.tir.posX - 30, this.tir.posY,this.tir.sizeX,this.tir.sizeY);
        ctx.drawImage(this.tir.img, this.tir.posX + 30, this.tir.posY,this.tir.sizeX,this.tir.sizeY);
     }
     // si la vie est supérieur à 6() pv, ufo tir lentement
      if(this.vie >= 65){
        if(this.tir.posY > canvas.height + 1000) {
          this.tir.enCours = false;
          this.tir.posY = 10;
        }
        // sinon ufo tir à interval plus court
      } else {
        if(this.tir.posY > canvas.height + 300) {
          this.tir.enCours = false;
          this.tir.posY = 10;
        }
      }
      // collision tir de ufo avec la fusée, partie perdu
      if (
        this.tir.posY + this.tir.sizeY >= fusée.posY && // collision bottom
        this.tir.posY < fusée.posY + fusée.sizeY && // collision top
        fusée.posX < this.tir.posX + this.tir.sizeX -10 && // collision droite
        fusée.posX + fusée.sizeX > this.tir.posX + 10 // collision gauche
      ){
        if(fusée.vie > 1){
          fusée.vie -= 1;
          this.tir.enCours = false;
          this.tir.posY = 10;
        } else {
          audio.background.pause();
          audio.loose.play();
          comparateur.loose = true;
          comparateur.play = false;
          menu.perduScore.innerHTML =level.texteScore + level.score;
          menu.inGameScore.className = 'none';
          menu.inGameHelp.className = 'far fa-question-circle none';
          menu.inGamePlay.className = 'far fa-pause-circle none';
          menu.inGameSetting.className = 'fas fa-sliders-h none';
          menu.menuPerdu.style.display = 'block';
          this.tir.posY = 10;
          this.vie = 75;
          fusée.vie = 3;
        }
      }
    },
    // fonction qui dessine ufo
    drawUfo : function(){
      ctx.drawImage(this.img, this.posX, this.posY, this.sizeX, this.sizeY);
      // déplacement de l'ufo de gauche à droite de l'ecran
      this.posX += this.speed;
      if(this.posX > canvas.width - this.sizeX){
        this.speed = - this.speed
      }
      if(this.posX < 0){
        this.speed = - this.speed
      }
      // audio tir ufo
      if(!this.tir.enCours){
        checkAudio(this.audioTir);
        this.tir.enCours = true;
      }
      // collision ufo avec tir de la fusée, perd un point de vie
      for(let i = 0; i < fusée.desTirs.length; i++){
        if(fusée.desTirs[i].posY < this.posY + this.sizeY - 50
          && fusée.desTirs[i].posX > this.posX
          && fusée.desTirs[i].posX < this.posX + this.sizeX){
            // reset du tir
            fusée.desTirs[i].posY = fusée.posY;
            fusée.desTirs[i].posX = fusée.posX;
            fusée.desTirs[i].enCours = false;
            // perd un point de vie
            this.vie -= 1;
            this.perdUnPV();
        }
      }
    }
  };


  // Objet élément utilisant les fonctions constructeurs
  // ---------------------------------------------------
  const element = {
    // 2 étoiles
    etoile : [
      new FabricantEtoile(Math.random() * (canvas.width - 50),Math.random() * - 400),
      new FabricantEtoile(Math.random() * (canvas.width - 50),Math.random() * - 100)
    ],
  };

  // Prend pour prototype un objet etoile
  FabricantEtoileBonus.prototype = element.etoile[0];

  // 1 étoile bonus
  element.etoileBonus = new FabricantEtoileBonus();
  // 2 aliens
  element.alien = [
      new FabricantAlien(image.alien,Math.random() * (canvas.width - 50),Math.random() * - 1000),
      new FabricantAlien(image.alien,Math.random() * (canvas.width - 50),Math.random() * - 700),
  ];

  // Planète prend en prototype en alien, pour récupérer la fonction drawEnnemi
  FabricantDePlanète.prototype = element.alien[0];

  // 1 planète
  element.planète = new FabricantDePlanète(Math.random() * (canvas.width - 100), - 3000 + Math.random() * - 500),
  // 1 alien rapide
  element.alienSpeed = new FabricantAlien(image.alienVert,Math.random() * (canvas.width - 50),Math.random() * - 5000);

  // -----------------------------------------------------------
  // -----------------------------------------------------------
  // ------------------ Version NOEL ---------------------------
  // -----------------------------------------------------------
  // -----------------------------------------------------------


  // fonction qui gère le passage à la version noel
  function noel () {
    // change les sources images
    laFusée.src = 'img/fusée10.png';
    image.fusée.src = 'img/fuséeNoel.png';
    image.etoile.src = 'img/flocon.png';
    image.etoile2.src = 'img/cadeau.png';
    image.alien.src = 'img/bonhomme.png';
    image.alienVert.src = 'img/sapin.png';
    image.planète.src = 'img/luneNoel.png';
    for(let i = 0; i < menu.imagePerdu.length; i++){
      menu.imagePerdu[i].src = 'img/bonhomme.png';
      menu.imagePerdu[i].className = 'imagePerdu imageNoel'
    };
    // ajuste la taille des images
    for(let i = 0; i < element.alien.length; i++){
      element.alien[i].sizeX = 55 ;
      element.alien[i].sizeY = 55 ;
    };
    element.alienSpeed.sizeX = 55 ;
    element.alienSpeed.sizeY = 55 ;
    // change l'audio background
    audio.background.src = 'audio/jingleBell.mp3';
  }
  // Bouton Noel depuis menu -> lance la version Noël (change source image / change audio)
  menu.btnNoel.addEventListener('click',function(){ 
    comparateur.noel = true;
    document.getElementsByClassName('versionNoel none')[0].className = 'versionNoel';
    menu.btnNoel.className = 'buttonNoel none';
    menu.btnClassique.className = 'buttonClassique'; 
    noel();
  });

  // fonction qui gère le passage à la version classique
  function classique () {
    // change les sources des images
    laFusée.src = 'img/fuseee.png';
    image.fusée.src = 'img/fusée.png';
    image.etoile.src = 'img/etoile1.png';
    image.etoile2.src = 'img/etoile2.png';
    image.alien.src = 'img/alien.png';
    image.alienVert.src = 'img/alienVert.png';
    image.planète.src = 'img/lune.png';
    // ajuste la taille des images
    for(let i = 0; i < menu.imagePerdu.length; i++){
      menu.imagePerdu[i].src = 'img/alien.png';
      menu.imagePerdu[i].className = 'imagePerdu'
    };
    for(let i = 0; i < element.alien.length; i++){
      element.alien[i].sizeX = 35 ;
      element.alien[i].sizeY = 35 ;
    };
    element.alienSpeed.sizeX = 35 ;
    element.alienSpeed.sizeY = 35 ;
    // change l'audio background
    audio.background.src = 'audio/IntheGarden-Godmode.mp3';
  };

  // Bouton Classique depuis menu -> remet la version normale (change source image / change audio)
  menu.btnClassique.addEventListener('click',function(){
    comparateur.noel = false;
    document.getElementsByClassName('versionNoel')[0].className = 'versionNoel none';
    menu.btnNoel.className = 'buttonNoel';
    menu.btnClassique.className = 'buttonClassique none';
    classique();
  });


  // -----------------------------------------------------------
  // -----------------------------------------------------------
  // -------------- Partie COMMANDES ---------------------------
  // -----------------------------------------------------------
  // -----------------------------------------------------------

  const direction = {
    left: false,
    right: false,
    espace: false,
  };

  // Évènement keydown
  window.addEventListener("keydown", function (event) {
    // touche entrer mets le jeu en pause
    if (event.keyCode == 13) {
      if(comparateur.play){
        comparateur.runGame = !comparateur.runGame;
        if(comparateur.runGame){
          menu.inGamePlay.className = "far fa-pause-circle logo";
        } else{
          menu.inGamePlay.className = "far fa-play-circle logo";
        }
        closeHelpSetting();
      }
    }
    // flèche gauche
    if (event.keyCode == 37) {
      direction.left = true;
    }
    // flèche droite
    if (event.keyCode == 39) {
      direction.right = true;
    }
    // touche W lance un tir
    if (event.keyCode == 87) {
      if(!comparateur.isShooting){
        if(!fusée.desTirs[0].enCours){
          fusée.initialiseTir(fusée.desTirs[0]);
        } else {
          if(!fusée.desTirs[1].enCours){
            fusée.initialiseTir(fusée.desTirs[1]);
          } else {
            if(!fusée.desTirs[2].enCours){
              fusée.initialiseTir(fusée.desTirs[2]);
            }
          }
          
        }
      }
    }
  });

  // Évènement key up
  window.addEventListener("keyup", function (event) {
    if (event.keyCode == 37) {
      setTimeout(function () {
        direction.left = false;
        fusée.goUp();
      }, 100);
    }
    if (event.keyCode == 39) {
      setTimeout(function () {
        direction.right = false;
        fusée.goUp();
      }, 100);
    }
  });

  // Débloque compétence au fur à mesure des niveaux
  const box = [
    document.getElementsByClassName('blur')[0],
    document.getElementsByClassName('blur')[1],
    document.getElementsByClassName('blur')[2],
    document.getElementsByClassName('blur')[3]
  ]

  let niveauTerminé = function(a) {
    document.getElementsByClassName('fa-lock')[a].style.display = 'none';
    if(a < 3){
      box[a].className = '';
    } else {
      if (a == 3){
        box[a].className = 'row align-items-center';
      }
    }
  };

  // Cheatcode qui débloque tous les affichages
  // et amène au niveau 4

  let compteurCheat = 0;
  document.getElementsByClassName('horloge')[0].addEventListener('click',function(){
    compteurCheat = compteurCheat + 1;
    if(compteurCheat == 14){
      level.niveau = 4;
      let all = document.getElementsByClassName('blur');
      for (let i = 0; i < all.length; i++) {
        all[i].style.filter = 'blur(0px)';
      };
      for (let i = 0; i < 4; i++) {
        document.getElementsByClassName('fa-lock')[i].style.display = 'none';
      };
      window.scroll({top:850,behavior:'smooth'})
      console.log('Cheatcode activé')
      console.log('CV débloqué & niveau 4 atteint')
    }
  })

  // Fonction qui incrémente la speed du jeu
  function incrementationSpeed () {
    if(level.score%5 && level.score > 0){
      if(!level.speedUp){
        // incrémente à partir de 30 points
        if(level.score > 30){
          // speed alien
          element.alienSpeed.speed += 0.2;
        }
        for(let i = 0; i < element.etoile.length; i++){
          // speed etoile
          element.etoile[i].speed += 0.1;
        };
        for(let i = 0; i < element.alien.length; i++){
          // speed alien rapide
          element.alien[i].speed += 0.1;
        };
        level.speedUp = true;
      }
    } else {
      level.speedUp = false;
    }
  };

  // fonction qui stop le jeu quand un niveau est terminé
  function winGameStopper () {
    level.niveau += 1;
    audio.background.pause();
    audio.background.currentTime = 0;
    comparateur.loose = true;
    comparateur.play = false;
    menu.winScore.innerHTML =level.texteScore + level.score;
    menu.inGameScore.className = 'none';
    menu.inGameHelp.className = 'far fa-question-circle none';
    menu.inGamePlay.className = 'far fa-pause-circle none';
    menu.inGameSetting.className = 'fas fa-sliders-h none';
    menu.menuWin.style.display = 'block';
  }

  // Fonction qui scroll quand on débloque une box
  function unlockScroll () {
    if(level.niveau < 5){
      window.scroll({top:500,behavior:'smooth'})
    } else {
      if(level.niveau == 5){
        window.scroll({top:1000,behavior:'smooth'})
      }
    }
  };

  // Fonction Draw
  // -----------------------------------------------------------
  // -----------------------------------------------------------

  function draw() {
    
  window.requestAnimationFrame(draw);

  // Dessin background hors-jeu
  drawBackground();

  // si comparateur.device = true
  // affiche le message d'erreur, et débloque les affichages
  if(comparateur.device){
    menu.menuHome.style.display = 'none';
    menu.affichageMobile.style.display = 'block';
    let all = document.getElementsByClassName('blur');
    for (let i = 0; i < all.length; i++) {
      all[i].style.filter = 'blur(0px)';
    };
    for (let i = 0; i < 4; i++) {
      document.getElementsByClassName('fa-lock')[i].style.display = 'none';
    };
    document.getElementsByClassName('suppMobile')[0].innerHTML = 
    'Disponible à partir du 10 février !';
    document.getElementsByClassName('suppMobile')[0].style.textAlign = 'center';
    return;
  }

  // Jeu en pause
  if (!comparateur.runGame) {
    return;
  }
  
  // Application du jeu
  if(!comparateur.loose){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dessin background in game
    drawBackground();

    // Niveau 1
    if(level.niveau >= 1 && level.niveau < 4 && !comparateur.noel){
      // Dessin fusée
      fusée.drawFusée();
      // Boucle dessin etoile
      for(let i = 0; i < element.etoile.length; i++){
        element.etoile[i].drawEtoile(element.etoile[i],canvas.height);
      };
      // Dessin etoile bonus
      element.etoileBonus.drawEtoile(element.etoileBonus, 4000);
      // Dessin alien
      for(let i = 0; i < element.alien.length; i++){
        element.alien[i].drawEnnemi(element.alien[i], 50, 0, 700, 0);
      };
      // Niveau 2
      if(level.niveau >= 2 && !comparateur.noel){
        level.scoreNiveau = 25;
        // Dessin planète
        element.planète.drawEnnemi(element.planète, 100, 3500, 1500, 40);
        // Niveau 3
        if(level.niveau >= 3 && !comparateur.noel){
          level.scoreNiveau = 30;
          // Dessin alien speed
          element.alienSpeed.drawEnnemi(element.alienSpeed, 50, 0, 3000, 0);
        }
      }
      // incrémentation de la vitesse du jeu
      incrementationSpeed();
    }

    // Boss final
    if(level.niveau == 4 && !comparateur.noel){
      menu.pvBoss.className = '';
      menu.pvBoss.innerHTML = ufo.vie +' PV';
      menu.vieFusée.className = 'block';
      menu.vieFusée.innerHTML = fusée.vie + ' vie';
      // Dessin fusée
      fusée.drawFusée();
      fusée.shoot();
      // dessin alien si pv ufo est inférieur à 60
      if(ufo.vie < 60){
        element.alien[0].drawEnnemi(element.alien[0], 50, 0, 200, 0);
      }
      // dessin alien rapide si pv ufo est inférieur à 30
      if(ufo.vie<30){
        element.alienSpeed.drawEnnemi(element.alienSpeed, 50, 0, 2000, 0);
      }
      ufo.drawUfo();
      if(ufo.tir.enCours){
      ufo.tirUfo();
      }
      level.score = 75 - ufo.vie;
    }

    // Niveau sans fin
    if(level.niveau >= 5 || comparateur.noel){
      // Dessin planète à partir de 8 points
      if(level.score > 8){
        element.planète.drawEnnemi(element.planète, 100, 3500, 1500, 40);
      }
      // Dessin fusée
      fusée.drawFusée();
      // Boucle dessin etoile
      for(let i = 0; i < element.etoile.length; i++){
        element.etoile[i].drawEtoile(element.etoile[i],canvas.height);
      };
      // Dessin etoile bonus
      element.etoileBonus.drawEtoile(element.etoileBonus, 4000);
      // Dessin alien
      for(let i = 0; i < element.alien.length; i++){
        element.alien[i].drawEnnemi(element.alien[i], 50, 0, 700, 0);
      };
      // Dessin alien speed à partir de 25 points
      if(level.score > 25){
        element.alienSpeed.drawEnnemi(element.alienSpeed, 50, 0, 3000, 0);
      }

      // incrémentation de la vitesse tout les 5 points
      incrementationSpeed();
    };
    
    // Condition de direction Left / Right
    if (direction.left) {
      fusée.goLeft();
    }
    if (direction.right) {
      fusée.goRight();
    }

  } else {
    // Si loose = true, reset de tous les éléments (étoile, étoile bonus alien, planète, alien rapide)
    element.alien[0] = new FabricantAlien(image.alien,Math.random() * (canvas.width - 50),Math.random() * - 800);
    element.alien[1] = new FabricantAlien(image.alien,Math.random() * (canvas.width - 50),Math.random() * - 700);
    element.etoile[0] = new FabricantEtoile(Math.random() * (canvas.width - 50),Math.random() * - 400);
    element.etoile[1] =new FabricantEtoile(Math.random() * (canvas.width - 50),Math.random() * - 100);
    element.etoileBonus = new FabricantEtoileBonus();
    element.planète = new FabricantDePlanète(Math.random() * (canvas.width - 100), - 3000 + Math.random() * - 500),
    element.alienSpeed = new FabricantAlien(image.alienVert,Math.random() * (canvas.width - 50),Math.random() * - 5000);
    element.alienSpeed.speed = 10;
    level.score = 0;
    // si version noel, laisse la version noel
    if(comparateur.noel){
      noel();
    }
    // condition perdu si on est dans le niveau boss final
    // reset des tirs
    if(level.niveau == 4){
      ufo.vie = 75;
      ufo.tir.posX = 50;
      ufo.tir.posY = canvas.height;
      for(let i = 0; i< fusée.desTirs.length; i++){
        fusée.desTirs[i].posX = 0;
        fusée.desTirs[i].posY = 0;
      };
      menu.pvBoss.className = 'none';
      menu.vieFusée.className = 'none'
    }
  }

  // Débloque box caché // & score pour débloqué un niveau
  if(level.score >= level.scoreNiveau && level.niveau < 4 && !comparateur.noel){
    if(box[(level.niveau - 1)].className == 'blur'){
      niveauTerminé((level.niveau - 1));
      setTimeout(unlockScroll,700);
      menu.winMessageA.innerHTML = 'Niveau ' + level.niveau + ' terminé !'
      menu.winMessageB.innerHTML = level.unlock[(level.niveau-1)] + ' débloqué !'
    }
    // Stop le jeu
    winGameStopper();
  }
  // condition niveau4 terminé
  if(ufo.vie <= 0 && !ufo.isDead){
    niveauTerminé((3));
    setTimeout(unlockScroll,700);
    menu.pvBoss.className = 'none';
    menu.vieFusée.className = 'none';
    ufo.isDead = true;
    menu.winMessageA.innerHTML = 'BOSS VAINCU !';
    menu.winMessageB.innerHTML = 'Niveau terminé !';
    winGameStopper();
  }
  if(level.niveau > 4){
    menu.winBtnNiveauSuivant.innerHTML = 'Niveau sans fin';
  }
}

draw();

});
