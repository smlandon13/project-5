import {Transaction} from "./transaction";
import {TransactionOrigin} from "../enums/TransactionOrigin";

export interface Account {
    accountHolderBirthDate: any;
    balance: number;
    accountHistory: Transaction[];
    // currentDate: Date;

    withdrawMoney(amount: number,
                  description: string,
                  transactionOrigin: TransactionOrigin): Transaction;

    depositMoney(amount: number,
                 description: string): Transaction;

    advanceDate(numberOfDays: number);
}