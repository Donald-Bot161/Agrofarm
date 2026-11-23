
const WHATSAPP_NUMBER = "2349043320627";
// Replace this with your WhatsApp number.
// Use 234 followed by your number, without the first 0.

let cart = JSON.parse(localStorage.getItem("agroCart")) || [];

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");

function formatMoney(amount) {
    return "₦" + amount.toLocaleString("en-NG");
}

function getPrice(price) {
    if (typeof price === "number") return price;

    return Number(String(price).replace(/[^\d.]/g, "")) || 0;
}

function saveCart() {
    localStorage.setItem("agroCart", JSON.stringify(cart));
}

function renderCart() {
    cartItems.innerHTML = "";

    let subtotal = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        emptyCart.style.display = "block";
        cartItems.style.display = "none";
    } else {
        emptyCart.style.display = "none";
        cartItems.style.display = "block";
    }

    cart.forEach((item, index) => {
        const price = getPrice(item.price);
        const quantity = Number(item.quantity) || 1;
        const itemTotal = price * quantity;

        subtotal += itemTotal;
        totalItems += quantity;

        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        const details = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = item.name;

        const priceText = document.createElement("p");
        priceText.textContent = "Price: " + formatMoney(price);

        const totalText = document.createElement("p");
        totalText.textContent = "Total: " + formatMoney(itemTotal);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const minus = document.createElement("button");
        minus.textContent = "-";
        minus.type = "button";
        minus.addEventListener("click", () => changeQuantity(index, -1));

        const quantityText = document.createElement("span");
        quantityText.textContent = quantity;

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.type = "button";
        plus.addEventListener("click", () => changeQuantity(index, 1));

        controls.append(minus, quantityText, plus);
        details.append(name, priceText, totalText, controls);

        const remove = document.createElement("button");
        remove.className = "remove-btn";
        remove.textContent = "Remove";
        remove.type = "button";
        remove.addEventListener("click", () => removeItem(index));

        itemDiv.append(details, remove);
        cartItems.appendChild(itemDiv);
    });

    document.getElementById("itemCount").textContent =
        totalItems + (totalItems === 1 ? " item" : " items");

    document.getElementById("summaryCount").textContent = totalItems;
    document.getElementById("subtotal").textContent = formatMoney(subtotal);
    document.getElementById("grandTotal").textContent = formatMoney(subtotal);

    saveCart();

    // Update cart counter on pages that have one.
    document.querySelectorAll(".cart-count").forEach(counter => {
        counter.textContent = totalItems;
    });
}

function changeQuantity(index, amount) {
    cart[index].quantity = Number(cart[index].quantity) + amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Copy bank account number
document.getElementById("copyAccount").addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText("9043320627");
        document.getElementById("copyAccount").textContent = "Copied!";
    } catch {
        alert("Please copy the account number manually: 9043320627");
    }
});

// Place order
document.getElementById("checkoutForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty. Please add products first.");
        return;
    }

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const city = document.getElementById("customerCity").value.trim();
    const state = document.getElementById("customerState").value.trim();
    const reference = document.getElementById("transferReference").value.trim();

    let total = 0;
    let orderText = "";

    cart.forEach(item => {
        const price = getPrice(item.price);
        const quantity = Number(item.quantity) || 1;

        total += price * quantity;

        orderText +=
            `\n- ${item.name} x ${quantity} = ${formatMoney(price * quantity)}`;
    });

    const message = `
NEW AGROFARM ORDER

CUSTOMER DETAILS
Name: ${name}
Email: ${email}
Phone: ${phone}

DELIVERY ADDRESS
${address}
${city}, ${state}

ORDER ITEMS
${orderText}

TOTAL: ${formatMoney(total)}

BANK TRANSFER DETAILS
Bank: Moniepoint
Account Name: Donald Davies
Account Number: 9043320627

TRANSFER REFERENCE
${reference}

Payment status: Awaiting confirmation.
Please verify payment before processing this order.
`;

    const whatsappLink =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    if (WHATSAPP_NUMBER === "234XXXXXXXXXX") {
        alert("Your checkout is ready, but you must add your WhatsApp number in cart.js first.");
        return;
    }

    window.open(whatsappLink, "_blank");

    alert("Your order details are ready. Send the WhatsApp message to complete your order.");
});

renderCart();
