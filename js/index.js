var time = new Date();

let locationName = {
    '全部':["臺北市","新北市","基隆市","新竹市","桃園市","新竹縣","宜蘭縣","臺中市","苗栗縣","彰化縣","南投縣","雲林縣","高雄市","臺南市","嘉義市","嘉義縣","屏東縣","澎湖縣","花蓮縣","臺東縣","金門縣","連江縣"],
    '北部':["臺北市","新北市","基隆市","新竹市","桃園市","新竹縣","宜蘭縣"],
    '中部':["臺中市","苗栗縣","彰化縣","南投縣","雲林縣"],
    '南部':["高雄市","臺南市","嘉義市","嘉義縣","屏東縣","澎湖縣"],
    '東部':["花蓮縣","臺東縣"],
    '離島':["金門縣","連江縣"]
};
let weatherList = ["新北市","臺北市","基隆市","宜蘭縣","桃園市","新竹市","新竹縣",
           "苗栗縣","臺中市","彰化縣","南投縣","雲林縣",
           "嘉義縣","嘉義市","臺南市","高雄市","屏東縣",
           "花蓮縣","臺東縣",
           "澎湖縣","金門縣","連江縣"];


callfetch();
function callfetch(){
    fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-A69462BC-CE74-46CD-8C9B-04DDB7B97552")
    .then(function (response) {
        return response.json();
    })
    .then(function (item) {
        console.log('回傳的東西',item); // 確認回傳的資料結構
        let data = item.records.location;
        let datafilter = data.filter((data) => locationName["全部"].includes(data.locationName));
        console.log('過濾後的資料', datafilter); // 確認過濾後的資料
        btns(data);
        showwaether(datafilter);
    });
};


//綁定按鈕事件
//its=data，可以不用用同一個代號，在fetch內將資料傳回function內就可以
function btns(data) {
    document.querySelectorAll('.show_city').forEach((item) => {
        item.addEventListener(('click'),function(){
            let city_area = item.dataset.area;//按鈕上的data-area辨別
            let btnCityFilter = data.filter((data) => locationName[city_area].includes(data.locationName));
            //console.log('按鈕過濾後的資料', btnCityFilter); // 確認按鈕過濾後的資料
            showwaether(btnCityFilter);
        });
    });
};

// 專注產生資料呈現
function showwaether(datafilter) {
    let show_weather = document.querySelector('#show_weather');
    show_weather.innerHTML = '';
    let hours = time.getHours();
    let day_Night = (hours > 18 || hours < 6)?"night":"day";
    // 資料產生出來
    datafilter.forEach((data) => {
        let weatherIconNumber = data.weatherElement[0].time[0].parameter.parameterValue
        let iconNumber = ("0"+weatherIconNumber).slice(-2);
        show_weather.innerHTML += `
        <div class="g-col-auto">
            <div class="my-card" style="height: 24rem;" data-aos="zoom-in-up">
                <div class="my-card-body">
                    <h2 class="my-card-title">${data.locationName}</h2>
                    <div class="p-3 card-top">
                        <div class="card-text">${data.weatherElement[3].time[0].parameter.parameterName}</div>
                        <img src="https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${day_Night}/${iconNumber}.svg" alt="..">
                        <p class="my-card-subtitle mb-2 ">${data.weatherElement[0].time[0].parameter.parameterName}</p>
                    </div>             
                    <div class="card-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
                        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
                        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
                        </svg>
                        <span>${data.weatherElement[2].time[0].parameter.parameterName}°C</span> - <span>${data.weatherElement[4].time[0].parameter.parameterName}°C</span></div>
                    <div class="card-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-umbrella" viewBox="0 0 16 16">
                            <path d="M8 0a.5.5 0 0 1 .5.5v.514C12.625 1.238 16 4.22 16 8c0 0 0 .5-.5.5-.149 0-.352-.145-.352-.145l-.004-.004-.025-.023a3.5 3.5 0 0 0-.555-.394A3.17 3.17 0 0 0 13 7.5c-.638 0-1.178.213-1.564.434a3.5 3.5 0 0 0-.555.394l-.025.023-.003.003s-.204.146-.353.146-.352-.145-.352-.145l-.004-.004-.025-.023a3.5 3.5 0 0 0-.555-.394 3.3 3.3 0 0 0-1.064-.39V13.5H8h.5v.039l-.005.083a3 3 0 0 1-.298 1.102 2.26 2.26 0 0 1-.763.88C7.06 15.851 6.587 16 6 16s-1.061-.148-1.434-.396a2.26 2.26 0 0 1-.763-.88 3 3 0 0 1-.302-1.185v-.025l-.001-.009v-.003s0-.002.5-.002h-.5V13a.5.5 0 0 1 1 0v.506l.003.044a2 2 0 0 0 .195.726c.095.191.23.367.423.495.19.127.466.229.879.229s.689-.102.879-.229c.193-.128.328-.304.424-.495a2 2 0 0 0 .197-.77V7.544a3.3 3.3 0 0 0-1.064.39 3.5 3.5 0 0 0-.58.417l-.004.004S5.65 8.5 5.5 8.5s-.352-.145-.352-.145l-.004-.004a3.5 3.5 0 0 0-.58-.417A3.17 3.17 0 0 0 3 7.5c-.638 0-1.177.213-1.564.434a3.5 3.5 0 0 0-.58.417l-.004.004S.65 8.5.5 8.5C0 8.5 0 8 0 8c0-3.78 3.375-6.762 7.5-6.986V.5A.5.5 0 0 1 8 0M6.577 2.123c-2.833.5-4.99 2.458-5.474 4.854A4.1 4.1 0 0 1 3 6.5c.806 0 1.48.25 1.962.511a9.7 9.7 0 0 1 .344-2.358c.242-.868.64-1.765 1.271-2.53m-.615 4.93A4.16 4.16 0 0 1 8 6.5a4.16 4.16 0 0 1 2.038.553 8.7 8.7 0 0 0-.307-2.13C9.434 3.858 8.898 2.83 8 2.117c-.898.712-1.434 1.74-1.731 2.804a8.7 8.7 0 0 0-.307 2.131zm3.46-4.93c.631.765 1.03 1.662 1.272 2.53.233.833.328 1.66.344 2.358A4.14 4.14 0 0 1 13 6.5c.77 0 1.42.23 1.897.477-.484-2.396-2.641-4.355-5.474-4.854z"/>
                        </svg>
                        ${data.weatherElement[1].time[0].parameter.parameterName}%
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    AOS.init();//重置AOS
}

//時間呈現
function showtime(){
    const time = new Date();
    let timeDetails = {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        date: time.getDate(),
        hour: time.getHours(),
        minute: ("0"+time.getMinutes()).slice(-2),
        second: ("0"+time.getSeconds()).slice(-2),
    };
    document.querySelector('.show-time').innerHTML = `
    <span>${timeDetails.year}.${timeDetails.month}.${timeDetails.date}</span>&nbsp;&nbsp;&nbsp;<span>${timeDetails.hour}:${timeDetails.minute}:${timeDetails.second}</span>
    `
};

showtime();
setInterval(showtime,1000);