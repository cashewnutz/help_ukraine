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

let buyMap = {total:4};
async function fetchTokensInvested() {
    const options = {
        method: "GET"
    }
    const responseForOldWallet = await fetch(`https://api.ethplorer.io/getAddressTransactions/0x34B365C3a98D0ec12A680047FE299aff2a032554?apiKey=EK-htz4u-dfTvjqu-7YmJq&limit=1000`, options);
    const responseForNewWallet = await fetch(`https://api.ethplorer.io/getAddressTransactions/0x1E4B338b80e5d483fAdAb1Be2f7e524749F96398?apiKey=EK-htz4u-dfTvjqu-7YmJq&limit=1000`, options);
    const oldDonations = await responseForOldWallet.json();
    const newDonations = await responseForNewWallet.json();
    const allDonations = [
        ...newDonations.filter((item) => item.to == "0x9d5025b327e6b863e5050141c987d988c07fd8b2"),
        ...oldDonations.filter((item) => item.to == "0x9d5025b327e6b863e5050141c987d988c07fd8b2")
    ];
    renderTransactions(allDonations);
}

function renderTransactions(data) {
    var investments = document.getElementById('investments');
    if (data && data.length) {
        data.forEach((swap) => {
            var listItem = document.createElement("li");
            var listItemText = document.createElement("p");
            var badge = document.createElement("span");
            badge.classList.add("badge");
            badge.classList.add("bg-dark");
            badge.classList.add("badge-pill");

            listItemText.classList.add("list-group-item-text");
            listItem.classList.add("list-group-item");
            listItem.classList.add("bg-transparent-dark");
            buyMap.total += parseFloat(swap.value);
            listItemText.innerHTML = `<div style='display:flex;justify-content:space-between;align-items:center;'><span>Donated ${swap.value} ETH at ${new Date(swap.timestamp * 1000).toLocaleString()}</span><a href="https://etherscan.io/tx/${swap.hash}"><i class='fa fa-external-link'></i></a> </div> `;
            badge.innerHTML = `Donation`;
            listItem.append(listItemText);
            listItem.append(badge);

            investments.append(listItem);
        });

        document.getElementById('totalInvested').innerHTML = `${parseFloat(buyMap.total).toFixed(2)} ETH`
    }
}