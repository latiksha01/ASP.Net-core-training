import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Transaction {
  date: string;
  description: string;
  type: number;
  amount: number;
  balance: string;
}

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent implements OnInit {

  http = inject(HttpClient);

  apiUrl = "http://localhost:5200/api/transactions";

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedDate: string = '';

  // ✅ Popup control
  showPopup = false;

  // ✅ Form data
  newTransaction: any = {
    date: '',
    description: '',
    type: 0,
    amount: 0,
    balance: ''
  };

  ngOnInit(): void {
    this.getAllTransactions();
  }

  // ✅ Get all data
  getAllTransactions(): void {
    this.http.get<Transaction[]>(this.apiUrl)
      .subscribe(data => {
        this.transactions = data;
        this.filteredTransactions = data;
      });
  }

  // ✅ Filter
  filterByDate(): void {
    if (!this.selectedDate) return;

    this.http.get<Transaction[]>(`${this.apiUrl}/filter?date=${this.selectedDate}`)
      .subscribe(data => {
        this.filteredTransactions = data;
      });
  }

  // ✅ Reset
  resetFilter(): void {
    this.getAllTransactions();
    this.selectedDate = '';
  }

  // ✅ Sort
  sortByAmount(): void {
    this.filteredTransactions = [...this.filteredTransactions]
      .sort((a, b) => a.amount - b.amount);
  }

  // ✅ Popup functions
  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  // ✅ Add Transaction
  addTransaction() {
    this.http.post(this.apiUrl, this.newTransaction)
      .subscribe(() => {
        this.closePopup();
        this.getAllTransactions();
      });
  }
}