const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const { pubKey1, pubKey2, pubKey3 } = require('./env');
const recoverKey = require('./utils/recoverKey');

app.use(cors());
app.use(express.json());

const balances = {
    [pubKey1]: 100,
    [pubKey2]: 50,
    [pubKey3]: 75,
};

app.get('/balance/:address', (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.send({ balance });
});

app.post('/send', async (req, res) => {
    const { sender, recipient, amount, signature, recoveryBit } = req.body;

    const pubKey = recoverKey(amount.toString(), signature, recoveryBit);

    if (pubKey !== sender) return res.status(400).send({ message: 'Wrong keys!' });

    if (sender === recipient)
        return res.status(400).send({ message: 'sender cannot send to himself!' });

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
        return res.status(400).send({ message: 'Not enough funds!' });
    } else {
        balances[sender] -= amount;
        balances[recipient] += amount;
        return res.send({ balance: balances[sender] });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}
