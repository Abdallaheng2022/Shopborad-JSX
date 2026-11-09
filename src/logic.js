// logic.js — pure functions: data in, data out.
// No page access, no browser storage. Never changes its inputs.

// Search by name (any case), then filter by category, then sort a copy.
export function getVisibleProducts(products, { query, category, sort }) {
  const q = query.trim().toLowerCase()

  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(q))
    .filter((p) => category === 'all' || p.category === category)

  if (sort === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price)
  return filtered // "default": the order from data.js
}

// Unique category names, in the order they first appear.
export function getCategories(products) {
  return [...new Set(products.map((p) => p.category))]
}

// Returns a new cart with one more of this product.
export function addToCart(cart, id) {
  const line = cart.find((item) => item.id === id)
  if (line) {
    return cart.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
  }
  return [...cart, { id, qty: 1 }]
}

// Returns a new cart with one less of this product. Quantity 1 → removed.
export function decreaseInCart(cart, id) {
  return cart
    .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
    .filter((item) => item.qty > 0)
}

// Returns a new cart without this product.
export function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id)
}

// Joins cart items with product details. Skips ids that no longer exist.
export function getCartLines(cart, products) {
  return cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id)
      return product ? { ...product, qty: item.qty, lineTotal: product.price * item.qty } : null
    })
    .filter(Boolean)
}

// Total number of items (Tote ×2 + Sneakers = 3).
export function getCartCount(lines) {
  return lines.reduce((sum, line) => sum + line.qty, 0)
}

// Total price of all lines.
export function getCartTotal(lines) {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0)
}
