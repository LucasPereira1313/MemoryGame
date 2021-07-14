var seq = [];
var val = 0;
var timeoutID;
var timeoutNext;
var count = 0;
var enable
const timesleep = 900;


function start(){
    count = 3;
    seq = [];
    count = 5;
    enable = false;
    setOnOffButton(false);
    regresiveCount();
}

function writeMesaeg(msg){
    let obj = document.getElementById('mesage');
    obj.innerText = String(msg);
}

function writeStep(msg){
    let obj = document.getElementById('step');
    obj.innerText = String(msg);
}

function regresiveCount(){
    window.clearTimeout(timeoutID);

    if(count > 0){

        if (count == 3) {
            setOnOffButton(true);
        }

        if (count == 2) {
            setOnOffButton(false);
        }

        timeoutID = setTimeout(() => { regresiveCount(); }, timesleep); 
        writeMesaeg(`Iniciando em... ${String(count)}`);
        count--;
    }
    else{
        writeMesaeg('');
        nextColor(0);
    }
}

function nextColor(current = null){
    writeMesaeg('');
    writeStep(seq.length);
    window.clearTimeout(timeoutID);
    window.clearTimeout(timeoutNext);

    if (current == null) {        
        let buttons = document.querySelectorAll('[data-val]');
        let value = getRandom();
    
        if(buttons != null){
            seq.push(value);
            let element = buttons[value];
            setColorOn(element)
            enable = true;
        } 
    }
    else{
        setOnOffButton(false);        

        if (parseInt(current) < seq.length ) {
            
            let buttons = document.querySelectorAll('[data-val]');
            let obj = buttons[seq[current]];
            setColorOn(obj, () => { nextColor((current + 1 )); });
        }
        else{
            if (seq.length > 0) {
                writeMesaeg('Atenção para o próximo....');
            }
            else{
                writeMesaeg('Ok vamos iniciar.');
            }
            
            timeoutID = setTimeout(() => { nextColor(null); }, timesleep); 
        }
    } 
}

function pressButton(obj){
    
    if (enable == false) {
        return;
    }

    let val = obj.dataset.num;    

    if (seq.length > 0) {    
        
        setColorOn(obj);

        if (seq[count] == val) {
            count++;

            if (count < seq.length ) {            
                writeMesaeg(`Muito bem, você achou ${String(count)} de ${String(seq.length)}`);
            }
            else{
                enable = false;
                count = 0;
                writeMesaeg('Exelente, vamos para o próximo nível....');
                timeoutNext = setTimeout(() => { nextColor(count); }, (timesleep * 2)); 
            }
        }
        else{
            writeMesaeg('Sequencia errada......');
            setOnOffButton(true);
            seq = [];
        }    
    }    
}

function setColorOn(obj, exec = null){   
    obj.className  = 'button' + String(obj.dataset.val).toUpperCase() + 'click';
    timeoutID = setTimeout(() => { setColorOff(obj, exec); }, timesleep);    
}

function setColorOff(obj, exec = null){
    obj.className  = 'button' + String(obj.dataset.val).toUpperCase();
    window.clearTimeout(timeoutID);

    if (exec != null) {
        timeoutNext = setTimeout(exec, timesleep); 
    }
}

function setOnOffButton(on){
    let buttons = document.querySelectorAll('[data-val]');

    if(buttons != null){
        for (let index = 0; index < buttons.length; index++) {
            let obj = buttons[index];
            if (on) {
                obj.className  = 'button' + String(obj.dataset.val).toUpperCase() + 'click';
            }
            else{
                obj.className  = 'button' + String(obj.dataset.val).toUpperCase(); 
            }                     
        }
    }
}

function getRandom() {
    return getRandomInt(0, 4);

  }


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }