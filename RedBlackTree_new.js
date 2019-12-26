//RedBlackTrees not complex

let RedBlackTrees = function () {

    this.root = null;

    const NIL = {color: false};

    let Node = function (key, value) {
        this.key = key;
        this.value = value;
        this.color = true; //true red
        this.parent = null;
        this.left = NIL;
        this.right = NIL;
    };

    let getSibiling = function (node) {
        if (!node.parent) return false;
        if (node.parent.left.key === node.key) return node.parent.right;
        return node.parent.left;
    }, getGrandParent = function (node) {
        if (!node.parent) return false;
        if (!node.parent.parent) return false;
        return node.parent.parent;
    }, getUncle = function (node) {
        if (!node.parent) return false;
        if (node.parent.left === node) return node.parent.right;
        return node.parent.left;
    }, gotateLeft = function (node) {
        let temp = null;
        if (node.parent) {
            if (node.parent.right.key === node.key) {
                node.parent.right = node.right;
            } else {
                node.parent.left = node.right;
            }
        }
        node.right.parent = node.parent;
        node.parent = node.right;
        temp = node.right.left;
        node.right.left = node;
        node.right = temp;

    }, gotateRight = function (node) {
        let temp = null;
        if (node.parent) {
            if (node.parent.right.key === node.key) {
                node.parent.right = node.right;
            } else {
                node.parent.left = node.right;
            }
        }
        node.left.parent = node.parent;
        node.parent = node.left;
        temp = node.left.right;
        node.left.right = node;
        node.left = temp;
    }, insertRepairTree = function (key, node, anchor = 0) {
        if (!node || !key) return false;
        if (key === node.key) return node;
        if (key < node.key) {
            if (node.left !== NIL)
                return insertRepairTree(key, node.left);
            anchor = -1;
            return node;
        }
        if (node.right !== NIL)
            return insertRepairTree(key, node.right);
        anchor = 1;
        return node;
    }, insertCase1 = function (node, root) {
        //root tree
    }, insertCase2 = function (node) {
        //insert black node parent
    }, insertCase3 = function (node) {
        //red parent and uncle
        //switch color
        let temp = getGrandParent(node);
        node.parent.color = false;
        if (temp.parent) {
            temp.color = true;
            if (temp.parent.color) {
                //UNCLE IS RED !!!!
                insertCase3(temp);
            }
        } else {
            temp.color = false;
        }

    }, insertCase4 = function (node) {
        //red parent black uncle    right
        //gotateLeft parent case5
        let temp = getGrandParent(node);
        temp.color = true;
        node.parent = false;
        gotateLeft(temp);

    }, insertCase5 = function (node) {
        //red parent black uncle left
        //gotateRight grandparent
        let temp = getGrandParent(node);
        temp.color = true;
        node.parent = false;
        gotateRight(temp);
    }, removeCase1 = function (node) {

    }, removeCase2 = function (node) {

    }, removeCase3 = function (node) {

    }, removeCase4 = function (node) {

    }, removeCase5 = function (node) {

    }, removeCase6 = function (node) {

    };

// 21  10  5   15  30  25       1 v
// 35  2   12  17  11  13       2
// 16  18  22  33  23            3
    RedBlackTrees.prototype.insert = function (key, value) {
        let N = new Node(key, value);
        if (!this.root) this.root = N;
        let contract = 0, insertNode = insertRepairTree(key, this.root, contract);
        if (!contract) {
            insertNode.key = key;
            insertNode.value = value;
        }

        contract > 0 ? insertNode.right = N : insertNode.left = N;
        if (insertNode === this.root || !insertNode.color) { //case 1 case 2
            return true;
        } else if (insertNode.color && getSibiling(insertNode).color) {//case 3
            insertCase3(N);
        } else if (insertNode.color && !getSibiling(insertNode).color) {
            if (contract > 0) {
                insertCase4(N);//case 4
            } else {
                insertCase5(N);//case 5
            }
        }
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

    /*RedBlackTrees.prototype.replace = function (key) {

    };*/


};
