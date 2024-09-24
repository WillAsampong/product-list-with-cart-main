fetch('./data.json')
.then(res => res.json())
.then(data =>{
    console.log(data);
    const grid = document.querySelector('.grid');
    const template = document.querySelector('#dessert-template');

    data.forEach(card => {
        const dessertCard = template.content.cloneNode(true);

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


        AddtocartBtn.addEventListener('click', () => cardSelect(dessertThumbnail, AddtocartBtn));
    });

    //When card is selected, border of .dessert-display turns red.

    //background-color and textContent of Add-to-cart button changes.
    
    //A count variable is initialised and increased with a click on increment-btn and decreased with a click on decrement-btn.//
});

function cardSelect(dessertThumbnail, AddtocartBtn) {
    let quantity = 0;
    
    dessertThumbnail.style.border = '3px solid hsl(14, 86%, 42%)';
    AddtocartBtn.classList.toggle('selected');

    if(AddtocartBtn.classList.contains('selected')){
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
        
        quantityDisplay.textContent = `${quantity}`;
        quantityDisplay.classList.add('quantity');
    
        // Clear the existing button content (optional, based on the initial structure)
        AddtocartBtn.innerHTML = '';
        AddtocartBtn.appendChild(decrementBtn);
        AddtocartBtn.appendChild(quantityDisplay);
        AddtocartBtn.appendChild(incrementBtn);
        
        decrementBtn.addEventListener('click', () => {
            if(quantity > 0){
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        })
    
        incrementBtn.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
            console.log('hgjdl');
        });
    }
    
}