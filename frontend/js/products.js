
const API_URL = "http://localhost:5000/api";

// Store products received from backend
let products = [];


// ==========================================
// GET PRODUCTS FROM BACKEND
// ==========================================

async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        products = await response.json();

        console.log("Products loaded:", products);

        displayProducts(products);

    } catch (error) {
        console.error("Product loading error:", error);

        const productContainer =
            document.getElementById("product-container");

        if (productContainer) {
            productContainer.innerHTML = `
                <div class="error-message">
                    <h3>Unable to load products 🍦</h3>
                    <p>Please make sure the backend server is running.</p>
                </div>
            `;
        }
    }
}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(productList) {

    const productContainer =
        document.getElementById("product-container");

    if (!productContainer) {
        return;
    }

    if (productList.length === 0) {
        productContainer.innerHTML = `
            <p>No products available.</p>
        `;
        return;
    }

    productContainer.innerHTML = productList.map(product => {

        return `
            <div class="product-card">

                <div class="product-image">
                    <img 
                        src="${product.image}" 
                        alt="${product.name}"
                        onerror="this.src='https://via.placeholder.com/300x220?text=Ice+Cream'"
                    >
                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>${product.name}</h3>

                    <p class="product-description">
                        ${product.description}
                    </p>

                    <div class="product-rating">
                        ⭐ ${product.rating}
                    </div>

                    <div class="product-bottom">

                        <span class="product-price">
                            ₹${product.price}
                        </span>

                        <button 
                            class="view-product-btn"
                            onclick="viewProduct('${product._id}')"
                        >
                            View Details
                        </button>

                    </div>

                </div>

            </div>
        `;

    }).join("");
}


// ==========================================
// VIEW PRODUCT DETAILS
// ==========================================

function viewProduct(productId) {

    window.location.href =
        `product.html?id=${productId}`;
}


// ==========================================
// SEARCH PRODUCTS
// ==========================================

function searchProducts() {

    const searchInput =
        document.getElementById("search-input");

    if (!searchInput) {
        return;
    }

    const searchText =
        searchInput.value.toLowerCase().trim();

    const filteredProducts =
        products.filter(product =>
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.flavor.toLowerCase().includes(searchText)
        );

    displayProducts(filteredProducts);
}


// ==========================================
// CATEGORY FILTER
// ==========================================

function filterProducts(category) {

    if (category === "All") {
        displayProducts(products);
        return;
    }

    const filteredProducts =
        products.filter(product =>
            product.category === category
        );

    displayProducts(filteredProducts);
}


// ==========================================
// LOAD PRODUCTS WHEN PAGE OPENS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    fetchProducts();

    const searchInput =
        document.getElementById("search-input");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchProducts
        );

    }

});
