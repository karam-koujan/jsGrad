
class Value{
	constructor(value,operation=""){
           this.value = value 
	   this.operation = operation  
           this.grad = operation ? 1 : undefined 
	   	
	}
	add(other){
           let result = new Value(this.value + other.value,"+")
           this.grad = result.grad * this.grad 
	   other.grad = result.grad * this.grad	
	   return result 
	}
	multiply(other){
	    let result = new Value(this.value * other.value,"*")
            this.grad = other.value * result.grad 
	    other.grad = this.value * result.grad 
	    return result 

	}
	exp(){  	
	  let result = new Value(Math.exp(this.value),"exp")
	   this.grad = result.value * this.grad 
	    	
	   return result 

	}
	pow(n){
          let result = new Value(Math.pow(this.value,n.value),"pow")
	  this.grad = n.value * Math.pow(this.value,n.value - 1) * result.grad 
	  return result 
	}
	tanh(){
	   let z = this.value 
           let result = new Value((Math.exp(z) - Math.exp(-z) ) / (Math.exp(z) + Math.exp(-z)),"tanh") 
	  this.grad = (1 - Math.pow(result.value,2)) * this.grad
	  return result 
 
	}

}


class Perceptron{
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

}

class Layer{
	constructor(nin,nout){
		this.neurons = [] 
		for(let i = 0 ; i < nout;i++){
			this.neurons.push(new Perceptron(nin))
		}
	}
	call(x){
	     let out = this.neurons.map(neuron=>neuron.call(x))
	     return out.length === 1 ? out[0] : out	
	 }
}

const x = [new Value(2),new Value(5)]
const l = new Layer(2,2)
let d = l.call(x)
console.log(d)
