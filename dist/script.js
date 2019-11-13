var itemNames = ["Speedball Oblique Pen Holder", "", "", ""];
var itemCounts = [0, 0, 0, 0];
var itemPrices = [2.38, 0, 0, 0]

// Fill in list of items.
var tableBodyElement = document.getElementById('itemList');
insertRow(0, tableBodyElement);
/*
  Create a structure like the following:
  <tr>
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col">
        <button type="button" class="btn btn-primary" id="item1+">+</button>
        0
        <button type="button" class="btn btn-primary" id="item1-">+</button>
      </th>
    </tr>
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
//TODO: Breaks when over 9 items are in list!
function onItemAddition(itemNumber) {
  addItem(itemNumber);
  updateCountOnPage(itemNumber);
}

function onItemDeletion(itemNumber) {
  removeItem(itemNumber);
  updateCountOnPage(itemNumber);
}
function addItem(i) {
  itemCounts[i] += 1;
}

function removeItem(i) {
  if (itemCounts[i] >= 1)
  {
    itemCounts[i] -= 1;
  }
}

function updateCountOnPage(i) {
  console.log("ID looked for is: countItem" + i);
  const countText = document.getElementById("countItem" + i);
  countText.textContent = itemCounts[i];
}

for (var i = 0; i < itemNames.length; i++) {
  /*
  const unitCostColELement = document.createElement('th scope="col"');
  unitCostColElement.textContent = itemPrices[i];
  rowElement.appendChild(unitCostColElement);
  
  console.log("Table body: " + tableBodyElement);
  
  var countColElement = document.createElement('th scope="col"');
  var plusButtonElement = document.createElement('button type="button" class="btn btn-primary" id="item1+"');
  countColElement.appendChild(plusButtonElement);
  countColElement.textContent = itemCounts[i];
  var plusButtonElement = document.createElement('button type="button" class="btn btn-primary" id="item1-"');
  countColElement.appendChild(minusButtonElement);
  rowElement.appendChild(countColElement);
  
  console.log("Table body: " + tableBodyElement);
  */
}