### Default

```js
<DelaunayHero>
  <h1>Technologic</h1>
  <p>
Buy it, use it, break it, fix it, trash it, change it, mail, upgrade it
Charge it, point it, zoom it, press it, snap it, work it, quick erase it
Write it, cut it, paste it, save it, load it, check it, quick rewrite it
Plug it, play it, burn it, rip it, drag it, drop it, zip - unzip it
Lock it, fill it, call it, find it, view it, code it, jam, unlock it
Surf it, scroll it, pause it, click it, cross it, crack it, switch, update it
Name it, read it, tune it, print it, scan it, send it, fax, rename it
Touch it, bring it, pay it, watch it, turn it, leave it, stop, format it
  </p>
</DelaunayHero>
```

### With all props

```js
<DelaunayHero
  width="100%"
  height={400}
  color="orange"
  backgroundColor="white"
  borderColor={null}
  maxPoints={50}
  maxSpeed={0.6}
  minSpeed={0.5}
  lineWidth={0.8}
  lineColor="orange"
  animate={false}
  debug={false}
  distribute="quasirandom"
>
  <h1>Technologic</h1>
  <h2>Buy it, use it, break it, fix it</h2>
</DelaunayHero>
```

### Color

```js
<DelaunayHero width="100%" height={300} color="blue">
  <h1>Technologic</h1>
  <h2>Buy it, use it, break it, fix it</h2>
</DelaunayHero>
```

### 1000 points

```js
<DelaunayHero width="100%" height={300} color={'blue'} maxPoints={1000} lineWidth={0.01}>
  <h1>Technologic</h1>
  <h2>Buy it, use it, break it, fix it</h2>
</DelaunayHero>
```

### Animate

#### Default speed

```js
<DelaunayHero width="100%" height={300} animate>
  <h1>Technologic</h1>
  <h2>Buy it, use it, break it, fix it</h2>
</DelaunayHero>
```

#### Quicker

```js
<DelaunayHero width="100%" height={300} animate   maxSpeed={10} minSpeed={2}>
  <h1>Technologic</h1>
  <h2>Buy it, use it, break it, fix it</h2>
</DelaunayHero>
```

### Fill

### Gradient

```js
<DelaunayHero width="100%" height={300} fillColor="gradient"  lineColor="gradient" lineWidth={0.01} maxPoints={100} >
  <h1>React Delaunay Hero</h1>
  <h2>Triangulate. Animate.</h2>
</DelaunayHero>
```

### Custom

```js
<DelaunayHero width="100%" height={300} fillColor={() => '#'+Math.random().toString(16).slice(-6)}  lineWidth={0.01} maxPoints={100} >
  <h1>Technologic</h1>
  <h2>Buy it, use it, break it, fix it</h2>
</DelaunayHero>
```


### Distribution

#### Horizontal distribution

```js
<DelaunayHero width="100%" height={300} distribute="horizontal" animate>
  <h1>Technologic</h1>
  <h2>Buy it, use it, break it, fix it</h2>
</DelaunayHero>
```

#### Vertical distribution

```js
<DelaunayHero width="100%" height={300} distribute="vertical" animate>
  <h1>Technologic</h1>
  <h2>Buy it, use it, break it, fix it</h2>
</DelaunayHero>
```

#### Pseudo-random distribution

```js
<DelaunayHero width="100%" height={300} distribute="pseudorandom">
  <h1>Technologic</h1>
  <h2>Buy it, use it, break it, fix it</h2>
</DelaunayHero>
```

#### Quasi-random distribution

```js
<DelaunayHero
  width="100%"
  height={300}
  distribute="quasirandom"
  borderColor="red"
>
  <h1>Technologic</h1>
  <h2>Buy it, use it, break it, fix it</h2>
</DelaunayHero>
```

### Debug

```js
<DelaunayHero width="100%" height={300} debug borderColor="red">
  <h1>Technologic</h1>
  <h2>Buy it, use it, break it, fix it</h2>
</DelaunayHero>
```
