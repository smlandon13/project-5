import {Account} from "./interfaces/Account";

export class AccountFactory {

    static getCheckingAccountObject(currentDate: Date): Account {
        throw new Error("You need to implement this :)");
    }

    static getSavingsAccountObject(currentDate: Date): Account {
        throw new Error("You need to implement this :)");
    }

    static getRetirementAccountObject(currentDate: Date, accountHolderBirthDate: Date): Account {
        throw new Error("You need to implement this :)");
    }

}