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

// Canvas element for chart to render to
let canvasElem = document.getElementById('my-chart').getContext('2d');

//  CHART DEMO - CHART OBJECT


//  CONSTRUCTOR FUNCTION

function Duck(name, fileExtension = 'jpg'){
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  
  duckArray.push(this);
}

Duck.prototype.myMethod = function(){
  return 'hey';
}
//  HELPER FUNCTION/ UTILITIES

function randomIndex(){
  return Math.floor(Math.random() * duckArray.length);
}

let indexArray = [];

function renderImgs(){
  // let imgOneIndex = randomIndex();
  // let imgTwoIndex = randomIndex();
  // let imgThreeIndex = randomIndex();
  
  //  imgOne === imgTwo
  
  while(indexArray.length < 6) {
    let randomNum = randomIndex();
    if(!indexArray.includes(randomNum)){
      indexArray.push(randomNum);
    }
  }

  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

  imgOne.src = duckArray[imgOneIndex].img;
  imgTwo.src = duckArray[imgTwoIndex].img;
  imgThree.src = duckArray[imgThreeIndex].img;
  
  duckArray[imgOneIndex].views++;
  duckArray[imgTwoIndex].views++;
  duckArray[imgThreeIndex].views++;
  
  imgOne.alt = duckArray[imgOneIndex].name;
  imgTwo.alt = duckArray[imgTwoIndex].name;
  imgThree.alt = duckArray[imgThreeIndex].name;
}


// CANVAS DEMO - CHART FUNCTION

function renderChart(){
  
  let duckNames = [];
  let duckVotes = [];
  let duckViews = [];

  
  for(let i = 0; i < duckArray.length; i ++){
      duckNames.push(duckArray[i].name);
      duckVotes.push(duckArray[i].clicks);
      duckViews.push(duckArray[i].views);
  }

  let myChartObj = {
    type: 'bar',
    data: {


        labels: duckNames,
        datasets: [{
            data: duckVotes,
            label: '# of Votes',
            backgroundColor: [
                'rgba(50, 205, 50, 0.8)',
            ],
            borderColor: [
                'rgba(50, 205, 50, 1)',
            ],
            borderWidth: 1
        },
        {
        data: duckViews,
        label: '# of Views',
        backgroundColor: [
            'gray'
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 1
    }]
    
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
  };
  new Chart(canvasElem, myChartObj);
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

    // Step 1: STRINGIFY THE DATA

    let stringifiedDucks = JSON.stringify(duckArray);
    console.log('stringified goats >>>', stringifiedDucks);
    // STEP 2: ADD TO LOCAL STORAGE

    localStorage.setItem('myDucks', stringifiedDucks)
  }
}
  
function handleShowResults(){
  if(voteCount === 0){
    renderChart();
    // console.log('clicked');
    // for(let i = 0; i < duckArray.length; i++){
    //   let liElem = document.createElement('li');
    //   console.dir(liElem);
    //   liElem.textContent = `${duckArray[i].name} was viewed ${duckArray[i].views} times and was clicked ${duckArray[i].clicks} times`;
    //   resultsContainer.appendChild(liElem);
    // }
    resultsBtn.removeEventListener('click', handleShowResults)
  }
}

// MORE LOCAL STORAGE CODE
// STEP 3: PULL DATA OUT OF LOCAL STORAGE
let retreivedDucks = localStorage.getItem('myDucks');

//  STEP 4: PARSE MY DATA INTO CODE MY APP CAN USE

let parsedDucks = JSON.parse(retreivedDucks);


//  EXECUTABLE CODE

if(retreivedDucks){
  duckArray = parsedDucks;
} else{
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
}
  
//  REBUILD DUCK INSTANCES USING CONTRUCTOR

// if(retreivedDucks){
//   for(let i = 0; i < parsedDucks.length; i++){
//     if(parsedGoats[i].name === 'sweep'){
//     let reconstructedSweepD = new Duck(parsedDucks[i].name, 'png')
//     reconstructedSweepD.clicks = parsedDucks[i].clicks;
//     reconstructedSweepD.views = parsedDucks[i].views;
//     } else {
//   let reconstructedDuck = new Duck(parsedDucks[i].name);
//   reconstructedDuck.clicks = parsedDucks[i].clicks;
//   reconstructedDuck.views = parsedDucks[i].views;
//    }
//   }
// }

renderImgs();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults)