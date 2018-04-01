var isLeapYear = function(year) {

	if(year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
		return true;
	}

	return false;
}

var calcDays = function(month, year) {
	month = parseInt(month);
	month =
		(!isNaN(month) && (month >= 1 && month <= 12)) ?
		month : 1;

	year = parseInt(year);
	year = (!isNaN(year)) ? year : 2000;

	if(month <= 7) {
		if(month === 2) return (isLeapYear(year)) ? 29 : 28;
		return (month & 1) ? 31 : 30;
	} else {
		return !(month & 1) ? 31 : 30;
	}
}

console.log(calcDays(1, 2018));
console.log(calcDays(2, 2000));
console.log(calcDays(2, 2088));
console.log(calcDays(2, 1804));
console.log(calcDays(2, 1880));
console.log(calcDays(2, 2001));
console.log(calcDays(2, 1925));
console.log(calcDays(3, 2018));
console.log(calcDays(4, 2018));
console.log(calcDays(5, 2018));
console.log(calcDays(6, 2018));
console.log(calcDays(7, 2018));
console.log(calcDays(8, 2018));
console.log(calcDays(9, 2018));
console.log(calcDays(10, 2018));
console.log(calcDays(12, 2018));

console.log(calcDays('44', '1912'));
console.log(calcDays('2', null));
console.log(calcDays(null, null));
console.log(calcDays());
