//HashTable
let MathTools = function () {
    // let primeNumberHashTable;
    this.limit = 4294967296;//2^15  = 32768 2^16 = 65536 2^23 = 8388608 2^19 = 524288
    this.primeNumber = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];

    MathTools.prototype.pow = function (x, y) {
        if (y > 512) return false;
        if (!y) return 1;
        if (!(y - 1)) return x;
        return this.pow(x, y - 1) * x;
    };

    MathTools.prototype.log2x = function (x) {
        return Math.log(x) / Math.log(2);
    };

    MathTools.prototype.nearPrimeNumber = function (number) {
        while (number++) {
            if (number >= this.limit) throw new Error(`over max number:${this.limit},if you want more lager number use setMaxPrimeNumber function to set new limit number`);
            if (this.isPrimeNumber(number)) return number;
        }
    };
    MathTools.prototype.nearPrimeNumberForward = function (number) {
        while (number--) {
            if (number >= this.limit) throw new Error(`over max number:${this.limit},if you want more lager number use setMaxPrimeNumber function to set new limit number`);
            if (this.isPrimeNumber(number)) return number;
        }
    };
    MathTools.prototype.setMaxPrimeNumber = function (limit) {
        this.limit = limit;
    };
    MathTools.prototype.isPrimeNumber = function (num) {

        if (num <= 1) return false;
        if (num <= 5) return num !== 4;
        let i, j, tag = 0, primeLen = this.primeNumber.length;

        for (j = 0; j < this.primeNumber.length; j++) {      //预查找
            if (num === this.primeNumber[j]) return true;
            if (!(num % this.primeNumber[j])) return false;  //被字典中质数整除不是质数
        }

        if (this.primeNumber[this.primeNumber.length - 1] * this.primeNumber[this.primeNumber.length - 1] < num) {
            //字典最后一位数字的平方小于num

            i = this.primeNumber[this.primeNumber.length - 1];

            while (i++) {   //找一个质数，其平方大于num    i   从字典中最后一位开始 tag = 0;
                tag = 0;
                for (j = 0; j < (this.primeNumber.length / 2) + 1; j++) {
                    if (!(i % this.primeNumber[j])) {
                        tag = 1;        //被字典中某一质数整除，标记
                        break;
                    }
                }
                if (tag) continue;  //被标记跳过
                this.primeNumber.push(i);
                if (i * i > num) break;
            }
            if (this.primeNumber.length > primeLen)
                for (j = 0; j < this.primeNumber.length; j++) {      //再查找
                    if (num === this.primeNumber[j]) return true;
                    if (!(num % this.primeNumber[j])) return false;  //被字典中质数整除不是质数
                }
        }
        return true;
    };

};
String.prototype.splitByLen = function (len) {

    if (typeof len !== "number" || len > this.length || len <= 1) return this.toString();
    let long = this.length % len, eachShort = (this.length - long) / len, result = [], count = 0,
        j = 0;
    for (let i = 0; i < len; i++) {
        result[i] = "";
        if (long) {
            long--;
            for (j = 0; j <= eachShort; j++) {
                result[i] += this[count++];
            }
        } else {
            for (j = 0; j < eachShort; j++) {
                result[i] += this[count++];
            }
        }
    }
    return result;
};


let HashTable = function () {
    this.storage = [];
    this.size = 8;     //2^4   0000 16  2^5 0000    0000    32
    this.maxSize = 32768;
    this.usedSize = 0;
    this.loadFactor = 0.75;
    this.modCount = 0;
    this.nullKey = null;
    // let bucket = [];
    let math = new MathTools();

    this.realFactor = 0;

    this.threshold = this.loadFactor * this.size;          //阈值


    HashTable.prototype.resize = function () {
        if (this.size > this.maxSize) return;
        let temp = [], tempSize = this.size * 2, hashIndex = 0;
        temp[tempSize - 1] = undefined;
        this.usedSize = 0;
        for (let i = 0; i < this.size; i++) {
            if (this.storage[i]) {
                for (let j = 0; j < this.storage[i].length; j++) {
                    hashIndex = this.hashFunction(this.storage[i][j][0], this.size * 2);
                    if (!temp[hashIndex]) {
                        temp[hashIndex] = [];
                        this.usedSize++;
                    }
                    temp[hashIndex].push(this.storage[i][j]);
                }
            }
        }
        this.realFactor = this.usedSize / this.size;
        this.threshold = this.loadFactor * this.size;
        this.size = tempSize;
        this.storage = temp;
    };

    HashTable.prototype.put = function (key, value) {
        if (!this.storage.length) this.storage[this.size - 1] = undefined;
        //扩容
        if (this.realFactor * this.size >= this.threshold) {
            this.resize();
        }
        this.modCount++;

        if (!key) {
            this.nullKey = value;
            this.usedSize++;
            return true;
        }
        let index = this.hashFunction(key);

        if (!this.storage[index])
            this.storage[index] = [];
        if (this.storage[index].length > 0)
            for (let i = 0; i < this.storage[index].length; i++) {
                if (this.storage[index][i][0] === key) {
                    this.storage[index][i][1] = value;
                    return true;
                }
            }
        else this.usedSize++;
        this.storage[index].push([key, value]);
        this.realFactor = this.usedSize / this.size;
        return true;
    };


    HashTable.prototype.hashFunction = function (key, length = this.size) {
        while (key.length < math.log2x(length)) {
            key += this.hashCode(key);
        }
        let result = 0b1, len = math.log2x(length), group = key.toString().splitByLen(len);

        //get each hashCode
        for (let i = 0; i < len; i++) {
            result += (this.hashCode(group[i]) % 2 ? 1 : 0) * math.pow(2, i);
        }

        return result - 1;
    };
    HashTable.prototype.hashCode = function (key) {
        key = key.toString();
        let code = 0x0, temp = -1, beforePrimeNumber = null, afterPrimeNumber = null;
        for (let i = 0; i < key.length; i++) {
            temp = key.charCodeAt(i) << 5;
            beforePrimeNumber = math.nearPrimeNumberForward(temp);
            afterPrimeNumber = math.nearPrimeNumber(temp);
            code ^= ((beforePrimeNumber << 7 ^ afterPrimeNumber << 5) << 3) ^ temp;
        }
        code ^= (code >>> 20) ^ (code >>> 12);
        return code ^ (code >>> 7) ^ (code >>> 4);
    };
    HashTable.prototype.get = function (key) {
        if (!key) return this.nullKey;
        let index = this.hashFunction(key.toString());
        if (this.storage[index]) {
            for (let i = 0; i < this.storage[index].length; i++) {
                if (this.storage[index][i][0] === key) return this.storage[index][i][1];
            }
        }
        return false;
    };
    HashTable.prototype.remove = function (key) {
        let temp;
        if (!key) {
            temp = this.nullKey;
            this.nullKey = null;
            return temp;
        }
        let index = this.hashFunction(key.toString());
        if (this.storage[index]) {
            for (let i = 0; i < this.storage[index].length; i++) {
                if (this.storage[index][i][0] === key) {
                    temp = this.storage[index][i][1];
                    this.storage[index][i] = null;
                    this.modCount++;
                    return temp;
                }
            }
        }
        return false;
    }
};
