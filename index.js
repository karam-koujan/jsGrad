let {Value} = require("./value")
let {MLP} = require("./neuralNetwork")

let x = [[5,6],[1,2],[3,1],[1,5]]
let y = [[1],[-1],[1],[-1]] 
let nn = new MLP(2,[1,11,1])
function cost(x,y){
	let sum = new Value(0)
	for(let i = 0 ; i < x.length;i++){
	    let out = nn.call(x[i])
		out  = out.add(new Value(y[i][0])).add(new Value(-1)).pow(new Value(2))           
		sum = sum.add(out)
            
	}
	let loss = sum.divide(new Value(x.length)) 
        console.log("loss",loss.value)
	return loss 

}


let numberOfIterations = 10
let params = nn.params()
let learningRate = 0.5
for(let i = 0 ; i < numberOfIterations ; i++){
	
       let error = cost(x,y)
       nn.zeroGrad()
       error.backprop()
	for(let j = 0 ; j < params.length;j++){
		params[j].value = params[j].value -  learningRate * params[j].grad     
	}

}
