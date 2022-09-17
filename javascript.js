const Santance = document.getElementById('paragraph');
const startBtn = document.getElementById('start');
const inputFuild = document.getElementById('input');
const newModal = document.getElementById('my-modal-3');
const modalBtn = document.getElementById('modal-btn');
const ModalBody = document.getElementById('modal-body');
const timing = document.getElementById('timing');


const loadData =async ()=>{
    const res = await fetch(`https://type.fit/api/quotes`);
    const data = await res.json();
    randomSen(data);
}

loadData();

const randomSen = (data)=>{
    const dataLenght = data.length;
        const randomSentance = data[Math.floor(Math.random()*dataLenght)];
        // console.log(randomSentance);
        Santance.innerText = randomSentance.text;

}
const modalOpen =()=>{
    newModal.click();
  }


// typing correction 
let userText = '';
let error = 0;
let startTime;
const typeController =(e)=>{
    const newLetter= e.key;
    if(newLetter === 'Backspace'){
       userText = userText.slice(0, userText.length-1);
       return inputFuild.removeChild(inputFuild.lastChild);
    }
    const availAbitilty = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890!@#$%^&*()_+-={}[]'\".,?`
    if(!availAbitilty.includes(newLetter)){
        return;
    }
    userText += newLetter;
    const newUserText = validation(newLetter);

    if(newUserText){
        inputFuild.innerHTML += `<span>${newLetter === " " ? "▪" : newLetter}</span>`
    }
    else{
        inputFuild.innerHTML += `<span class="text-red-600">${newLetter === " " ? "▪" : newLetter}</span>`
        error++;
    }
    // oparetion complete 
    if(userText === Santance.innerText){
        gameOver();
        
    }
}

// capital validation 
const validation =(key)=>{
    if(key === Santance.innerText[userText.length-1]){
        return true;
    }
    else{
        return false;
    }
}

// start button 
let timeCount = document.getElementById('time-count');
const start = ()=>{
   if(startTime) return;
   let count = 3;
   timeCount.classList.remove('hidden');
   const time = setInterval(()=>{
        timeCount.innerHTML=`<span>${count}</span>`;
        if(count ===0){
            inputFuild.classList.add('border-4');
            document.addEventListener("keydown", typeController);
            timeCount.classList.add('hidden');
            clearInterval(time);
            startTime = new Date().getTime();
            console.log(startTime);

        }
        count--;
   },1000)

};

const gameOver =()=>{
    // time count 
    const finishTime = new Date().getTime();
    const totalTime = Math.round((finishTime - startTime)/1000);
    ModalBody.innerHTML=`
     <div class="mt-2 px-7 py-3">
        <p class="text-sm text-gray-500">
           Your mistake : <span class="text-red-600">${error}</span>.
       </p>
       <p> Total time spend : <span class="text-semibold">${totalTime}</span> Seconds</p>
     </div>
    
    `

    modalOpen();
    
    addHistory(Santance.innerText ,error, totalTime)

    userText='';
    error = 0;
    startTime=null;

}
const modalClose = ()=>{
    // modal.style.display='none';
    window.location.reload();
}

// show typing time spent 
setInterval(()=>{
    const currentTime =new Date().getTime();
    const TimeSpend = Math.round((currentTime - startTime)/1000);
    timing.innerText=`${startTime ? TimeSpend : 0}`;
},1000)


