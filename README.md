# ShopBoard

A simple shop page built with Vite (vanilla), semantic HTML and mobile-first CSS.

## Run

```bash
npm install
npm run dev
```

## Structure

| File           | Its one job                                          |
| -------------- | ---------------------------------------------------- |
| `src/data.js`  | The 12 products. Data only.                          |
| `src/logic.js` | Pure functions: search, filter, sort, cart math.     |
| `src/state.js` | Current filters and the cart, saved in localStorage. |
| `src/ui.js`    | The only file that touches the page (DOM).           |
| `src/main.js`  | Connects the four files above.                       |

Rules for each file are in `AGENTS.md`.

## Quality tools

| Command            | What it does                                 |
| ------------------ | -------------------------------------------- |
| `npm run lint`     | ESLint — checks JavaScript                   |
| `npm run lint:css` | Stylelint — checks CSS (blocks `!important`) |
| `npm run format`   | Prettier — formats all files                 |
| `npm run check`    | Runs all checks without changing files       |

A pre-commit hook (`.githooks/pre-commit`) runs `npm run check` before every commit.
