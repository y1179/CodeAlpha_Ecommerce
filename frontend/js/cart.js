
const CART_API_URL = "http://localhost:5000/api";

let allProducts = [];


// ============================================
// LOAD PRODUCTS FROM BACKEND
// ============================================

async function loadCartProducts() {

    const cartContainer =
        document.getElementById("cart-container");

    if (!cartContainer) {
        return;
    }

    try {

        const response =
            await fetch(`${CART_API_URL}/products`);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        allProducts =
            await response.json();

        console.log(
            "Cart products loaded:",
            allProducts
        );

        displayCart();

    } catch (error) {

        console.error(
            "Cart loading error:",
            error
        );

        cartContainer.innerHTML = `
            <div class="empty-state">

                <h2>
                    😔 Unable to load cart
                </h2>

                <p>
                    Please make sure the backend server
                    is running.
                </p>

                <a
                    href="index.html#products"
                    class="btn btn-primary"
                >
                    Browse Ice Creams
                </a>

            </div>
        `;

    }
}


// ============================================
// DISPLAY CART
// ============================================

function displayCart() {

    const cartContainer =
        document.getElementById("cart-container");

    if (!cartContainer) {
        return;
    }


    // Get cart from localStorage
    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    console.log(
        "Current cart:",
        cart
    );


    // Empty cart
    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some delicious ice cream
                    to your cart!
                </p>

                <a
                    href="index.html#products"
                    class="btn btn-primary"
                >
                    Browse Ice Creams
                </a>

            </div>

        `;

        updateCartSummary(
            0,
            0,
            0,
            0
        );

        updateCartCount();

        return;
    }


    // Generate cart items
    const cartHTML =
        cart.map(cartItem => {

            const product =
                allProducts.find(
                    product =>
                        product._id ===
                        cartItem.id
                );


            // Product no longer exists
            if (!product) {
                return "";
            }


            const itemTotal =
                product.price *
                cartItem.quantity;


            return `

                <div class="cart-item">

                    <!-- Product Image -->
                    <div class="cart-item-image">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            onerror="this.src='https://via.placeholder.com/150x150?text=Ice+Cream'"
                        >

                    </div>


                    <!-- Product Information -->
                    <div class="cart-item-info">

                        <span class="product-category">
                            ${product.category}
                        </span>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${product.description}
                        </p>

                        <strong>
                            ₹${product.price}
                        </strong>

                    </div>


                    <!-- Quantity -->
                    <div class="cart-item-quantity">

                        <button
                            type="button"
                            onclick="decreaseCartQuantity('${product._id}')"
                        >
                            −
                        </button>

                        <span>
                            ${cartItem.quantity}
                        </span>

                        <button
                            type="button"
                            onclick="increaseCartQuantity('${product._id}')"
                        >
                            +
                        </button>

                    </div>


                    <!-- Total -->
                    <div class="cart-item-total">

                        <strong>
                            ₹${itemTotal}
                        </strong>

                        <button
                            type="button"
                            class="remove-cart-btn"
                            onclick="removeFromCart('${product._id}')"
                        >
                            🗑️ Remove
                        </button>

                    </div>

                </div>

            `;

        }).join("");


    cartContainer.innerHTML =
        cartHTML;


    calculateCartTotal();

    updateCartCount();
}


// ============================================
// INCREASE QUANTITY
// ============================================

function increaseCartQuantity(productId) {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const cartItem =
        cart.find(
            item =>
                item.id === productId
        );


    const product =
        allProducts.find(
            item =>
                item._id === productId
        );


    if (!cartItem || !product) {
        return;
    }


    // Check stock
    if (
        cartItem.quantity >=
        product.stock
    ) {

        alert(
            `Only ${product.stock} items are available.`
        );

        return;
    }


    cartItem.quantity++;


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();
}


// ============================================
// DECREASE QUANTITY
// ============================================

function decreaseCartQuantity(productId) {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const cartItem =
        cart.find(
            item =>
                item.id === productId
        );


    if (!cartItem) {
        return;
    }


    if (cartItem.quantity > 1) {

        cartItem.quantity--;

    } else {

        // Remove product when quantity
        // reaches zero

        const index =
            cart.findIndex(
                item =>
                    item.id === productId
            );


        if (index !== -1) {
            cart.splice(index, 1);
        }

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();
}


// ============================================
// REMOVE PRODUCT
// ============================================

function removeFromCart(productId) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart =
        cart.filter(
            item =>
                item.id !== productId
        );


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();
}


// ============================================
// CALCULATE TOTAL
// ============================================

function calculateCartTotal() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    let subtotal = 0;


    cart.forEach(cartItem => {

        const product =
            allProducts.find(
                item =>
                    item._id ===
                    cartItem.id
            );


        if (product) {

            subtotal +=
                product.price *
                cartItem.quantity;

        }

    });


    // Delivery charge
    const delivery =
        subtotal > 0
            ? 40
            : 0;


    // 10% discount above ₹500
    const discount =
        subtotal >= 500
            ? Math.round(
                subtotal * 0.10
            )
            : 0;


    const total =
        subtotal +
        delivery -
        discount;


    updateCartSummary(
        subtotal,
        delivery,
        discount,
        total
    );
}


// ============================================
// UPDATE CART SUMMARY
// ============================================

function updateCartSummary(
    subtotal = 0,
    delivery = 0,
    discount = 0,
    total = 0
) {

    const subtotalElement =
        document.getElementById(
            "cart-subtotal"
        );


    const deliveryElement =
        document.getElementById(
            "delivery-charge"
        );


    const discountElement =
        document.getElementById(
            "discount"
        );


    const totalElement =
        document.getElementById(
            "cart-total"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            `₹${subtotal}`;

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            `₹${delivery}`;

    }


    if (discountElement) {

        discountElement.textContent =
            `₹${discount}`;

    }


    if (totalElement) {

        totalElement.textContent =
            `₹${total}`;

    }

}


// ============================================
// UPDATE CART COUNT
// ============================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const count =
        cart.reduce(
            (total, item) => {

                return (
                    total +
                    Number(item.quantity || 0)
                );

            },
            0
        );


    const cartCount =
        document.getElementById(
            "cart-count"
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


// ============================================
// INITIALIZE CART
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "🛒 Frosty Bliss Cart Loaded"
        );

        loadCartProducts();

        updateCartCount();

    }
);
