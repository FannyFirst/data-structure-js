
console.log(`----------------------------------------`);
console.log(`------Queue test start------`);
let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.dequeue());
console.log(queue.dequeue());

console.log(queue.front());

console.log(queue.size());

console.log(queue.isEmpty());
console.log(`------Queue test end------`);
console.log(`----------------------------------------`);
console.log(`------LinkedList test start------`);
let linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.append(5);
console.log(linkedList);

linkedList.removeAt(0);
linkedList.removeAt(1);
console.log(linkedList);

linkedList.remove(3);
console.log(linkedList);

linkedList.insert(10, 2);
console.log(linkedList);

console.log(linkedList.get(2));

linkedList.update(2,15);
console.log(linkedList);

console.log(linkedList.indexOf(15));
console.log(linkedList.size());
console.log(`------LinkedList test end------`);
console.log(`----------------------------------------`);
console.log(`------DoublyLinkedList test start------`);
let doublyLinkedList = new DoublyLinkedList(), obj = {};
doublyLinkedList.insert(22);
doublyLinkedList.insert(33);
doublyLinkedList.insert(44);
doublyLinkedList.insert(55);
doublyLinkedList.insert(66);
doublyLinkedList.insert(77);
doublyLinkedList.insert(88, 1);
doublyLinkedList.insert(obj);
doublyLinkedList.insert(obj);

doublyLinkedList.removeAt(0);
doublyLinkedList.removeAt(0);
/*

doublyLinkedList.remove(obj);
doublyLinkedList.remove(44);

console.log(doublyLinkedList);

console.log(doublyLinkedList.get(0));
console.log(doublyLinkedList.get(1));
console.log(doublyLinkedList.get(2));

console.log(doublyLinkedList.getForward(0));
console.log(doublyLinkedList.getForward(1));
console.log(doublyLinkedList.getForward(2));

doublyLinkedList.update(12, 0);
doublyLinkedList.update(34, 1);

doublyLinkedList.updateForward(56, 0);

doublyLinkedList.indexOf(12);
doublyLinkedList.indexOfForward(34);

console.log(doublyLinkedList.size());*/

console.log(doublyLinkedList);
console.log(`------DoublyLinkedList test end------`);
console.log(`----------------------------------------`);
console.log(`------HashTable test start------`);
let hashTab = new HashTable();
hashTab.put("test", "qw");
hashTab.put("a", "asd");
hashTab.put("s", "s");
hashTab.put("c", "s");
hashTab.put("gw", "as");
hashTab.put("as", "as");
hashTab.put("faw", "as");
hashTab.put("tykpo", "as");
hashTab.put("466", "as");
hashTab.put("j3q4i2h", "as");
hashTab.put("qera;mkgqo5uo", "as");
hashTab.put("qw4etrg59+", "as");
hashTab.put(null, "a");
hashTab.put("qwed", "a");
console.log(hashTab);
console.log(hashTab.get("qwed"));
console.log(hashTab.get("tykpo"));
console.log(hashTab.remove("qera;mkgqo5uo"));
console.log(hashTab);
console.log(`------HashTable test end------`);
console.log(`----------------------------------------`);
console.log(`------Graph test start------`);
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
console.log(a);
console.log(`------Graph test end------`);
console.log(`----------------------------------------`);
console.log(`------Sorting test start------`);
let test = [], time;
for (let i = 0; i < 10000000; i++) {
    test[i] = Math.floor(Math.random() * 10000000);
}
time = new Date().getTime();
console.log("Starting Time:" + time / 1000 + "s");
console.log(test);
// test.bubbleSort();      //       100,000             15s
// test.selectionSort();   //       100,000              3s
// test.insertionSort();   //       100,000             2.5s
// test.shellSort();             //       10,000,000        17.845s
test.quickSort();             //       10,000,000        3s -8s
console.log("End Time:" + (new Date().getTime() - time) / 1000 + "s");
console.log(test);
console.log(`------Sorting test end------`);