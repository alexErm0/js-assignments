'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width,
    this.height = height,
    Rectangle.prototype.getArea = function() {
        return this.width * this.height
    }
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj)
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    return Object.setPrototypeOf(JSON.parse(json), proto)
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
    element: function(value) {
        let current = new SuperElement();
        return current.element(value);
    },
    id: function(value) {
        let current = new SuperElement();
        return current.id(value);
    },
    class: function(value) {
        let current = new SuperElement();
        return current.class(value);
    },
    attr: function(value) {
        let current = new SuperElement();
        return current.attr(value);
    },
    pseudoClass: function(value) {
        let current = new SuperElement();
        return current.pseudoClass(value);
    },
    pseudoElement: function(value) {
        let current = new SuperElement();
        return current.pseudoElement(value);
    },
    combine: function(selector1, combinator, selector2) {
        let current = new SuperElement();
        current.setValue(selector1.stringify() + " " + combinator + " " + selector2.stringify());
        return current;
    },
};

class SuperElement{
    constructor(){
        this.str = "";
        this.flagOrder = "0";
        this.flagRepeat = Array(3).fill(true);
    }
    setValue(val){
        this.str = val;
    }
    element(strEl){
        this.flagOrder += "1";
        if(
            this.flagOrder[this.flagOrder.length - 1] > this.flagOrder[this.flagOrder.length - 2] &&
            this.flagRepeat[0]
        ) this.str += strEl;
        else if(this.flagOrder[this.flagOrder.length - 1] < this.flagOrder[this.flagOrder.length - 2]){
                throw new Error(
                    'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
		)
            }
            else throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
        this.flagRepeat[0] = false;
        return this;
    }
    id(strId){
        this.flagOrder += "2";
        if(
            this.flagOrder[this.flagOrder.length - 1] > this.flagOrder[this.flagOrder.length - 2] &&
            this.flagRepeat[1]
        ) this.str += "#"+strId;
        else if(this.flagOrder[this.flagOrder.length - 1] < this.flagOrder[this.flagOrder.length - 2]){
                throw new Error(
                    'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
                )
            }
            else throw new Error(
                'Element, id and pseudo-element should not occur more then one time inside the selector'
            );
        this.flagRepeat[1] = false;
        return this;
    }
    class(strCl){
        this.flagOrder += "3";
        if(this.flagOrder[this.flagOrder.length - 1] >= this.flagOrder[this.flagOrder.length - 2]){
            this.str += `.${strCl}`;
        }
        else throw new Error(
            'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
        )
        return this;
    }
    attr(strAt){
        this.flagOrder += "4";
        if(this.flagOrder[this.flagOrder.length - 1] >= this.flagOrder[this.flagOrder.length - 2]){
            this.str += `[${strAt}]`;
        }
        else throw new Error(
            'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
        )
        return this;
    }
    pseudoClass(strPC){
        this.flagOrder += "5";
        if(this.flagOrder[this.flagOrder.length - 1] >= this.flagOrder[this.flagOrder.length - 2]){
            this.str += `:${strPC}`;
        }
        else throw new Error(
            'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
        )
        return this;
    }
    pseudoElement(strPE){
        this.flagOrder += "6";
        if(this.flagRepeat[2]) this.str += `::${strPE}`;
        else if(this.flagOrder[this.flagOrder.length - 1] < this.flagOrder[this.flagOrder.length - 2]){
                throw new Error(
                    'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
                )
            }
            else throw new Error(
                'Element, id and pseudo-element should not occur more then one time inside the selector'
            );
        this.flagRepeat[2] = false;
        return this;
    }
    stringify(){
        return this.str;
    }
    combine(){
        return this;
    }
}

module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
