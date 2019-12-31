let LinkedList = function () {
    this.head = null;
    this.length = 0;
    let node = function (data) {
        this.data = data;
        this.next = null;
    };
    LinkedList.prototype.append = function (data) {
        let newNode = new node(data);
        this.length++;
        if (!this.head) {
            this.head = newNode;
            return this.head;
        }
        let current = this.head;
        while (current) {
            if (current.next) {
                current = current.next;
            } else {
                current.next = newNode;
                return this.head;
            }
        }
    };
    LinkedList.prototype.removeAt = function (position = 0) {
        if (this.isEmpty()) return undefined;
        let count = 0, current = this.head, result = null;
        if (!position) {
            result = this.head.data;
            this.head = this.head.next;
            this.length--;
            return result;
        }
        while (current.next) {
            if (position - 1 === count) {

                if (current.next.next)
                    current.next = current.next.next;
                else {
                    result = current.next.data;
                    current.next = null;
                }
                this.length--;
                return result;
            } else {
                current = current.next;
                count++;
            }
        }
    };
    LinkedList.prototype.remove = function (data) {
        if (this.isEmpty()) return undefined;
        let current = this.head, count = 0, result = null;
        while (current.next) {
            if (current.next.data === data) {
                if (current.next.next)
                    current.next = current.next.next;
                else {
                    result = current.next;
                    current.next = null;
                }
                this.length--;
                return result;
            } else {
                current = current.next;
                count++;
            }
        }

    };
    LinkedList.prototype.insert = function (data, position) {
        if (this.isEmpty()) return undefined;
        let current = this.head, count = 0, newNode = new node(data);
        while (current) {
            if (count === position) {
                newNode.next = current.next;
                current.next = newNode;
                this.length++;
                return this.head;
            } else {
                current = current.next;
                count++;
            }
        }
    };
    LinkedList.prototype.get = function (position) {
        if (this.isEmpty()) return undefined;
        let current = this.head, count = 0;
        while (current) {
            if (count === position) {
                return current.data;
            } else {
                current = current.next;
                count++;
            }
        }

    };
    LinkedList.prototype.update = function (position, data) {
        if (this.isEmpty()) return undefined;
        let current = this.head, count = 0;
        while (current) {
            if (count === position) {
                current.data = data;
                return this.head;
            } else {
                current = current.next;
                count++;
            }
        }
    };
    LinkedList.prototype.indexOf = function (data) {
        if (this.isEmpty()) return -1;
        let current = this.head, count = 0;
        while (current) {
            if (current.data === data) return count;
            else {
                current = current.next;
                count++;
            }
        }
        return -1;

    };
    LinkedList.prototype.isEmpty = function () {
        return !this.length;
    };
    LinkedList.prototype.size = function () {
        return this.length;
    }
};

//test

/*let linkedlist = new LinkedList();
linkedlist.append(1);
linkedlist.append(2);
linkedlist.append(3);
linkedlist.append(4);
linkedlist.append(5);
console.log(linkedlist);

linkedlist.removeAt(0);
linkedlist.removeAt(1);
console.log(linkedlist);

linkedlist.remove(3);
console.log(linkedlist);

linkedlist.insert(10, 2);
console.log(linkedlist);

console.log(linkedlist.get(2));

linkedlist.update(2,15);
console.log(linkedlist);

console.log(linkedlist.indexOf(15));
console.log(linkedlist.size());*/
