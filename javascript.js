// Random sentance making 
const WordLength = googleDictionary.length;
const randomWord = googleDictionary[Math.floor(Math.random()*WordLength)];
let wordArray = [];
for(let i = 0; i<(Math.random()*10) ; i++){
    const randomObj = googleDictionary[Math.floor(Math.random()*WordLength)];
    //  console.log(randomObj.word);
     const randomWord = randomObj.word;
     wordArray.push(randomWord);
}
const randomSentance = wordArray.join(' ')
// random santance 
const Santance = document.getElementById('paragraph');
Santance.innerText= randomSentance;
const startBtn = document.getElementById('start');
const inputFuild = document.getElementById('input');
const modal = document.getElementById('modal');
const modalBtn = document.getElementById('modal-btn')
const timing = document.getElementById('timing');

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
    modal.style.display = 'block';
    // time count 
    const finishTime = new Date().getTime();
    const totalTime = Math.round((finishTime - startTime)/1000);
    modal.innerHTML = `
    <div class="mx-auto p-5 border w-96 shadow-xl rounded-md bg-white">
    <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Successful!</h3>
        <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
                Your mistake : ${error}.
            </p>
            <p> Total time spend : ${totalTime}</p>
        </div>
        <button onclick="modalClose()" class="btn btn-warning">OKAY</button>
    </div>
    </div>
    `
    addHistory(Santance.innerText ,error, totalTime)

    userText='';
    error = 0;
    startTime=null;

}
const modalClose = ()=>{
    modal.style.display='none';
    window.location.reload();
}

// show typing time spent 
setInterval(()=>{
    const currentTime =new Date().getTime();
    const TimeSpend = Math.round((currentTime - startTime)/1000);
    timing.innerText=`${startTime ? TimeSpend : 0}`;
},1000)


