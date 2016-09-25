# network-visualization-example

## Description
Examples of network visualization using [d3.js](https://github.com/d3/d3) and [cytoscape.js](https://github.com/cytoscape/cytoscape.js).

### Example Website
https://kimxogus.github.io/network-visualization-example

### D3
<img src="https://kimxogus.github.io/network-visualization-example/img/d3_miserables.jpg" width="48%"/>
<img src="https://kimxogus.github.io/network-visualization-example/img/d3_generated.jpg" width="48%"/>

### Cytoscape
<img src="https://kimxogus.github.io/network-visualization-example/img/cytoscape_miserables.jpg" width="48%"/>
<img src="https://kimxogus.github.io/network-visualization-example/img/cytoscape_generated.jpg" width="48%"/>

## Quick start
#### Make sure you have Node.js

```bash

# --depth 1 removes all but one git commit history
git clone --depth 1 https://github.com/kimxogus/network-visualization-example.git

cd network-visualization-example

npm install

npm start
```

## Comparison between d3 and cytoscape
### D3.js
* Strength
 1. A lot of references.
 2. Various libraries and modules.
* Weakness
 1. Learning curve.
 2. Complex code.
 3. Cannot move objects.

### Cytoscape.js
* Strength
 1. Easy to use. Much less code compared to d3
 2. Able to handle thousands of objects. (Because it's based on HTML canvas)
 3. Free to move objects.
* Weakness
 1. Hard to use with webpack.
    (So I couldn't add other cytoscape ui extensions in this example)
 2. Less libraries and modules compared to d3.

## License
MIT
