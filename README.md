# vanilla complete

This is an introductory course on vanilly javascript from scratch. We are going to build everything for a single page application from scratch. We are going to create an empty folder in our dev folder where we store our javascript projects and we are going to name i vanilla-complet. We are starting with our README.md file. Next we are going to generate our project using this line:

```js
npm init -y
```

Now we have our starting point. Before we link up to github, let's create out .gitignore file and we can do so by typing this code:

```js
npx gitignore node
```

Now let's create a repo on github and link everything up.

```js
git init
git add .
git commit -m "Initial commit"
```

Then just copy the git remote line that github provides you. It will look something like this:

```js
git remote add origin https://github.com/C5m7b4/vanilla-complete.git
```

And then finally we need to run this line in our bash:

```js
git push -u origin master
```

## branch 1

On a side note, if you don't already have node installed and you are on windows, visit [this link](https://github.com/coreybutler/nvm-windows#installation--upgrades) to install it. To use it in each project, simply type:

```js
nvm install lts
```

Optionally, to see a list of all versions available you can type

```js
nvm list available
```

[Here is a link to information about nvm](https://www.freecodecamp.org/news/nvm-for-windows-how-to-download-and-install-node-version-manager-in-windows-10/)

Now let's setup webpack which is what we will use to bundle our javascript.

```js
npm install --save-dev webpack webpack-cli
```

Now let's install prettier, which is our best friend.

```js
npm install prettier --save-dev
```

Then create our .prettierrc file. We'll use the defaults

```js
{}
```

Now we are going to install the webpack dev server

```js
npm install --save-dev webpack-dev-server
```

Now let's create a public folder and stub out an index.html file in it. Don't forget to add an h2 element and put something in it.

Now let's install the html-webpack-plugin

```js
npm install --save-dev html-webpack-plugin
```

Now let's build our webpack config file and it should look like this:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3007,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vanilla JS',
      template: 'public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
```

Now let's create our src folder and add an index.js file with nothing but a console log statement so we can make sure that things are working. Then we need to add a script to the package.json so we can test out our work.

run this command

```js
npm start
```

And you should have something like this:

![alt basic-webpack-setup](images/webpack-01.png)

Now let's commit what we have created

```js
git add .
git commit -m "add webpack basic setup"
git push -u origin branch1
```

Now you should have your first real branch and you should see this on github:

![alt first-pull-request](images/first-pull-request.png)

After you merge in the pull request you want to check back out the master, do a pull to get the latest version of master and then create your next branch.

```js
git checkout master
git pull
git checkout -b branch2
```
