import Node from "./node"
export default class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(value) {
        let newNode = new Node(value);
        if (this.head) {
            this.tail.next = newNode;
            this.tail = this.tail.next;
        } else {
            this.head = this.tail = newNode;
        }
    }
    dequeue() {
        const result = this.head;
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        return result;
    }
    front() {
        return this.head;
    }
    size() {
        let i = 0;
        let tmp = this.head;
        while (tmp != null) {
            i++;
            tmp = tmp.next;
        }
        return i;
    }
    clear() {
        this.head = this.tail = null;
    }
}
