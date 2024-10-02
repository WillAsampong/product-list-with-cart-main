console.log(screen.width);
fetch('./data.json')
.then(res => res.json())
.then(data =>{
    // console.log(data);
    const grid = document.querySelector('.grid');
    const template = document.querySelector('#dessert-template');

    data.forEach(card => {
        const dessertCard = template.content.cloneNode(true);

        const dessertId = card.name;
        
        
        const dessertImage = dessertCard.querySelector('.dessert-display img');
        const dessertCategory = dessertCard.querySelector('.dessert-details .category p');
        const dessertName = dessertCard.querySelector('.dessert-details .name p');
        const dessertPrice = dessertCard.querySelector('.dessert-details .price p');
        const AddtocartBtn = dessertCard.querySelector('.dessert-display .add-to-cart');

        if(screen.width < 376 ) {
            dessertImage.src = card.image.mobile;
        } else if(screen.width < 769) {
            dessertImage.src = card.image.tablet;
        } else if(screen.width < 1025) {
            dessertImage.src = card.image.desktop;
        } else{
            dessertImage.src = card.image.thumbnail;
        }
        dessertCategory.textContent = card.category;
        dessertName.textContent = card.name;
        dessertPrice.textContent = `$${card.price.toFixed(2)}`;

        grid.appendChild(dessertCard);


        AddtocartBtn.addEventListener('click',
            () => {
            cardSelect(dessertImage, AddtocartBtn, dessertId, data);
            displayCartItems(dessertId, data, dessertImage, AddtocartBtn);
        });
        // displayCartItems(dessertId, data, dessertImage, AddtocartBtn);
    });

});

//When card is selected, border of .dessert-display turns red.

//background-color and textContent of Add-to-cart button changes.

//A count variable is initialised and increased with a click on increment-btn and decreased with a click on decrement-btn.//

let dessertQuantity = {};
function cardSelect(dessertImage, AddtocartBtn, dessertId) {

    if(!dessertQuantity[dessertId]) {
        dessertQuantity[dessertId] = 1;
    }
    
    dessertImage.style.border = '3px solid hsl(14, 86%, 42%)';
    AddtocartBtn.classList.add('selected');

    if(AddtocartBtn.classList.contains('selected')){
        AddtocartBtn.innerHTML = '';

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
        });
    
        incrementBtn.addEventListener('click', () => {
            dessertQuantity[dessertId]++;
            quantityDisplay.textContent = dessertQuantity[dessertId];
        });
    }
}



function displayCartItems (dessertId, data, dessertImage, AddtocartBtn) {
    const cart = document.querySelector('.cart');
    const listOfItems = cart.querySelector('.cart-items');
    const numOfItems = cart.querySelector('.cart h2 span');

    let totalItems = 0;

    let totalAmount = 0;
    
    listOfItems.innerHTML = '';
    
    // for(const dessertId in dessertQuantity) {
    //     if(dessertQuantity[dessertId] > 0) {
    //         totalItems += dessertQuantity[dessertId];
    //         const listItem = listTemplate.content.cloneNode(true);
    //         console.log(listItem);
            
    //         const dessertListName = listItem.querySelector('li .desc .dessert-name');
    //         const desserListQuantity = listItem.querySelector('li .desc .amount-details .quantity');
    //         const dessertListPrice = listItem.querySelector('li .desc .amount-details .dessert-price');
    //         const totalAmountOfDessert = listItem.querySelector('li .desc .amount-details .total-amount');

    //         const dessertPrice = data.find(item => item.name === dessertId).price;
    //         totalAmountOfDessert.textContent = dessertListPrice * desserListQuantity[dessertId];

    //         dessertListName.textContent = dessertId;
    //         desserListQuantity.textContent = dessertQuantity[dessertId];
    //         dessertListPrice.textContent = `$${dessertPrice.toFixed(2)}`;
    //         totalAmountOfDessert.textContent = `$${totalAmount.toFixed(2)}`;

    //         listOfItems.appendChild(listItem);
    //     }
    // }

    for(dessertId in dessertQuantity) {
        const listItem = document.createElement('li');
        if(dessertQuantity[dessertId] > 0) {
            totalItems += dessertQuantity[dessertId];
            
            let dessertListName = dessertId;
            let desserListQuantity = dessertQuantity[dessertId];
            let dessertListPrice = data.find(item => item.name === dessertId).price;
            let totalAmountOfDessert = dessertListPrice * desserListQuantity;

            totalAmount += totalAmountOfDessert;

            listItem.classList.add('list-item');
            listItem.innerHTML = `
                <div class="desc">
                    <p class="dessert-name">${dessertListName}</p>
                    <div class="amount-details">
                        <p class="quantity">${desserListQuantity}x</p>
                        <p class="dessert-price">@${dessertListPrice}</p>
                        <p class="total-amount">$${totalAmountOfDessert}</p>
                    </div>
                </div>
                <svg class="delete-btn" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
            `; 
            listOfItems.appendChild(listItem);
            const deleteBtn = listItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                delete dessertQuantity[dessertId];
                console.log(dessertQuantity);
                listItem.remove();
                dessertImage.style.border = 'none';
                AddtocartBtn.classList.remove('selected');
                displayCartItems(dessertId, data, dessertImage, AddtocartBtn);
            });   
        }
    }

    const orderTotal = document.createElement('div');
    orderTotal.innerHTML = `
        <div class="order-total">
            <p>Order Total</p>
            <span>$${totalAmount.toFixed(2)}</span>
        </div>
        <div class="delivery">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
            </span>
            <p>This is a <b>carbon-neutral</b> delivery</p>
        </div>
    `;
    listOfItems.appendChild(orderTotal);

    numOfItems.textContent = `(${totalItems})`;
    console.log(dessertQuantity);

    const confirmOrderBtn = document.createElement('button');
    confirmOrderBtn.classList.add('confirm-order-btn');
    confirmOrderBtn.textContent = "Confirm Order";
    listOfItems.appendChild(confirmOrderBtn);

    confirmOrderBtn.addEventListener('click', () => displayOrderSummary(dessertId, totalAmount));
}

function displayOrderSummary(dessertId, totalAmount) {
    const OrderSummaryModal = document.createElement('div');
    OrderSummaryModal.classList.add('order-summary-modal');
    OrderSummaryModal.innerHTML = `
        <div class="confirm-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
            <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
            </svg>
        </div>
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy jour food!</p>
        <div class="order-summary">
            ${dessertId}
            <div class="order-total">
                <p>Order Total</p>
                <span>$${totalAmount.toFixed(2)}</span>
            </div>
        </div>
        <button class="start-new-order">Start New Order</button>
    `;
    document.querySelector('body').appendChild(OrderSummaryModal);
}

