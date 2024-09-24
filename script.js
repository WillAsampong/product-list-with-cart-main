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

        dessertThumbnail.src = card.image.thumbnail;
        dessertCategory.textContent = card.category;
        dessertName.textContent = card.name;
        dessertPrice.textContent = `$${card.price}`;

        grid.appendChild(dessertCard);

        cardSelect(dessertThumbnail, dessertCard);
    });

    //When card is selected, border of .dessert-display turns red.

    //background-color and textContent of Add-to-cart button changes.
    
    //A count variable is initialised and increased with a click on increment-btn and decreased with a click on decrement-btn.//
    
    function cardSelect(dessertThumbnail, dessertCard) {
        const AddtocartBtn = dessertCard.querySelector('.dessert-display button');
        let quantity = 0;
        AddtocartBtn.addEventListener('click', () => {
            dessertThumbnail.style.border = '1px solid hsl(14, 86%, 42%)';
            AddtocartBtn.classList.toggle('selected');
            AddtocartBtn.innerHTML = `
                <div class="">
                    <div class='decrement'>
                        <button><svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg></button>
                    </div>
                    <div class='quantity'>${quantity}</div>
                    <div class='increment'>
                        <button><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg></button>
                    </div>
                </div>
            `;

            const decrementBtn = AddtocartBtn.querySelector('.decrement button');
            const incrementBtn = AddtocartBtn.querySelector('.increment button');
            const quantityDisplay = AddtocartBtn.querySelector('.quantity');

            decrementBtn.addEventListener('click', () => {
                if(quantity > 0){
                    quantity--;
                    quantityDisplay.textContent = quantity;
                }
            })

            incrementBtn.addEventListener('click', () => {
                quantity++;
                quantityDisplay.textContent = quantity;
            });

            console.log('yah');
        });
    }
    
})