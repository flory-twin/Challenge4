var itemNames = ["Speedball Oblique Pen Holder", "Speedball Standard Point Dip Pen Nibs, Pack of 2", 
	"Higgins Calligraphy Ink - 2.5 oz, Black, Waterproof, Pigment Based", "Bee Paper Aquabee Calligraphy Practice Pad - 9'' x 12'', 50 Sheets",
	"Staedtler Mars Plastic Eraser - Pack of 4", "Bob's Fine Vine Charcoal",
	"General's Wide Compressed Graphite Sticks", "Loew-Cornell Blending Stumps",
	"Blick Matte Fixative"];
var itemCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var itemPrices = [2.38, 2.91, 3.59, 6.57, 
	5.49, 12.49, 1.00, 4.49, 5.98]
console.log("Active.");

// Fill in list of items.
var tableBodyElement = document.getElementById('itemList');
//insertHeaderRow(tableBodyElement);
for (var i = 0; i < itemNames.length; i++) {
	insertRow(i, tableBodyElement);
}
//insertSubtotalRow(tableBodyElement);
insertSpecialRow(tableBodyElement, "subtotal", "Subtotal", calculateSubtotal);
insertSpecialRow(tableBodyElement, "tax", "Tax", calculateTax);
insertSpecialRow(tableBodyElement, "grandTotal", "Grand Total", calculateGrandTotal);
//insertTaxRow(tableBodyElement);
//insertGrandTotalRow(tableBodyElement);


/*
 * Begin methods.
 */

/*
 * Insert a product row.
 */
function insertRow(i, insertInto) {
  const rowElement = document.createElement('tr');
  // Use .innerHTML, -not- appendChild. Remember, there's not a 1:1 mapping between the HTML tree ad the DOM tree!
  insertNameColumn(itemNames[i], rowElement);
  insertCostColumn(itemPrices[i], rowElement);
  insertCountColumn(i, itemCounts[i], rowElement);
  insertInto.innerHTML += rowElement.outerHTML;
}

/*
 * Insert the subtotal row.
 */
function insertSpecialRow(insertInto, id, label, methodName) {
	const rowElement = document.createElement('tr');
	insertNameColumn("", rowElement);
	insertNameColumn(label, rowElement);
	
	const itemColElement = document.createElement('td');
	const itemColSpan = document.createElement('span');
	itemColSpan.setAttribute('id', id)
	itemColSpan.innerText = methodName();
	
	itemColElement.innerHTML += itemColSpan.outerHTML;
	rowElement.innerHTML += itemColElement.outerHTML;
	
	insertInto.innerHTML += rowElement.outerHTML;
}

/*
 * Functions to initially create columns for a row for an item in the cart.
 */
function insertNameColumn(name, row) {
	  const itemColElement = document.createElement('td');
	  itemColElement.innerText = name;
	  
	  row.innerHTML += itemColElement.outerHTML;
	}

function insertCostColumn(cost, row) {
	  const itemColElement = document.createElement('td');
	  itemColElement.innerText = cost.toFixed(2);
	  
	  row.innerHTML += itemColElement.outerHTML;
	}

function insertCountColumn(i, numberAtI, row) {
  const itemColElement = document.createElement('td');
  
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

/*
 * Event handlers.
 */
//TODO: Breaks when over 9 items are in list!
function onItemAddition(itemNumber) {
  addItem(itemNumber);
  updateCountOnPage(itemNumber);
  updateSubtotal();
  updateTax();
  updateGrandTotal();
}

function onItemDeletion(itemNumber) {
  removeItem(itemNumber);
  updateCountOnPage(itemNumber);
  updateSubtotal();
  updateTax();
  updateGrandTotal();
}

/*
 * Arithmetic.
 */
function addItem(i) {
  itemCounts[i] += 1;
}

function removeItem(i) {
  if (itemCounts[i] >= 1)
  {
    itemCounts[i] -= 1;
  }
}

function calculateSubtotal() {
	var subtotal = 0;
	for (var i = 0; i < itemNames.length; i++) {
		subtotal += (itemCounts[i] * itemPrices[i]);
	}
	return subtotal.toFixed(2);
}

function calculateTax() {
	var subtotal = calculateSubtotal();
	return (0.06 * subtotal).toFixed(2);
}

function calculateGrandTotal() {
	var subtotal = Number(calculateSubtotal());
	var tax = Number(calculateTax(subtotal));
	return (subtotal + tax).toFixed(2);
}

/* 
 * Page update functions.
 */
function updateCountOnPage(i) {
  console.log("ID looked for is: countItem" + i);
  const countText = document.getElementById("countItem" + i);
  countText.textContent = itemCounts[i];
}

function updateSubtotal() {
	  const subtotalSpan = document.getElementById("subtotal");
	  subtotalSpan.textContent = calculateSubtotal();
	}

function updateTax() {
	  const taxSpan = document.getElementById("tax");
	  taxSpan.textContent = calculateTax();
	}

function updateGrandTotal() {
	  const grandTotalSpan = document.getElementById("grandTotal");
	  grandTotalSpan.textContent = calculateGrandTotal();
	}