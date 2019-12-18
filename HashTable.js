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
            for (let i = 2; i <= num / 2; i++) {

                if (!isPrimeNumber(i++)) continue;

                if (!(num % i)) return false;

            }
            return true;
        }


    }
};

let isPrimeNumber = function (num) {
}
