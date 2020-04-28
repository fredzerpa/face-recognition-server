const saltRound = 10;

const handleRegister = (db, bcrypt) => (req, res) => {
  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    return res.status(400).json('Please fill all the fields')
  }
  const hash = bcrypt.hashSync(password, saltRound);

  // Using trx as a transaction object:
  db.transaction(trx => {

    db.insert({hash, email})
      .into('login')
      .returning('email')
      .transacting(trx)
      .then(loginEmail => {
        return (
          db('users')
            .returning('*')
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date()
            })
            .transacting(trx)
            .then(user => {
              res.json(user[0]);
            })
        )
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .catch(error => {
    // If we get here, that means that neither insert passed
    res.json('Unable to register.').status(400)
    console.error(error);
  });
}

module.exports = {handleRegister};