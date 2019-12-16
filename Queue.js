//先进先出

let Queue = function () {
    this.elements = [];
    Queue.prototype.enqueue = function (element) {
        this.elements.push(element);
    };
    Queue.prototype.dequeue = function () {
        return this.elements = function (elements) {
            let temp = [];
           for(let i = 0;i<elements.length-1;i++)temp[i] = elements[i+1];
           return temp;
        }(this.elements);
    };
    Queue.prototype.front = function () {
            return this.elements[0];
    };
    Queue.prototype.size = function () {
        return this.elements.length;
    };
    Queue.prototype.isEmpty = function () {
        return this.elements.length ===0;
    };
};

//test

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.dequeue());
console.log(queue.dequeue());

console.log(queue.front());

console.log(queue.size());

console.log(queue.isEmpty());


