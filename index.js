let {Value} = require("./value")
let {MLP} = require("./neuralNetwork")

let x = [[5,9]]
let y = [1] 
let nn = new MLP(2,[2,1])
let out = nn.call(x[0])
function cost(x,y,nn){
	let sum = 0
	for(let i = 0 ; i < x.length;i++){
	    let out = nn.call(x[i]) 
	    sum = out.add(new Value(-1)).add(new Value(y[i])).pow(new Value(2))        
         } 
	sum = sum.pow(new Value(-x.length))
	return sum 

}
let error = cost(x,y,nn)
error.backprop()
let params = nn.params()
let learningRate = 0.001
console.log(params[0])

for(let i = 0 ; i < 20 ; i++){
	for(let j = 0 ; j < nn.params.length;j++){
		params[j].value = params[j].value -  learningRate * params.grad     
	}
}
console.log(params[0])


