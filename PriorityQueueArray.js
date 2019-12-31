//Priority Queue

let PriorityQueueArray = function () {
    this.elements = [];
    let ElementContent = function (element, weight) {
        this.element = element;
        this.weight = weight;
    };
    PriorityQueueArray.prototype.enqueue = function (element, weight) {
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
    PriorityQueueArray.prototype.dequeue = function () {
        return this.elements = function (elements) {
            let temp = [];
            for (let i = 0; i < elements.length - 1; i++) temp[i] = elements[i + 1];
            return temp;
        }(this.elements);
    };
    PriorityQueueArray.prototype.front = function () {
        return this.elements[0];
    };
    PriorityQueueArray.prototype.size = function () {
        return this.elements.length;
    };
    PriorityQueueArray.prototype.isEmpty = function () {
        return this.elements.length === 0;
    };
};

//test
/*let PriorityQueueArray = new PriorityQueueArray();
PriorityQueueArray.enqueue(1, 1);
PriorityQueueArray.enqueue(2, 20);
PriorityQueueArray.enqueue(3, 10);

console.log(PriorityQueueArray.dequeue());

console.log(PriorityQueueArray.front());

console.log(PriorityQueueArray.size());

console.log(PriorityQueueArray.isEmpty());*/
