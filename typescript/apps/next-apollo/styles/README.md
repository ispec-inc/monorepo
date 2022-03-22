## Styles
Use `scss` to adjust the styling of each page.

### reset.scss
- To reset the initial css of the next framework.
- Declared in `_app.tsx` , so it applies to all pages.

### global.scss
- Handle UI displays that should be reflected throughout, such as font-family.
- Declared in `_app.tsx` , so it applies to all pages.

### variables.scss
- File used to handle variables with scss. (ex. color etc..)

### module
[module](./modules)

- Place the scss for each page in the directory here.
- The top root should be a directory structure that matches the `pages` structure.
- If you want to apply a style to each component, place it in the corresponding directory under `components/` .