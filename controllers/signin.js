const handleSignIn = (db, bcrypt) => (req, res) => {
  const {email, password} = req.body;
  if ( !email || !password) {
    return res.status(400).json('Please fill all the fields')
  }
  db('login').where({email}).select('email', 'hash')
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return (
          db('users').where({email})
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(500).json('Unable to connect to server.'))
        );
      } else {
        return res.status(404).json('Email or Password is Wrong')
      }
    })
    .catch(err => res.status(404).json('Email or Password is Wrong.'))
}

module.exports = {handleSignIn};