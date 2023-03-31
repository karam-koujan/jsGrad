
class Value{
	constructor(value,operation=""){
           this.value = value 
	   this.operation = operation  
           this.grad = 0 ; 
	   this.backward = ()=> undefined
	   	
	}
	add(other){
           let result = new Value(this.value + other.value,"+")
	  function  backward(){
                    this.grad += result.grad * this.grad 
	            other.grad += result.grad * this.grad	
		}
	   this.backward = backward 
	   return result 
	}
	multiply(other){
	    let result = new Value(this.value * other.value,"*")
	   function backward(){
               this.grad += other.value * result.grad 
	       other.grad += this.value * result.grad 
              }
          	
	    this.backward = backward	
	    return result 

	}
	exp(){  	
	  let result = new Value(Math.exp(this.value),"exp")
	  function backward(){
            this.grad += result.value * this.grad 

	   }
	   this.backward = backward	    	
	   return result 

	}
	pow(n){
          let result = new Value(Math.pow(this.value,n.value),"pow")
	   function backward(){
           this.grad += n.value * Math.pow(this.value,n.value - 1) * result.grad
	  }
	  this.backward = backward 
      	  return result 
	}
	tanh(){
	   let z = this.value 
           let result = new Value((Math.exp(z) - Math.exp(-z) ) / (Math.exp(z) + Math.exp(-z)),"tanh") 
		function backward(){
	       this.grad += (1 - Math.pow(result.value,2)) * this.grad

		}  
          this.backward = backward
        
	  
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

let x = [new Value(2),new Value(5)]
let nn = new MLP(2,[2,1])
console.log(nn.call(x))
