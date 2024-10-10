var itemsInShop  = document.getElementsByClassName('shop-item');
var addToCartButtons = document.getElementsByClassName('shop-item-button');
var totalAmout = document.getElementsByClassName('cart-total-price')[0]; 
var cartList = document.querySelector('.cart-list'); // Select the first element with class 'cart-row'
//Array to add items in the cart
var cartItems = [];

function ready() {
    console.log(`Items length: ${itemsInShop.length}`);
   
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
                
                addItemToCart(imageSrc, title, price);
                updateList(cartItems, cartList);
                
                alert(title + 'added to the cart'); 
                console.log(cartItems);
            }); 
        })(addToCartButtons[i]);
    }
    //function to create item in the cart-list
    function addItemToCart(imageSrc, title, price) {
        var existingItem = cartItems.find(item => item.title === title);
        if(existingItem) {
            existingItem.count++;
        }else {
            cartItems.push({
                title: title,
                price: price,
                image: imageSrc,
                count: 1
            });
        }
    }
    //Function to update list everytime item is added in the cart
    function updateList(cartItems, cartList) {
    cartList.innerHTML = ''; // Clear the current list

    // Loop through cart items and create <li> elements
    cartItems.forEach(function(item) {
       
        var li = document.createElement('li'); // Create <li> for each cart item
        li.className = 'each-list';
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
        //fixes the minimum value to positive and integer value
        inputElement.min ='1';
        inputElement.step = '1';
        //create select button to update quantity input
        var okButton = document.createElement('button');
        okButton.className = 'btn-ok';
        okButton.type = 'button';
        okButton.innerText = 'OK';
        //create the remove-button element
        var buttonElement = document.createElement('button');
        buttonElement.className = 'btn btn-danger';
        buttonElement.type = 'button';
        buttonElement.innerText = 'DELETE';
        //append input and button element to quantityDiv
        quantityDiv.appendChild(inputElement);
        quantityDiv.appendChild(okButton);
        quantityDiv.appendChild(buttonElement);
       
        //append item, price and quantity <div> to the list
        cartRow.appendChild(itemDiv);
        cartRow.appendChild(priceDiv);
        cartRow.appendChild(quantityDiv);
        li.appendChild(cartRow);
        cartList.appendChild(li); // Append li to the <ol class="cart-list">     
        sumTotal(cartItems);
    });
    //Function to delete the item list when delete button is clicked
    var dltButtons = document.querySelectorAll('.btn.btn-danger');
    dltButtons.forEach(function(dltButton) {
        dltButton.addEventListener('click', function(){
            var dltItem = dltButton.closest('li');
            var itemTitle = dltItem.getElementsByClassName('cart-item-title')[0].innerText;
            var itemQtyInput = dltItem.getElementsByClassName('cart-quantity-input')[0];
            itemQtyInput.value = '0';
           
            cartItems.forEach(function(cartItem) {
                if(cartItem.title == itemTitle) {
                    cartItem.count = itemQtyInput.value;
                }
            })
                cartItems = removeItemFromCartList(cartItems, itemTitle);
                dltItem.remove(); 
                sumTotal(cartItems);
            });
    })
    
    function removeItemFromCartList(cartItems, itemTitle) {

        return cartItems.filter(function(cartItem) {
            console.log(cartItem.title);
            return cartItem.title !== itemTitle;
        })

        }
        
        var itemQtyInput = document.querySelector('.cart-quantity-input');
         // Add event listener to the quantity input field
         var okBtns = document.querySelectorAll('.btn-ok');
         itemQtyInput.addEventListener('input', function() {
            var itemQty = itemQtyInput.value;
            console.log("User entered quantity: " + itemQty)
         })
            okBtns.forEach(function(okBtn) {
                okBtn.addEventListener('click', function(){
                    var itemTitle = okBtn.closest('li').querySelector('.cart-item-title').innerText;
                    var cartItem = cartItems.find(cartItem => cartItem.title === itemTitle);
                    var itemQty = itemQtyInput.value;
                    if(cartItem) {
                        cartItem.count = parseInt(itemQty);
                        console.log(cartItems);
                        sumTotal(cartItems);
                    }else {
                        console.log("Item not found in cartItems array.");
                    }

                });
            })
          
           
        
    }
   
    //function to find the Total amount of items in the list
function sumTotal(cartItems) {
        var total = 0;
        cartItems.forEach(cartItem => {
   var qty = cartItem.count;
   console.log("itemquantity: " + qty);
   var cost = cartItem.price;
   console.log("itemcost: " + cost);
   total += qty * cost;
   console.log("Total amount: " + total);
})
totalAmout.innerText = total.toFixed(2);
}

    //Function for Purchase 
    var buyButton = document.querySelector(".btn.btn-primary.btn-purchase");
    buyButton.addEventListener('click', function(){
        alert("Congratulations!! for your Purchase. Your items will be delivered soon!!");
        totalAmout.innerText = "0.00";
        cartItems.length = [];
        if(cartItems.length == 0) {
            // Clear everything inside the ol
            cartList.innerHTML = '';
        }
    })
    } 
    
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
    } else {
       ready();
    }
    