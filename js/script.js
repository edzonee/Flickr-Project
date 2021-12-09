const key = '070736a69e7bd29c919af4b92a25f109';
let searchText = 'shrimp';

let url = `https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1`;

const userInput = document.getElementById('userInput');
const userSize = document.getElementById('userSize');
const userAmount = document.getElementById('userAmount');
const userSubmit = document.getElementById('userSubmit');
const imgCols = document.getElementById('imgCols');
const imgFlex = document.getElementById('imgFlex');
const innerCaro = document.querySelector('.carousel-inner');
const loopLoad = document.getElementById('loadingAnime');
loopLoad.style.display = 'none';

userSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(userSubmit);
    searchText = userInput.value;
    url = `https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=${userAmount.value}&page=1`;
    
    loadingLoop();
    console.log(loadingLoop);
  

    function errorMsg() {
        if (userInput.value === '' && userAmount.value === '') {
            console.log('Fill in input');
            let h2 = document.createElement('h2');

            document.body.appendChild(h2);
            h2.innerText = 'Fill in all boxes!';
            h2.style.textAlign = 'center';
            
        }
    }

    if (userInput.value === '' && userAmount.value === '') {
        errorMsg()
    }

    fetch(url).then(
        function (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw 'Something went wrong...';
            }
        }
    ).then(
        function (data) {
            console.log(data);
            console.log(data.photos.photo[0]);
            //Vi hämtar första bilden
            for (let i = 0; i < userAmount.value; i++) {
               let url = getImageUrl(data.photos.photo[i]);

                // innerCaro = document.querySelectorAll('carousel-inner');
                imgDivPar = document.createElement('div');
                innerCaro.appendChild(imgDivPar);
                imgDivChild = document.createElement('img');
                imgDivPar.appendChild(imgDivChild);

                imgDivChild.src = url;

                if(i === 0){
                    imgDivPar.classList.add('carousel-item', 'active');
                    imgDivChild.classList.add('d-block', 'w-100');
                }
                else{
                    imgDivPar.classList.add('carousel-item');
                    imgDivChild.classList.add('d-block', 'w-100');
                }

            }
            loopLoad.style.display = 'none';
        }
    ).catch(
        function (error) {
            console.log(error);
        }
    );
    const divEl = document.querySelectorAll('.carousel-inner *')
    for (let i = 0; i < divEl.length; i++) {
        let el = divEl[i];
        el.remove();
        
    }
})

function getImageUrl(photoObject) {
    let photo = photoObject;
    let size = userSize.value;

    if (size === 'b') {
        console.log('in B');
        size = 'b';
        document.querySelector("#carouselExampleControls").style.width= "1024px";
        
    }
    else if (size === 'z') {
        size = 'z';//.style.height = '640px';
        document.querySelector("#carouselExampleControls").style.width= "640px";
    }
    else if (size === 'm') {
        size = 'm';
        //size = 'm'.style.height = '240px';
        document.querySelector("#carouselExampleControls").style.width= "240px";
    }

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
    return imgUrl;
    // displayImg(imgUrl);
}

function loadingLoop(){
    loopLoad.style.display = 'block';
    anime(
        {
        targets: '#loadingAnime',
        width: '100%', // -> from '28px' to '100%',
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
      });
}