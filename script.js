let dataConfirmed = new Array(), dataDeaths= new Array(), dataRecovred= new Array(), dataActive= new Array(), dataDate= new Array();
const countries = document.querySelector("#countries");
const ctx = document.getElementById('myChart').getContext('2d');
let dataChar = {
    type: 'line',
    data: {
        labels: [],
        datasets: [ {label: '# of confirmed',data: [],borderColor: "red"},
                    {label: '# of deaths',data: [],borderColor: "black"},
                    {label: '# of recovred',data: [],borderColor: "green"},
                    {label: '# of active',data: [],borderColor: "blue"},
                ]
    },
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}
let httpReq = new XMLHttpRequest();
let resp;
httpReq.open("GET", "https://api.covid19api.com/countries");
httpReq.onreadystatechange = ()=>{
    if(httpReq.readyState ===4 && httpReq.status == 200){
         resp = JSON.parse(httpReq.response);
         
         for(var i=0; i<resp.length; i++){
            let option = document.createElement("option");
            option.value = resp[i]["Slug"];
            option.innerText = resp[i]["Country"];
            option.onclick = getData;
            countries.append(option);
        }
    }
}
httpReq.send();
function getData(e){
    dataChar.options.title.text = e.target.innerText;
    let httpReq = new XMLHttpRequest();
    let resp;
    httpReq.open("GET", "https://api.covid19api.com/dayone/country/"+this.value);
    httpReq.onreadystatechange = ()=>{
        if(httpReq.readyState ===4 && httpReq.status == 200){
            resp = JSON.parse(httpReq.response);
            dataConfirmed.length = 0;
            dataDeaths.length = 0;
            dataRecovred.length = 0;
            dataActive.length = 0;
            dataDate.length = 0;
            for(var i=0; i<resp.length; i++){
            
                dataConfirmed.push(resp[i]["Confirmed"]); 
                dataDeaths.push(resp[i]["Deaths"]);
                dataRecovred.push(resp[i]["Recovered"]);
                dataActive.push(resp[i]["Active"]);
                dataDate.push((resp[i]["Date"]).substr(0,10));
            }

            dataChar["data"]['labels'] = dataDate;
            dataChar["data"]['datasets'][0]["data"] = dataConfirmed;
            dataChar["data"]['datasets'][1]["data"] = dataDeaths;
            dataChar["data"]['datasets'][2]["data"] = dataRecovred;
            dataChar["data"]['datasets'][3]["data"] = dataActive;
            var myChart = new Chart(ctx, dataChar);
        }
    }
    httpReq.send();
}
//created by anass nassiri

