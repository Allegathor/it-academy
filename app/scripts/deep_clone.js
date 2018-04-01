var deepClone = function(val) {
	var type = typeof val;

	if(!val || type === 'number' || type === 'string') {
		return val;
	} else if(Array.isArray(val)) {
		var clone = val.slice();

		val.forEach(function(el, i) {
			clone[i] = deepClone(el);
		})

	} else if (type === 'object') {
		var clone = Object.create(val);

		for(var prop in val) {
			clone[prop] = deepClone(val[prop]);
		}
	}

	return clone;
}

var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
var h2=deepClone(h1);

console.log(h1===h2, 'Must be false')
console.log(typeof(h2)===typeof(h1), 'Must be true')
console.log(h1.a===h2.a, 'Must be true')
console.log(h1.b===h2.b, 'Must be false')
console.log(h1.b.b1===h2.b.b1, 'Must be true')
console.log(h1.c===h2.c, 'Must be false')
console.log(h1.c[0]===h2.c[0], 'Must be true')
console.log(h1.d===h2.d, 'Must be true')
console.log(h1.e===h2.e, 'Must be true')
console.log(isNaN(h2.f), 'Must be true')

var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
var a2=deepClone(a1);

console.log(a1===a2, 'Must be false')
console.log(typeof(a2)===typeof(a1), 'Must be true')
console.log(a1[0]===a2[0], 'Must be true')
console.log(a1[1]===a2[1], 'Must be false')
console.log(a1[1].b1===a2[1].b1, 'Must be true')
console.log(a1[2]===a2[2], 'Must be false')
console.log(a1[2][0]===a2[2][0], 'Must be true')
console.log(a1[3]===a2[3], 'Must be true')
console.log(a1[4]===a2[4], 'Must be true')
console.log(isNaN(a2[5]), 'Must be true')

var v1="sss";
var v2=deepClone(v1);

console.log(typeof(v2)===typeof(v1), 'Must be true')
console.log(v1===v2, 'Must be true')

var z1=null;
var z2=deepClone(z1);

console.log(typeof(z2)===typeof(z1), 'Must be true')
console.log(z1===z2, 'Must be true')

var n1=Number.NaN;
var n2=deepClone(n1);

console.log(typeof(n2)===typeof(n1), 'Must be true')
console.log(isNaN(n2), 'Must be true')
