
var cube = document.querySelector('.cube');
var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');
var btnNew=document.querySelector('.btn-new');
var currentClass = '';

var score,currentScore,activePlayer,activePlayerPanel;


function init(){
  cube.style.display='block';
  score=[0,0];
  currentScore=0;
  activePlayer=0;
  activePlayerPanel= document.querySelector('.player-'+ activePlayer +'-side');

  document.querySelector('.player-0-side .player-name').textContent='Player 1';
  document.querySelector('.player-1-side .player-name').textContent='Player 2';
  document.querySelector('.player-0-side .final-score').textContent=0;
  document.querySelector('.player-1-side .final-score').textContent=0;
  document.querySelector('.player-0-side .current-score').textContent=0;
  document.querySelector('.player-1-side .current-score').textContent=0;
  document.querySelector('.player-0-side').className='player-0-side active';
  document.querySelector('.player-1-side').className='player-1-side ';

  document.querySelector('.player-0-side .trophy').style.display='none';
  document.querySelector('.player-1-side .trophy').style.display='none';

  btnHold.style.visibility='hidden';
  btnRoll.style.visibility='hidden';
}

init();

function changeActive(){
  activePlayerPanel.classList.remove('active');
    activePlayer=1-activePlayer;
    activePlayerPanel= document.querySelector('.player-'+ activePlayer +'-side');
    activePlayerPanel.classList.add('active');
}


btnRoll.addEventListener("click", function(){
  /**********  random int      */
  var randNum = Math.floor((Math.random()*6)+1);
  /**********   Dice rotation      */
   var showClass = 'show-' + randNum;
   if ( currentClass ) {
     cube.classList.remove( currentClass );
   }
   cube.classList.add( showClass );
   currentClass = showClass;
  /******************************* */

  currentScore+=randNum;
   if(randNum!==1){
    activePlayerPanel.querySelector('.current-score').textContent= currentScore;
   }else{
    currentScore=0;
    activePlayerPanel.querySelector('.current-score').textContent= currentScore;
    changeActive();
   }
});


btnHold.addEventListener("click", function(){
  score[activePlayer]+=currentScore;
  activePlayerPanel.querySelector('.final-score').textContent=score[activePlayer];
  currentScore=0;
  activePlayerPanel.querySelector('.current-score').textContent= currentScore;
  
  
  if(score[activePlayer]>=winnerNum){
      activePlayerPanel.classList.add('winner');
      activePlayerPanel.querySelector('.player-name').textContent='Winner';
      
      activePlayerPanel.querySelector('.trophy').style.display='flex';
      activePlayerPanel.querySelector('.animate__animated').classList.add('animate__backInDown');
    
      cube.style.display='none';
      activePlayerPanel.classList.remove('active');
    

  }else{
    changeActive();
  }

});


btnNew.addEventListener('click', function(){
  init();
});

var winnerNum;
document.querySelector('.winner-score').addEventListener("keyup", function(event){
  if(event.key == "Enter"){
    winnerNum=document.querySelector('.winner-score').value;
    btnHold.style.visibility='visible';
    btnRoll.style.visibility='visible';
  }
});


