'use strict';
let attempts = 0;
let maxAttempts = 25;
let ProductsNames = [];
let numberOfPress = [];
let numberOfVeiws = [];



let objectsArray = [];
function Product(productName) {
    this.productName = productName.split('.')[0];
    this.imageSource = 'img/' + productName;
    this.veiws = 0;
    this.Press = 0;

    objectsArray.push(this);
}

let ImagesArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
for (let i= 0; i < ImagesArray.length; i++) {
    new Product(ImagesArray[i]);
}
console.log(objectsArray);
function randomImage() {
    return Math.floor(Math.random() * objectsArray.length);
}

// adding local storage
 function settingItems(){
     let data = JSON.stringify (objectsArray);
     //console,log(data);
     localStorage.setItem('product',data);
    
 }
 

 // adding a local function
 function getItems(){
     let  stringData =  localStorage.getItem('product');
     let newObject = JSON.parse (stringData);
     if (newObject !== null){
        objectsArray= newObject ;

     }

 imagesRender();
 }
 



let attemptsElement = document.getElementById('attNumb');
let leftImage = document.getElementById('leftImg');
let middelImage = document.getElementById('middelImg');
let rightImage = document.getElementById('rightImg');
let unorderdList = document.getElementById('Result');

attemptsElement.textContent = attempts;

let leftImageIndex;
let middelImageIndex;
let rightImageIndex;


let previousIteration = [];

function imagesRender() {
    leftImageIndex = randomImage();
    middelImageIndex = randomImage();
    rightImageIndex = randomImage();

    while ((leftImageIndex === middelImageIndex) || (leftImageIndex === rightImageIndex) || (middelImageIndex === rightImageIndex)) {
        middelImageIndex = randomImage();
        rightImageIndex = randomImage();
    }


    if (attempts == 0) {
        previousIteration = [leftImageIndex, middelImageIndex, rightImageIndex];
        console.log(previousIteration);
    }

 if (attempts == 1) {
    while ((leftImageIndex === previousIteration[0] || leftImageIndex === previousIteration[1] || leftImageIndex === previousIteration[2]) || (middelImageIndex === previousIteration[0] || middelImageIndex === previousIteration[1] || middelImageIndex === previousIteration[2]) || (rightImageIndex === previousIteration[0] || rightImageIndex === previousIteration[1] || rightImageIndex === previousIteration[2]) || ((leftImageIndex === middelImageIndex) || (leftImageIndex === rightImageIndex) || (middelImageIndex === rightImageIndex))) {
        leftImageIndex = randomImage();
        middelImageIndex = randomImage();
        rightImageIndex = randomImage();
    }
    console.log(leftImageIndex);
    console.log(middelImageIndex);
    console.log(rightImageIndex);
}



    leftImage.setAttribute('src', objectsArray[leftImageIndex].imageSource);
    leftImage.setAttribute('title', objectsArray[leftImageIndex].productName);
    leftImage.setAttribute('alt', objectsArray[leftImageIndex].productName);
    objectsArray[leftImageIndex].veiws++; 


    middelImage.setAttribute('src', objectsArray[middelImageIndex].imageSource);
    middelImage.setAttribute('tilte', objectsArray[middelImageIndex].productName);
    middelImage.setAttribute('alt', objectsArray[middelImageIndex].productName);
    objectsArray[middelImageIndex].veiws++; 


    rightImage.setAttribute('src', objectsArray[rightImageIndex].imageSource);
    rightImage.setAttribute('tilte', objectsArray[rightImageIndex].productName);
    rightImage.setAttribute('alt', objectsArray[rightImageIndex].productName);
    objectsArray[rightImageIndex].veiws++; 

}
imagesRender();



leftImage.addEventListener('click', Press);
middelImage.addEventListener('click', Press);
rightImage.addEventListener('click', Press);


function Press(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        attemptsElement.textContent = attempts;
        if (event.target.id == 'leftImg') {
            objectsArray[leftImageIndex].Press++;
        } else if (event.target.id == 'middelImg') {
            objectsArray[middelImageIndex].Press++;
        } else if (event.target.id == 'rightImg') {
            objectsArray[rightImageIndex].Press++;
        }

    } else { 
        leftImage.removeEventListener('click', Press);
        middelImage.removeEventListener('click', Press);
        rightImage.removeEventListener('click', Press);

        let button = document.getElementById('resultButton');
        button.addEventListener('click',veiwResults);
        function veiwResults(event){
            for (let i = 0; i < objectsArray.length; i++) {
                let liElement = document.createElement('li');
                unorderdList.appendChild(liElement);
                liElement.textContent = `${objectsArray[i].productName} had ${objectsArray[i].Press} votes, and was seen ${objectsArray[i].veiws} times.`;
                numberOfPress.push(objectsArray[i].Press);
                numberOfVeiws.push(objectsArray[i].veiws);
                ProductsNames.push(objectsArray[i].productName);
            }
            button.removeEventListener('click',veiwResults);
            getChart();
        }
    }
    imagesRender();
}


function getChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ProductsNames,
            datasets: [{
                label: '# of Votes',
                data: numberOfPress,
                backgroundColor: [
                    '#ff6384',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 2
            }, {
                label: '# of Veiws',
                data: numberOfVeiws,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

getItems();