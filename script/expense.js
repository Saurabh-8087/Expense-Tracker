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

  displayTransactions() {
    this.transactionList.innerHTML = '';
    let totalIncomeAmount = 0;
    let totalExpensesAmount = 0;

    this.transactions.forEach((transaction, index) => {
      const li = document.createElement('li');
      li.classList.add(transaction.type);
      li.innerHTML = `
        ${transaction.description}: ₹${transaction.amount} 
        <button onclick="expenseTracker.deleteTransaction(${index})">Delete</button>
      `;
      this.transactionList.appendChild(li);

      if (transaction.type === 'income') {
        totalIncomeAmount += transaction.amount;
      } else {
        totalExpensesAmount += transaction.amount;
      }
    });

    this.totalIncome.textContent = totalIncomeAmount.toFixed(2);
    this.totalExpenses.textContent = totalExpensesAmount.toFixed(2);
    this.balance.textContent = (totalIncomeAmount - totalExpensesAmount).toFixed(2);

  }


  
  addTransaction() {
    const description = this.descriptionInput.value.trim();
    const amount = parseFloat(this.amountInput.value.trim());
    const type = this.transactionTypeSelect.value;

    if (description && !isNaN(amount)) {
      const newTransaction = {
        description,
        amount,
        type,
      };

      this.transactions.push(newTransaction);
      localStorage.setItem('transactions', JSON.stringify(this.transactions));

      this.descriptionInput.value = '';
      this.amountInput.value = '';
      this.displayTransactions();
    } else {
      alert('Please enter valid description and amount.');
    }
  }


  deleteTransaction(index) {
    this.transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
    this.displayTransactions();
  }


 
}

const expenseTracker = new ExpenseTracker();
