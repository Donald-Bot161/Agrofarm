
// LOAD SAVED CART
let cart = JSON.parse(localStorage.getItem("agroCart")) || [];


// SAVE CART
function saveCart() {

    localStorage.setItem("agroCart", JSON.stringify(cart));

    updateCartCount();

}


// UPDATE CART NUMBER
function updateCartCount() {

    const cartCountElement = document.querySelector(".cart-count");

    const total = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    if (cartCountElement) {
        cartCountElement.textContent = total;
    }

}


// ================= PRODUCT QUANTITY COUNTER =================

function changeProductQuantity(button, amount) {

    const product = button.closest(".product-card");

    const quantityDisplay = product.querySelector(".product-quantity");

    let quantity = Number(quantityDisplay.textContent);

    quantity += amount;

    if (quantity < 1) {
        quantity = 1;
    }

    quantityDisplay.textContent = quantity;

}


// ================= ADD PRODUCT TO CART =================

function addToCart(button) {

    const product = button.closest(".product-card");

    if (!product) return;

    const name = product.querySelector("h3").textContent.trim();

    const priceText = product.querySelector(".price").textContent;

    const price = Number(priceText.replace(/[^\d.]/g, ""));

    // GET SELECTED QUANTITY
    const quantityDisplay = product.querySelector(".product-quantity");

    const quantity = quantityDisplay
        ? Math.max(1, Number(quantityDisplay.textContent) || 1)
        : 1;


    // CHECK IF PRODUCT ALREADY EXISTS
    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });

    }


    // SAVE CART
    saveCart();


    // UPDATE BUTTON
    button.textContent = "✓ Added to Cart";

    button.classList.add("added");


    // SHOW SUCCESS MODAL
    showCartModal(name);

}


// ================= SHOW CART MODAL =================

function showCartModal(productName) {

    const modal = document.getElementById("cartModal");

    if (!modal) return;

    const modalProduct = document.getElementById("modalProduct");

    const modalCount = document.getElementById("modalCount");

    const totalItems = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    modalProduct.textContent = productName;

    modalCount.textContent = totalItems;

    modal.classList.add("active");

    document.body.classList.add("modal-open");

}


// ================= CLOSE MODAL =================

function closeCartModal() {

    const modal = document.getElementById("cartModal");

    if (!modal) return;

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

}


// ================= MODAL EVENTS =================

document.addEventListener("DOMContentLoaded", function() {

    const modal = document.getElementById("cartModal");

    if (modal) {

        modal.addEventListener("click", function(event) {

            if (event.target === modal) {
                closeCartModal();
            }

        });

    }

    updateCartCount();

});


// CLOSE MODAL WITH ESCAPE KEY
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeCartModal();
    }

});


// INITIAL CART COUNT
updateCartCount();
