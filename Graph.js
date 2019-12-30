//Graph
let Graph = function (order = 0) {
    this.vertexes = {};
    this.vertexNum = 0;
    this.order = order ? 1 : 0;     //0 disorder other orderly

    if (!this.order) {
        this.matrix = [[]];
        Graph.prototype.updateMatrix = function (x, y, weight = 1) {
            if (weight >= 0)
                this.matrix[x][y] = weight;
        };
    } else {
        this.weight = [];
    }


    Graph.prototype.getIndex = function (vertex) {
        let result = 0;
        for (let val in this.vertexes) {
            if (this.vertexes.hasOwnProperty(val) && this.vertexes[val] === vertex) return result;
            result++;
        }
    };

    Graph.prototype.setVertex = function (vertex, ...arg) {
        this.vertexes[vertex] = arg;
        this.vertexNum++;
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
        if (this.vertexes.hasOwnProperty(vertex)) {
            delete this.vertexes[vertex];
            if (!this.order) {
                for (let val in this.matrix) {
                    if (this.matrix.hasOwnProperty(val))
                        delete this.matrix[val][this.getIndex((vertex))];
                }
                delete this.matrix[this.getIndex(vertex)];
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

    Graph.prototype.BreadFirstSearch = function () {
        //queue
        let queue = new Queue();

        

    };
    Graph.prototype.DepthFirstSearch = function () {
        //stack
    }

};