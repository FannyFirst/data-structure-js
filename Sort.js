Array.prototype.swap = function (m, n) {
    const temp = this[n];
    this[n] = this[m];
    this[m] = temp;
    return this;
};

Array.prototype.bubbleSort = function () {
    let length = this.length, bubble = this[0];
    while (length--) {
        for (let i = 0; i < length; i++) {
            if (this[i] > this[i + 1]) {
                this.swap(i, i + 1);
            }
        }
    }
    return this;
};

Array.prototype.selectionSort = function () {
    let length = this.length, count = 0;
    while (length--) {
        for (let i = this.length - length - 1; i < this.length; i++) {
            if (this[i] < this[count]) {
                count = i;
            }
        }
        this.swap(count, this.length - length - 1);
        count = this.length - length;
    }
};

Array.prototype.insertionSort = function () {
    let length = this.length, insert = 0, j;
    for (let i = 1; i < this.length; i++) {
        insert = this[i];
        j = i;
        while (j) {
            if (insert < this[j - 1]) {
                this[j] = this[j - 1];
            } else {
                this[j] = insert;
                break;
            }
            j--;
        }
        if (!j) this[0] = insert;
    }
};

Array.prototype.shellSort = function () {
    let length = this.length, gap = Math.floor(length / 2), temp, j;
    while (gap) {
        for (let i = gap - 1; i < this.length; i++) {
            j = i;
            temp = this[j];
            while (j >= gap - 1 && this[j - gap] > temp) {
                this[j] = this[j - gap];
                j -= gap;
            }
            this[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
};

Array.prototype.quickSort = function () {
    let Quick = function (array) {
        this.array = array;
        Quick.prototype.hinge = function (left, right) {
            let middle = Math.floor((left + right) / 2);
            if (this.array[left] > this.array[middle]) {
                this.array.swap(left, middle);
            }
            if (this.array[left] > this.array[right]) {
                this.array.swap(left, right)
            }
            if (this.array[middle] > this.array[right]) {
                this.array.swap(middle, right)
            }
            if (middle === right - 1) return false;

            this.array.swap(middle, right - 1);
            return true;
        };
        Quick.prototype.quick = function (left, right) {
            if (left + 1 === right || left === right) {
                if (this.array[left] > this.array[right]) this.array.swap(left, right);
                return;
            }
            if (!this.hinge(left, right)) {
                return;
            }
            let i = left, j = right - 1;
            while (1) {
                while (++i && this.array[i] < this.array[right - 1] && i < j) {
                }
                while (--j && this.array[j] > this.array[right - 1] && i < j) {
                }
                if (i < j)
                    this.array.swap(i, j);
                else {
                    this.array.swap(i, right - 1);
                    this.quick(left, j);
                    this.quick(j + 1, right);
                    break;
                }
            }

        };
    };
    new Quick(this).quick(0, this.length - 1)
    // console.log(this.quickSort.quick);
    // this.quickSort.quick(0, this.length - 1);


};
