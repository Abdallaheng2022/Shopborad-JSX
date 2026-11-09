// ui.js — the only file that touches the page (the DOM).
// It draws what it is given and reports what the user did. No business logic.

const el = {
  grid: document.querySelector('#product-grid'),
  search: document.querySelector('#search'),
  category: document.querySelector('#category'),
  sort: document.querySelector('#sort'),
  controls: document.querySelector('.controls'),
  resultsCount: document.querySelector('#results-count'),
  cartCount: document.querySelector('#cart-count'),
  cartList: document.querySelector('#cart-list'),
  cartEmpty: document.querySelector('#cart-empty'),
  cartItems: document.querySelector('#cart-items'),
  cartTotal: document.querySelector('#cart-total'),
  cartClear: document.querySelector('#cart-clear'),
  registerForm: document.querySelector('#register-form'),
  registerMessage: document.querySelector('#register-message'),
}

const formatPrice = (amount) => `$${amount}`

// HTML for one product card.
function productCard(product) {
  return `
    <article class="product-card">
      <h3>${product.name}</h3>
      <p class="category">${product.category}</p>
      <p class="price"><data value="${product.price}">${formatPrice(product.price)}</data></p>
      <button type="button" data-id="${product.id}">Add to cart</button>
    </article>
  `
}

// HTML for one cart line, with − / + / Remove buttons.
function cartLine(line) {
  return `
    <li class="cart-line">
      <span class="cart-line-name">${line.name}</span>
      <span class="cart-qty">
        <button type="button" class="qty-button" data-action="decrease" data-id="${line.id}"
          aria-label="Decrease ${line.name}">−</button>
        <span aria-live="polite">${line.qty}</span>
        <button type="button" class="qty-button" data-action="increase" data-id="${line.id}"
          aria-label="Increase ${line.name}">+</button>
      </span>
      <span class="cart-line-total">${formatPrice(line.lineTotal)}</span>
      <button type="button" class="button-link" data-action="remove" data-id="${line.id}">
        Remove
      </button>
    </li>
  `
}

export function renderCategoryOptions(categories) {
  el.category.innerHTML += categories.map((c) => `<option value="${c}">${c}</option>`).join('')
}

export function renderProducts(visible, totalCount) {
  el.grid.innerHTML =
    visible.length > 0
      ? visible.map(productCard).join('')
      : '<p class="empty-message">No products match your search.</p>'
  el.resultsCount.textContent = `${visible.length} of ${totalCount} products`
}

export function renderCart(lines, count, total) {
  el.cartList.innerHTML = lines.map(cartLine).join('')
  el.cartEmpty.hidden = lines.length > 0
  el.cartClear.disabled = lines.length === 0
  el.cartCount.textContent = count
  el.cartItems.textContent = count
  el.cartTotal.textContent = formatPrice(total)
}

// Each bind function adds its listener ONCE. Call them at startup only.

export function bindFilters({ onSearch, onCategory, onSort }) {
  el.controls.addEventListener('submit', (e) => e.preventDefault())
  el.search.addEventListener('input', (e) => onSearch(e.target.value))
  el.category.addEventListener('change', (e) => onCategory(e.target.value))
  el.sort.addEventListener('change', (e) => onSort(e.target.value))
}

// Event delegation: one listener on the grid works for cards rendered later.
export function bindAddToCart(onAdd) {
  el.grid.addEventListener('click', (e) => {
    const button = e.target.closest('[data-id]')
    if (!button) return
    onAdd(Number(button.dataset.id))
  })
}

export function bindCart({ onIncrease, onDecrease, onRemove, onClear }) {
  const actions = { increase: onIncrease, decrease: onDecrease, remove: onRemove }

  el.cartList.addEventListener('click', (e) => {
    const button = e.target.closest('[data-action]')
    if (!button) return
    actions[button.dataset.action](Number(button.dataset.id))
  })

  el.cartClear.addEventListener('click', onClear)
}

// The browser checks required/email/minlength first; submit only fires when all are valid.
export function bindRegister(onRegister) {
  el.registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(el.registerForm))
    onRegister({ fullName: data.fullName, email: data.email })
    el.registerForm.reset()
  })
}

export function showRegisterMessage(text) {
  el.registerMessage.textContent = text
}
