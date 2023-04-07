# jsGrad 

JsGrad is a compact library designed to assist in the calculation of gradients through backpropagation.

## Example 

```js
   let a = new Value(5)
   let b = new Value(4)
   let c = a.multiply(b)
   console.log(c) // 20
   // gradients calulation with backpropagation 
   c.backprop()
   console.log(a.grad) // 4
   console.log(b.grad) // 5

```
## Building a Basic Neural Network

```js 
  let x = [[5,6],[1,2],[3,1],[1,5]]
  let y = [[1],[-1],[1],[-1]]
  // a neural network with 2 inputs, 2 hidden layers and a single output
  let nn = new MLP(2,[4,4,1])
  // mean squared error cost function
  function cost(x,y){
	let sum = new Value(0)
	for(let i = 0 ; i < x.length;i++){
	    let out = nn.call(x[i])
		out  = out.add(new Value(y[i][0])).add(new Value(-1)).pow(new Value(2))           
		sum = sum.add(out)
            
	}
	let loss = sum.divide(new Value(x.length)) 
	return loss 

  }


  let numberOfIterations = 10
  let params = nn.params()
  let learningRate = 0.5
  // parameter optimization
  for(let i = 0 ; i < numberOfIterations ; i++){
	
       let error = cost(x,y)
       nn.zeroGrad()
       // backpropagation 
       error.backprop()
       // gradient descent
	for(let j = 0 ; j < params.length;j++){
		params[j].value = params[j].value -  learningRate * params[j].grad     
	}

  }

```
## Test 

```bash
  npm run test 
```
