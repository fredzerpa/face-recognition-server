const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '246bb69664594cb39cda867425d063ca'
});

const handleAPI = (req, res) => { 
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    req.body.input
  )
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('Error Handle API'))
}

const handleImage = (db) => (req, res) => {
  const {id} = req.body;
  
  db('users').where({id})
    .increment('entries', 1)
    .returning('entries')
    .catch(err => res.status(404).json('Unable to get Entries'))
    .then(entries => { res.json(entries) })
    .catch(err => res.status(400).json('Image couldn\'t be uploaded.'));

}

module.exports = {handleAPI, handleImage};