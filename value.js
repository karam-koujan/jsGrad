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
                    this.grad += result.grad 
	            other.grad += result.grad 
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
		this.grad = 1 
		for(let element of topo){
			element.backward()
		}

	}

}

module.exports = {
	Value
}
