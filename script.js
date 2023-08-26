
const MENU_ITEMS = []

document.querySelector(".profile-btn").addEventListener('click', () => {
    let elem = document.querySelector(".sidebar");
    let mode = elem.getAttribute("data-mode");

    if (mode == 'open') {
        elem.setAttribute("data-mode", 'close');
    } else {
        elem.setAttribute("data-mode", 'open');
    }
});

// Main container
const CONTAINER_ELEMENT = document.getElementById("menu-container");

/**
 * Fetch Menu data from the API
 */
const getMenu = () => {
    return fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
        .then(data => data.json())
        .then(async (data) => {
            MENU_ITEMS.push(...data);
            MENU_ITEMS.forEach(insertData);
        })
        .catch((error) => console.error(error))
}

/**
 * Take order from user
 * @returns a promise which will be resolve after 2500ms
 */
const takeOrder = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const ORDER_ITEMS = [];
            for(let i = 0; i < 3; i++) {
                const RANDOM_INDEX = Math.floor(Math.random() * MENU_ITEMS.length)
                ORDER_ITEMS.push(MENU_ITEMS[RANDOM_INDEX]);
            }

            resolve(ORDER_ITEMS);
        }, 2500)
    })
}

/**
 * Prepare ordered food
 * @returns a promise which will be resolve after 1500ms
 */
const orderPrep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1500, { status: true, paid: false })
    })
}

/**
 * Pay money for food
 * @returns a promise which will be resolve after 1000ms
 */
const payOrder = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000, { status: true, paid: true })
    })
}

/**
 * Lastly a thank you alert
 */
const thankyou = () => {
    alert("Thank you for visit here & Trying our Food.")
}

/**
 * INsert data into the menu container element.
 * @param {object} data 
 */
const insertData = (data) => {
    const temp = document.createElement("template");

    temp.innerHTML = `<div class="card menu-item" data-id="${data.id}">
        <img src="${data.imgSrc}" alt="${data.name}">
        <div class="card-footer">
            <div class="info">
                <h3>${data.name}</h3>
                <span>${data.price}</span>
            </div>

            <button type="button" class="order">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6.66663V25.3333" stroke="#878787" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.66663 16H25.3333" stroke="#878787" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>`;

    CONTAINER_ELEMENT.appendChild(temp.content.childNodes[0]);
}

window.addEventListener('DOMContentLoaded', async () => {
    await getMenu();
    console.log("Order Placed:", await takeOrder());
    console.log("Order preparetion status:", await orderPrep());
    console.log("Payment status:", await payOrder());
    thankyou();
});