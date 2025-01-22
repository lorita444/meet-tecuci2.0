function shuffle(array) {
    let currentIndex = array.length;
  
    
    while (currentIndex != 0) {
  
      
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

var carti = [
    { nume: 'panouri', imagine: './resurse/stiri/panouri.png', pereche: false},
    { nume: 'carte', imagine: './resurse/stiri/carte.png', pereche: false},
    { nume: 'parcare', imagine: './resurse/stiri/parcare.png', pereche: false},
    { nume: 'sofer', imagine: './resurse/stiri/sofer.png', pereche: false},
    { nume: 'hot', imagine: './resurse/stiri/hot.png', pereche: false},
    { nume: 'lumini', imagine: './resurse/stiri/lumini.png', pereche: false},
    { nume: 'panouri', imagine: './resurse/stiri/panouri.png', pereche: false},
    { nume: 'carte', imagine: './resurse/stiri/carte.png', pereche: false},
    { nume: 'parcare', imagine: './resurse/stiri/parcare.png', pereche: false},
    { nume: 'sofer', imagine: './resurse/stiri/sofer.png', pereche: false},
    { nume: 'hot', imagine: './resurse/stiri/hot.png', pereche: false},
    { nume: 'lumini', imagine: './resurse/stiri/lumini.png', pereche: false}
]

var stiri = [
    { nume: 'panouri', imagine: './resurse/stiri/stire_panouri.png'},
    { nume: 'carte', imagine: './resurse/stiri/stire_carte.png'},
    { nume: 'parcare', imagine: './resurse/stiri/stire_parcare.png'},
    { nume: 'sofer', imagine: './resurse/stiri/stire_sofer.png'},
    { nume: 'hot', imagine: './resurse/stiri/stire_hot.png'},
    { nume: 'lumini', imagine: './resurse/stiri/stire_lumini.png'}
]


shuffle(carti);


var cartiSpate = document.querySelectorAll('.carte')
var primaData = null;
var intoarce = 'resurse/carte spate2.png'
var liber = true;


cartiSpate.forEach(function(el, index){
    el.addEventListener('click', function(){

        if(index != primaData &&  carti[index].pereche === false  && liber === true){
            var clicked = carti[index];

        el.setAttribute('src', clicked.imagine)
        el.setAttribute('style', 'border: 2px solid white; box-sizing: border-box; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25)')
        
        if(primaData === null){
            primaData = index
            
        }else{
            if(carti[index].nume === carti[primaData].nume){
                carti[index].pereche = carti[primaData].pereche = true
                primaData = null;
                var index2 = index;

                setTimeout(function(){
                    var sunet_bun = new Audio('resurse/bun.mp3')
                    sunet_bun.play()

                    stiri.forEach(function(el, index){
                        if(el.nume === carti[index2].nume){
                            var stire = document.createElement('img')
                            stire.setAttribute('id', 'photo')
                            stire.setAttribute('src', el.imagine)
                            document.body.appendChild(stire);
    
                            stire.addEventListener('click', function(){
                                stire.remove()
                            })
    
                        }
                    })
                }, 500)
            }else{
                liber = false;

                var sunet_rau = new Audio('resurse/gresit.mp3')
                sunet_rau.volume = 0.3
                sunet_rau.play()

                setTimeout(function(){
                    cartiSpate[index].setAttribute('src', intoarce)
                    cartiSpate[primaData].setAttribute('src', intoarce)
                    primaData = null;
                    liber = true;
            }, 1000)
            }
        }
        }
    })
})


function resetGame(){
    var primaData = null;
    var liber = true;

    shuffle(carti);

    cartiSpate.forEach(function(el, index){
        el.setAttribute('src', intoarce)
    })
    
    carti.forEach(function(el, index){
        el.pereche = false
    })
}



