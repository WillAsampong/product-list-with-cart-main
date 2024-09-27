fetch('./data.json')
.then(res => res.json())
.then(data =>{
    console.log(data);
    const grid = document.querySelector('.grid');
    const template = document.querySelector('#dessert-template');

    data.forEach(card => {
        const dessertCard = template.content.cloneNode(true);

        const dessertId = card.name;
        

        let dessertThumbnail = dessertCard.querySelector('.dessert-display img');
        let dessertCategory = dessertCard.querySelector('.dessert-details .category p');
        let dessertName = dessertCard.querySelector('.dessert-details .name p');
        let dessertPrice = dessertCard.querySelector('.dessert-details .price p');
        const AddtocartBtn = dessertCard.querySelector('.dessert-display .add-to-cart');

        
        dessertThumbnail.src = card.image.thumbnail;
        dessertCategory.textContent = card.category;
        dessertName.textContent = card.name;
        dessertPrice.textContent = `$${card.price}`;

        grid.appendChild(dessertCard);


        AddtocartBtn.addEventListener('click', () => cardSelect(dessertThumbnail, AddtocartBtn, dessertId));
    });

});

//When card is selected, border of .dessert-display turns red.

//background-color and textContent of Add-to-cart button changes.

//A count variable is initialised and increased with a click on increment-btn and decreased with a click on decrement-btn.//

let dessertQuantity = {};
function cardSelect(dessertThumbnail, AddtocartBtn, dessertId) {

    if(!dessertQuantity[dessertId]) {
        dessertQuantity[dessertId] = 0;
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
    });

    incrementBtn.addEventListener('click', () => {
        dessertQuantity[dessertId]++;
        quantityDisplay.textContent = dessertQuantity[dessertId];
    })
    
}



function displayCartItems (dessertId) {
    const cart = document.querySelector('.cart');
    // console.log(cart);
    const listOfItems = cart.querySelector('.cart-items');
    const numOfItems = cart.querySelector('.heading span');

    const ul = document.createElement('ul');
    const listItem = document.createElement('li');
    
    listOfItems.appendChild(ul);

}

displayCartItems()