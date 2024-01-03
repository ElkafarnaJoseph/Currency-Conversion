const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_code){
    // creating option tag with passing currency code as a text and value 
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "NPR" ? "selected" : "";
    // creating option tag with passing currency code as a text and value     
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    // insert all option tag which is the currency code inside the select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target); // calling loadflag with passing target element as arugment
    });
}

function loadFlag(element){
    for(let code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault(); // preventing form button from submitting 
    getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
// if the user doesn't enter anything or 0 the input amount will be set to 1 as default in the input field
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/654ab3acd4760d31e900ebcf/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong";
    });
}