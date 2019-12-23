//binary tree
let BinaryTree = function () {
    this.root = null;
    this.maxDegree = 0;
    this.depth = 0;
    this.leftWeight = 0;    //depth * key
    this.rightWeight = 0;


    let treeNode = function (key, value, node = null) {
        this.key = key;
        this.value = value;
        this.parentNode = node;
        this.left = null;
        this.right = null;
    }, insertTraversalNode = function (node, key) {
        if (key === node.key) return node;
        if (key > node.key) {
            if (node.right)
                return insertTraversalNode(node.right, key);
            return node;
        } else {
            if (node.left)
                return insertTraversalNode(node.left, key);
            return node;
        }
    };

    BinaryTree.prototype.insert = function (key, value = null) {
        if (!key) return false;
        let newNode = new treeNode(key, value);
        if (!this.root) {
            this.root = newNode;
            return true;
        } else {
            let temp = insertTraversalNode(this.root, key);
            newNode.parentNode = temp;
            if (temp.key < key) {
                temp.right = newNode;
                return true;
            }
            temp.left = newNode;
            return true;
        }
    };

    BinaryTree.prototype.search = function (key, node = this.root) {
        if (node.key === key) return node.value;
        if (key > node.key) {
            if (node.right)
                return this.search(key, node.right);
            return undefined;
        }
        if (node.left)
            return this.search(key, node.left);
        return undefined;
    };
    BinaryTree.prototype.searchNode = function (key, node = this.root) {
        if (!node) return false;
        if (node.key === key) return node;
        if (key > node.key) {
            if (node.right)
                return this.searchNode(key, node.right);
            return undefined;
        }
        if (node.left)
            return this.searchNode(key, node.left);
        return undefined;
    };
    BinaryTree.prototype.remove = function (key) {
        let now = this.searchNode(key);
        if (!now) return false;
        let tempLeft = null, tempRight = null;

        if (now.right && now.left) {
            tempLeft = this.maxNode(now.left);      //13
            tempRight = this.minNode(now.right);       //15
            if (tempRight.key + tempLeft.key < key + key) {     //28>10+10
                if (tempLeft.parentNode.right.key === tempLeft.key) {   //!=
                    tempLeft.parentNode.right = tempLeft.left;
                } else {
                    tempLeft.parentNode.left = tempLeft.left;
                }
                now.key = tempLeft.key;
                now.value = tempLeft.value;
            } else {
                if (tempRight.parentNode.right.key === tempRight.key) {
                    tempRight.parentNode.right = tempRight.right;
                } else {
                    tempRight.parentNode.left = tempRight.right;
                }
                now.key = tempRight.key;
                now.value = tempRight.value;
            }
        } else if (now.left) {
            if (now.parentNode.left && now.parentNode.left.key === now.key) {
                now.parentNode.left = now.left;
                now.left.parentNode = now.parentNode;
            } else {
                now.parentNode.right = now.left;
                now.left.parentNode = now.parentNode;
            }
        } else if (now.right) {
            if (now.parentNode.left && now.parentNode.left.key === now.key) {
                now.parentNode.left = now.right;
                now.right.parentNode = now.parentNode;
            } else {
                now.parentNode.right = now.right;
                now.right.parentNode = now.parentNode;
            }
        } else {
            if (now.parentNode) {
                if (now.parentNode.left && now.parentNode.left.key === now.key) {
                    now.parentNode.left = null;
                } else {
                    now.parentNode.right = null;
                }
            } else {

                this.root = null;
            }
        }
        return now;
    };

    BinaryTree.prototype.preOrderTraversalTree = function (node = this.root, callback) {
        const now = this.minNode(node);
    };
    BinaryTree.prototype.inOrderTraversalTree = function (node = this.root, callback) {

    };
    BinaryTree.prototype.postOrderTraversalTree = function (node = this.root, callback) {
        const now = this.maxNode(node);
    };
    BinaryTree.prototype.minNode = function (node = this.root) {
        if (!node) return false;
        if (!node.left) return node;
        return this.minNode(node.left);
    };
    BinaryTree.prototype.maxNode = function (node = this.root) {
        if (!node) return false;
        if (!node.right) return node;
        return this.minNode(node.right);
    };


};
//test
let bt = new BinaryTree();

bt.insert(21,21);
bt.insert(10,10);
bt.insert(5,5);
bt.insert(15,15);
bt.insert(2,2);
bt.insert(12,12);
bt.insert(11,11);
bt.insert(13,13);
bt.insert(17,17);
bt.insert(16,16);
bt.insert(18,18);
bt.insert(30,30);
bt.insert(25,25);
bt.insert(22,22);
bt.insert(23,23);
bt.insert(35,35);
bt.insert(33,33);

/*console.log(bt);

console.log(bt.search(20));
console.log(bt.search(14));
console.log(bt.search(30));
console.log(bt.search(55));

console.log(bt.minNode());
console.log(bt.maxNode());*/

bt.remove(25);
console.log(bt);

