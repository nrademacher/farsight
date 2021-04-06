## Webdev Starter 🚀 (WIP)

This is a light-weight boilerplate for jumpstarting a new web development project.

Its aim is to be continuously optimized for **speed** and **ease of use**.

The idea is to be able to dive right in on a project idea without having to spend any time/energy on setup and config, yet with all the essential
DX features, such as hot reloading, automatic imports, and optimized production builds.

You're not locked into any JavaScript framework (or using the language at all), but you can easily extend the boilerplate with commands like `yarn setup:react` to make it suit your project's needs.

**Disclaimer**: This is an early version and mostly catering to my own learning purposes for now.

### Getting Started

1. Run `yarn` to install dependencies, then `yarn start` to start the development server (opens automatically on `localhost:8080`).
2. Start coding by editing the starter files in the `src` folder.
3. When done, run `yarn build` to create an optimized production build. (Don't forget to customize this README and the relevant fields in `package.json` for your project.)

### Styling

The main rationale for 'soft-coding' in TailwindCSS is that, if you don't want to spend effort on setup and configurations, you probably don't want to have to create and manage style sheets, either. If you're using this boilerplate, you probably just want to build something that looks good quickly.

Tailwind comes with nice, sane defaults and lets you compose semantic class names so as to allow you to rapidly create aesthetically pleasing, responsive UIs. With some knowledge of CSS and reading the documentation, it makes for a smooth, elegant, and clutter-free way to handle styling.

That said, if you want to write custom CSS, your options include:

* Writing your custom styles in `index.css` to use with Tailwind. That also allows you to create custom Tailwind style components using `@apply`. See the documentation for details.
* Linking your own style sheets(s) alongside `index.css`.
* The nuclear option: You can get rid of Tailwind by running `yarn eject:tailwind`. This will:
  1. Remove Tailwind's files and uninstall it and its dependencies.
  2. Clear `index.css` and add a very minimal CSS reset (`margin` and `padding` to `0`, `box-sizing: border-box`).

### TODO

- [ ] Flesh out this README
- [ ] More and better scripts
- [ ] Create branch for `npm` users
- [ ] Add useful links/resources section
