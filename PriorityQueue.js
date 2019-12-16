//Priority Queue

let PriorityQueue = function () {
    this.elements = [];
    let ElementContent = function (element, weight) {
        this.element = element;
        this.weight = weight;
    };
    PriorityQueue.prototype.enqueue = function (element, weight) {
        const temp = new ElementContent(element, weight);
        if (!this.elements.length) this.elements[0] = temp;
        else {
            if (this.elements.length <= 100) {
                let flag = 0;
                while (flag < this.elements.length) {
                    if (this.elements[flag].weight <= weight &&
                        (this.elements[++flag] === undefined || this.elements[flag].weight > weight)){

                       this.elements.splice(flag, 0, temp);
                        break;
                    }

                    else flag++;
                }
            }
        }
    };
    PriorityQueue.prototype.dequeue = function () {
        return this.elements = function (elements) {
            let temp = [];
            for (let i = 0; i < elements.length - 1; i++) temp[i] = elements[i + 1];
            return temp;
        }(this.elements);
    };
    PriorityQueue.prototype.front = function () {
        return this.elements[0];
    };
    PriorityQueue.prototype.size = function () {
        return this.elements.length;
    };
    PriorityQueue.prototype.isEmpty = function () {
        return this.elements.length === 0;
    };
};

//test
let priorityQueue = new PriorityQueue();
priorityQueue.enqueue(1, 1);
priorityQueue.enqueue(2, 20);
priorityQueue.enqueue(3, 10);

console.log(priorityQueue.dequeue());

console.log(priorityQueue.front());

console.log(priorityQueue.size());

console.log(priorityQueue.isEmpty());
