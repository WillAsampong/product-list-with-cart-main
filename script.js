fetch('./data.json')
.then(res => res.json())
.then(data =>{
    console.log(data);
    const grid = document.querySelector('.grid');
    const template = document.querySelector('#dessert-template');

    data.forEach(card => {
        const dessertCard = template.content.cloneNode(true);

        const dessertId = card.name;
        

        const dessertThumbnail = dessertCard.querySelector('.dessert-display img');
        const dessertCategory = dessertCard.querySelector('.dessert-details .category p');
        const dessertName = dessertCard.querySelector('.dessert-details .name p');
        const dessertPrice = dessertCard.querySelector('.dessert-details .price p');
        const AddtocartBtn = dessertCard.querySelector('.dessert-display .add-to-cart');

        
        dessertThumbnail.src = card.image.thumbnail;
        dessertCategory.textContent = card.category;
        dessertName.textContent = card.name;
        dessertPrice.textContent = `$${card.price.toFixed(2)}`;

        grid.appendChild(dessertCard);


        AddtocartBtn.addEventListener('click',
            () => {
            cardSelect(dessertThumbnail, AddtocartBtn, dessertId, data);
            displayCartItems(dessertId, data);
        });
    });

});

//When card is selected, border of .dessert-display turns red.

//background-color and textContent of Add-to-cart button changes.

//A count variable is initialised and increased with a click on increment-btn and decreased with a click on decrement-btn.//

let dessertQuantity = {};
function cardSelect(dessertThumbnail, AddtocartBtn, dessertId, data) {

    if(!dessertQuantity[dessertId]) {
        dessertQuantity[dessertId] = 1;
    }
    
    dessertThumbnail.style.border = '3px solid hsl(14, 86%, 42%)';
    AddtocartBtn.classList.add('selected');

    const decrementBtn = document.createElement('button');
    const incrementBtn = document.createElement('button');
    const quantityDisplay = document.createElement('div');

    decrementBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
        </svg>`;
    
    incrementBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
            <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
        </svg>`;
    
    quantityDisplay.textContent = `${dessertQuantity[dessertId]}`;
    quantityDisplay.style.color = 'white';
    quantityDisplay.style.fontSize = '18px';
    quantityDisplay.classList.add('quantity');

    // Clear the existing button content (optional, based on the initial structure)
    AddtocartBtn.innerHTML = '';
    AddtocartBtn.appendChild(decrementBtn);
    AddtocartBtn.appendChild(quantityDisplay);
    AddtocartBtn.appendChild(incrementBtn);

    const buttonStyles = {
        backgroundColor: 'hsl(14, 86%, 42%)',
        color: 'white',
        padding: '2px',
        border: '2px solid hsl(20, 50%, 98%)',
        borderRadius: '50%',
    };

    Object.assign(incrementBtn.style, buttonStyles);
    Object.assign(decrementBtn.style, buttonStyles);
    
    
    decrementBtn.addEventListener('click', () => {
        if(dessertQuantity[dessertId] > 0){
            dessertQuantity[dessertId]--;
            quantityDisplay.textContent = dessertQuantity[dessertId];
        }
        // displayCartItems(data);
    });

    incrementBtn.addEventListener('click', () => {
        dessertQuantity[dessertId]++;
        quantityDisplay.textContent = dessertQuantity[dessertId];
        // displayCartItems(data);
    })
    
}



function displayCartItems (data) {
    const cart = document.querySelector('.cart');
    const listOfItems = cart.querySelector('.cart-items');
    const numOfItems = cart.querySelector('.cart h2 span');
    const listTemplate = document.querySelector('#list-template');
    // console.log(listTemplate);

    
    // console.log(data);
    let totalItems = 0;
    
    listOfItems.innerHTML = '';
    
    for(const dessertId in dessertQuantity) {
        if(dessertQuantity[dessertId] > 0) {
            totalItems += dessertQuantity[dessertId];
            const listItem = listTemplate.content.cloneNode(true);
            // console.log(listItem);
            
            const dessertListName = listItem.querySelector('li .desc .dessert-name');
            const desserListQuantity = listItem.querySelector('li .desc .amount-details .quantity');
            const dessertListPrice = listItem.querySelector('li .desc .amount-details .dessert-price');
            const totalAmountOfDessert = listItem.querySelector('li .desc .amount-details .total-amount');

            // const dessertPrice = data.find(item => item.name === dessertId).price;
            // totalAmountOfDessert.textContent = dessertListPrice * desserListQuantity[dessertId];

            dessertListName.textContent = dessertId;
            desserListQuantity.textContent = dessertQuantity[dessertId];
            // dessertListPrice.textContent = `$${dessertPrice.toFixed(2)}`;
            // totalAmountOfDessert.textContent = `$${totalAmount.toFixed(2)}`;

            listOfItems.appendChild(listItem);
        }
    }

    numOfItems.textContent = `(${totalItems})`;

}

// displayCartItems()