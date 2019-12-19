//HashTable
let MathTools = function () {
    let primeNumberHashTable;

    MathTools.prototype.nearPrimeNumber = function (number, limit = 999999) {
        //1.  use the number to find a small prime number in primeNumberHashTable than this number,
        //      then ues function blow text find the most near prime number with number ,save the number to primeNumberHashTable;

        let isPrimeNumber = function (num) {
            /*
            * 1     2       3     4     5     6      7       11
            *
            * */


        }
    };

    let isPrimeNumber = function (num) {
        //pm
        //5
        if (num <= 1) return false;
        if (num <= 5) return num !== 4;
        let primeNumber = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        for (let i = 5; i < num; i++) {
            for (let j = 0; j < primeNumber.length; j++) {
                if (num === primeNumber[j]) break;
                if (!(num % primeNumber[j])) return false;
            }
        }
        return true;
    }
};
let isPrimeNumber = function (num) {
    //pm
    //5
    if (num <= 1) return false;
    if (num <= 5) return num !== 4;
    let primeNumber = [2, 3, 5, 7, 11, 13, 17, 19, 23], i, j, tag = 0,primeLen = primeNumber.length;

    for (j = 0; j < primeNumber.length; j++) {      //预查找
        if (!(num % primeNumber[j])) return false;  //被字典中质数整除不是质数
    }

    if (primeNumber[primeNumber.length - 1] * primeNumber[primeNumber.length - 1] < num) {
        //字典最后一位数字的平方小于num

        i = primeNumber[primeNumber.length - 1];

        while (i++) {   //找一个质数，其平方大于num    i   从字典中最后一位开始 tag = 0;
            tag = 0;
            for (j = 0; j < (primeNumber.length / 2) + 1; j++) {
                if (!(i % primeNumber[j])) {
                    tag = 1;        //被字典中某一质数整除，标记
                    break;
                }
            }
            if (tag) continue;  //被标记跳过
            primeNumber.push(i);
            if (i * i > num) break;
        }
        if(primeNumber.length>primeLen)
        for (j = 0; j < primeNumber.length; j++) {      //再查找
            if (!(num % primeNumber[j])) return false;  //被字典中质数整除不是质数
        }
    }
    return primeNumber;
};


//test

/*console.log(isPrimeNumber(5));
console.log(isPrimeNumber(17));*/
// console.log(isPrimeNumber(9007199254740991));
// console.log(isPrimeNumber(900719923));
//console.log(isPrimeNumber(3812843));
// console.log(isPrimeNumber(843));

let test = isPrimeNumber(900719923),temp = 0,storage = [],moreTen = [];

for(let i = 0 ; i< test.length;i++){
    temp = test[i+1]-test[i];
    if(temp>9)moreTen.push([test[i],test[i+1]]);
    storage.push(test[i+1]-test[i]);
}
console.log(storage);
console.log(moreTen);