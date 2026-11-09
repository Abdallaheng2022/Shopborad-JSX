# Debugging log

<!-- TODO: rewrite every entry in your own words before you submit. -->

## Bug 1

- **What I saw:** `npm run lint:css` failed with "not found".
- **Type:** runtime (tooling)
- **How I found it:** Read the error in the terminal. The message came from the shell, not from `npm`, so the script existed but the program it calls did not.
- **Cause:** `package.json` had the `lint:css` script, but Stylelint was never installed in `node_modules`.
- **Fix:** `npm install -D eslint @eslint/js globals prettier stylelint stylelint-config-standard`
- **Did I use AI? For what?** Yes, to understand the difference between "Missing script" and "command not found".

## Bug 2

- **What I saw:** `src/style.css 15:34 ✖ Expected "Roboto" to be "roboto" value-keyword-case`
- **Type:** logic (lint rule)
- **How I found it:** Stylelint output gave the file, line 15 and column 34.
- **Cause:** The font list is in a custom property (`--sans`), so Stylelint cannot know `Roboto` is a font name and treats it as a keyword that should be lowercase.
- **Fix:** Wrote it as a string: `'Roboto'`.
- **Did I use AI? For what?** Yes, to explain why the rule fired. I chose the fix myself.

## Bug 3

- **What I saw:**
- **Type:** runtime / logic / state
- **How I found it:** (Console error, breakpoint, Application tab, console.log...)
- **Cause:** (the file and line, and why it was wrong)
- **Fix:**
- **Did I use AI? For what?**

<!-- Add one block per bug from the debugging lab (6 planted bugs + 1 bonus). -->
