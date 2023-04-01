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
	  let out = x ; 
	  for(let i = 0 ; i < this.layers.length;i++){
             out = this.layers[i].call(out) 
	   }
	  return out  	
	}
}

module.exports = {
 Layer,
 MLP 	
}
