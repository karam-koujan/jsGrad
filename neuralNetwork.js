let {Value} = require("./value")
class Module{
	constructor(){
	}	
	zeroGrad(){
		let params = this.params()
		for(let i = 0 ; i < params.length;i++){
                         params[i].grad = 0
			}
	}
	params(){
            return [] 
	}
}

class Neuron extends Module{
	constructor(nin){
	      super()	
	    let w = [] 
	     for(let i = 0 ; i < nin;i++){
		w.push( new Value(Math.random() * 1) )	
	    }	
            this.weight = w
	    this.bias = new Value(0)
	    this.nin = nin 
	}
	call(x){
		let sum = new Value(0)
		for(let i = 0 ; i < this.nin;i++){
		    sum = sum.add(this.weight[i].multiply(x[i])) 
		}
		return sum.add(this.bias).relu()
	}
	params(){
	   return [...this.weight,this.bias] 	
	}
}
class Layer extends Module{
	constructor(nin,nout){
		super()
		this.neurons = [] 
		for(let i = 0 ; i < nout;i++){
			this.neurons.push(new Neuron(nin))
		}
	}
	call(x){
	     let out = this.neurons.map(neuron=>neuron.call(x))
	     return out	
	 }
	params(){
           return this.neurons.map(neuron=>neuron.params()).flat()
	}
}

class MLP extends Module{
	constructor(nin,nouts){
           super()
	   this.size = [nin,...nouts]
	   this.layers = [] 
		for(let i = 0 ; i < nouts.length;i++){
			this.layers.push(new Layer(this.size[i],this.size[i+1]))
		}
	}
	call(x){
	  let out = x.map(ele=>new Value(ele)) ;
	  for(let i = 0 ; i < this.layers.length;i++){
             out = this.layers[i].call(out) 
	   }
	  return out  	
	}
	params(){
             return this.layers.map(layer=>layer.params()).flat()
	}
}

module.exports = {
 Layer,
 MLP 	
}
