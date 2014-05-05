# Components 

Components in client-ui are UI components consisting of a couple of things:

- .scss files that describe the look and feel
- .js file for the components functionality [optionally]
- .md file describing the component and it's functionality is any.
- .hbs file which is a partial 

## Markdown
The markdown document has the main documentation of the component. From this document the developer should gain enough information about:

- What the component does,
- How it can be used
- Which API does the component have

Next to these key points the documentation could contain tips on extending or customizing the component. Some usage examples, any constrains. 

## .HBS
Every component should have a template file which is used to create the html structure that is needed for the components functionality to work or the style to be applied. The main goal for this is to hide the inner html structure from thw developers that want to use the components and keep control over this accross all the applications.

## SCSS
every component has three scss files

- **component.scss** in this file the base of the component styles are placed.
- **_component-opaque.scss** the overides of the component styles for when placed on a *opaque (non-transparent) background*
- **_component-transparent.scss** the overides of the component styles for when placed on a *transparent background*

> The **_component-opaque.scss** and **_component-transparent.scss** files are imported in the main **component.scss** file under scoped classes. So they are only appied to a specific theme e.g. `.ui--transparent` or `.ui--opaque` class. These two classes are reserved and are used to define the theme background on wich a component is placed.

The scoping import are shown in the example below

```scss
//component.scss
@import "../../bootstrap"; //import the scss modules

//base styling of the component that doesn't style any theme.

//for sense transparent background theme we do this
.ui--transparent {
	 @import "_component--transparent.scss";
}
// for senses opaque background theme we do
.ui--opaque,
.ui--transparent > ui--opaque {
	@import "_component--opaque.scss";
}
```

- The components scss files should contain comments with html snippets which are used to create styleguide documentation.
- Components classed should be prefixed with `.ui-`
- B.E.M. is used as the naming convention

## JavaScript
When a component exists of certain functionality then this is created using JavaScript. This JS Object is usually created using the prototype pattern e.g.

```javascript
	// Component constructor
	function Component(options) {
		this.element = options.element;
	}
	// a property added to the prototype
	Component.prototype.getElement = function () {
		return this.element;
	};
```

Also a component's JS implementation should take care of a couple of things:

- should be instantiated using the new Component(options);
- should handle eventlisteners properly (if needed) add them to it's element but also remove them
- should follow [Coding conventions](https://github.com/Rabobank/FE-docs/blob/wiki/development/coding-conventions.md)
- should have an API using the `'ui'` postal channel. The messages which are published should follow the following convention: `component.action` e.g. `carousel.selected`
- should have specs that cover the components core funcitonality
