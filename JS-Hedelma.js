//Lukko muuttujat
var lukko_nm1 = 0;
var lukko_nm2 = 0;
var lukko_nm3 = 0;
var lukko_nm4 = 0; 
var kierrosLimit = 0;
var saitvoiton = false;

//Panosten muuttujat
var panosMaara = 1;
var panosRahaHTML; //muuta html tekstiä? Panokseen liittyvä, ei rahasumma
var defaultRahat = 50; //$50 alussa
var defaultRahatHTML; //jos ei tarve, niin poista

//Lukkojen tila
var lockedSlots = [false, false, false, false];
var slotsArvot = [];
var lukittuPanos = 0;
var lukinnonPoisto;

var omena = "Omena.png"; //2
var paaryna = "Paaryna.png"; //4
var kirsikat = "Kirsikat.png"; //6
var vesimelonit = "vesimeloni.png"; //8
var seitseman = "Seiska.png"; //10

let winningImage = document.getElementById("winningImage");
let losingImage = document.getElementById("losingImage");

//Valitse panos, vaikuttaa pisteiden saamiseen, mutta myös maksaa enemmän panoksen määrästä riippuen
function panosFunktio(numero_panos){

    if (lukko_nm1 == 1 || lukko_nm2 == 1 || lukko_nm3 == 1 || lukko_nm4 == 1){
        return;
    }

    let lockImagePanos = document.getElementById(`panosLukko${numero_panos}`);
    if (numero_panos == 1){

        if (lukittuPanos == 2){
            lukinnonPoisto = document.getElementById(`panosLukko${lukittuPanos}`).classList.remove("locked2");
        }
        else if (lukittuPanos == 3){
            lukinnonPoisto = document.getElementById(`panosLukko${lukittuPanos}`).classList.remove("locked2");
        }

        lockImagePanos.classList.add('locked2');
        panosRahaHTML = document.getElementById("panosRaha").innerHTML = "$1";
        panosMaara = 1;
        lukittuPanos = 1;
    }
    else if (numero_panos == 2){

        if (lukittuPanos == 1){
            lukinnonPoisto = document.getElementById(`panosLukko${lukittuPanos}`).classList.remove("locked2");
        }
        else if (lukittuPanos == 3){
            lukinnonPoisto = document.getElementById(`panosLukko${lukittuPanos}`).classList.remove("locked2");
        }

        lockImagePanos.classList.add('locked2');
        panosRahaHTML = document.getElementById("panosRaha").innerHTML = "$2";
        panosMaara = 2;
        lukittuPanos = 2;
    }
    else {

        if (lukittuPanos == 1){
            lukinnonPoisto = document.getElementById(`panosLukko${lukittuPanos}`).classList.remove("locked2");
        }
        else if (lukittuPanos == 2){
            lukinnonPoisto = document.getElementById(`panosLukko${lukittuPanos}`).classList.remove("locked2");
        }

        lockImagePanos.classList.add('locked2');
        panosRahaHTML = document.getElementById("panosRaha").innerHTML = "$3";
        panosMaara = 3;
        lukittuPanos = 3
    };
}

//Lukitse slot, 1-4
function lukitseTila(number){

    if (saitvoiton == true){
        saitvoiton = false;
    }
    
    if (kierrosLimit == 1){
        return;
    }

    if (panosMaara == 2 || panosMaara == 3){
        panosRahaHTML = document.getElementById("panosRaha").innerHTML = "$1";
        panosMaara = 1;

        if (lukittuPanos == 2){
            lukinnonPoisto = document.getElementById("panosLukko2").classList.remove("locked2");
            lukittuPanos = 0;
        }
        else if (lukittuPanos == 3){
            lukinnonPoisto = document.getElementById("panosLukko3").classList.remove("locked2");
            lukittuPanos = 0;
        }
    }
    
    let lockImage = document.getElementById(`lukitseValinta${number}`);
    
    if (number == "1" && lukko_nm1 == 1) {        
        lockImage.classList.remove('locked');
        lockedSlots[0] = false;
        lukko_nm1 = 0;
        
    } else if (number == "1" && lukko_nm1 == 0) {
        lockImage.classList.add('locked');
        lockedSlots[0] = true;
        lukko_nm1 = 1;    
    }

    //lukko2
    if (number == "2" && lukko_nm2 == 1) {        
        lockImage.classList.remove('locked');
        lockedSlots[1] = false;
        lukko_nm2 = 0;

    } else if (number == "2" && lukko_nm2 == 0) {
        lockImage.classList.add('locked');
        lockedSlots[1] = true;
        lukko_nm2 = 1;
    }

    //lukko3
    if (number == "3" && lukko_nm3 == 1) {
        lockImage.classList.remove('locked');
        lockedSlots[2] = false;
        lukko_nm3 = 0
    } else if (number == "3" && lukko_nm3 == 0) {
        lockImage.classList.add('locked');
        lockedSlots[2] = true;
        lukko_nm3 = 1;
    }

    //lukko4
    if (number == "4" && lukko_nm4 == 1) {
        lockImage.classList.remove('locked');
        lockedSlots[3] = false;
        lukko_nm4 = 0;
    } else if (number == "4" && lukko_nm4 == 0) {
        lockImage.classList.add('locked');
        lockedSlots[3] = true;
        lukko_nm4 = 1;
      }
    }

//Play button
function slotsPlay(){

    document.getElementById("play-disable").disabled = true; 

    if (panosMaara == 3 && defaultRahat < panosMaara){
        return
    }
    else if (panosMaara == 2 && defaultRahat < panosMaara){
        return
    }
    
    if (defaultRahat >= 1){

        slotsArvot = []; //tyhjennys varmuudenvuoksi
        
        for (let i=0; i < lockedSlots.length; i ++){
            if (lockedSlots[i] == false){
                fruits = ["Omena.png", "Kirsikat.png", "Paaryna.png", "vesimeloni.png", "Seiska.png"];
                let randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
                slotsArvot.push(randomFruit);
                var ok = "slots-" + (String(i));
                var ok2 = "kuvat2/" + String(randomFruit);
                document.getElementById(ok).src = ok2;
                }
            //if true, eli lukittu slot, mitä ei pidä muuttaa arvotulla kuvalla, vaan nykyisellä                
            else {
                let nykyinen = document.getElementById(`slots-${i}`).src;
                let vainTiedosto = nykyinen.split('/').pop();
                
                slotsArvot.push(vainTiedosto);
                }
            }
            
            document.getElementById("rahaaYhteensa").innerHTML = "$" + String(defaultRahat - panosMaara); 
            defaultRahat -= panosMaara;

            checkWin();
        }
        
        else {
            return;
        }
    }

function checkWin(){ 

    console.log(slotsArvot + " ennen tarkistusta")

    if (new Set(slotsArvot).size === 1) { //(new Set(slotsArvot).size === 1) //if (slotsArvot.every(slot => slotsArvot[0]))
        console.log("pääsit ehtoon")

        if (slotsArvot.every(slot => slot === omena)){
            console.log("tänne pitäisi päästä kun kaikki omenat")//Ei edes mennyt koko ehtoon
            document.getElementById("rahaaYhteensa").innerHTML = "$" + String(defaultRahat + (panosMaara * 2));
            defaultRahat += (panosMaara*2);
            saitvoiton = true;
            showWinningImage(); 
        }
        else if (slotsArvot.every(slot => slot === paaryna)){
            console.log("tänne pitäisi päästä kun kaikki päärynät")//Ei edes mennyt koko ehtoon
            document.getElementById("rahaaYhteensa").innerHTML = "$" + String(defaultRahat + (panosMaara * 4));
            defaultRahat += (panosMaara*4);
            saitvoiton = true;
            showWinningImage(); 
        }
        else if (slotsArvot.every(slot => slot === kirsikat)){
            console.log("tänne pitäisi päästä kun kaikki kirsikat")//Ei edes mennyt koko ehtoon
            document.getElementById("rahaaYhteensa").innerHTML = "$" + String(defaultRahat + (panosMaara * 6));
            defaultRahat += (panosMaara*6);
            saitvoiton = true;
            showWinningImage(); 
        }
        else if (slotsArvot.every(slot => slot === vesimelonit)){
            console.log("tänne pitäisi päästä kun kaikki vesimelonit")//Ei edes mennyt koko ehtoon
            document.getElementById("rahaaYhteensa").innerHTML = "$" + String(defaultRahat + (panosMaara * 8));
            defaultRahat += (panosMaara*8);
            saitvoiton = true;
            showWinningImage(); 
        }
        //seiska
        else {
            console.log("tänne pitäisi päästä kun kaikki seiskat")//Ei edes mennyt koko ehtoon
            document.getElementById("rahaaYhteensa").innerHTML = "$" + String(defaultRahat + (panosMaara * 10));
            defaultRahat += (panosMaara*10);
            saitvoiton = true;
            showWinningImage(); 
        }        
     }
     else {
        showLosingImage();
     }
    }

//funktio kuvan näyttämiseksi
function showWinningImage() {

    winningImage.style.display = "block";
    winningImage.style.opacity = 1;
    
    setTimeout(() => {
        winningImage.classList.add("fade-out");
        
        setTimeout(() => {
            winningImage.style.display = "none";
            winningImage.classList.remove("fade-out");
        }, 100);
    }, 200);
    document.getElementById("play-disable").disabled = false; 

    setTimeout(resetLukot, 100);
}

function showLosingImage() {

    losingImage.style.display = "block";
    losingImage.style.opacity = 1;
    
    setTimeout(() => {
        losingImage.classList.add("fade-out");
        
        setTimeout(() => {
            losingImage.style.display = "none";
            losingImage.classList.remove("fade-out");
        }, 100);
    }, 200);
    document.getElementById("play-disable").disabled = false; 

    setTimeout(resetLukot, 100);
}

function resetLukot() {

    if (kierrosLimit == 1) {
        kierrosLimit = 0;
    }
    
    if (kierrosLimit == 0){
        if (lukko_nm1 == 1 || lukko_nm2 == 1 || lukko_nm3 == 1 || lukko_nm4 == 1){
            console.log("jos käytit lukkoja ainakin kerran")
            kierrosLimit = 1;
        }
    }

    if (saitvoiton == true){
        kierrosLimit = 1;
    }

    let lockPanosReset = document.getElementById(`panosLukko${panosMaara}`);
    lockPanosReset.classList.remove('locked2');
    panosRahaHTML = document.getElementById("panosRaha").innerHTML = "$1";

    slotsArvot = [];
    
    let lockImages = document.querySelectorAll('.lukitse_css');
    lockImages.forEach(image => {
        image.classList.remove('locked');
    });
    lockedSlots = [false, false, false, false];
    lukko_nm1 = 0;
    lukko_nm2 = 0;
    lukko_nm3 = 0;
    lukko_nm4 = 0;
}