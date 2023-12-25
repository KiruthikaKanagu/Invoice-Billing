

// function for converting number to words
// Function to convert number to words
function toWords(num) {
    // Max 9 digit
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function convertChunk(num) {
        const numStr = num.toString();
        const len = numStr.length;

        if (len === 3) {
            return `${units[numStr[0]]} Hundred${numStr[1] !== '0' ? ' and ' + convertChunk(parseInt(numStr[1] + numStr[2])) : ''}`;
        } else if (len === 2) {
            if (numStr[0] === '1') {
                return teens[numStr[1]];
            } else {
                return `${tens[numStr[0]]}${numStr[1] !== '0' ? ' ' + units[numStr[1]] : ''}`;
            }
        } else {
            return units[numStr[0]];
        }
    }

    // Parse the input number to ensure it's within the valid range
    num = parseInt(num, 10);

    if (isNaN(num) || num <= 0 || num > 999999999) {
        return 'Invalid input';
    }

    if (num >= 10000000) {
        return 'Overflow (Input should be less than 10 Crores)';
    }

    const crore = Math.floor(num / 10000000);
    const lakhs = Math.floor((num % 10000000) / 100000);
    const thousands = Math.floor((num % 100000) / 1000);
    const remainder = Math.floor(num % 1000);

    let result = '';

    if (crore > 0) {
        result += `${convertChunk(crore)} Crore `;
    }

    if (lakhs > 0) {
        result += `${convertChunk(lakhs)} Lakh `;
    }

    if (thousands > 0) {
        result += `${convertChunk(thousands)} Thousand `;
    }

    if (remainder > 0) {
        result += `${convertChunk(remainder)}`;
    }

    return result.trim() + " Rupees " + " only" || 'Zero';
}


function printInvoice() {
    // Hide all SVG icons before printing
    const svgIcons = document.querySelectorAll('.btn-primary svg, .text-red-500 svg');
    if (svgIcons) {
        svgIcons.forEach((svgIcon) => {
            svgIcon.style.visibility = 'hidden';
        });
    }

    // Trigger the print operation
    window.print();

    // Show all SVG icons after printing
    if (svgIcons) {
        svgIcons.forEach((svgIcon) => {
            svgIcon.style.visibility = 'visible';
        });
    }
}




var currentDate = new Date();

// Get individual components of the date
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
var day = currentDate.getDate();

var formattedDate = (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;

document.getElementById("date").textContent = formattedDate;
// Get current time
const currentTime = new Date();
const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';

// Format the time as needed
const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

document.getElementById("time").textContent = formattedTime;
console.log(document.getElementById("time"));


function deleteRow(button) {
    const row = button.parentNode.parentNode; // Get the parent <tr> of the button
    const invoiceItems = document.getElementById('invoiceItems');
    invoiceItems.removeChild(row);

    // Reassign serial numbers
    const rows = invoiceItems.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName('td')[0].textContent = i + 1;
    }

    // Recalculate the total after deleting the row
    calculateTotal();
}

function calculateTotal() {
    const rows = document.getElementById('invoiceItems').getElementsByTagName('tr');
    let grandTotal = 0;
    for (let i = 0; i < rows.length; i++) {
        const selectedOption = rows[i].querySelector('select').value;
        const quantity = rows[i].querySelectorAll('input')[0].value;
        const rate = rows[i].querySelectorAll('input')[1].value;
        const total = (quantity * rate).toFixed(2);
        rows[i].querySelector('.total').textContent = `₹${total}`;
        grandTotal += parseFloat(total);
    }
    document.getElementById('grandTotal').textContent = `₹${grandTotal.toFixed(2)}`;
    const currentBill = document.getElementById("currentbill");
    currentBill.textContent = `₹${grandTotal.toFixed(2)}`;

    // Convert grand total to words
    const wordsElement = document.getElementById("words");
    wordsElement.textContent = `Amount in words: ${toWords(grandTotal)}`;
}
function addInvoiceItem() {
    const invoiceItems = document.getElementById('invoiceItems');
    const rowsCount = invoiceItems.getElementsByTagName('tr').length + 1;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="py-2 px-4 border">${rowsCount}</td>
        <td class="border" style="width: 33%;">
            <select class="description-dropdown px-6 py-2 w-full sm:inline-block max-w-full" onchange="calculateTotal()" style="-webkit-appearance: none">
                <option value="item1">Select</option>
                <option value="item2">Atchaya</option>
                <option value="item3">Karnataka ponni</option>
                 <option value="item4">BBT</option>
                <option value="item5">36</option>
                <option value="item6">39</option>
                 <option value="item7">45</option>
                 <option value="item8">Husk</option>
                <option value="item9">Husk Powder</option>
                <option value="item10">Ponni Broken Rice</option>
               <option value="item11">Broken Rice</option>
            </select>
        </td>
        <td class="border"><input type="number" value="1" oninput="calculateTotal()" class="px-4 py-2 w-full sm:inline-block max-w-full"></td>   
        <td class="border"><input type="number"  step="0" oninput="calculateTotal()" class="px-4 py-2 w-full sm:inline-block max-w-full"></td>
        <td class="total text-center border" style="width: 15%;">₹0.00</td>
        <td><button onclick="deleteRow(this)" class="text-red-500 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M14.12 10.47L12 12.59l-2.13-2.12l-1.41 1.41L10.59 14l-2.12 2.12l1.41 1.41L12 15.41l2.12 2.12l1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8z"/></svg>
        </button></td>
    `;
    invoiceItems.appendChild(row);

    // Reassign serial numbers
    const updatedRows = invoiceItems.getElementsByTagName('tr');
    for (let i = 0; i < updatedRows.length; i++) {
        updatedRows[i].getElementsByTagName('td')[0].textContent = i + 1;
    }

    // Reassign event listeners for delete buttons
    const deleteButtons = invoiceItems.querySelectorAll('.text-red-500');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].setAttribute('onclick', 'deleteRow(this)');
    }
}


document.addEventListener('keyup', (event) => {
    if (event.target == "Enter") {
        addInvoiceItem()
        calculateTotal()
    }
})



