import {TransactionOrigin} from "../src/enums/TransactionOrigin";
import {AccountFactory} from "../src/AccountFactory";
import {Account} from "../src/interfaces/Account";

describe("A checking account", () => {

    it("calculates interest correctly with no deposits in between (Checking Account Requirement #1)", () => {
        let checking = createCheckingAccount();
        expect(checking.balance).toBe(1000);

        checking.advanceDate(365); // 2000/12/31
        // expect(checking.accountHistory.length).toBe(11, "accountHistory length does not match");
        expect(checking.balance).toBeCloseTo(1009.21);

        checking.advanceDate(1); // 2001/1/1
        // expect(checking.accountHistory.length).toBe(12, "accountHistory length does not match");
        // let lastTransaction = checking.accountHistory[checking.accountHistory.length - 1];
        // expect(lastTransaction.success).toBeTruthy();
        // expect(lastTransaction.amount).toBe(0.84);
        // expect(lastTransaction.errorMessage).toBe("");
        // expect(lastTransaction.resultBalance).toBe(1010.05);
        expect(checking.balance).toBeCloseTo(1010.05);
    });

    it("calculates interest correctly with deposits in between (Checking Account Requirement #2)", () => {
        let expectedNewBalances = [1100.92, 1201.92, 1303.00, 1404.17, 1505.42, 1606.76, 1708.18, 1809.69, 1911.28, 2012.96, 2114.72, 2216.57];
        let advanceDates = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let depositAmt = 100;

        let checking = createCheckingAccount();
        for (let i = 0; i < expectedNewBalances.length; i++) {
            let depositAttempt = checking.depositMoney(depositAmt, `deposit ${i}`);
            // expect(depositAttempt.success).toBeTruthy("Unable to deposit money");
            checking.advanceDate(advanceDates[i]);
            expect(checking.balance).toBeCloseTo(expectedNewBalances[i], 2, `Account balance mismatch for month: ${i}`);
            // expect(checking.accountHistory.length).toBe((i + 1) * 2);
        }
    });

    it("allows a withdrawal when the withdrawal amount is less than the current available balance  (Checking Account Requirement #3)", () => {
        let checking = createCheckingAccount();
        let withdrawAttempt = checking.withdrawMoney(500, "withdrawal test 1", TransactionOrigin.branch);
        expect(checking.balance).toBeCloseTo(500);
        // expect(withdrawAttempt.success).toBeTruthy("Unable to withdraw money when enough balance is available after account creation.");
    });

    it("disallows a withdrawal for more than the current available balance (Checking Account Requirement #4)", () => {
        let checking = createCheckingAccount();
        let overdraftAttempt = checking.withdrawMoney(1001, "withdrawal test 1", TransactionOrigin.branch);
        expect(checking.balance).toBeCloseTo(1000, 0, "Available balance is not what was expected.");
        // expect(overdraftAttempt.success).toBeFalsy("Able to withdraw more than available balance?");
        let withdrawAttempt = checking.withdrawMoney(500, "withdrawal test 2", TransactionOrigin.branch);
        expect(checking.balance).toBeCloseTo(500, 0, "Available balance is not what was expected.");
        // expect(withdrawAttempt.success).toBeTruthy("Unable to withdraw money when enough balance is available after an overdraft attempt.");
    });

    it("allows virtually an unlimited number of withdrawals (1000) of any type as long as enough balance is available (Checking Account Requirement #5)", () => {
        let checking = createCheckingAccount();
        const transactionTypes = [TransactionOrigin.branch, TransactionOrigin.web, TransactionOrigin.phone];
        for (let i = 0; i < 1000; i++) {
            expect(checking.balance).toBeGreaterThanOrEqual(1);
            let withdrawAttempt = checking.withdrawMoney(1, `withdrawal test ${i}`, transactionTypes[Math.floor(Math.random() * (3 - 0 + 1)) + 0]);
            expect(checking.balance).toBeCloseTo(1000 - i - 1, 0, "Available balance is not what was expected.");
            // expect(withdrawAttempt.success).toBeTruthy(`Unable to withdraw money when enough balance is available at ${i}`);
            // expect(withdrawAttempt.amount).toBe(1);
            // expect(withdrawAttempt.resultBalance).toBe(1000 - (i + 1));
        }
    });

});

function createCheckingAccount(): Account {
    // let checking = new CheckingAccount("Tester Test", new Date(1990, 6, 1));
    let checking = AccountFactory.getCheckingAccountObject(new Date(2000, 0, 1))
    // checking.accountHolderName = "Tester Test";
    // checking.accountHolderBirthDate = new Date(1990, 6, 1);
    // checking.currentDate = new Date(2000, 0, 1);
    return checking;
}