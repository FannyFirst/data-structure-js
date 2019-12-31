//RedBlackTrees not complex
"use strict";
let RedBlackTrees = function () {

    this.root = null;
    this.count = 0;


    const NIL = {color: false};

    let Node = function (key, value) {
        this.key = key;
        this.value = value;
        this.color = true; //true red
        this.parent = null;
        this.left = NIL;
        this.right = NIL;
    };

    let getSibling = function (node) {
        if (!node.parent) return false;
        if (node.parent.left === node) return node.parent.right;
        return node.parent.left;
    }, getGrandParent = function (node) {
        if (!node.parent) return false;
        if (!node.parent.parent) return false;
        return node.parent.parent;
    }, getUncle = function (node) {
        let temp = getGrandParent(node);
        if (!temp) return false;
        if (temp.right === node.parent) return temp.left;
        return temp.right;
    }, gotateLeft = function (node) {
        let temp = null;
        if (node.parent) {
            if (node.parent.right === node) {
                node.parent.right = node.right;
            } else {
                node.parent.left = node.right;
            }
        }
        node.right.parent = node.parent;
        node.parent = node.right;

        temp = node.right.left;
        if (temp !== NIL)
            temp.parent = node;
        node.right.left = node;
        node.right = temp;

    }, gotateRight = function (node) {
        let temp = null;
        if (node.parent) {
            if (node.parent.right === node) {
                node.parent.right = node.left;
            } else {
                node.parent.left = node.left;
            }
        }
        node.left.parent = node.parent;
        node.parent = node.left;
        temp = node.left.right;
        node.left.right = node;
        if (temp !== NIL)
            temp.parent = node;
        node.left = temp;
    }, insertRepairTree = function (key, node, objectPosition) {
        if (!node || !key) return false;
        if (key === node.key) return node;
        if (key < node.key) {
            if (node.left !== NIL)
                return insertRepairTree(key, node.left, objectPosition);
            objectPosition.position = -1;
            return node;
        }
        if (node.right !== NIL)
            return insertRepairTree(key, node.right, objectPosition);
        objectPosition.position = 1;
        return node;
    }, findRoot = function (node) {
        //root tree
        if (!node.parent) return node;
        return findRoot(node.parent);
    }, insertCase1 = function (node) {
        //red parent black uncle    right
        //gotateLeft parent case5
        let temp = getGrandParent(node);
        temp.color = true;
        node.parent.color = false;
        gotateLeft(temp);
    }, insertCase2 = function (node) {
        //insert black node parent
        //red parent black uncle left
        //gotateRight grandparent
        let temp = getGrandParent(node);
        temp.color = true;
        node.parent.color = false;
        gotateRight(temp);
    }, insertCase3 = function (node) {
        //red parent and uncle
        //switch color
        let temp = getGrandParent(node);
        node.parent.color = false;
        getUncle(node).color = false;

        if (temp.parent) {
            temp.color = true;
            if (temp.parent.color) {
                //UNCLE IS RED !!!!
                if (!getUncle(temp).color) {
                    if (getGrandParent(temp).left === temp.parent) {
                        insertCase2(temp);
                    } else {
                        insertCase1(temp);
                    }
                } else
                    insertCase3(temp);
            }
        } else {
            temp.color = false;
        }
        //TODO
    }, removeCase1 = function (node) {

    }, removeCase2 = function (node) {

    }, removeCase3 = function (node) {

    }, removeCase4 = function (node) {

    }, removeCase5 = function (node) {

    }, removeCase6 = function (node) {

    }, countBlackNode = function (node) {
        if (!node) return 0;
        let result = 0;
        if (!node.color) {
            result++;
        }
        if (node.right) {
            result += countBlackNode(node.right);
        }
        return result;
    }, countDepth = function (node) {
        if (!node) return 0;
        let result = 0;
        result++;
        if (node.right) {
            result += countDepth(node.right);
        }
        return result;

    };

// 21  10  5   15  30  25       1 v
// 35  2   12  17  11  13       2
// 16  18  22  33  23            3
    RedBlackTrees.prototype.insert = function (key, value) {
        let N = new Node(key, value);
        this.count++;
        if (!this.root) {
            N.color = false;
            this.root = N;
            return true;
        }
        console.log(this.root,key);
        let contract = {position: 0}, insertNode = insertRepairTree(key, this.root, contract);
        if (!contract.position) {//update
            this.count--;
            insertNode.key = key;
            insertNode.value = value;
            return true;
        }

        contract.position > 0 ? insertNode.right = N : insertNode.left = N;

        N.parent = insertNode;
        if (insertNode === this.root || !insertNode.color) { //case 1 case 2
            return true;
        } else if (insertNode.color && getSibling(insertNode).color) {//case 3
            insertCase3(N);
        } else if (insertNode.color && !getSibling(insertNode).color) {
            if (insertNode.parent.right === insertNode) {
                if (contract.position < 0) {
                    insertNode.parent.right = N;
                    N.parent = insertNode.parent;
                    N.right = insertNode;
                    insertNode.parent = N;
                    insertCase1(insertNode);
                } else
                    insertCase1(N);
            } else {
                if (contract.position > 0) {
                    insertNode.parent.left = N;
                    N.parent = insertNode.parent;
                    N.left = insertNode;
                    insertNode.parent = N;
                    insertCase2(insertNode);
                } else
                    insertCase2(N);
            }

            /* if (contract.position > 0) {
                 insertCase1(N);//case 4
             } else {
                 insertCase2(N);//case 5
             }*/
        }
        this.root = findRoot(this.root);
        return true;
    };

    RedBlackTrees.prototype.remove = function (key) {

    };

    RedBlackTrees.prototype.searchNode = function (key, node = this.root) {
        if (!key) return false;
        if (key === node.key) return node;
        if (key < node.key) {
            if (node.left !== NIL) return this.searchNode(key, node.left);
            return false;
        }
        if (node.right !== NIL) return this.searchNode(key, node.right);
        return false;
    };

    RedBlackTrees.prototype.search = function (key, node = this.root) {
        if (!key) return false;
        if (key === node.key) return node.value;
        if (key < node.key) {
            if (node.left !== NIL) return this.search(key, node.left);
            return false;
        }
        if (node.right !== NIL) return this.search(key, node.right);
        return false;
    };
    RedBlackTrees.prototype.inOrderTraversalTree = function () {
        console.log(countDepth(this.root));
        console.log(countBlackNode(this.root));
    };
    /*  a
    *   |/
    * |
    *   |\
    * */

    /*RedBlackTrees.prototype.replace = function (key) {

    };*/


};
/*let rbt = new RedBlackTrees();
let start = new Date().getTime();
console.log(start);
for (let i = 0; i < 100; i++) {
    rbt.insert(i, i);
}
let over = new Date().getTime();
console.log("总耗时" + (over - start) / 1000);
console.log(rbt);*/

let rbt1 = new RedBlackTrees();
let start1 = new Date().getTime(),random = Math.floor((Math.random() * 100) + 1);
console.log(start1);
for (let i = 0; i < 100; i++) {
    random = Math.floor((Math.random() * 100) + 1);
    console.log(random);
    rbt1.insert(random, i);
}
let over1 = new Date().getTime();
console.log("总耗时" + (over - start) / 1000);
console.log(rbt);


