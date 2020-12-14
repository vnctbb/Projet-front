// --------------------------
// ---------- Fichier Javascript pour compte à rebours
// --------------------------

function horloge (){
  var date = new Date();

  var date2 = new Date('February 10, 2021 00:00:00');
  
  var ecart = date2.getTime() - date.getTime();
  var h = Math.floor(ecart / 3600000);
  var mi = Math.floor(ecart / 60000) % 60;
  var s = Math.floor(ecart / 1000) % 60;

  if(h < 10){h = '0' + h};
  if(mi < 10){mi = '0' + mi};
  if(s < 10){s = '0' + s};

  document.getElementById('heure').innerHTML = h + ':' + mi + ':' + s;
  };

window.addEventListener('load', function(){
  setInterval(horloge,1000);
});