'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
	if(num%3!=0 && num%5!=0) return num
	if(num%3==0 && num%5==0) return "FizzBuzz"
	if(num%5==0) return "Buzz"
	return "Fizz"		
}


/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
	let i=1;
	let fact=1;
	while(i<n){
		i++;
		fact *=i;
	}
	return fact
}


/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
	let sum = 0;
	for(let i=n1; i<=n2; i++) sum +=i;
	return sum
}


/**
 * Returns true, if a triangle can be built with the specified sides a,b,c and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a,b,c) {
	if(a+b<=c)return false
	if(c+b<=a)return false
	if(a+c<=b)return false
	return true
}


/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object 
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 * 
 *  (5;5)
 *     -------------  
 *     |           | 
 *     |           |  height = 10
 *     ------------- 
 *        width=20    
 * 
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 * 
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 * 
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *  
 */
function doRectanglesOverlap(rect1, rect2) {
	function compare(rec1, rec2){
		if (rec1.top + rec1.height>=rec2.top && rec1.left + rec1.width >= rec2.left) return true
		else return (rec1.top + rec1.height>=rec2.top && rec1.left + rec1.width >= rec2.left+rec2.width)
	}
	let result = rect1.top < rect2.top ? compare(rect1, rect2): compare(rect2, rect1);
	return compare(rect1, rect2)
}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of 
 *  {
 *     center: {
 *       x: 5,       
 *       y: 5
 *     },        
 *     radius: 20
 *  }
 * 
 * Point is object of 
 *  {
 *     x: 5,
 *     y: 5
 *  }
 * 
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *   
 */
function isInsideCircle(circle, point) {
	let dirLine= Math.hypot(circle.center.x - point.x ,circle.center.y - point.y);
	return !(dirLine>=circle.radius)
}


/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
	for(let i =0;i<str.length;i++){
		let sum=0;
		for(let j =0;j<str.length;j++){
			if(str[j].includes(str[i])) sum++
		}
		if(sum==1) return str[i]
	}
	return null
}


/**
 * Returns the string representation of math interval, specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
	if(a>b){
		var a1=b;
		var b1=a
	}
	else {
		var a1=a;
		var b1=b
	}
	let brOpen = "";
	let brClose = "";
	isStartIncluded==true ? brOpen = "[": brOpen = "(";
	isEndIncluded==true ? brClose = "]": brClose = ")";
	return brOpen+a1+", "+b1+brClose
}


/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
	let result = "";
	for(let i = 0; i<str.length; i++) result += str[str.length-1-i]
	return result
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
	let str = 0;
	let num1 = new String(num);
	for(let i = 1; i<=num1.length; i++) str += Math.pow(10, num1.length-i)*(Math.floor(num/Math.pow(10, i-1))%10);
	return str
}


/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
	let sum = 0;
	let num = new String(ccn);
	for (let i = 0; i < num.length; i++) {
		let card = parseInt(num[i]);
		if ((num.length - i) % 2 === 0) {
			card = card * 2;
			if (card > 9) {
				card = card - 9;
			}
		}
		sum += card;
	}
	return sum % 10 === 0;
}


/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
	let sum = num;
	function func(num){
		num = new String(num);
		let result=0;
		for(let i = 0; i < num.length; i++) result +=new Number(num[i]);
		return result
	}
	while(sum>9)sum = func(sum);
	return sum
}


/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true 
 */
function isBracketsBalanced(str) {
	let massIn = ["{", "[", "(", "<"];
	let massOut = ["}", "]", ")", ">"];
	if(str.length%2==1) return false
	let sum = Array(4).fill(0);
	let index = Array(4).fill(0);
	for(let i = 0; i < 4; i++){
		for(let j = 0; j < str.length-1; j++){
			if(str[j]==massIn[i]){
				if(massOut[j+1]==str[j+1]&& str[j+1]!=massOut[i]) return false
			}
		}
	}for(let i = 0; i < 4; i++){
		for(let j = 0; j < str.length; j++){
			if(str[j]==massIn[i]){
				sum[i] += 1;
				if(sum[i]==1)index[i] = j;
			}
		}
	}
	for(let i = 0; i < 4; i++){
		for(let j = index[i]+1; j < str.length; j++){
			if(sum[i]!=0){
				if(str[j]==massOut[i])sum[i] -= 1;
			}			
		}
		if (sum[i]!=0) return false
	}
	for(let i = 0; i < 4; i++){
		for(let j = 0; j < str.length-1; j++){
			if(str[j]==massIn[i]){
				for(let n = 0; n < 4; n++){
					if(massOut[n]==str[j+1]&& str[j+1]!=massOut[i]) return false
				}
			}
		}
	}
	return ((sum[0]+sum[1]+sum[2]+sum[3])==0)
}


/**
 * Returns the human readable string of time period specified by the start and end time.
 * The result string should be constrcuted using the folliwing rules:
 *
 * ---------------------------------------------------------------------
 *   Difference                 |  Result
 * ---------------------------------------------------------------------
 *    0 to 45 seconds           |  a few seconds ago
 *   45 to 90 seconds           |  a minute ago
 *   90 seconds to 45 minutes   |  2 minutes ago ... 45 minutes ago
 *   45 to 90 minutes           |  an hour ago
 *  90 minutes to 22 hours      |  2 hours ago ... 22 hours ago
 *  22 to 36 hours              |  a day ago
 *  36 hours to 25 days         |  2 days ago ... 25 days ago
 *  25 to 45 days               |  a month ago
 *  45 to 345 days              |  2 months ago ... 11 months ago
 *  345 to 545 days (1.5 years) |  a year ago
 *  546 days+                   |  2 years ago ... 20 years ago
 * ---------------------------------------------------------------------
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 *
 * @example
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:00.200')  => 'a few seconds ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:05.000')  => '5 minutes ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-02 03:00:05.000')  => 'a day ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2015-01-02 03:00:05.000')  => '15 years ago'
 *
 */
function timespanToHumanString(startDate, endDate) {
	let diffSec = Math.abs(endDate.getTime()-startDate.getTime());
	if (diffSec<=1000*45) return "a few seconds ago"
	if (diffSec<=1000*90) return "a minute ago"
	if (diffSec<=1000*45*60) return Math.round((diffSec-1)/60/1000)+" minutes ago"
	if (diffSec<=1000*90*60) return "an hour ago"
	if (diffSec<=1000*22*3600) return Math.round((diffSec-1)/3600/1000)+" hours ago"
	if (diffSec<=1000*36*3600) return "a day ago"
	if (diffSec<=1000*25*24*3600) return Math.round((diffSec-1)/24/3600/1000)+" days ago"
	if (diffSec<=1000*45*24*3600) return "a month ago"
	if (diffSec<=1000*345*24*3600) return Math.round((diffSec-1)/30/24/3600/1000)+" months ago"
	if (diffSec<=1000*545*24*3600) return "a year ago"
	if (diffSec>1000*545*24*3600) return Math.round((diffSec-1)/12/30/24/3600/1000)+" years ago"
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n<=10) representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
	let str = "";
	let a=1;
	let index=0;
	let con=0;
	while(a<=num){
		a*=n;
		index++;
	}
	for(let i = 0; i < index; i++){
		a=a/n;
		if(num<a && i!=0) str+="0"
		else {
			while(num>=a){
				con++;
				num -=a;
			}
			str+=con;
			con=0;
		}
	}
	return str
}


/**
 * Returns the commom directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
	let Piece = "";
	for(let i = 0; i < pathes[0].length; i++){
		var flag = "";
		for(let j = 1; j < pathes.length; j++){
			flag = true;
			flag = (pathes[0].charAt(i)==pathes[j].charAt(i) && flag)
		}
		if(flag){
			Piece += pathes[0].charAt(i);
		}
		else break
	}
	if(Piece.endsWith("/")!=true)Piece = Piece.slice(0, Piece.lastIndexOf("/")+1);
	return Piece
}


/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
	let m3 = new Array(m2[0].length);
	for(let i = 0; i < m2[0].length; i++){
		m3[i] = new Array(m1.length);
	}
	for(let i = 0; i < m2[0].length; i++){
		for(let j = 0; j < m1.length; j++){
			let el = 0;
			for(let n = 0; n < m2.length; n++){
				el += m1[i][n]*m2[n][j];
			}
			m3[i][j]= el;
		}
	}
	return m3
}


/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
	let b = "";
	let a = "";
	for(let i = 0; i < position.length; i++){
		let strLine = "";
		let strFirst = "";
		for(let j = 0; j < position.length; j++){
			if(position[j][i]=="0") strFirst +="0";
			else if(position[j][i]=="X") strFirst +="X";
			
			if(position[i][j]=="0") strLine +="0";
			else if(position[i][j]=="X") strLine +="X";
		}
		if (strFirst=="XXX"||strLine=="XXX") return "X" 
		if (strFirst=="000"||strLine=="000") return "0"
		
		if(position[i][i]=="X"||position[position.length-i-1][position.length-i-1]=="X") a+="X"
		if(position[i][i]=="0"||position[position.length-i-1][position.length-i-1]=="0") a+="0"
		
		if(position[position.length-i-1][i]=="X") b+="X";
		if(position[position.length-i-1][i]=="0") b+="0";
	}
	if(a=="XXX"||b=="XXX")return "X"
	if(a=="000"||b=="000")return "0"
	return undefined
}


module.exports = {
    getFizzBuzz: getFizzBuzz,
    getFactorial: getFactorial,
    getSumBetweenNumbers: getSumBetweenNumbers,
    isTriangle: isTriangle,
    doRectanglesOverlap: doRectanglesOverlap,
    isInsideCircle: isInsideCircle,
    findFirstSingleChar: findFirstSingleChar,
    getIntervalString : getIntervalString,
    reverseString: reverseString,
    reverseInteger: reverseInteger,
    isCreditCardNumber: isCreditCardNumber,
    getDigitalRoot: getDigitalRoot,
    isBracketsBalanced: isBracketsBalanced,
    timespanToHumanString : timespanToHumanString,
    toNaryString: toNaryString,
    getCommonDirectoryPath: getCommonDirectoryPath,
    getMatrixProduct: getMatrixProduct,
    evaluateTicTacToePosition : evaluateTicTacToePosition
};