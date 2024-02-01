// const words = [
//     'apple',
//     'banana',
//     'orange',
//     'strawberry',
//     'watermelon',
//     'grape',
//     'kiwi',
//     'mango',
//     'peach',
//     'pineapple',
//     'elephant',
//     'lion',
//     'tiger',
//     'giraffe',
//     'monkey',
//     'zebra',
//     'kangaroo',
//     'penguin',
//     'koala',
//     'snake',
//     'frog',
//     'turtle',
//     'butterfly',
//     'dolphin',
//     'shark',
//     'parrot',
//     'peacock',
//     'ostrich',
//     'crocodile',
//     'rose',
//     'sunflower',
//     'tulip',
//     'daisy',
//     'lily',
//     'carnation',
//     'daffodil',
//     'cherry blossom',
//     'iris',
//     'lilac',
//     'carrot',
//     'broccoli',
//     'tomato',
//     'cucumber',
//     'potato',
//     'onion',
//     'bell pepper',
//     'lettuce',
//     'spinach',
//     'strawberry',
//   ];
 

let startGame = async()=>{


 
  
let apiURL = "https://random-word-api.herokuapp.com/word";

let words = async()=>{
  let fetchResult = await fetch (apiURL);
  let result = await fetchResult.json();
  return result;
}




  let btn = document.querySelector(".check");
  let wordGuess = document.querySelector(".word");
  let guess = document.querySelector (".ans");
  let error = document.querySelector(".error");
  let again = document.querySelector(".again");
  let time = document.querySelector(".time");

  
 


  // let wordArr = (await words())[Math.floor(Math.random()* words.length)];

  let wordArr = (await words())[0];

  again.classList.add("disabled")
  
  again.addEventListener ("click",()=>{
    window.location.reload();
  })

  let longHiddenWord = "";
  let shortHiddenWord = "";
  let longerHiddenWord = "";


  for (let i = 3; i< wordArr.length-3; i++){
    longerHiddenWord = longerHiddenWord+ ` _ `;
  };


  for (let i = 2; i<wordArr.length-2; i++){
    longHiddenWord+= "_ ";
  };

  for (let i = 1; i< wordArr.length-1; i++){
    shortHiddenWord = shortHiddenWord+ ` _ `;
  };
  
  if ( wordArr.length>5 && wordArr.length<=8){
    wordGuess.textContent = wordArr[0] + wordArr[1] + longHiddenWord + wordArr[wordArr.length-2] + wordArr[wordArr.length-1];
  }else if(wordArr.length>8){
    wordGuess.textContent = wordArr[0] + wordArr[1] + wordArr[2] + longerHiddenWord + wordArr[wordArr.length-3]  +wordArr[wordArr.length-2] + wordArr[wordArr.length-1]; ; 
  }
  
  else{ wordGuess.textContent = wordArr[0] + shortHiddenWord + wordArr[wordArr.length-1] ; }
 


  let stop = 30;

let updateTimer = ()=>{
  time.textContent = `00:${stop}`;
  stop--;

  
  if(stop < -1){
    window.location.reload();
  }
}
let timer = setInterval(updateTimer,1000);






btn.addEventListener ("click",()=>{
 
  
  let final = guess.value;

  if(final !== ""){
    if (final === wordArr){
      again.classList.remove("disabled");
      btn.classList.add("disabled");
      clearInterval(timer);
      guess.disabled = true;
      wordGuess.textContent = wordArr;
      error.classList.toggle("success");
      error.textContent = `You won !`
    }else {
      again.classList.remove("disabled");
      btn.classList.add("disabled");
      clearInterval(timer);
      guess.disabled = true;
     error.textContent = `You lost! The word was ${wordArr}`
     btn.disabled = true;
    }
  }else{
    error.textContent ="Please enter a something"
  }

})


}

startGame();


