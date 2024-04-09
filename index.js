#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 1000000;
let myPin = 4240;
console.log(chalk.blue("\n \twelcome to ATM machine\n"));
async function main() {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: chalk.yellow("Enter your pin code"),
            type: "number"
        }
    ]);
    if (pinAnswer.pin === myPin) {
        console.log(chalk.green("\npin is correct, login successfully!\n"));
        let operationAns = await inquirer.prompt([
            {
                name: "operation",
                type: "list",
                message: chalk.yellow("select an operation:"),
                choices: ["withdraw amount", "check balance"]
            }
        ]);
        if (operationAns.operation === "withdraw amount") {
            let withdrawAns = await inquirer.prompt([
                {
                    name: "withdrawalMethod",
                    type: "list",
                    message: chalk.yellow("select a withdrawal method"),
                    choices: ["fast cash", "enter amount"]
                }
            ]);
            if (withdrawAns.withdrawalMethod === "fast cash") {
                let fastCashAns = await inquirer.prompt([
                    {
                        name: "fastCash",
                        type: "list",
                        message: chalk.yellow("Select Amount"),
                        choices: ["1000", "3000", "10000", "15000"]
                    }
                ]);
                if (fastCashAns.fastCash > myBalance) {
                    console.log(chalk.red("\nSorry, Your Balance Is insufficient\n"));
                }
                else {
                    myBalance -= Number(fastCashAns.fastCash);
                    console.log(`${fastCashAns.fastCash} Withdraw Successfully`);
                    console.log(`chalk.green(Your Remaining Balance is: ${myBalance}`);
                }
            }
            else if (withdrawAns.withdrawalMethod === "enter amount") {
                let amountAns = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.yellow("Enter your amount to withdraw:")
                    }
                ]);
                if (amountAns.amount > myBalance) {
                    console.log(chalk.red("\nSorry, Your Balance Is insufficient\n"));
                }
                else {
                    myBalance -= amountAns.amount;
                    console.log(`${amountAns.amount} Withdraw Successfully`);
                    console.log(`chalk.green(Your Remaining Balance is: ${myBalance}`);
                }
            }
        }
        else if (operationAns.operation === "check balance") {
            console.log(`chalk.green(your account balance is:  ${myBalance}`);
        }
    }
    else {
        console.log(chalk.red("Sorry, Your pin is incorrect. Please try again!"));
    }
}
main();
