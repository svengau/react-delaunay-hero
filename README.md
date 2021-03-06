[![npm][npm]][npm-url]
[![node][node]][node-url]
[![downloads][downloads]][downloads-url]

# React Delaunay Hero

![Sample React Delaunay Hero](/example.png)

[![Build Status](https://travis-ci.org/svengau/react-delaunay-hero.svg?branch=master)](https://travis-ci.org/svengau/react-delaunay-hero)

## Purpose

A react component to display an Hero with a [Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation) in background.

## Installation

```bash

npm install react-delaunay-hero --save
# or
yarn add react-delaunay-hero

```

## Usage

### Basics

```js
import Hero from 'react-delaunay-hero';

....

<DelaunayHero
  color="#ffa500"
  maxPoints={50}
  maxSpeed={0.6}
  minSpeed={0.5}
  animate
>
    <h1>My Hero</h1>
    <p>Hello World!</p>
</DelaunayHero>

```

## Documentation

You can find multiple samples on the [dedicated github page](https://svengau.github.io/react-delaunay-hero/).

## Thanks

Setting up the project has been largely inspired by this wonderful [codepen](https://codepen.io/tibomahe/pen/KKPbzJy) project.

[npm]: https://img.shields.io/npm/v/react-delaunay-hero.svg
[npm-url]: https://npmjs.com/package/react-delaunay-hero
[node]: https://img.shields.io/node/v/react-delaunay-hero.svg
[node-url]: https://nodejs.org
[downloads]: https://img.shields.io/npm/dt/react-delaunay-hero.svg
[downloads-url]: https://npmjs.com/package/react-delaunay-hero
