var list = new list();
function getList(){
    return list;
}
list.add('A').add('B');
list.add('C');
list.add('D');
list.add('E');
reDrawTable(list);
    redrawSelectsOptions(list);

window.onhashchange = function() { 
    var cellId = window.location.hash.substr(1);
    var cell = document.getElementById(cellId).parentElement;

    cell.style.backgroundColor = 'lightblue';
    setTimeout(function(){
         cell.style.backgroundColor = '';
         window.history.pushState("", document.title, window.location.pathname);
    },900);
}

function addNode(){
    var inputAddNodeData = document.getElementById('add_node').value;
    var list = getList();
    list.add(inputAddNodeData);
    reDrawTable(list);
    redrawSelectsOptions(list);

    return false;
}

function insertNode(){
    var inputInsertNodeData = document.getElementById('insert_node').value;
    var select = document.getElementById('insert_before_select');
    var position = select.options[select.selectedIndex].value;
    var list = getList();
    list.insert(inputInsertNodeData, position);
    reDrawTable(list);
    redrawSelectsOptions(list);

    return false;
}

function removeNode(){
    var select = document.getElementById('remove_select');
    var position = select.options[select.selectedIndex].value;
    var list = getList();
    list.remove(position);
    reDrawTable(list);
    redrawSelectsOptions(list);

    return false;
}

function shiftNode(){
    var select1 = document.getElementById('shift_select_1');
    var position1 = select1.options[select1.selectedIndex].value;
    var select2 = document.getElementById('shift_select_2');
    var position2 = select2.options[select2.selectedIndex].value;
    if(position1 == position2) {
        alert('Nevar but vienādi');
        return false;
    }

    var list = getList();
    list.shift(position1, position2);

    reDrawTable(list);
    redrawSelectsOptions(list);

    return false;
}

function drawTable(list) {
    var tbdy = document.getElementById('tbody');
    var currentNode = list.head;

    for (var i = 1; i < list.length + 1; i++) {
        var tr = document.createElement('tr');
        for (var j = 1; j <= 4; j++) {
        	var td = document.createElement('td');
        	var child, txt = '';

        	if (1 === j) {
                var child = document.createElement('span');

                child.setAttribute('id', 'table-cell-' + i);
                child.appendChild(document.createTextNode(i));
        	}
            if (2 === j) {
                var prevNode = currentNode.prev;
                if (prevNode) {
                    var child = document.createElement('a');
                    var cellId = i === 1 
                        ? list.length
                        : i - 1;
                    child.href = '#table-cell-' + cellId;
                    child.data =  cellId;
                    child.innerHTML = prevNode.data;
                } else {
                    child = document.createTextNode('null');
                }
            }
        	if (3 === j) {
        		txt = currentNode.data;
                child = document.createTextNode(txt);
        	}
        	if (4 === j) {
                var nextNode = currentNode.next;
                if (nextNode) {
                    var child = document.createElement('a');
                    var cellId = i === list.length 
                        ? 1
                        : i + 1;
                    child.href = '#table-cell-' + cellId;
                    child.data =  cellId;
                    child.innerHTML = nextNode.data;
                } else {
                    child = document.createTextNode('null');
                }
        	}

        	td.appendChild(child);
        	tr.appendChild(td);
        }
        currentNode = currentNode.next;
        tbdy.appendChild(tr);
    }

}

function reDrawTable(list){
    clearTable();
    drawTable(list);
}

function clearTable(){
    var tbdy = document.getElementById('tbody');
    var tbdyParent = tbdy.parentNode;
    var newTbdy = document.createElement('tbody');
    newTbdy.setAttribute('id', 'tbody');

    tbdyParent.removeChild(tbdy);
    tbdyParent.appendChild(newTbdy);
}

function redrawSelectsOptions(list) {
    redrawSelectOptions(list, document.getElementById('insert_before_select'));
    redrawSelectOptions(list, document.getElementById('remove_select'));
    redrawSelectOptions(list, document.getElementById('shift_select_1'));
    redrawSelectOptions(list, document.getElementById('shift_select_2'));
}

function redrawSelectOptions(list, select){
    clearSelectOptions(select);
    for (var i = 1; i <= list.length; i++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }
}

function clearSelectOptions(select){
    var length = select.options.length;
    for(var i = select.options.length - 1; i >= 0 ; i--){
      select.remove(i);
    }
}

// console.log(list);
// reDrawTable(list);
// redrawSelectsOptions(list);
// redrawSelectsOptions(list);
