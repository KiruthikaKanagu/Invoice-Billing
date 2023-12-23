
// function convertNumToWords() {
//     document.getElementById("words").textContent = toWords(document.getElementById("number").value);
// }
// function toWords(num) {
//     // max 9 digit

//     if ((num = num.toString()).length > 9) return 'overflow';
   
// }
function convertNumToWords() {
    const inputNumber = document.getElementById("number").value;
    document.getElementById("words").textContent = toWords(inputNumber);
}

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

    return result.trim() || 'Zero';
}

