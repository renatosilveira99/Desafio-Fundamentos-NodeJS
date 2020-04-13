import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transacao {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const tamanho = this.transactions.length;
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    for (let i = 0; i < tamanho; i += 1) {
      if (this.transactions[i].type === 'income') {
        balance.income += this.transactions[i].value;
      }
      if (this.transactions[i].type === 'outcome') {
        balance.outcome += this.transactions[i].value;
      }
    }
    balance.total += balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: Transacao): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
