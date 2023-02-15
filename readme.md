## Layout

Access the layout

[> Open layout](https://www.figma.com/)

## Online example

Access the site

[> Open site](https://project_name-front.surge.sh)

## Building

Install Node.js if you do not already have it installed on your machine.
Install Gulp CLI. Run the below command in your terminal. This will install Gulp CLI globally.

```
    yarn add gulp-cli
```

In the project folder install dependences:

```
	yarn
```

In the project folder run:

```
	yarn start
```

Access the project through `http://localhost:3000/`

Compiles and exports the project to the /dist folder:

```
	yarn run dist
```

It will watch and automatically compile the project to the /dist folder each time you edit and save a file inside the /src folder

```
	yarn run watch
```

Publish /dist in surge url

```
	yarn deploy
```