let {Value} = require("./value")
class Neuron{
	constructor(nin){
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
		return sum.add(this.bias).tanh()
	}
	params(){
	   return [...this.weight,this.bias] 	
	}
}
class Layer{
	constructor(nin,nout){
		this.neurons = [] 
		for(let i = 0 ; i < nout;i++){
			this.neurons.push(new Neuron(nin))
		}
	}
	call(x){
	     let out = this.neurons.map(neuron=>neuron.call(x))
	     return out.length === 1 ? out[0] : out	
	 }
	params(){
           return this.neurons.map(neuron=>neuron.params()).flat()
	}
}

class MLP{
	constructor(nin,nouts){
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
