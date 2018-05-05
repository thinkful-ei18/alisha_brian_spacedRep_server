'use strict';

class _Node {
  constructor(value, next) {
    this.value = value,
    this.next = next;
  }
}

class LinkedList {

  constructor() {
    this.head = null;
  }

  /* =============================
  INSERT
  ============================= */

  insertFirst(value) {
    this.head = new _Node(value, this.head);
  }

  insertLast(value) {
    // add a node to the end of the list

    if (this.head === null) { // if we don't have a head value, then first we would need to create the list
      this.insertFirst(value);
    }
    else {

      let currentNode = this.head;

      while (currentNode.next !== null) {
        // if next prop was NOT null, that means we have another node in our list
        // we would reassign the variable currentNode to be the value of the next node and see if the while loop is still true for that node
        currentNode = currentNode.next;

        // when we get to a point where currentNode.next === null ...we break out of this loop
      }

      currentNode.next = new _Node(value, null);
      // once we reach the end of the list, we take that node's next prop and reassign it by creating a new node
    }
  }
}

module.exports = LinkedList;