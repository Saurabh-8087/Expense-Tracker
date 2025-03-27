class ExpenseTracker{

  constructor(){

     this.descriptionInput = document.getElementById('description');
    this.amountInput = document.getElementById('amount');
    this.transactionTypeSelect = document.getElementById('transactionType');
     this.addTransactionButton = document.getElementById('addTransaction');
     this.transactionList = document.getElementById('transactionList');
     this.totalIncome = document.getElementById('totalIncome');
     this.totalExpenses = document.getElementById('totalExpenses');
     this.balance = document.getElementById('balance');

     this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];


     this.addTransaction = this.addTransaction.bind(this);
     this.deleteTransaction = this.deleteTransaction.bind(this);
     
     
     this.displayTransactions();
 
     this.addTransactionButton.addEventListener('click', this.addTransaction);
  }

  
}





let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to display transactions
function displayTransactions() {
  transactionList.innerHTML = '';
  let totalIncomeAmount = 0;
  let totalExpensesAmount = 0;

  transactions.forEach((transaction, index) => {
    const li = document.createElement('li');
    li.classList.add(transaction.type);
    li.innerHTML = `
      ${transaction.description}: ₹${transaction.amount} 
      <button onclick="deleteTransaction(${index})">Delete</button>
    `;
    transactionList.appendChild(li);

    if (transaction.type === 'income') {
      totalIncomeAmount += transaction.amount;
    } else {
      totalExpensesAmount += transaction.amount;
    }
  });

  // Update totals and balance
  totalIncome.textContent = totalIncomeAmount.toFixed(2);
  totalExpenses.textContent = totalExpensesAmount.toFixed(2);
  balance.textContent = (totalIncomeAmount - totalExpensesAmount).toFixed(2);
}

// Function to add a transaction
function addTransaction() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());
  const type = transactionTypeSelect.value;

  if (description && !isNaN(amount)) {
    const newTransaction = {
      description,
      amount,
      type,
    };

    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    descriptionInput.value = '';
    amountInput.value = '';
    displayTransactions();
  } else {
    alert('Please enter valid description and amount.');
  }
}

// Function to delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  displayTransactions();
}

// Event listener for adding transactions
addTransactionButton.addEventListener('click', addTransaction);

// Display transactions on initial load
displayTransactions();
