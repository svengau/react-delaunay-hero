# React Delaunay Hero

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
  height={400}
  color="orange"
  maxPoints={50}
  maxSpeed={0.6}
  minSpeed={0.5}
  animate
>
    <h1>My Hero</h1>
    <p>Hello World!</p>
</DelaunayHero>

```

## Thanks

Setting up the project has been largely inspired by this wonderful [codepen](https://codepen.io/tibomahe/pen/KKPbzJy) project.