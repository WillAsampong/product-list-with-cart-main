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
        }
        const deleteBtn = listItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            delete dessertQuantity[dessertId];
            console.log(dessertQuantity);
            listItem.remove();
            dessertImage.style.border = 'none';
            AddtocartBtn.classList.remove('selected');
        });
        
    }

    const orderTotal = document.createElement('div');
    orderTotal.innerHTML = `
        <div class="order-total">
            <p>Order Total</p>
            <span>$${totalAmount.toFixed(2)}</span>
        </div>
    `;
    listOfItems.appendChild(orderTotal);



    numOfItems.textContent = `(${totalItems})`;
    console.log(dessertQuantity);
}

