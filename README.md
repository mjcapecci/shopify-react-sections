# shopify-react-sections

This is a collection of React components designed to be dropped into any Shopify Liquid theme.

The idea is that we can import the React components we need without bundling React or ReactDOM in the final build. Instead, we will include React from the CDN.

## Getting Started

It is assumed that you have a Shopify theme in a local development environment. If that is not the case, please [see here first](https://shopify.dev/tools/theme-kit/getting-started).

1. In your `theme.liquid`, include the most up-to-date React CDN links directly above the closing `body` tag

```liquid

  <script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>

</body>

```

2. Copy this repo's `package.json` file into your theme and install the babel dependencies with `npm install`.

3. Create a `src` folder, and copy the components you want from this repo's `src` folder into your new `src` folder.

4. Run `npm run babelwatch` in your terminal. This will minify and transpile all of your imported components to run in the browser, also allowing the use of JSX. The transpiled versions of the files will automatically populate in the assets folder, ready for import into your `theme.liquid` file.

5. Individual components should be imported above the closing `body` tag in the `theme.liquid` file, but below the React CDN links.

```liquid

  <script src="{{ 'FullPageBanner.js' | asset_url }}"></script>
  <script src="{{ 'ContactForm.js' | asset_url }}"></script>

</body>

```

6. Finally, each component has a corresponding Section file. Copy the corresponding Section files of any components you imported and transpiled into your theme's `sections` folder. You can now create instances of these sections in the "Customization" menu in the Shopify admin panel.

## Styles

For the time being, all styles are handled the components themselves. The objective is to be as "plug-n-play" as possible, and to hopefully utilize as much of the existing theme CSS as possible.

For best results, you it may be worthwhile to add classes from your theme's CSS files to the JSX, depending on the scenario.

## Challenges

These are the difficult challenges involved with implementing React in this fashion, and creating Shopify sections based on React components.

### Importing the Same Component More than Once

Shopify offers two types of sections: static and dynamic. This library is intended to serve as a collection of **dymnamic** sections, which means you can use a section more than once -- but you should not explicitly define it in your code.

Due to the nature of how React injects JavaScript code into a single root element, the same tag id cannot be used in more than one instance. As a result, the way to reuse the same React code for now is to create another render our sections in a `forEach` loop that iterates over the NodeList of all results gathered from a `querySelectorAll`. Through this loop, we can pass our data attributes as props to our components. In this way, each section will behave as an independed Virtual DOM.

```javascript
const FullPageBanner = ({ element }) => {
  // component code
};

let domAll = document.querySelectorAll('#full-page-banner-container');
[...domAll].forEach((node) =>
  ReactDOM.render(<FullPageBanner element={node} />, node)
);
```

### Causing a Component to Re-Render After it Has Read Data from an HTML `data` attribute

Many of the components in this library rely on data that is received from the Shopify theme customization menu via Section Schema -- [see here for more info on that](https://shopify.dev/docs/themes/sections).

This data is sent to our React components via HTML data attributes that are constructed with Liquid when the page loads in. If a component has a reason to re-render (useEffect, state update, etc.), the initial Liquid data may be lost.
`As a result, the first thing we do in components that rely on such data is memoize the incoming data attribute values with`useMemo`. This assures that, for the lifetime of our component, we will be sure to hang on to those initial values.

```javascript

const FullPageBanner = () => {
  const memoizedImages = React.useMemo(() => {
    return domContainer.dataset.images.split(',');
  }, []);

  const memoizedTitle = React.useMemo(() => {
    return domContainer.dataset.title;
  }, []);

  // rest of component

  ReactDOM.render(<FullPageBanner />, domContainer);
```

## Contributing

This library is in its infancy stage and I hope to create two or three components per week until there is a substantial amount of code that can be used to get Shopify project off the ground in no time.

If you have any ideas, let's talk!
