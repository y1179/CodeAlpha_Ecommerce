
const CHECKOUT_API_URL = "http://localhost:5000/api";

let checkoutProducts = [];


// ============================================
// LOAD PRODUCTS
// ============================================

async function loadCheckoutProducts() {

    try {

        const response =
            await fetch(
                `${CHECKOUT_API_URL}/products`
            );

        if (!response.ok) {
            throw new Error(
                "Failed to load products"
            );
        }

        checkoutProducts =
            await response.json();

        displayCheckoutSummary();

    } catch (error) {

        console.error(
            "Checkout products error:",
            error
        );

        const itemsContainer =
            document.getElementById(
                "checkout-items"
            );

        if (itemsContainer) {

            itemsContainer.innerHTML = `
                <p>
                    Unable to load order summary.
                </p>
            `;

        }

    }
}


// ============================================
// DISPLAY CHECKOUT SUMMARY
// ============================================

function displayCheckoutSummary() {

    const itemsContainer =
        document.getElementById(
            "checkout-items"
        );

    if (!itemsContainer) {
        return;
    }


    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    if (cart.length === 0) {

        itemsContainer.innerHTML = `
            <p>
                Your cart is empty.
            </p>
        `;

        updateCheckoutTotals(
            0,
            0,
            0,
            0
        );

        return;
    }


    let subtotal = 0;


    itemsContainer.innerHTML =
        cart.map(cartItem => {

            const product =
                checkoutProducts.find(
                    item =>
                        item._id ===
                        cartItem.id
                );


            if (!product) {
                return "";
            }


            const itemTotal =
                product.price *
                cartItem.quantity;


            subtotal += itemTotal;


            return `
                <div class="checkout-item">

                    <div class="checkout-item-info">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                        <div>

                            <h4>
                                ${product.name}
                            </h4>

                            <p>
                                ₹${product.price}
                                ×
                                ${cartItem.quantity}
                            </p>

                        </div>

                    </div>

                    <strong>
                        ₹${itemTotal}
                    </strong>

                </div>
            `;

        }).join("");


    const delivery =
        subtotal > 0
            ? 40
            : 0;


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


    updateCheckoutTotals(
        subtotal,
        delivery,
        discount,
        total
    );
}


// ============================================
// UPDATE TOTALS
// ============================================

function updateCheckoutTotals(
    subtotal,
    delivery,
    discount,
    total
) {

    const subtotalElement =
        document.getElementById(
            "checkout-subtotal"
        );


    const deliveryElement =
        document.getElementById(
            "checkout-delivery"
        );


    const discountElement =
        document.getElementById(
            "checkout-discount"
        );


    const totalElement =
        document.getElementById(
            "checkout-total"
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
// PLACE ORDER
// ============================================

async function placeOrder(event) {

    event.preventDefault();


    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    // Check cart
    if (cart.length === 0) {

        showCheckoutMessage(
            "Your cart is empty.",
            "error"
        );

        return;
    }


    // ----------------------------------------
    // Get form values
    // ----------------------------------------

    const firstName =
        document.getElementById(
            "first-name"
        ).value.trim();


    const lastName =
        document.getElementById(
            "last-name"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const address =
        document.getElementById(
            "address"
        ).value.trim();


    const city =
        document.getElementById(
            "city"
        ).value.trim();


    const pincode =
        document.getElementById(
            "pincode"
        ).value.trim();


    const paymentMethod =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        )?.value || "cod";


    // ----------------------------------------
    // Validate form
    // ----------------------------------------

    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {

        showCheckoutMessage(
            "Please fill in all required fields.",
            "error"
        );

        return;
    }


    // ----------------------------------------
    // Prepare order items
    // ----------------------------------------

    const orderItems =
        cart.map(item => ({

            product:
                item.id,

            quantity:
                item.quantity

        }));


    // ----------------------------------------
    // Prepare order data
    // ----------------------------------------

    const orderData = {

        customer: {

            firstName,

            lastName,

            email,

            phone,

            address,

            city,

            pincode

        },

        items:
            orderItems,

        paymentMethod

    };


    try {

        // Disable button
        const submitButton =
            document.querySelector(
                '#checkout-form button[type="submit"]'
            );


        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Placing Order...";

        }


        showCheckoutMessage(
            "Placing your order...",
            "success"
        );


        // ------------------------------------
        // Send order to backend
        // ------------------------------------

        const response =
            await fetch(
                `${CHECKOUT_API_URL}/orders`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            orderData
                        )
                }
            );


        const data =
            await response.json();


        // ------------------------------------
        // Handle error
        // ------------------------------------

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to place order."
            );

        }


        // ------------------------------------
        // Order successful
        // ------------------------------------

        console.log(
            "Order created:",
            data
        );


        // Remove cart
        localStorage.removeItem(
            "cart"
        );


        showCheckoutMessage(
            `🎉 Order placed successfully! Order ID: ${data.order.id}`,
            "success"
        );


        // Redirect after 2 seconds
        setTimeout(
            () => {

                window.location.href =
                    "index.html";

            },
            2500
        );


    } catch (error) {

        console.error(
            "Place order error:",
            error
        );


        showCheckoutMessage(
            error.message ||
            "Unable to place order.",
            "error"
        );


        const submitButton =
            document.querySelector(
                '#checkout-form button[type="submit"]'
            );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Place Order";

        }

    }

}


// ============================================
// MESSAGE
// ============================================

function showCheckoutMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "checkout-message"
        );


    if (!messageElement) {
        return;
    }


    messageElement.textContent =
        message;


    messageElement.className =
        `form-message ${type}`;

}


// ============================================
// INITIALIZE
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "🍦 Frosty Bliss Checkout Loaded"
        );


        loadCheckoutProducts();


        const checkoutForm =
            document.getElementById(
                "checkout-form"
            );


        if (checkoutForm) {

            checkoutForm.addEventListener(
                "submit",
                placeOrder
            );

        }

    }
);
