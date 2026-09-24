/* =========================================
   STEVEWEAR
   Ecommerce JavaScript
========================================= */

// =========================================
// MOBILE MENU
// =========================================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

// Close mobile menu after clicking a link

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

// =========================================
// SEARCH
// =========================================

const searchBtn = document.getElementById("searchBtn");

const searchOverlay = document.getElementById("searchOverlay");

const closeSearch = document.getElementById("closeSearch");

const searchInput = document.getElementById("searchInput");

const searchResults = document.getElementById("searchResults");

searchBtn.addEventListener("click", () => {
  searchOverlay.classList.add("active");

  setTimeout(() => {
    searchInput.focus();
  }, 100);
});

closeSearch.addEventListener("click", () => {
  searchOverlay.classList.remove("active");
});

searchOverlay.addEventListener("click", (event) => {
  if (event.target === searchOverlay) {
    searchOverlay.classList.remove("active");
  }
});

// =========================================
// SEARCH PRODUCTS
// =========================================

const products = [...document.querySelectorAll(".product-card")];

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchResults.innerHTML = "";

    return;
  }

  const matches = products.filter((product) => {
    const name = product.dataset.name.toLowerCase();

    const category = product.dataset.category.toLowerCase();

    return name.includes(query) || category.includes(query);
  });

  if (!matches.length) {
    searchResults.innerHTML = `
      <p style="padding:20px 0;color:#6e7173;">
        No products found.
      </p>
    `;

    return;
  }

  searchResults.innerHTML = matches
    .map((product) => {
      return `
        <div class="search-result">

          <span>
            ${product.dataset.name}
          </span>

          <strong>
            ₦${Number(product.dataset.price).toLocaleString()}
          </strong>

        </div>
      `;
    })
    .join("");
});

// =========================================
// CART
// =========================================

const cartBtn = document.getElementById("cartBtn");

const cartDrawer = document.getElementById("cartDrawer");

const cartOverlay = document.getElementById("cartOverlay");

const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

let cart = [];

// =========================================
// OPEN CART
// =========================================

function openCart() {
  cartDrawer.classList.add("active");

  cartOverlay.classList.add("active");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("active");

  cartOverlay.classList.remove("active");
}

cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartDrawer);

cartOverlay.addEventListener("click", closeCartDrawer);

// =========================================
// ADD TO CART
// =========================================

document.querySelectorAll(".quick-add").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");

    const product = {
      name: card.dataset.name,

      price: Number(card.dataset.price),

      image: card.querySelector("img").src,
    };

    cart.push(product);

    updateCart();

    openCart();
  });
});

// =========================================
// UPDATE CART
// =========================================

function updateCart() {
  cartCount.textContent = cart.length;

  if (!cart.length) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Your cart is empty.
      </p>
    `;

    cartTotal.textContent = "₦0";

    return;
  }

  cartItems.innerHTML = cart
    .map((item, index) => {
      return `

        <div class="cart-item">

          <img
            src="${item.image}"
            alt="${item.name}"
          >

          <div>

            <h4>
              ${item.name}
            </h4>

            <p>
              ₦${item.price.toLocaleString()}
            </p>

            <button
              class="remove-item"
              data-index="${index}"
            >
              REMOVE
            </button>

          </div>

        </div>

      `;
    })
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  cartTotal.textContent = `₦${total.toLocaleString()}`;

  // Remove buttons

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      updateCart();
    });
  });
}

// =========================================
// NEWSLETTER
// =========================================

const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const button = newsletterForm.querySelector("button");

  button.textContent = "SUBSCRIBED ✓";

  button.style.background = "#2DB463";

  newsletterForm.querySelector("input").value = "";
});

// =========================================
// CHECKOUT
// =========================================

document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (!cart.length) {
    alert("Your cart is empty.");

    return;
  }
});

// =========================================
// ESCAPE KEY
// =========================================

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  searchOverlay.classList.remove("active");

  closeCartDrawer();
});
