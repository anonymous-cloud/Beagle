// Function to fetch market depth data (dummy function for demonstration)
function fetchMarketDepthData() {
    const highestBidElement = document.querySelector('.buyDepth .depthTable tbody tr:first-child td:nth-child(3)');
    const lowestAskElement = document.querySelector('.sellDepth .depthTable tbody tr:first-child .text-left.redLtp');
    return {
        highestBid: parseFloat(highestBidElement ? highestBidElement.innerText : 0),
        lowestAsk: parseFloat(lowestAskElement ? lowestAskElement.innerText : 0)
    };
}

// Function to compare row price with market depth data and change color accordingly
function colorizeTimeAndSalesRows() {
    // Fetch market depth data
    const marketDepthData = fetchMarketDepthData();
    const highestBid = marketDepthData.highestBid;
    const lowestAsk = marketDepthData.lowestAsk;
    if (
        highestBid !== 0 &&
        lowestAsk !== 0) {

        const timeAndSalesRows = document.querySelectorAll('.nonMatTable tbody tr');

        // Iterate over each row and compare prices
        timeAndSalesRows.forEach(row => {
            if (!row.classList.contains('colorized')) {
                const priceElement = row.querySelector('td:nth-child(3)'); // Select the third child (index 2)
                const tradedQuantity = row.querySelector('td:nth-child(2)');
                // console.log(tradedQuantity.innerText)
                if (priceElement && highestBid && lowestAsk) {
                    const price = parseFloat(priceElement.innerText);
                    // alert(price)

                    // Apply color based on comparison with market depth data
                    if (price === highestBid) {
                        row.style.backgroundColor = 'red';
                        priceElement.style.color = 'white'; // Change text color for highest bid

                    } else if (price === lowestAsk) {
                        row.style.backgroundColor = 'green';
                        priceElement.style.color = 'white';
                    } else if (price > highestBid && price < lowestAsk) {
                        row.style.color = 'white'; // Change text color for prices between bid and ask
                    }

                    if (tradedQuantity && parseFloat(tradedQuantity.innerText) && parseFloat(tradedQuantity.innerText) > 100) {
                        tradedQuantity.style.color = 'white'
                        tradedQuantity.style.fontWeight = 'bold';
                        // console.log(tradedQuantity.innerText)
                    }

                    // Add class to mark row as colorized
                    row.classList.add('colorized');
                }

                if (tradedQuantity && parseFloat(tradedQuantity.innerText) && parseFloat(tradedQuantity.innerText)>100) {
                    tradedQuantity.style.fontWeight = 'bold';
                    //console.log(tradedQuantity.innerText)
                }

                // Add class to mark row as colorized
                row.classList.add('colorized');
            }
        });
    }
}

// Call the colorizeTimeAndSalesRows function initially
colorizeTimeAndSalesRows();

// Continuous update: Call the colorizeTimeAndSalesRows function periodically to update colors
setInterval(colorizeTimeAndSalesRows, 10); // Adjust the interval as needed