// state.js — what the user has chosen right now, and saving the cart.
// The only file that touches localStorage. Never touches the DOM.

const CART_KEY = 'shopboard-cart'

// Reads the saved cart. Bad or missing data gives an empty cart instead of a crash.
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

let cart = loadCart()

const filters = {
  query: '',
  category: 'all',
  sort: 'default',
}

export function getCart() {
  return cart
}

// Replaces the cart and saves it as text (localStorage only stores strings).
export function setCart(nextCart) {
  cart = nextCart
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function getFilters() {
  return { ...filters }
}

// Changes one or more filters, e.g. updateFilters({ sort: 'price-asc' }).
export function updateFilters(changes) {
  Object.assign(filters, changes)
}
