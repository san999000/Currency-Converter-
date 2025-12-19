const apiKey = "a5f51ea3cc01bdb6819e2e71"; //  API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Function to update the flags based on the selected currency
function updateFlag(type) {
  const select = document.getElementById(type + "Currency");
  const flagIcon = document.getElementById(type + "Flag");
  const selectedOption = select.options[select.selectedIndex];
  const flagCode = selectedOption.getAttribute("data-flag");
  flagIcon.className = "flag-icon flag-icon-" + flagCode;
}

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (amount === "" || isNaN(amount)) {
    alert("Please enter a valid amount");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}${fromCurrency}`);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();
    const rate = data.conversion_rates[toCurrency];
    const convertedAmount = amount * rate;

    document.getElementById(
      "result"
    ).innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
      2
    )} ${toCurrency}`;
  } catch (error) {
    alert("Error fetching exchange rates: " + error.message);
  }
}

document.getElementById("swapButton").addEventListener("click", () => {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  updateFlag("from");
  updateFlag("to");
});

// Initialize the flags
