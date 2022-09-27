'use strict';

// GLOBAL VARIABLES

let voteCount = 25;
let duckArray = [];

// DOM REFERENCES

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img1');
let imgTwo = document.getElementById('img2');
let imgThree = document.getElementById('img3');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');

//  CONSTRUCTOR FUNCTION

function Duck(name, fileExtension = 'jpg'){
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  
  duckArray.push(this);
}

//  HELPER FUNCTION/ UTILITIES

function randomIndex(){
  return Math.floor(Math.random() * duckArray.length);
}

function renderImgs(){
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  //  imgOne === imgTwo

  while(imgOneIndex === imgTwoIndex){
    imgTwoIndex = randomIndex();
  }
  while(imgOneIndex === imgThreeIndex){
    imgOneIndex = randomIndex();
  }
  while(imgTwoIndex === imgThreeIndex){
    imgTwoIndex = randomIndex();
  }

  imgOne.src = duckArray[imgOneIndex].img;
  imgTwo.src = duckArray[imgTwoIndex].img;
  imgThree.src = duckArray[imgThreeIndex].img;

  duckArray[imgOneIndex].views++;
  duckArray[imgTwoIndex].views++;

  imgOne.alt = duckArray[imgOneIndex].name;
  imgTwo.alt = duckArray[imgTwoIndex].name;
}

//  EVENT HANDLERS

function handleClick(event){
  console.dir(event.target);
  let imgClicked = event.target.alt;
  
  // Add clicks to the image that was clicked
  for (let i = 0; i < duckArray.length; i++){
    if(duckArray[i].name === imgClicked){
      duckArray[i].clicks++;
    }
  }

  // decrement the vote count
  voteCount--;
  // call the render img to reload new images
  renderImgs();
  // After voting rounds have ended... end the clicks!!
  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
}
  
function handleShowResults(){
  if(voteCount === 0){
    console.log('clicked');
    for(let i = 0; i < duckArray.length; i++){
      let liElem = document.createElement('li');
      console.dir(liElem);
      liElem.textContent = `${duckArray[i].name} was viewed ${duckArray[i].views} times and was clicked ${duckArray[i].clicks} times`;
      resultsContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults)
  }
}
//  EXECUTABLE CODE

//  OBJECT CREATION

new Duck('sweep', 'png');
new Duck('bag');
new Duck('banana');
new Duck('bathroom');
new Duck('boots');
new Duck('breakfast');
new Duck('bubblegum');
new Duck('chair');
new Duck('cthulhu');
new Duck('dog-duck');
new Duck('dragon');
new Duck('pen');
new Duck('pet-sweep');
new Duck('scissors');
new Duck('shark');
new Duck('tauntaun');
new Duck('unicorn');
new Duck('water-can');
new Duck('wine-glass');

renderImgs();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults)