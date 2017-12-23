function Node(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
}

function list() {
    this.length = 0;
    this.head = null;
    this.tail = null;

    this.add = function (data) {
        var node = new Node(data);
        var currentNode = this.head;

        if (!currentNode) {
            this.head = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            if (this.tail) {
                this.tail.next = node;
                node.prev = this.tail;
            } else {
                this.head.next = node;
                node.prev = this.head;
            }
            this.tail = node;
        }
        this.length++;

        return this;
    }

    this.remove = function (position) {
        var nodeToRemoveBefore = this.head;
        var counter = 0;
        var tempNodeData = null;


        if (position == 1) {
            
            tempNodeData = this.head.data;

            this.head = this.head.next;
            this.head.prev = this.tail;
            this.tail.next = this.head;
            
            this.length--;
            return tempNodeData;

        } else if (position >= this.length) {
            tempNodeData = this.tail.data;

            this.tail = this.tail.prev;
            this.head.prev = this.tail;
            this.tail.next = this.head;


            this.length--;
            return tempNodeData;
        } else {
            while (++counter < position - 1) {
                nodeToRemoveBefore = nodeToRemoveBefore.next;

            }
            tempNodeData = nodeToRemoveBefore.next.data;

            var nodeToRemoveAfter = nodeToRemoveBefore.next.next;
            nodeToRemoveBefore.next = nodeToRemoveAfter;
            nodeToRemoveAfter.prev = nodeToRemoveBefore;
            this.length--;
            return tempNodeData;
        }
        // this.length--;

        // return this;
    }

    this.insert = function (data, position) {
        var node = new Node(data);
        var nodeBeforeInsert = this.head;
        var counter = 0;

        if (1 == position) {
            node.next = this.head;
            node.prev = this.tail;
            this.head.prev = node;
            this.head = node;
            this.tail.next = node;
        } else if (position >= this.length) {
            var preTail = this.tail.prev;
            node.next = this.tail;
            node.prev = preTail;
            preTail.next = node;
            this.tail.prev = node;
        } else {
            while (++counter < position) {
                nodeBeforeInsert = nodeBeforeInsert.next;
            }
            var nodeBeforeInsertPre = nodeBeforeInsert.prev;
            node.next = nodeBeforeInsert;
            node.prev = nodeBeforeInsertPre;
            nodeBeforeInsert.prev = node;
            nodeBeforeInsertPre.next = node;
        }

        this.length++;

        return this;
    }

    this.shift = function(position1, position2){
        if(position2 < position1) {
            var tmpPos2 = position2;  
            position2 = position1;
            position1 = tmpPos2;
        }
        var node1data = this.remove(position1);
        var node2data = this.remove(position2-1);
        if(position2 >= this.length+2){
            this.add(node1data);
            this.insert(node2data, position1);

            return true;
        }
        this.insert(node1data, position2-1);
        this.insert(node2data, position1);
    }

    this.clear = function () {
        this.length = 0;
        this.head = null;
        this.tail = null;

        return this;
    }
}