const Account = require('./Account');
const CommandLine = require('./CommandLine');

async function main() {
    try {
        const accountName = await CommandLine.ask('Which account would you like to access? ');
        const account = await Account.find(accountName);
        if (account == null) account = promptCreateAccount(accountName);
        if (account != null) await promptTask(account);
    } catch (e) {
        CommandLine.print('Error: Please try again');
    }
}

async function promptCreateAccount(accountName) {
    const response = await CommandLine.ask('That account does not exist, would you like to create it? (yes/no) ');
    if(response == 'yes') {
        return Account.create(accountName);
    }
}

async function promptTask(account) {
    const response = await CommandLine.ask('What would you like to do? (view/deposit/withdraw) ');
    if (response == 'deposit') {
        const amount = parseFloat(await CommandLine.ask('How much? '));
        await account.deposit(amount);
    } else if (response == 'withdraw') {
        const amount = parseFloat(await CommandLine.ask('How much? '));
        try {
            await account.withdraw(amount);            
        } catch (error) {
            CommandLine.print('Not enough balance');            
        }
    }
    CommandLine.print(`Your balance is: ${account.balance}`)
}

main()