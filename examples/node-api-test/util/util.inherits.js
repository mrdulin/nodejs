var util = require('util');

function Base() {
    this.name = 'base';
    this.year = 2016;
    this.sayHello = function() {
        console.log('Hello ' + this.name + ', ' + 'this is ' + this.year);
    }
}

Base.prototype.showName = function() {
    console.log(this.name);
}

Base.prototype.showYear = function() {
    console.log(this.year);
}

function Child() {
    this.name = 'child';
}

//语法：util.inherits(constructor, superConstructor)
util.inherits(Child, Base);

var objBase = new Base();
objBase.showName();
objBase.showYear();
objBase.sayHello();
console.log(objBase);

var objChild = new Child();
objChild.showName();
objChild.showYear();
//objBase.sayHello();
console.log(objChild);

//使用util.inherits方法时，基类构造函数内部创造的属性和方法均不会子类所继承，只有通过原型上的方法和属性才会被子类继承。