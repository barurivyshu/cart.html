let carts = document.querySelectorAll('.add-cart'); // this was using <a in cart.html we get them all


let products =[
    {
        name: 'Black T-shirt',
        tag: 'blacktshirt',
        price:15,
        inCart: 0
        },
    {
            name:'Red T-shirt',
            tag:'redtshirt',
            price:14,
            inCart:0
        },
        {
            name:'Brown T-shirt',
            tag:'browntshirt',
            price:16,
            inCart:0
        },

        {
            name:'Green T-shirt',
            tag:'greentshirt',
            price:17,
            inCart:0
        }
    ];
    
for (let i=0; i < carts.length; i++) { //this is a loop it is run from 0 ; 0 < 4 ; 0++ , 1 , 1 < 4; 1++;
    carts[i].addEventListener('click' ,()=> {   // when we click on the add to cart in image add the cart
    //console.log("added to cart"); 
    cartNumbers(products[i]); // each product has an separate index  or // we are sending index of the product to cartNumbers function
    totalCost(products[i])                // in this we have to pass inside the values
})

}

function onLoadCartNumbers(){ // this function was using cart 
    let productNumbers = localStorage.getItem
    ('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart span') .textContent = productNumbers;  
    }
}

function cartNumbers(product) { // cart numbers how many items we add to the cart
    //console.log("The productclicked is",product); // what type item we have store the cart
    let productNumbers= localStorage.getItem('cartNumbers'); // in this we have give many items stored in cart
    //console.log(productNumbers) // in this we see numbers
    //console.log(typeof productNumbers); // it gives string

    productNumbers = parseInt(productNumbers); // its converts string type to integer type
    //console.log(typeof productNumbers); // it gives string
    if(productNumbers) {
        localStorage.setItem('cartNumbers' , productNumbers + 1); // if product is already existed it adds the product  
        document.querySelector('.cart span') .textContent = productNumbers + 1;
    //localStorage.setItem('cartNumbers', 1);  // but in this only one element is stored
   } else {
       localStorage.setItem('cartNumbers' , 1); // if  product is not existed and give a first product
       document.querySelector('.cart span').textContent = 1; // if the we first time we do that use these
    }

    setItems(product);
}

function setItems(product) {      //this is setitem function() we are setting product information by using set items function()
    //console.log("Inside of setItems function");
   // console.log("My product is", product);
   let cartItems = localStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems);  //json.parse will convert string to json objects  
   //console.log("My cartItems are" , cartItems);
   if(cartItems != null){ //cartitems is not equal to null
   if(cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,     // spread syntax
        [product.tag]:product      //you are adding a new product in cart items object if that item is not existed
      }
   }
      cartItems[product.tag].inCart += 1;
   } else {
    product.inCart = 1;
    cartItems = {
        [product.tag]: product  //you are adding a new product in cartitems object if that item is not existed
    }
    }

    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}
function totalCost(product) { //this is totalcost function we passed product as parameter
    //console.log("The product price is" , product.price); //this is to view product price in console
    let cartCost = localStorage.getItem('totalCost');  //cartcost variable stores totalcost from local storage
    //cartCost = parseInt(cartCost); // this converts into integer
    console.log("My cartCost is" , cartCost);
    console.log(typeof cartCost);  // defines kind either string or integer
    if(cartCost != null) {
      cartCost = parseInt(cartCost);  
      localStorage.setItem("totalCost" , cartCost + product.price); //it adds product price which is in array to cartcost when cartcost!=null
    } else {
        localStorage.setItem("totalCost" , product.price); //if cartcost null ti gives product price as itis
    }  

}

function displayCart() {
   let cartItems = localStorage.getItem("productsInCart");
   cartItems = JSON.parse(cartItems);  // when we grab some objects from the local storage they come as json with all these strings around we want to convert from json into javascript objects thats
   let productContainer = document.querySelector
   (".products");
   let cartCost = localStorage.getItem('totalCost');


   console.log(cartItems);  // what kind of items we stored in local storage
   if(cartItems && productContainer ) {   // we are in the cart page this product.container element exists and we also have something on in our cart items in the local storage
     productContainer.innerHTML = '';         // if we run first time there is nothing and second time they add that why we use +=
     Object.values(cartItems).map(item => {    // we have to check the cart items values
        productContainer.innerHTML += `                             
        <div class="product">
        <ion-icon name="close-circle-outline"></ion-icon>
        <img src="./images/${item.tag}.jpg">
        <span>${item.name}</span>
        </div>
        <div class="price">$${item.price},00</div>
        <div class="quantity">
        <ion-icon class="decrease"
        name="arrow-dropleft-circle"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon class="increase"
        name="arrow-droprignt-circle"></ion-icon>
        </div>
        <div class="total">
        $${item.inCart * item.price},00
          </div>
          `;
     });

     productContainer.innerHTML += `
     <div class="basketTotalContainer">
     <h4 class="basketTotalTitle">
        Basket Total
     </h4>
     <h4 class="basketTotal">
     $${cartCost},00
     </h4>
     `;

    }
}


onLoadCartNumbers();
displayCart();