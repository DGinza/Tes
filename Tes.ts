// Tes object allow repeated values of any type to be store  

class Tes {
	public elements: any = {} // store elements with the numbers of time that was repeated
	private _size: number = 0 // size of elements

	constructor(arr: any[] = []) {
		this.add(arr)		
	}

	// check if the element passed is an object or a string that can be converted to an object
	private isObject(el: object | string): boolean {
		let _isObject: boolean

		if(typeof el === 'object') _isObject = true
		else {

			try {
				JSON.parse(el)
				_isObject = true
			}
			catch(err) {
				_isObject = false
			}
		}

		return _isObject
	}

	// add repeated values to this.elements
	public add(arr: any[]): void {

		for(let element of arr) {

			if(this.isObject(element)) element = JSON.stringify(element)
			if(this.elements[element]) {
				this.elements[element]++
				continue
			}

			this.elements[element] = 1
		}

		this.elements = Object.fromEntries(Object.entries(this.elements).filter(([key, value]) => {
			if(typeof value === 'number') return value > 1
		}))

		this._size = this.values().length
	}

	// return values converted to his respective types
	public values(): any[] {
		return Object.keys(this.elements).map(el => {
			let element: any = el

			if(this.isObject(element)) {
				element = JSON.parse(el)
			}
			else if(!isNaN(element)) {
				element = Number(el)
			}
			return element

		})
	}

	// return length of values method
	public get size(): number {
		return this._size
	}

	public set size(num: number) {
		throw new Error("¡Cannot manually change size property!")
	}

	// check if argument exist into this.elements
	public has(element: any): boolean {
		let exist: boolean = false

		if(this.isObject(element)) element = JSON.stringify(element)
		if(this.elements[element]) exist = true

		return exist 
	}

	// deletes a element from this.elements
	public delete(element: any): void {
		delete this.elements[element]
		this._size = this.values().length
	}

	// deletes all elements of this.elements by simply assigning another value to it
	public clear(): void {
		
		this.elements = {}
		this._size = 0
	}

}

module.exports = Tes