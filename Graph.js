//Graph
Array.prototype.move = function (position = 0, gap = 1) {
    if (position < 0 || gap < 1 || gap + position > this.length - 1) return this;

    for (let i = 0; i < this.length; i++) {
        if (i >= position) {
            this[i] = this[i + gap];
        }
    }
    this.length -= gap;
    return this;
};

let Graph = function (order = 0) {
    this.vertexes = {};
    this.vertexNum = 0;
    this.order = order ? 1 : 0;     //0 disorder other orderly
    if (!this.order) {
        this.matrix = [[]];
        Graph.prototype.updateMatrix = function (x, y, weight = 1) {
            if (weight >= 0) {
                if (!this.matrix[x]) this.matrix[x] = [];
                this.matrix[x][y] = weight;
            }
        };
    } else {
        this.weight = [];
    }


    Graph.prototype.getIndex = function (vertex) {
        let result = 0;
        for (let val in this.vertexes) {
            if (this.vertexes.hasOwnProperty(val) && val === vertex) return result;
            result++;
        }
        return result;
    };

    Graph.prototype.setVertex = function (vertex, ...arg) {
        if (!(this.vertexes.hasOwnProperty(vertex)))
            this.vertexNum++;
        this.vertexes[vertex] = arg;
        for (let i = 0; i < arg.length; i++) {
            if (!this.vertexes.hasOwnProperty(arg[i]))
                this.setVertex(arg[i]);
        }
        if (!this.order) {
            let index = this.getIndex(vertex);
            for (let i = 0; i < arg.length; i++) {
                this.updateMatrix(index, this.getIndex(arg[i]));
            }
        }

    };

    Graph.prototype.removeVertex = function (vertex) {
        console.log(vertex);
        if (!this.order) {
            let tag = 0;
            for (let i = 0; i <= this.vertexNum; i++) {
                if (i === this.getIndex(vertex)) {
                    tag = i;
                    this.matrix.move(i);
                }
                if (this.matrix[i] instanceof Array) this.matrix[i].move(tag);
            }

        } else {
            this.weight.move(this.getIndex(vertex));
        }
        if (this.vertexes.hasOwnProperty(vertex)) {
            delete this.vertexes[vertex];
            for (let i in this.vertexes) {
                if (!(this.vertexes[i] instanceof Array)) continue;
                for (let j = 0; j < this.vertexes[i].length; j++) {
                    if (this.vertexes[i][j] === vertex) {
                        console.log(j);
                        this.vertexes[i].move(j);
                        break;
                    }
                }
            }
            this.vertexNum--;
        }

    };

    Graph.prototype.addWeight = function (weight, vertex1, vertex2 = undefined) {
        if (!this.order && vertex2)
            this.updateMatrix(this.getIndex(vertex1), this.getIndex(vertex2), weight);
        else {
            this.weight[this.getIndex(vertex1)] = weight;
        }
    };

    Graph.prototype.getOutDegree = function (vertex) {
        if (this.vertexes.hasOwnProperty(vertex)) return this.vertexes[vertex].length;
        return false;
    };

    Graph.prototype.getInDegree = function (vertex) {
        if (this.vertexes.hasOwnProperty(vertex)) {
            if (this.order) return this.vertexes[vertex].length;
            let result = 0;
            for (let x in this.matrix) {
                if (this.matrix.hasOwnProperty(x) && this.matrix[x][this.getIndex(vertex)]) result++;
            }
            return result;
        }
        return false;
    };

    Graph.prototype.getByIndex = function (index) {
        let count = 0;
        for (let vertex in this.vertexes) {
            if (count++ === index) return vertex;
        }
        return -1;
    };

    Graph.prototype.breadFirstSearch = function (callback) {
        //queue
        if (!(callback instanceof Function) || !this.vertexNum) return undefined;

        let queue = new Queue(), temp, vertexes = this.vertexes;

        for (let vertex in vertexes) {
            if (!vertexes.hasOwnProperty(vertex)) break;
            vertexes[vertex] = {vertex: vertex};
            queue.enqueue(vertexes[vertex]);
            temp = queue.dequeue();
            if (temp.vertex instanceof Array) {
                for (let i = 0; i < temp.vertex.length; i++) {
                    if (vertexes[temp.vertex[i]] instanceof Object) continue;
                    vertexes[temp.vertex[i]] = {vertex: temp.vertex[i]};
                    queue.enqueue(vertexes[temp.vertex[i]]);
                }
            }

            if (callback(temp.vertex)) break;
        }
    };
    Graph.prototype.depthFirstSearch = function (callback) {
        //stack
        let stack = new Stack(), vertexes = this.vertexes, temp;

        for (let vertex in vertexes) {
            if (!(vertexes.hasOwnProperty(vertex))) break;
            vertexes[vertex] = {vertex: vertex};
            stack.push(vertexes[vertex]);
        }
        while (stack.size()) {
            temp = stack.pop();
            if (temp.vertex instanceof Array) {
                for (let i in temp.vertex) {
                    if (!(temp.vertex.hasOwnProperty(i))) break;
                    if (vertexes[temp.vertex[i]] instanceof Object) continue;
                    vertexes[temp.vertex[i]] = {vertex: temp.vertex[i]};
                    stack.push(vertexes[temp.vertex[i]]);
                }
            }
            if (callback(temp.vertex)) break;
        }


    }

};

//test
/*
let graph = new Graph();

graph.setVertex("A", "B", "C", "D");
graph.setVertex("B", "A", "F", "G");
graph.setVertex("C", "G", "H", "D");
graph.setVertex("D", "Z", "Q", "R");
graph.setVertex("Z", "R", "B", "A");
graph.setVertex("R", "C", "Q", "D");

let a = "";
graph.breadFirstSearch(function (element) {
    a += element + " ";
    return false;
}, 'A');
console.log(a);
a = "";
graph.depthFirstSearch(function (element) {
    a += element + " ";
    return false;
});
console.log(a);*/
