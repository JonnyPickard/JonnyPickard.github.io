Your goal is to refactor React components to use `clsx` for managing `className` values.

Requirements for the refactor:

- Convert all `className` strings, for all react components in the file, to use `clsx` array syntax.
- Split class names by whitespace and apply `clsx` like so: `className={clsx(['flex', 'flex-full'])}`.
- Ensure readability and maintainability of the updated code.
- Test the components to verify that the visual appearance remains unchanged.
- Follow best practices for clean and consistent code.
- import clsx if required
- replace other className utilities if required e.g. `cn` -> `clsx`

Example:
Before:

```jsx
<div className="flex flex-full"></div>
```

After:

```jsx
import clsx from "clsx";

<div className={clsx(["flex", "flex-full"])}></div>;
```
