const history = document.getElementById('history');

const addHistory= (title,error, totalTime)=>{
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="card w-96 bg-primary text-primary-content">
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          <p>Your error : ${error}</p>
          <p>Time spend: ${totalTime}</p>
        </div>
      </div>
        `
        history.appendChild(div);

        let previousTests = JSON.parse(localStorage.getItem('historyList')) || [];
        previousTests.push({title, error, totalTime});
        localStorage.setItem('historyList', JSON.stringify(previousTests));
        locatToFile();

}
const locatToFile =()=>{
    history.innerHTML='';
    let previousTests = JSON.parse(localStorage.getItem('historyList')) || [];
    previousTests.forEach(test => {
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="card w-96 bg-primary text-primary-content">
        <div class="card-body">
          <h2 class="card-title">${test.title}</h2>
          <p>Your error : ${test.error}</p>
          <p>Time spend: ${test.totalTime}</p>
        </div>
      </div>
        `
        history.appendChild(div);
    });
}
locatToFile();