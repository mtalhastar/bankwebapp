let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

//User Models
let userSchema = require('../models/User');
let MoneySchema=require('../models/TransferMoney')


// CREATE user 
router.post('/create-user', (req,res,next) => {
    userSchema.create(req.body,(error,data) =>{
        if(error){
            return next(error);
        }else{
            var redir = { redirect: "/" };
            return res.json(redir);
        }
    });
});


// auth.routes.js
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userSchema.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // You can generate a JWT token here for authentication if needed

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Create transactions 
router.post('/create-transaction', async (req, res) => {
  const { name1, name2, amount } = req.body;
  const from = name1, to=name2;
  try {
    const fromCustomer = await userSchema.findOne({'name':`${from}`})
    const newFromBalance = Number(fromCustomer.amount) - Number(amount)
    userSchema.updateOne({ name:from }, { amount: newFromBalance }, err => {
     
       if (err) {
        console.log(err)
        res.status(500).send('Server Error')
      } 
      else {
        console.log('UPDATED')
      }
    })
    const toCustomer = await userSchema.findOne({'name':`${to}`})  
    const newToBalance = Number(toCustomer.amount) + Number(amount)
    userSchema.updateOne({name: to }, { amount: newToBalance }, err => {
      if (err) {
        console.log(err)
        res.status(500).send('Server Error')
      } 
      else {
        console.log('UPDATED')
      }
    })
    const transaction = new MoneySchema({
      name1: name1,
      name2: name2,
      amount,
    })
    transaction.save()
    res.json(transaction)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})

// READ user
router.get('/',(req,res)=>{
    userSchema.find((error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});


//Read Transactions
router.get('/transaction-history',(req,res)=>{
    MoneySchema.find((error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});

//Delete user
router.delete('/delete-user/:id',(req,res,next) => {
    userSchema.findByIdAndRemove(
        req.params.id, (error,data) => {
            if (error) {
                return next(error);
              } else {
                res.status(200).json({
                  msg: data,
                });
              }
        }
    )
})

// Deposit money
router.post('/deposit', async (req, res) => {
  const { name, amount } = req.body;

  if (Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid deposit amount' });
  }

  try {
    const user = await userSchema.findOne({ 'name': `${name}` });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newBalance = Number(user.amount) + Number(amount);
    userSchema.updateOne({ name: name }, { amount: newBalance }, err => {
      if (err) {
        console.log(err);
        res.status(500).send('Server Error');
      } else {
        console.log('UPDATED');
        const transaction = new MoneySchema({
          name1: 'System',
          name2: name,
          amount,
        });
        transaction.save();
        res.json(transaction);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Withdraw money
router.post('/withdraw', async (req, res) => {

  const { name, amount } = req.body;
  
  if (Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid withdraw amount' });
  }

  try {
    const user = await userSchema.findOne({ 'name': `${name}` });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (Number(user.amount) < Number(amount)) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }
    const newBalance = Number(user.amount) - Number(amount);
    userSchema.updateOne({ name: name }, { amount: newBalance }, err => {
      if (err) {
        console.log(err);
        res.status(500).send('Server Error');
      } else {
        console.log('UPDATED');
        const transaction = new MoneySchema({
          name1: name,
          name2: 'System',
          amount,
        });
        transaction.save();
        res.json(transaction);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

router.post('/deduct-zakat', async (req, res) => {
  const { name } = req.body;

  try {
    const user = await userSchema.findOne({ 'name': `${name}`, 'accountType': 'savings' });

    if (!user) {
      return res.status(404).json({ error: 'Savings account not found for the user' });
    }

    const zakatPercentage = 2.5;
    const zakatAmount = (zakatPercentage / 100) * Number(user.amount);

    const newBalance = Number(user.amount) - zakatAmount;

    userSchema.updateOne({ name: name, accountType: 'savings' }, { amount: newBalance }, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Server Error');
      } else {
        console.log('Zakat Deducted');
        const transaction = new MoneySchema({
          name1: 'System',
          name2: name,
          amount: zakatAmount,
          description: 'Zakat Deduction',
        });
        transaction.save();
        res.json(transaction);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;