// const connex = new Connex({
//     node: "https://testnet.outofgas.io/",
//     network: "test"
// });

// const resultDetails = document.getElementById("result");
// const tokenSelect = document.getElementById("tokensList");
// const url = "https://vechain.github.io/token-registry/test.json";

// const transferABI = {
//     constant: false,
//     inputs: [
//         { name: "_to", type: "address" },
//         { name: "_amount", type: "uint256" }
//     ],
//     name: "transfer",
//     outputs: [{ name: "success", type: "bool" }],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function"
// };

// const request = new XMLHttpRequest();
// request.open("get", url);
// request.send(null);
// request.onload = function () {
//     if (request.status === 200) {
//         const json = JSON.parse(request.responseText);
//         for (let i = 0; i < json.length; i++) {
//             const option = document.createElement("option");
//             option.text = json[i].symbol;
//             option.value = json[i].address;
//             tokenSelect.appendChild(option);
//         }
//     }
// };

// function transferToken() {
//     const to = document.getElementById("to").value;
//     const amount = BigInt(document.getElementById("amount").value);
  
//     const e18 = BigInt(1e18);
//     const transferMethod = connex.thor
//         .account(tokenSelect.value)
//         .method(transferABI);
  
//     const clause = transferMethod.asClause(to, (amount * e18).toString(10));
  
//     connex.vendor
//         .sign("tx", [clause])
//         .comment("transaction signing - transfer token")
//         .request()
//         .then((r) => (resultDetails.innerText = JSON.stringify(r, null, 4)))
//         .catch((e) => console.log("error:" + e.message));
// }

const connex = new Connex({
    node: "https://testnet.outofgas.io/",
    network: "test"
});

const resultDetails = document.getElementById("result");

const VTHO_ADDRESS = "0x0000000000000000000000000000456e65726779"; // VeThor Token address
const VTHO_SYMBOL = "VTHO"; // VeThor Token symbol

const transferABI = {
    constant: false,
    inputs: [
        { name: "_to", type: "address" },
        { name: "_amount", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
};

function transferToken() {
    const to = document.getElementById("to").value;
    const amount = BigInt(document.getElementById("amount").value);
  
    //the value unit is wei , thus, value need to multiply by 1e18
    const e18 = BigInt(1e18);
    const transferMethod = connex.thor
        .account(VTHO_ADDRESS)
        .method(transferABI);
  
    const clause = transferMethod.asClause(to, (amount * e18).toString(10));
  
    connex.vendor
        .sign("tx", [clause])
        .comment("transaction signing - transfer token")
        .request()
        .then((r) => (resultDetails.innerText = JSON.stringify(r, null, 4)))
        .catch((e) => console.log("error:" + e.message));
}
