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
        if (!node) return false;
        if (NIL === node.left === node.right) return true;
        let temp = null;
        //SWITCH COLOR

        node.color = true;
        node.right.color = false;
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
        if (!node) return false;
        if (NIL === node.left === node.right) return true;
        let temp = null;
        //SWITCH COLOR

        node.color = true;
        node.left.color = false;
        if (node.parent) {
            if (node.parent.left.key === node.key) {
                node.parent.left = node.left;
            } else {
                node.parent.right = node.left;
            }
        }

        node.left.parent = node.parent;

        node.parent = node.left;

        temp = node.left.right;
        node.left.right = node;
        node.left = temp;
    }, insertRepairTree = function (key, node) {
        if (!node || !key) return false;
        if (key === node.key) return node;
        if (key < node.key) {
            if (node.left !== NIL)
                return insertRepairTree(key, node.left);
            return node;
        }
        if (node.right !== NIL)
            return insertRepairTree(key, node.right);
        return node;
        //TODO 比较信息缺失，虽已比较但inster方法调用后仍需比较

    }, insertCase1 = function (node, root) {
        //switch the color red to black

        //two red node linked

        //example insert 10

        let temp = NIL;
        node.color = false;
        if (node.parent && node.parent !== root && !node.parent.color) node.parent.color = true;
        temp = getSibiling(node);
        if (temp.color) {
            temp.color = false;
        }
        //22    20  17
        temp = getGrandParent(node);
        if (temp && temp.color) {
            temp.color = false;
            temp = getSibiling(temp);
            if (temp.color) temp.color = false;
        }

    }, insertCase2 = function (node) {
        gotateLeft(node);
    }, insertCase3 = function (node) {
        gotateRight(node);
    }, insertCase4 = function (node) {

    }, insertCase4Step2 = function (node) {

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
        let newNode = new Node(key, value);
        if (!this.root) {
            newNode.color = false;
            this.root = newNode;
        }
        let N = insertRepairTree(key, this.root);
        if (!N) return false;
        //case black node
        if (!N.color) {
            if (key > N.key) {
                N.right = newNode;
            } else {
                N.left = newNode;
            }
            return true
        }

        let S = getSibiling(N), G = getGrandParent(N), U = getUncle(N);
        if (N.key === key) {
            N.value = value;
        }
        if (key > N.key) {
            //to right
            N.right = newNode;
            //1
            if (!N.parent) {
                return true;
            }
            //2
            else if (S.color && N.color) {
                insertCase1(N, this.root);
                return true;
            }
            //3 goateLeft
            else if (!N.left.color && !S.color && N.color) {
                insertCase2(N.parent);
                return true;
            }


        } else {
            //to left

            N.left = newNode;

            //1
            if (!N.parent) {
                return true;
            }
            //2
            else if (S.color && N.color) {
                insertCase1(N, this.root);
                return true;
            }
            //3 goateRight
            else if (!N.right.color && !S.color && N.color) {
                insertCase3(N.parent);
                return true;
            }

        }

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
