let {Value} = require("./value")
let {MLP} = require("./neuralNetwork")

let x = [[5,6],[10,2],[3,1],[1,7]]
let y = [[1],[3],[6],[10]] 
let nn = new MLP(2,[10,10,1])
let out = nn.call(x)
function cost(x,y){
	let sum = new Value(0)
	let normal  = 0 
	for(let i = 0 ; i < x.length;i++){
	    let out = nn.call(x[i])[0]
	      out  = out.add(new Value(-1)).add(new Value(y[i][0])).pow(new Value(2))           
	 	sum = sum.add(out)
		normal+=  (out.value - y[i][0])**2
            
	}
	console.log("loss",sum.value / x.length,normal/x.length)
	return sum.divide(new Value(x.length)) 

}

let numberOfIterations = 100
let params = nn.params()
for(let i = 0 ; i < numberOfIterations ; i++){
	
       let error = cost(x,y)
       nn.zeroGrad()
       error.backprop()
       let learningRate = 1 - (0.5 * numberOfIterations/ 100)
	for(let j = 0 ; j < params.length;j++){
		params[j].value = params[j].value -  learningRate * params[j].grad     
	}

}
