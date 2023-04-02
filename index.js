let {Value} = require("./value")
let {MLP} = require("./neuralNetwork")

let x = [[5,9]]
let y = [1,5] 
let nn = new MLP(2,[2,1])
let out = nn.call(x[0])

console.log(out)
cost = out.add(new Value(-1)).add(new Value(1)).pow(new Value(2))



