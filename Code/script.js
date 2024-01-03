//1
const balance = document.getElementById(
  "balance"
);
const money_plus = document.getElementById(
  "money-plus"
);
const money_minus = document.getElementById(
  "money-minus"
);
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('please add text and amount')
  }else{
    const transaction = {
      id:generateID(),
      text:text.value,
      amount:+amount.value
    }

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value='';
    amount.value='';
  }
}


//5.5
//Generate Random ID
function generateID(){
  return Math.floor(Math.random()*1000000000);
}

//2

function addTransactionDOM(transaction) {
  if (!transaction.date) {
    return; // Skip adding the transaction without a date
  }
  
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> ${transaction.date}
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  list.appendChild(item);
}



function updateValues() {
  const amounts = transactions.map(
    (transaction) => transaction.amount
  );
  
  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    (amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) *
    -1).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}


//6 

//Remove Transaction by ID
function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}
//last
//update Local Storage Transaction
function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

//3

//Init App
function Init() {
  list.innerHTML = ""; // Clear the contents of the list element

  transactions.forEach(addTransactionDOM);
  updateValues();

  transactions.forEach(transaction => {
    const item = document.createElement("li");

    const sign = transaction.amount < 0 ? "-" : "+";
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span>  ${transaction.date} 
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
  });
}

Init();

form.addEventListener('submit',addTransaction);

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

var labels1 = [];
var data1=[];

var labels2 = [];
var data2=[];



var myMap1 = new Map();
var myMap2 = new Map();


for(var i=0; i<transactions.length; i++){
    if(transactions[i].amount<0){
        if(myMap1.has(transactions[i].text)){
            var value = myMap1.get(transactions[i].text);
            myMap1.set(transactions[i].text, value + transactions[i].amount);
        }
        else{
            myMap1.set(transactions[i].text, transactions[i].amount);
        }
        console.log(myMap1[transactions[i].text]);
    }
    else{
        if(myMap2.has(transactions[i].text)){
            var value = myMap2.get(transactions[i].text);
            myMap2.set(transactions[i].text, value + transactions[i].amount);
         }
         else{
             myMap2.set(transactions[i].text, transactions[i].amount);
         }
         console.log(myMap2[transactions[i].text]);
    }
}
for (var [key, value] of myMap1.entries()) {
    labels1.push(key);
    data1.push(value);
  }

  for (var [key, value] of myMap2.entries()) {
    labels2.push(key);
    data2.push(value);
  }

  var backgroundColor1 = [];
  var backgroundColor2 = [];

  for(var i=0; i<labels1.length; i++){
    backgroundColor1.push(getRandomColor());
  }

  for(var i=0; i<labels2.length; i++){
    backgroundColor2.push(getRandomColor());
  }

  //Render the pie chart
  var ctx = document.getElementById('myChart1').getContext('2d');
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: labels1,
    datasets: [{
      data: data1,
      backgroundColor: backgroundColor1
    }]
  },
  options: {
    responsive: true,
    aspectRatio: 3, // Adjust this value to decrease or increase the size of the chart
    plugins: {
      legend: {
        position: 'right'
      }
    }
  }
});

var ctx = document.getElementById('myChart2').getContext('2d');
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: labels2,
    datasets: [{
      data: data2,
      backgroundColor: backgroundColor2
    }]
  },
  options: {
    responsive: true,
    aspectRatio: 3, // Adjust this value to decrease or increase the size of the chart
    plugins: {
      legend: {
        position: 'right'
      }
    }
  }
});

  function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
      alert('Please add text and amount');
    } else {
      const transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value,
        date: date.value 
      }
  
      transactions.push(transaction);
  
      addTransactionDOM(transaction);
      updateValues();
      updateLocalStorage();
      text.value = '';
      amount.value = '';
    }
  }  
