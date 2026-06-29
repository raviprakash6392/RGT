let data = JSON.parse(localStorage.getItem("khata")) || [];

function addEntry(){

let entry = {
name: document.getElementById("Name").value,
date: document.getElementById("Date").value,
amount: Number(document.getElementById("amount").value || 0),
details: document.getElementById("details").value,
returnAmount: Number(document.getElementById("returnAmount").value || 0),
returnDate: document.getElementById("returnDate").value,
mobile: document.getElementById("mobile").value,
signature: document.getElementById("signature").value
};

data.push(entry);
localStorage.setItem("khata", JSON.stringify(data));

render();
clearForm();
}

function render(){

let tbody = document.getElementById("tableBody");
tbody.innerHTML = "";

let totalUdhar = 0;
let totalReturn = 0;
let balance = 0;

data.forEach((d, index)=>{

let bal = d.amount - d.returnAmount;

totalUdhar += d.amount;
totalReturn += d.returnAmount;
balance += bal;

tbody.innerHTML += `
<tr>
<td>${d.name}</td>
<td>${d.date}</td>
<td>${d.amount}</td>
<td>${d.details}</td>
<td>${d.returnAmount}</td>
<td>${d.returnDate}</td>
<td>${bal}</td>
<td>${d.mobile}</td>
<td>${d.signature}</td>
<td><button class="action-btn delete" onclick="del(${index})">X</button></td>
</tr>
`;
});

document.getElementById("totalUdhar").innerText = totalUdhar;
document.getElementById("totalReturn").innerText = totalReturn;
document.getElementById("balance").innerText = balance;
}

function del(i){
data.splice(i,1);
localStorage.setItem("khata", JSON.stringify(data));
render();
}

function clearForm(){
document.querySelectorAll("input").forEach(i=>i.value="");
}
function searchCustomer() {

    let value = document.getElementById("search").value.toLowerCase();

    let rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(function(row) {

        if (row.innerText.toLowerCase().includes(value)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Udhar Khata Register", 15, 15);

    let rows = data.map(d => [
        d.name,
        d.date,
        d.amount,
        d.details,
        d.returnAmount,
        d.returnDate,
        d.amount - d.returnAmount,
        d.signature
    ]);

    doc.autoTable({
        head: [["Name","Date","Amount","Details","Return","Return Date","Balance","Mobile","Signature"]],
        body: rows,
        startY: 25
    });

    doc.save("Udhar_Khata.pdf");
}
function shareWhatsApp() {

    // यहीं से शुरू
    let customer = document.getElementById("Name").value;
    let date = document.getElementById("Date").value;
    let amount = document.getElementById("amount").value;
    let details = document.getElementById("details").value;
    let returnAmount = document.getElementById("returnAmount").value;
    let returnDate = document.getElementById("returnDate").value;
    let mobile = document.getElementById("mobile").value;
    let balance = Number(amount || 0) - Number(returnAmount || 0);

    let msg = `📒 Udhar Khata

👤 Customer : ${customer}
📅 Date : ${date}
📱 Mobile : ${mobile}
💰 Udhar : ₹${amount}
💵 Return : ₹${returnAmount}
📅 Return Date : ${returnDate}
📦 Details : ${details}
🧾 Balance : ₹${balance}`;

    // यह हिस्सा पहले जैसा ही रहेगा
    window.open(
        "https://wa.me/?text=" + encodeURIComponent(msg),
        "_blank"
    );
}
render();