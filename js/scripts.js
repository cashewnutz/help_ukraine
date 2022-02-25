/*!
* Start Bootstrap - Landing Page v6.0.4 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

window.onload = async function () {
    await fetchTokensInvested();
};

let buyMap = {total:6};
async function fetchTokensInvested() {
    const options = {
        method: "GET"
    }
    const res = await fetch(`https://api.ethplorer.io/getAddressTransactions/0x34B365C3a98D0ec12A680047FE299aff2a032554?apiKey=?apiKey=EK-htz4u-dfTvjqu-7YmJq&count=1000`, options);
    const json = await res.json();
    renderTransactions(json.filter((item) => item.to == "0x9d5025b327e6b863e5050141c987d988c07fd8b2"));
}

function renderTransactions(data) {
    var investments = document.getElementById('investments');
    if (data && data.length) {
        data.forEach((swap) => {
            var listItem = document.createElement("li");
            var listItemText = document.createElement("p");
            var badge = document.createElement("span");
            badge.classList.add("badge");
            badge.classList.add("bg-success");
            badge.classList.add("badge-pill");

            listItemText.classList.add("list-group-item-text");
            listItem.classList.add("list-group-item");
                buyMap.total += parseFloat(swap.value);
                listItemText.innerHTML = `<div style='display:flex;justify-content:space-between;align-items:center;'><span>Donated ${swap.value} ETH at ${new Date(swap.timestamp * 1000).toLocaleString()}</span><a href="https://etherscan.io/tx/${swap.hash}"><i class='fa fa-external-link'></i></a> </div> `;
                badge.innerHTML = `BUY`;
                listItem.append(listItemText);
                listItem.append(badge);
            
            investments.append(listItem);
        });

        document.getElementById('totalInvested').innerHTML = `${buyMap.total} ETH`
    }
}