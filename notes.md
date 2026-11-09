# Notes — predict, run, explain

<!-- Before you submit: write your own prediction in each "My prediction" line,
     and rewrite every "Why" you got wrong in your own words. -->

## Round 1 — Operators

| Code                     | Result  |
| ------------------------ | ------- |
| `console.log("5" + 3)`   | `"53"`  |
| `console.log("5" - 3)`   | `2`     |
| `console.log(5 == "5")`  | `true`  |
| `console.log(5 === "5")` | `false` |

- **My prediction:**
- **Why:** `+` with a string joins text, so 3 becomes `"3"`. `-` only works on numbers, so `"5"` becomes 5. `==` converts types before comparing, `===` does not.

## Round 2 — Scope

| Code                                    | Result                             |
| --------------------------------------- | ---------------------------------- |
| `let x = 1; if (true) { let x = 2 }; x` | `1`                                |
| `function f() { const y = 3 }; f(); y`  | `ReferenceError: y is not defined` |

- **My prediction:**
- **Why:** `let` and `const` live only inside their `{ }`. The inner `x` is a different variable, and `y` stops existing when `f` ends.

## Round 3 — Destructuring

`const { name, price = 10, stock = 5 } = { name: "Bag", price: 0 }` gives `Bag 0 5`.

- **My prediction:**
- **Why:** A default is used only when the value is `undefined`. `price` is `0`, which exists, so it stays 0. `stock` is missing, so it gets 5.

## Round 4 — Spread & references

`b = a`, `c = [...a]`, `b.push(3)` gives `a.length = 3`, `c.length = 2`. `count(1, 2, 3)` gives `3`.

- **My prediction:**
- **Why:** `b = a` copies the reference: `a` and `b` are the same array. `[...a]` makes a new array. `...items` collects all arguments into one array.

## Round 5 — sort

| Code                           | Result       |
| ------------------------------ | ------------ |
| `[10, 1, 5].sort()`            | `[1, 10, 5]` |
| `prices.sort((a, b) => a - b)` | `[1, 5, 10]` |
| `prices` after sorting         | `[1, 5, 10]` |

- **My prediction:**
- **Why:** Without a compare function, `sort` compares as text, and `"10"` comes before `"5"`. `sort` also changes the original array, which is why ShopBoard sorts a copy.
