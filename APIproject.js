const BASE_URL  = "https://cdn.moneyconvert.net/api/latest.json";
const dropdowns = document.querySelectorAll(".dropdown select");
let btn  = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
document.addEventListener("DOMContentLoaded", () => {
  ExchangeRate();
});
for(let select of dropdowns) {
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.value = currcode;
        newoption.innerText = currcode;
        if(select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        }else if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
    }
    const updateFlag = (element) => {
        let currCode = element.value;
        let countrycode = countryList[currCode];
        let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newsrc;
    }
    btn.addEventListener("click", (evt) => {
        evt.preventDefault();
        ExchangeRate();
       
    });
const ExchangeRate = async () => {
  let amount = document.querySelector("input.amount");
  let amtval = amount.value;
  if (amtval === "" || amtval <= 0) {
    amtval = 1;
    amount.value = "1";
  }
  const response = await fetch(BASE_URL);
  const data = await response.json();
  const fromRate = data.rates[fromcurr.value];
  const toRate = data.rates[tocurr.value];
  const rate = toRate / fromRate;
  const final = (amtval * rate).toFixed(2);
  msg.innerText = `${amtval} ${fromcurr.value} = ${final} ${tocurr.value}`;
  amount.value = "";
};
