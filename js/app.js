'use strict';
let attempts = 0;
let maxAttempts = 25;

let objectsArray = [];
function Product(productName) {
    this.productName = productName.split('.')[0];
    this.imageSource = 'img/' + productName;
    this.veiws = 0;
    this.clicks = 0;

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


let attemptsElement = document.getElementById('attNumb');
let leftImage = document.getElementById('leftImg');
let middelImage = document.getElementById('middelImg');
let rightImage = document.getElementById('rightImg');
let unorderdList = document.getElementById('Result');

attemptsElement.textContent = attempts;

let leftImageIndex;
let middelImageIndex;
let rightImageIndex;




function getThreeImages() {
    leftImageIndex = randomImage();
    middelImageIndex = randomImage();
    rightImageIndex = randomImage();

    while ((leftImageIndex === middelImageIndex) || (leftImageIndex === rightImageIndex) || (middelImageIndex === rightImageIndex)) {
        middelImageIndex = randomImage();
        rightImageIndex = randomImage();
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
getThreeImages();



leftImage.addEventListener('click', clicks);
middelImage.addEventListener('click', clicks);
rightImage.addEventListener('click', clicks);


function clicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        attemptsElement.textContent = attempts;
        if (event.target.id == 'leftImg') {
            objectsArray[leftImageIndex].clicks++;
        } else if (event.target.id == 'middelImg') {
            objectsArray[middelImageIndex].clicks++;
        } else if (event.target.id == 'rightImg') {
            objectsArray[rightImageIndex].clicks++;
        }

    } else { 
        leftImage.removeEventListener('click', clicks);
        middelImage.removeEventListener('click', clicks);
        rightImage.removeEventListener('click', clicks);

        let button = document.getElementById('resultButton');
        button.addEventListener('click',veiwResults);
        function veiwResults(event){
            for (let i = 0; i < objectsArray.length; i++) {
                let liElement = document.createElement('li');
                unorderdList.appendChild(liElement);
                liElement.textContent = `${objectsArray[i].productName} had ${objectsArray[i].clicks} votes, and was seen ${objectsArray[i].veiws} times.`;
            }
            button.removeEventListener('click',veiwResults);
        }
    }
    getThreeImages();
}


