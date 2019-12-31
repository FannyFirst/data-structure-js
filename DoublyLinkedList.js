//
let DoublyLinkedList = function () {
    this.length = 0;
    this.head = null;
    this.last = null;
    let node = function (data) {
        this.data = data;
        this.pre = null;    //previous node
        this.next = null;
    };
    DoublyLinkedList.prototype.append = function (data) {
        return this.insert(data);
    };
    DoublyLinkedList.prototype.insert = function (data, position = this.length) {
        if (!data || position < 0) return undefined;
        if (position > this.length) position = this.length;
        const newNode = new node(data);
        this.length++;
        let count = 0, current = this.head;
        if (!current) {
            this.head = newNode;
            this.last = newNode;
            return this.head;
        }
        while (current) {
            if (count++ === position) {
                if (current.pre) {
                    newNode.next = current;
                    newNode.pre = current.pre;
                    current.pre.next = newNode;
                    current.pre = newNode;
                } else {
                    newNode.next = current;
                    current.pre = newNode;
                    this.head = newNode;
                }
                return this.head;
            } else {
                if (current.next)
                    current = current.next;
                else {
                    newNode.pre = current;
                    current.next = newNode;
                    this.last = newNode;
                    return this.head;
                }
            }
        }
    };
    DoublyLinkedList.prototype.removeAt = function (position = 0) {
        if (position < 0) return false;
        if (position > this.length) position = this.length;
        let count = 0, current = this.head;
        while (current) {
            if (count++ === position) {
                if (current.pre) {
                    if (current.next) {
                        current.pre.next = current.next;
                        current.next.pre = current.pre;
                    } else {
                        current.pre.next = null;
                    }
                } else {
                    if (current.next) {
                        this.head = current.next;
                        current.next.pre = null;
                    } else {
                        this.head = null;
                        this.last = null;
                    }
                }
                this.length--;
                return current.data;
            } else {
                if (current.next)
                    current = current.next;
                else return undefined;
            }
        }
        return undefined;

    };
    DoublyLinkedList.prototype.remove = function (data) {
        if (!data) return undefined;
        let current = this.head;
        while (current) {
            if (current.data === data) {
                if (current.next) {
                    current.next.pre = current.pre;
                    if (current.pre)
                        current.pre.next = current.next;
                    else {
                        this.head = current.next;
                        this.head.pre = null;
                    }
                } else {
                    if (current.pre)
                        current.pre.next = null;
                    else {
                        this.head = null;
                        this.last = null;
                    }
                }
                this.length--;
                return this.head;
            } else {
                current = current.next;
            }
        }
        return undefined;

    };
    DoublyLinkedList.prototype.removeAtForward = function (position) {
        if (position < 0) return undefined;
        if (position > this.length) position = this.length;
        let count = 0, current = this.last;
        while (current) {
            if (count++ === position) {
                if (current.next) {
                    current.next.pre = current.pre;
                    if (current.pre)
                        current.pre.next = current.next;
                    else
                        this.head = current.next;
                } else {
                    if (current.pre)
                        current.pre.next = null;
                    else {
                        this.head = null;
                        this.last = null;
                    }
                }
                this.length--;
                return current.data;
            } else {
                if (current.pre)
                    current = current.pre;
                else
                    return undefined;
            }
        }
        return undefined;
    };
    DoublyLinkedList.prototype.removeForward = function (data) {
        if (!data) return undefined;
        let current = this.last;
        while (current) {
            if (current.data === data) {
                if (current.next) {
                    current.next.pre = current.pre;
                    if (current.pre)
                        current.pre.next = current.next;
                    else
                        this.head = current.next;
                } else {
                    current.pre.next = null;
                }
                this.length--;
                return this.head;
            } else {
                if (current.pre)
                    current = current.pre;
                else
                    return undefined;
            }
        }
    };
    DoublyLinkedList.prototype.get = function (position = 0) {
        if (position < 0 || position >= this.length) return undefined;

        let count = 0, current = this.head;

        while (current) {
            if (count++ === position) {
                return current.data;
            } else {
                current = current.next;
            }
        }

    };
    DoublyLinkedList.prototype.getForward = function (position) {
        if (position < 0 || position >= this.length) return undefined;

        let count = 0, current = this.last;

        while (current) {
            if (count++ === position) {
                return current.data;
            } else {
                current = current.pre;
            }
        }
    };
    DoublyLinkedList.prototype.update = function (data, position, type = 1) {
        if (position < 0 || position >= this.length) return undefined;
        let count = 0, current = type ? this.head : this.last;
        while (current) {
            if (count++ === position) {
                current.data = data;
                return this.head;
            } else {
                current = type ? current.next : current.pre;
            }
        }
    };
    DoublyLinkedList.prototype.updateForward = function (data, position) {
        return this.update(data, position, 0);
    };
    DoublyLinkedList.prototype.indexOf = function (data) {
        if (!data) return undefined;
        let count = 0, current = this.head;
        while (current) {
            if (data === current) {
                return count;
            } else {
                current = current.next;
            }
            count++;
        }
    };
    DoublyLinkedList.prototype.indexOfForward = function (data) {
        if (!data) return undefined;
        let count = 0, current = this.last;
        while (current) {
            if (data === current) {
                return count;
            } else {
                current = current.pre;
            }
            count++;
        }
    };
    DoublyLinkedList.prototype.traversal = function (callback, type = 1) {
        if (!(callback instanceof Function)) return undefined;
        let current = type ? this.head : this.last;
        while (current) {
            if (callback(current)){
                return this.head;
            }
            else {
                current = type ? current.next : current.pre;
            }
        }
    };

    DoublyLinkedList.prototype.size = function () {
        return this.length;
    };
    DoublyLinkedList.prototype.isEmpty = function () {
        return this.length === 0;
    };

};

/*//test
let doublyLinkedList = new DoublyLinkedList(), obj = {};
doublyLinkedList.insert(22);
doublyLinkedList.insert(33);
doublyLinkedList.insert(44);
doublyLinkedList.insert(55);
doublyLinkedList.insert(66);
doublyLinkedList.insert(77);
doublyLinkedList.insert(88, 1);
doublyLinkedList.insert(obj);
doublyLinkedList.insert(obj);


doublyLinkedList.removeAt(0);
doublyLinkedList.removeAt(0);


doublyLinkedList.remove(obj);
doublyLinkedList.remove(44);

console.log(doublyLinkedList);

console.log(doublyLinkedList.get(0));
console.log(doublyLinkedList.get(1));
console.log(doublyLinkedList.get(2));

console.log(doublyLinkedList.getForward(0));
console.log(doublyLinkedList.getForward(1));
console.log(doublyLinkedList.getForward(2));

doublyLinkedList.update(12, 0);
doublyLinkedList.update(34, 1);

doublyLinkedList.updateForward(56, 0);

doublyLinkedList.indexOf(12);
doublyLinkedList.indexOfForward(34);

console.log(doublyLinkedList.size());

console.log(doublyLinkedList);*/




