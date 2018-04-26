"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionOrigin_1 = require("../src/enums/TransactionOrigin");
const AccountFactory_1 = require("../src/AccountFactory");
describe("A savings account", () => {
    it("calculates interest correctly with no deposits in between (Savings Account Requirement #1)", () => {
        let savings = AccountFactory_1.AccountFactory.getSavingsAccountObject(new Date(2000, 0, 1));
        expect(savings.balance).toBe(10000);
        savings.advanceDate(365); // 2000/12/31
        expect(savings.balance).toBeCloseTo(10184.87);
        savings.advanceDate(1); // 2001/1/1
        expect(savings.balance).toBeCloseTo(10201.84);
    });
    it("calculates interest correctly with deposits in between (Savings Account equirement #2)", () => {
        let expectedNewBalances = [11018.33, 12038.36, 13060.09, 14083.52, 15108.66, 16135.51, 17164.07, 18194.34, 19226.33, 20260.04, 21295.47, 22332.63];
        let advanceDates = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let depositAmt = 1000;
        let savings = AccountFactory_1.AccountFactory.getSavingsAccountObject(new Date(2000, 0, 1));
        for (let i = 0; i < expectedNewBalances.length; i++) {
            savings.depositMoney(depositAmt, `deposit ${i + 1}`);
            savings.advanceDate(advanceDates[i]);
            expect(savings.balance).toBeCloseTo(expectedNewBalances[i], 2, `Month: ${i + 1}`);
        }
    });
    it("disallows a withdrawal for more than the current available balance (Savings Account Requirement #3)", () => {
        let savings = AccountFactory_1.AccountFactory.getSavingsAccountObject(new Date(2000, 0, 1));
        let overdraftAttempt = savings.withdrawMoney(10001, "withdrawal test 1", TransactionOrigin_1.TransactionOrigin.branch);
        expect(savings.balance).toBeCloseTo(10000, 0, "Available balance is not what was expected after attempting a withdrawal of $10,001.");
        // expect(overdraftAttempt.success).toBeFalsy("Able to withdraw more than available balance.");
        let withdrawAttempt = savings.withdrawMoney(500, "withdrawal test 2", TransactionOrigin_1.TransactionOrigin.branch);
        expect(savings.balance).toBeCloseTo(9500, 0, "Available balance is not what was expected after a withdrawal attempt of $500.");
        // expect(withdrawAttempt.success).toBeTruthy("Unable to withdraw money when enough balance is available after an overdraft attempt.");
    });
    it("disallows more than 6 withdrawals in a month over the internet or phone (Savings Account Requirement #4)", () => {
        let savings = AccountFactory_1.AccountFactory.getSavingsAccountObject(new Date(2000, 0, 1));
        let first = savings.withdrawMoney(10, "test 1", TransactionOrigin_1.TransactionOrigin.web);
        expect(savings.balance).toBeCloseTo(9990);
        // expect(first.success).toBeTruthy("On test 1");
        savings.advanceDate(5);
        let second = savings.withdrawMoney(10, "test 2", TransactionOrigin_1.TransactionOrigin.phone);
        expect(savings.balance).toBeCloseTo(9980);
        // expect(second.success).toBeTruthy("On test 2");
        savings.advanceDate(5);
        let third = savings.withdrawMoney(10, "test 3", TransactionOrigin_1.TransactionOrigin.web);
        expect(savings.balance).toBeCloseTo(9970);
        // expect(third.success).toBeTruthy("On test 3");
        savings.advanceDate(5);
        let fourth = savings.withdrawMoney(10, "test 4", TransactionOrigin_1.TransactionOrigin.phone);
        expect(savings.balance).toBeCloseTo(9960);
        // expect(fourth.success).toBeTruthy("On test 4");
        savings.advanceDate(5);
        let fifth = savings.withdrawMoney(10, "test 5", TransactionOrigin_1.TransactionOrigin.web);
        expect(savings.balance).toBeCloseTo(9950);
        // expect(fifth.success).toBeTruthy("On test 5");
        savings.advanceDate(5);
        let sixth = savings.withdrawMoney(10, "test 6", TransactionOrigin_1.TransactionOrigin.phone);
        expect(savings.balance).toBeCloseTo(9940);
        // expect(sixth.success).toBeTruthy("On test 6");
        savings.advanceDate(5);
        let currentBal = savings.balance;
        let seventh = savings.withdrawMoney(10, "test 7", TransactionOrigin_1.TransactionOrigin.web);
        expect(savings.balance).toBeCloseTo(9940);
        // expect(seventh.success).toBeFalsy("On test 7");
        expect(savings.balance).toBe(currentBal);
        // savings.advanceDate(5);
        // let eigth = savings.withdrawMoney(10, "test 8", TransactionOrigin.phone);
        // expect(savings.balance).toBeCloseTo(9930);
        // expect(eigth.success).toBeTruthy("On test 8");
    });
    it("allows virtually an unlimited number of withdrawals (1000) at the branch as long as enough balance is available (Savings Account Requirement #5)", () => {
        let savings = AccountFactory_1.AccountFactory.getSavingsAccountObject(new Date(2000, 0, 1));
        for (let i = 0; i < 1000; i++) {
            expect(savings.balance).toBeGreaterThanOrEqual(1);
            let withdrawAttempt = savings.withdrawMoney(1, `withdrawal test ${i}`, TransactionOrigin_1.TransactionOrigin.branch);
            // expect(withdrawAttempt.success).toBeTruthy(`Unable to withdraw money when enough balance is available at ${i}`);
        }
    });
});
//# sourceMappingURL=2.SavingsAccount.spec.js.map