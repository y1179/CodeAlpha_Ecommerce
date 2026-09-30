
const API_URL = "http://localhost:5000/api";

const urlParams = new URLSearchParams(
    window.location.search
);

const productId = urlParams.get("id");

let currentProduct = null;
let quantity = 1;


// =====================================
// FETCH PRODUCT
// =====================================

async function fetchProduct() {

    const container =
        document.getElementById(
            "product-details-container"
        );

    if (!container) {
        return;
    }

    if (!productId) {

        container.innerHTML = `
            <div class="empty-state">

                <h2>🍦 Product Not Found</h2>

                <p>
                    No product was selected.
                </p>

                <a
                    href="index.html#products"
                    class="btn btn-primary"
                >
                    Back to Ice Creams
                </a>

            </div>
        `;

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/products/${productId}`
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Product not found"
            );

        }


        currentProduct = data;

        displayProduct(data);


    } catch (error) {

        console.error(
            "Product loading error:",
            error
        );


        container.innerHTML = `
            <div class="empty-state">

                <h2>😔 Something went wrong</h2>

                <p>
                    Unable to load this ice cream.
                </p>

                <a
                    href="index.html#products"
                    class="btn btn-primary"
                >
                    Back to Ice Creams
                </a>

            </div>
        `;
    }
}


// =====================================
// DISPLAY PRODUCT
// =====================================

function displayProduct(product) {

    const container =
        document.getElementById(
            "product-details-container"
        );


    container.innerHTML = `

        <div class="product-detail-image">

            <img
                src="${product.image}"
                alt="${product.name}"
                onerror="this.src='https://via.placeholder.com/500x400?text=Ice+Cream'"
            >

        </div>


        <div class="product-detail-content">

            <span class="product-category">
                ${product.category}
            </span>


            <h1>
                ${product.name}
            </h1>


            <div class="product-rating">
                ⭐ ${product.rating} / 5
            </div>


            <div class="product-detail-price">
                ₹${product.price}
            </div>


            <p class="product-description">
                ${product.longDescription}
            </p>


            <div class="product-information">

                <div class="info-item">

                    <strong>
                        🍨 Flavor
                    </strong>

                    <span>
                        ${product.flavor}
                    </span>

                </div>


                <div class="info-item">

                    <strong>
                        📦 Size
                    </strong>

                    <span>
                        ${product.size}
                    </span>

                </div>


                <div class="info-item">

                    <strong>
                        🔥 Calories
                    </strong>

                    <span>
                        ${product.calories} kcal
                    </span>

                </div>


                <div class="info-item">

                    <strong>
                        📦 Stock
                    </strong>

                    <span>
                        ${product.stock} available
                    </span>

                </div>

            </div>


            <div class="ingredients-section">

                <h3>
                    Ingredients
                </h3>

                <div class="ingredient-list">

                    ${product.ingredients
                        .map(
                            ingredient =>
                                `<span>${ingredient}</span>`
                        )
                        .join("")
                    }

                </div>

            </div>


            <div class="product-tags">

                ${product.tags
                    .map(
                        tag =>
                            `<span>${tag}</span>`
                    )
                    .join("")
                }

            </div>


            ${
                product.stock > 0
                    ? `

                    <div class="product-purchase">

                        <div class="quantity-control">

                            <button
                                type="button"
                                onclick="decreaseQuantity()"
                            >
                                −
                            </button>


                            <span id="quantity">
                                1
                            </span>


                            <button
                                type="button"
                                onclick="increaseQuantity()"
                            >
                                +
                            </button>

                        </div>


                        <button
                            type="button"
                            class="btn btn-primary"
                            onclick="addProductToCart()"
                        >
                            🛒 Add to Cart
                        </button>

                    </div>

                    `
                    : `

                    <button
                        class="btn btn-secondary"
                        disabled
                    >
                        Out of Stock
                    </button>

                    `
            }

        </div>

    `;
}


// =====================================
// INCREASE QUANTITY
// =====================================

function increaseQuantity() {

    if (!currentProduct) {
        return;
    }


    if (
        quantity <
        currentProduct.stock
    ) {

        quantity++;

        updateQuantity();

    }

}


// =====================================
// DECREASE QUANTITY
// =====================================

function decreaseQuantity() {

    if (quantity > 1) {

        quantity--;

        updateQuantity();

    }

}


// =====================================
// UPDATE QUANTITY
// =====================================

function updateQuantity() {

    const quantityElement =
        document.getElementById(
            "quantity"
        );


    if (quantityElement) {

        quantityElement.textContent =
            quantity;

    }

}


// =====================================
// ADD TO CART
// =====================================

function addProductToCart() {

    if (!currentProduct) {

        alert(
            "Product is still loading. Please try again."
        );

        return;
    }


    // Get existing cart
    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    // Check whether product already exists
    const existingProduct =
        cart.find(
            item =>
                item.id ===
                currentProduct._id
        );


    if (existingProduct) {

        const newQuantity =
            existingProduct.quantity +
            quantity;


        if (
            newQuantity >
            currentProduct.stock
        ) {

            alert(
                "You cannot add more than the available stock."
            );

            return;
        }


        existingProduct.quantity =
            newQuantity;

    } else {

        cart.push({

            id: currentProduct._id,

            quantity: quantity

        });

    }


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Reset quantity
    quantity = 1;

    updateQuantity();


    // Update cart count
    updateCartCount();


    alert(
        `${currentProduct.name} added to cart! 🍦`
    );

}


// =====================================
// UPDATE CART COUNT
// =====================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
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


// =====================================
// INITIALIZE
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        fetchProduct();

        updateCartCount();

    }
);
