# ShopBoard — Agent Instructions

## Stack

- Build tool: Vite (vanilla template)
- Languages: HTML, CSS, plain JavaScript (ES modules)
- No frameworks, no CSS libraries, no new npm packages without asking

## Rules

- Semantic HTML first: use header, nav, main, section, article, footer before div. One h1.
- Buttons are `<button>`, links are `<a href>`
- Every input and select has a label, linked with for/id
- Mobile-first: base styles for small screens, then min-width media queries
- No !important
- Explain every change: what changed, why it changed, and which rule it follows

## Architecture

| File           | Its one job                                     | May NOT                                             |
| -------------- | ----------------------------------------------- | --------------------------------------------------- |
| `src/data.js`  | The products. Data only.                        | contain functions                                   |
| `src/logic.js` | Pure functions: search, filter, sort, cart math | touch the DOM or browser storage, change its inputs |
| `src/state.js` | Current filters and the cart, and saving it     | touch the DOM                                       |
| `src/ui.js`    | The only file that touches the page (DOM)       | compute totals, filter or sort, use browser storage |
| `src/main.js`  | Connects the files above                        | touch the DOM or browser storage                    |

- A new feature gets its data in `data.js`, its rules in `logic.js`, its saved state in `state.js`, its drawing in `ui.js`, and its wiring in `main.js`. Example: a wishlist would be `addToWishlist` in logic.js, `getWishlist`/`setWishlist` in state.js, `renderWishlist` in ui.js.

## JavaScript rules (from bugs we hit)

- Sort a copy: `[...list].sort(...)`, never the original array. Otherwise "Default" cannot restore the order.
- Add event listeners once, at startup. Never inside a render function, or one click runs many times.
- Use event delegation for anything rendered from data: one listener on the parent, `closest('[data-id]')`.
- localStorage stores text: `JSON.stringify` before saving, `JSON.parse` (inside try/catch) when loading.
- When rendering a list with `map`, always `.join('')` before `innerHTML`, or commas appear on the page.
- A quantity never shows 0 or less: decreasing quantity 1 removes the line.

## Workflow

- Keep changes small and focused on one task
- Do not touch files unrelated to the task
- Before saying "done", run `npm run check` and `npm run build` and confirm there are no errors
- The pre-commit hook runs `npm run check`. Never bypass it with `--no-verify`.
