// =========================================
// STEVEWEAR PRODUCT DATA
// =========================================

const products = {
  jeans: [
    {
      id: "jeans-001",
      name: "Classic Straight Jean",
      category: "jeans",
      categoryLabel: "Jeans",
      price: 48000,
      description: "Mid Blue / Straight Fit",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
      badge: "BESTSELLER",
      badgeDark: true,
    },
    {
      id: "jeans-002",
      name: "Washed Denim Jean",
      category: "jeans",
      categoryLabel: "Jeans",
      price: 52000,
      description: "Washed Black / Loose Fit",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
      badge: "NEW",
    },
  ],

  shorts: [
    {
      id: "shorts-001",
      name: "Relaxed Cargo Short",
      category: "shorts",
      categoryLabel: "Shorts",
      price: 32000,
      description: "Stone / Relaxed Fit",
      image:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=900&q=85",
      badge: "NEW",
    },
    {
      id: "shorts-002",
      name: "Weekend Denim Short",
      category: "shorts",
      categoryLabel: "Shorts",
      price: 29000,
      description: "Blue Wash / Relaxed",
      image:
        "https://images.unsplash.com/photo-1598522325074-042db73aa4e6?auto=format&fit=crop&w=900&q=85",
      badge: "",
    },
  ],

  polos: [
    {
      id: "polos-001",
      name: "Essential Polo",
      category: "polos",
      categoryLabel: "Polos",
      price: 28000,
      description: "Black / Regular Fit",
      image:
        "https://images.unsplash.com/photo-1671438118097-479e63198629?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UG9sb3xlbnwwfHwwfHx8MA%3D%3D",
      badge: "",
    },
    {
      id: "polos-002",
      name: "Daily Fit Polo",
      category: "polos",
      categoryLabel: "Polos",
      price: 30000,
      description: "Cream / Regular Fit",
      image:
        "https://images.unsplash.com/photo-1625910513413-c23b8bb81cba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UG9sb3xlbnwwfHwwfHx8MA%3D%3D",
      badge: "",
    },
  ],

  shirts: [
    {
      id: "shirts-001",
      name: "Oxford Everyday Shirt",
      category: "shirts",
      categoryLabel: "Shirts",
      price: 35000,
      description: "White / Relaxed Fit",
      image:
        "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
      badge: "NEW",
    },
    {
      id: "shirts-002",
      name: "Premium Casual Shirt",
      category: "shirts",
      categoryLabel: "Shirts",
      price: 39000,
      description: "Navy / Oversized Fit",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
      badge: "",
    },
  ],
};

const allProducts = Object.values(products).flat();

// =========================================
// HELPERS
// =========================================

const formatPrice = (price) => `₦${Number(price).toLocaleString()}`;

function productCard(product) {
  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image">
        ${
          product.badge
            ? `<span class="product-badge ${
                product.badgeDark ? "dark" : ""
              }">${product.badge}</span>`
            : ""
        }

        <img src="${product.image}" alt="${product.name}" />

        <button class="quick-add" data-product-id="${product.id}">
          ADD TO CART
        </button>
      </div>

      <div class="product-info">
        <div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </div>

        <strong>${formatPrice(product.price)}</strong>
      </div>
    </article>
  `;
}

function renderProducts(list, container) {
  if (!container) return;

  container.innerHTML = list.length
    ? list.map(productCard).join("")
    : `<p class="no-products">No products found.</p>`;
}

// =========================================
// HOMEPAGE PRODUCTS
// =========================================

// Homepage shows the first four products.
renderProducts(allProducts.slice(0, 6), document.getElementById("products"));

// =========================================
// SHOP PAGE
// =========================================

const shopGrid = document.getElementById("shopProducts");
const shopCategory = document.getElementById("shopCategory");
const shopSort = document.getElementById("shopSort");

function renderShopProducts() {
  if (!shopGrid) return;

  const category = shopCategory?.value || "all";
  const sort = shopSort?.value || "default";

  let list =
    category === "all" ? [...allProducts] : [...(products[category] || [])];

  if (sort === "price-low") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    list.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderProducts(list, shopGrid);
}

if (shopGrid) {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category && products[category] && shopCategory) {
    shopCategory.value = category;
  }

  renderShopProducts();

  shopCategory?.addEventListener("change", renderShopProducts);
  shopSort?.addEventListener("change", renderShopProducts);
}

// =========================================
// MOBILE MENU
// =========================================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn?.addEventListener("click", () => {
  mobileMenu?.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu?.classList.remove("open");
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

function showSearchResults(query) {
  if (!searchResults) return;

  if (!query) {
    searchResults.innerHTML = "";
    return;
  }

  const matches = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.includes(query),
  );

  if (!matches.length) {
    searchResults.innerHTML = `
      <p class="no-search-results">No products found.</p>
    `;

    return;
  }

  searchResults.innerHTML = matches
    .map(
      (product) => `
        <a
          class="search-result"
          href="shop.html?category=${product.category}"
        >
          <span>${product.name}</span>
          <strong>${formatPrice(product.price)}</strong>
        </a>
      `,
    )
    .join("");
}

searchBtn?.addEventListener("click", () => {
  searchOverlay?.classList.add("active");

  setTimeout(() => {
    searchInput?.focus();
  }, 100);
});

closeSearch?.addEventListener("click", () => {
  searchOverlay?.classList.remove("active");
});

searchOverlay?.addEventListener("click", (event) => {
  if (event.target === searchOverlay) {
    searchOverlay.classList.remove("active");
  }
});

searchInput?.addEventListener("input", () => {
  showSearchResults(searchInput.value.trim().toLowerCase());
});

// =========================================
// CART + LOCAL STORAGE
// =========================================

const CART_STORAGE_KEY = "stevewear-cart";

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function openCart() {
  cartDrawer?.classList.add("active");
  cartOverlay?.classList.add("active");
}

function closeCartDrawer() {
  cartDrawer?.classList.remove("active");
  cartOverlay?.classList.remove("active");
}

cartBtn?.addEventListener("click", openCart);

closeCart?.addEventListener("click", closeCartDrawer);

cartOverlay?.addEventListener("click", closeCartDrawer);

// =========================================
// ADD TO CART
// =========================================

function addToCart(productId) {
  const product = allProducts.find((item) => item.id === productId);

  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  saveCart();
  updateCart();
  // openCart();
}

// =========================================
// CART BUTTON ACTIONS
// =========================================

document.addEventListener("click", (event) => {
  const addButton = event.target.closest(".quick-add");

  if (addButton) {
    addToCart(addButton.dataset.productId);
  }

  const quantityButton = event.target.closest(".quantity-btn");

  if (quantityButton) {
    const item = cart.find(
      (cartItem) => cartItem.id === quantityButton.dataset.id,
    );

    if (!item) return;

    if (quantityButton.dataset.action === "increase") {
      item.quantity += 1;
    }

    if (quantityButton.dataset.action === "decrease") {
      item.quantity -= 1;
    }

    if (item.quantity <= 0) {
      cart = cart.filter((cartItem) => cartItem.id !== item.id);
    }

    saveCart();
    updateCart();
  }

  const removeButton = event.target.closest(".remove-item");

  if (removeButton) {
    cart = cart.filter((item) => item.id !== removeButton.dataset.id);

    saveCart();
    updateCart();
  }
});

// =========================================
// UPDATE CART
// =========================================

function updateCart() {
  if (!cartItems || !cartCount || !cartTotal) return;

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = formatPrice(total);

  if (!cart.length) {
    cartItems.innerHTML = `
      <p class="empty-cart">Your cart is empty.</p>
    `;

    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <img
            src="${item.image}"
            alt="${item.name}"
          />

          <div class="cart-item-details">
            <h4>${item.name}</h4>

            <p>${formatPrice(item.price)}</p>

            <div
              class="quantity-control"
              aria-label="Quantity controls"
            >
              <button
                class="quantity-btn"
                data-id="${item.id}"
                data-action="decrease"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>${item.quantity}</span>

              <button
                class="quantity-btn"
                data-id="${item.id}"
                data-action="increase"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            class="remove-item"
            data-id="${item.id}"
          >
            REMOVE
          </button>
        </div>
      `,
    )
    .join("");
}

updateCart();

// =========================================
// NEWSLETTER
// =========================================

const newsletterForm = document.getElementById("newsletterForm");

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const button = newsletterForm.querySelector("button");

  button.textContent = "SUBSCRIBED ✓";
  button.classList.add("subscribed");

  newsletterForm.querySelector("input").value = "";
});

// =========================================
// CHECKOUT
// =========================================

// document
//   .querySelector(".checkout-btn")
//   ?.addEventListener("click", () => {
//     if (!cart.length) {
//       alert("Your cart is empty.");
//       return;
//     }

//     alert("Checkout will be connected here.");
//   });

// =========================================
// ESCAPE KEY
// =========================================

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  searchOverlay?.classList.remove("active");
  closeCartDrawer();
});
