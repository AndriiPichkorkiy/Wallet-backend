const { RequestError } = require('../../helpers');
const { Transaction } = require('../../models/transaction');
const { User } = require('../../models/user')
const categories = require('../../data/categories');


const addTestTransactions = async (req, res) => {
    const { year, month, day=1, quantity } = req.query;
    let dateMs = new Date(year, month, day) - new Date(0);
    const { _id, name: userName } = req.user;
    


   for (let i = 1; i <= (quantity); i += 1) {
        const { balance } = await User.findById(_id);
        if (balance === undefined) throw RequestError(500, "Server error");

        const categoriesList = [];
        for (const key in categories)
            for (const nameKey in categories[key])
                categoriesList.push({
                    id:   nameKey,
                    name: categories[key][nameKey]
                }); 
        
        const categoryNumber = Math.floor(Math.random() * categoriesList.length);
        const category = categoriesList[categoryNumber];
        const type = category.id > 10500 ? true : false;

        let amount = (Math.floor(Math.random() * (200000 - 1)) + 1) / 100;
        if (type) amount = amount * 5;
        
        const differentDateMs = Math.floor(Math.random() * 432000000) + 86400000; 
        dateMs = dateMs + differentDateMs;
        
        const date = new Date(dateMs)
        

        const comment = `User: ${userName}. Transaction № ${i}`;

        
        let currentBalance = type ? balance + amount : balance - amount;
        
        //Відкидаємо дробову частину
        currentBalance = Math.round(currentBalance * 100) / 100;

        // Перевіряємо, чи не перевищує значення дати поточного значення
        const now = new Date();
        if (date >= now) throw RequestError(400, "Invalid date");

        await User.findByIdAndUpdate(_id, {balance: currentBalance}, {new: true})
        
        const data = await Transaction.create({  owner: _id, type, category, comment, amount, balance: currentBalance,  date });
        if (!data) throw RequestError(500, "Server error");
    

    }

    res.status(201).json({"message": "Success"});
   
}

module.exports = addTestTransactions;