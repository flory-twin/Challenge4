/**
 * 
 */

function insertRow(i, insertInto) {
  const rowElement = document.createElement('tr');
  // Use .innerHTML, -not- appendChild. Remember, there's not a 1:1 mapping between the HTML tree ad the DOM tree!
  insertNameColumn(itemNames[i], rowElement);
  insertCostColumn(itemPrices[i], rowElement);
  insertCountColumn(i, itemCounts[i], rowElement);
  insertInto.innerHTML += rowElement.outerHTML;
}

function insertNameColumn(name, row) {
  const itemColElement = document.createElement('th');
  itemColElement.setAttribute("scope", "col");
  itemColElement.innerText = name;
  
  row.innerHTML += itemColElement.outerHTML;
}

function insertCostColumn(cost, row) {
  const itemColElement = document.createElement('th');
  itemColElement.setAttribute("scope", "col");
  itemColElement.innerText = cost;
  
  row.innerHTML += itemColElement.outerHTML;
}

function insertCountColumn(i, numberAtI, row) {
  const itemColElement = document.createElement('th');
  itemColElement.setAttribute("scope", "col");
  
  const plusButtonElement = document.createElement('button');
  plusButtonElement.setAttribute('type', 'button');
  plusButtonElement.setAttribute('class', 'btn btn-primary');
  plusButtonElement.setAttribute('id', "item" + i + "+");
  plusButtonElement.setAttribute("onClick", "onItemAddition(" + i + ");");
  plusButtonElement.textContent = "+";
  itemColElement.innerHTML += plusButtonElement.outerHTML;
  
  const countText = document.createElement("span");
  countText.textContent = numberAtI;
  countText.setAttribute('id', "countItem" + i);
  itemColElement.innerHTML += countText.outerHTML;
  
  const minusButtonElement = document.createElement('button');
  minusButtonElement.setAttribute('type', 'button');
  minusButtonElement.setAttribute('class', 'btn btn-primary');
  minusButtonElement.setAttribute('id', "item" + i + "-");
  minusButtonElement.setAttribute("onClick", "onItemDeletion(" + i + ");");
  minusButtonElement.textContent = "-";
  itemColElement.innerHTML += minusButtonElement.outerHTML;
  
  row.innerHTML += itemColElement.outerHTML;
}