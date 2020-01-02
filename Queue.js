
let Queue = function () {
    this.elements = new LinkedList();
    Queue.prototype.enqueue = function (element) {
        this.elements.append(element);
    };
    Queue.prototype.dequeue = function () {
        return this.elements.removeAt();
    };
    Queue.prototype.front = function () {
        return this.elements.head.data;
    };
    Queue.prototype.size = function () {
        return this.elements.size();
    };
    Queue.prototype.isEmpty = function () {
        return this.elements.isEmpty();
    };
};




