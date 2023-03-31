
class Value{
	constructor(value,children=[],operation=""){
           this.value = value 
	   this.operation = operation  
           this.grad = 0 ; 
	   this.backward = ()=> undefined
	   this.prev = children 
	}
	add(other){
           let result = new Value(this.value + other.value,[this,other],"+")
	  function  backward(){
                    this.grad += result.grad * this.grad 
	            other.grad += result.grad * this.grad	
		}
	   this.backward = backward
	   return result
	}
	multiply(other){
	    let result = new Value(this.value * other.value,[this,other],"*")
	   function backward(){
               this.grad += other.value * result.grad 
	       other.grad += this.value * result.grad 
              }
          	
	    this.backward = backward	
	    return result 

	}
	exp(){  	
	  let result = new Value(Math.exp(this.value),[this],"exp")
	  function backward(){
            this.grad += result.value * this.grad 

	   }
	   this.backward = backward	    	
	   return result 

	}
	pow(n){
          let result = new Value(Math.pow(this.value,n.value),[this],"pow")
	   function backward(){
           this.grad += n.value * Math.pow(this.value,n.value - 1) * result.grad
	  }
	  this.backward = backward 
      	  return result 
	}
	tanh(){
	   let z = this.value 
           let result = new Value((Math.exp(z) - Math.exp(-z) ) / (Math.exp(z) + Math.exp(-z)),[this],"tanh") 
		function backward(){
	       this.grad += (1 - Math.pow(result.value,2)) * this.grad

		}  
          this.backward = backward
        
	  
		return result 
 
	}
	backprop(){
          	let visited = []
                let topo = []
		function topoSort(v){
		 let isVisited = visited.some(ele=>Object.is(ele,v))
			if(!isVisited){
                           visited.push(v) 
				for(let child of v.prev){
					topoSort(child)
				}
                          topo.push(v)  
			}
		}
		topoSort(this)
		topo.reverse()
		console.log(topo)
		this.grad = 1 
		for(let element of topo){
			element.backward()
		}

	}

}


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
let a = new Value(2)
let b = new Value(5)
let e = new Value(6)
c = a.multiply(b)
v = c.add(e)
v.backprop()

