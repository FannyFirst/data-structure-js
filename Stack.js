//后进先出
let Stack = function () {
    this.elements = [];
    //push
    Stack.prototype.push = function (element) {
        this.elements.push(element);
    };
    Stack.prototype.pop = function () {
        return this.elements.pop();
    };
    Stack.prototype.size = function () {
        return this.elements.length;
    };
    Stack.prototype.isEmpty = function () {
        return this.elements.length === 0;
    };
    Stack.prototype.frontFace = function () {
        return this.elements[this.elements.length - 1];
    };


};

//test
let stack = new Stack();
console.log(stack);
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.size());

console.log(stack.pop());
console.log(stack.pop());

console.log(stack.frontFace());

console.log(stack.isEmpty());