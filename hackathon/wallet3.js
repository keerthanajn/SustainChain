

async function sendTransaction() {
  // create connex instance
  const connex = new Connex({
    node: "https://testnet.veblocks.net/",
    network: "test"
  });

  // Retrieve values from the input fields
  const recipient = document.getElementById("to").value;
  const sender = document.getElementById("Data").value;
  const amount = document.getElementById("amount").value;

  // Build transaction clause with user input values
  const clauses = [{
    to: recipient,
    value: String(amount).concat('0'.repeat(18)),
    data: sender
  }];

  // Delegate URL
  const delegateUrl = 'https://sponsor-testnet.vechain.energy/by/434';

  try {
    // Ask user to confirm with Sync2 (Lite)
    const { txid } = await connex.vendor.sign('tx', clauses)
      .delegate(delegateUrl)
      .comment('This is a Test Transaction')
      .request();

    alert('Transaction submitted with transaction id ' + txid);
  } catch (error) {
    console.error("Error:", error.message);
    alert('Failed to submit transaction');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Fetch the token count from the server
  fetch("http://127.0.0.1:8000/gettokens/")
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch token count');
      }
      return response.json();
    })
    .then(data => {
      // Check if the data contains at least one user with tokens
      if (Array.isArray(data) && data.length > 0 && typeof data[0].tokens !== 'undefined') {
        // Update the navigation bar with the token count of the first user
        const tokenCountElement = document.getElementById('token-count');
        tokenCountElement.textContent = "Tokens: " + data[0].tokens;
      } else {
        console.error('Invalid response data:', data);
        // Update the navigation bar with an error message
        const tokenCountElement = document.getElementById('token-count');
        tokenCountElement.textContent = 'No tokens found';
      }
    })
    .catch(error => {
      console.error("Error fetching token count:", error);
      // Update the navigation bar with an error message
      const tokenCountElement = document.getElementById('token-count');
      tokenCountElement.textContent = 'Failed to fetch tokens';
    });
});