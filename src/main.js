// main.js — connects the modules. Reads state, asks logic, tells ui to draw.
// No page or storage code here: those live in ui.js and state.js.
import './style.css'
import { products } from './data.js'
import {
  getVisibleProducts,
  getCategories,
  addToCart,
  decreaseInCart,
  removeFromCart,
  getCartLines,
  getCartCount,
  getCartTotal,
} from './logic.js'
import { getCart, setCart, getFilters, updateFilters } from './state.js'
import {
  renderCategoryOptions,
  renderProducts,
  renderCart,
  bindFilters,
  bindAddToCart,
  bindCart,
  bindRegister,
  showRegisterMessage,
} from './ui.js'

function showProducts() {
  renderProducts(getVisibleProducts(products, getFilters()), products.length)
}

function showCart() {
  const lines = getCartLines(getCart(), products)
  renderCart(lines, getCartCount(lines), getCartTotal(lines))
}

// Every cart change goes through here: compute the new cart, save it, redraw.
function changeCart(update) {
  setCart(update(getCart()))
  showCart()
}

bindFilters({
  onSearch: (query) => {
    updateFilters({ query })
    showProducts()
  },
  onCategory: (category) => {
    updateFilters({ category })
    showProducts()
  },
  onSort: (sort) => {
    updateFilters({ sort })
    showProducts()
  },
})

bindAddToCart((id) => changeCart((cart) => addToCart(cart, id)))

bindCart({
  onIncrease: (id) => changeCart((cart) => addToCart(cart, id)),
  onDecrease: (id) => changeCart((cart) => decreaseInCart(cart, id)),
  onRemove: (id) => changeCart((cart) => removeFromCart(cart, id)),
  onClear: () => changeCart(() => []),
})

// No server yet: we only confirm. The password is never kept.
bindRegister(({ fullName }) => {
  showRegisterMessage(`Thanks, ${fullName}! Your account is ready.`)
})

renderCategoryOptions(getCategories(products))
showProducts()
showCart()
