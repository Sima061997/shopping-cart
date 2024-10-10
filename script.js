var itemsInShop  = document.getElementsByClassName('shop-item');
var addToCartButtons = document.getElementsByClassName('shop-item-button');

//Array to add items in the cart
var cartItems = [];
var cartList = document.querySelector('.cart-list'); // Select the first element with class 'cart-row'

function ready() {
    console.log(`Items length: ${itemsInShop.length}`);
    var countClick = 1;
    //for loop to add-to-cart botton according to no of items
    for (var i = 0; i < addToCartButtons.length; i++) {
        console.log(addToCartButtons.length);
        (function(button) { // Create a closure to capture the current button
            button.addEventListener('click', function() {

                //Get the parent shop item element
                var shopItem = button.closest('.shop-item');
                //Item details 
                var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
                var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
                var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
                

                //Create a cart item object
                var cartItem = {
                    image: imageSrc,
                    title: title,
                    price: price,
                    count : countClick
                };
                if(cartItems.cartItem !== cartItem) {
                       //Add item to cart items array
                cartItems.push(cartItem);
                updateList(cartItems, cartList);
                alert(title + ' added to the cart');
                }
                else {
                countClick += 1;
                alert(title + ' added to the cart');
                }
                
               
            }); 
        })(addToCartButtons[i]);
    }
    //Function to update list everytime item is added in the cart
    function updateList(cartItems, cartList) {
    cartList.innerHTML = ''; // Clear the current list

    // Loop through cart items and create <li> elements
    cartItems.forEach(function(item) {
        if(cartItems.item !== item) {
            var li = document.createElement('li'); // Create <li> for each cart item
        document.querySelector('.cart-list').appendChild(li); // <li> added to the <ol>

         //create cart-row div
         var cartRow = document.createElement('div');
         cartRow.className = 'cart-row';
         //append li cols to cart-rows
         li.appendChild(cartRow);
        //div for cart-item created
        var itemDiv = document.createElement('div');         
        itemDiv.className = 'cart-item cart-column';
        //image div within cart-item created
        var imageElement = document.createElement('img');
        imageElement.className = 'cart-item-image';
        imageElement.src = item.image;
        imageElement.height = '100';
        imageElement.width = '100';
        
        //itemtitle span within cart-item created
        var itemTitle = document.createElement('span');
        itemTitle.className = 'cart-item-title';
        itemTitle.innerText = item.title; //it represents the title of the item

        //image and title elements addeded to item <div>
        itemDiv.appendChild(imageElement);
        itemDiv.appendChild(itemTitle);
        //div for item-price created
        var priceDiv = document.createElement('span');      
        priceDiv.className = 'cart-price cart-column';
        priceDiv.innerText = item.price;                    //gives the price of item
        //div for quantity created
        var quantityDiv = document.createElement('div');  
        quantityDiv.className = 'cart-quantity cart-column';
        //Create the input element
        var inputElement = document.createElement('input');
        inputElement.className = 'cart-quantity-input';
        inputElement.type = 'number';
        inputElement.value = item.count;
        //create the remove-button element
        var buttonElement = document.createElement('button');
        buttonElement.className = 'btn btn-danger';
        buttonElement.type = 'button';
        buttonElement.innerText = 'DELETE';
        //append input and button element to quantityDiv
        quantityDiv.appendChild(inputElement);
        quantityDiv.appendChild(buttonElement);
        //append item, price and quantity <div> to the list
        cartRow.appendChild(itemDiv);
        cartRow.appendChild(priceDiv);
        cartRow.appendChild(quantityDiv);
        li.appendChild(cartRow);
        cartList.appendChild(li); // Append li to the <ol class="cart-list">
        }
        else {
            console.log(`${countClick}`);
        }
    });
      
    }
}



if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
    } else {
       ready();
    }
    