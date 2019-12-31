let PriorityQueue = function () {
    this.elements = new DoublyLinkedList();

    let ElementContent = function (element, weight) {
        this.element = element;
        this.weight = weight;
    };

    PriorityQueue.prototype.enqueue = function (element, weight = 0) {
        const that = this, newElement = new ElementContent(element, weight);
        if (weight) {
            return this.elements.traversal(function (node) {
                if (node.data.weight <= weight) {
                    that.elements.insert(newElement, that.elements.indexOf(node));
                    return true;
                } else if (!node.next) {
                    that.elements.append(newElement);
                    return true;
                } else
                    return false;
            });
        } else {
            return this.elements.append(newElement);
        }

        //this.insert(new ElementContent(element,weight));
    };
    PriorityQueue.prototype.dequeue = function () {
        return this.elements.removeAt()
    };
    PriorityQueue.prototype.front = function () {
        return this.elements.get();
    };
    PriorityQueue.prototype.size = function () {
        return this.elements.size();
    };
    PriorityQueue.prototype.isEmpty = function () {
        return this.elements.isEmpty();

    };
};