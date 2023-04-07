let {Value} = require("./value")
describe("testing multiplication",()=>{
  	let a = new Value(5)
	let b = new Value(4)
	let c = a.multiply(b)
        c.backprop()
   test("testing the multiplication operation",()=>{
	   expect(c.value).toEqual(20)
   })
	test("test the gradient for the multiplication operation",()=>{
		expect(a.grad).toEqual(4)
		expect(b.grad).toEqual(5)
		expect(c.grad).toEqual(1)
	})	
   	
})
describe("testing addition",()=>{
  	let a = new Value(5)
	let b = new Value(4)
	let c = a.add(b)
	let d = new Value(-4)
	let e = c.add(d)
        c.backprop()
   test("testing the addition operation",()=>{
	   expect(c.value).toEqual(9)
	   expect(e.value).toEqual(5)
   })
	test("test the gradient for the addition operation",()=>{
		expect(a.grad).toEqual(1)
		expect(b.grad).toEqual(1)
		expect(c.grad).toEqual(1)
	})	
   	
})


describe("testing exponentiation",()=>{
  	let a = new Value(3)
	let b = new Value(2)
	let c = a.pow(b)
        c.backprop()
   test("testing the exponentiation operation",()=>{
	   expect(c.value).toEqual(9)
   })
	test("test the gradient for the exponentiation operation",()=>{
		expect(a.grad).toEqual(6)
		expect(b.grad).toEqual(0)
		expect(c.grad).toEqual(1)
	})	
   	
})

describe("testing Relu activation function",()=>{
  	let a = new Value(3)
	let b = new Value(2)
	let c = a.multiply(b)
	let e = c.relu()
        e.backprop()
   test("testing the relu function for positive z",()=>{
	   expect(e.value).toEqual(6)
   })
      let f = new Value(-2)
      let g = new Value(3)
      let h = f.multiply(g)
      let i = h.relu()
      console.log(i)
       test("testing the relu function for negative z",()=>{
	   expect(h.value).toEqual(-6)
	   expect(i.value).toEqual(0)
   })

	test("test the gradient for the relu operation for positive z",()=>{
		expect(a.grad).toEqual(12)
		expect(b.grad).toEqual(18)
		expect(c.grad).toEqual(6)
	})
       i.backprop()	
	test("test the gradient for the relu operation for negative z",()=>{
		expect(h.grad).toEqual(0)
	})	
 
   	
})

