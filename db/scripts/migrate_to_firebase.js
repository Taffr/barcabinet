const fs = require('fs')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const COCKTAIL_JSON_PATH = '../cocktails_3.json'

const main = async () => {
  console.log('Starting migration!')
  initializeApp({
    credential: applicationDefault()
  });

  const db = getFirestore();
  const cocktails = JSON.parse(fs.readFileSync(COCKTAIL_JSON_PATH, 'utf8'))
  const promiseArr = cocktails.map((cocktail) => {
      return db.collection('recipes').add(cocktail)
  })
  const added = await Promise.all(promiseArr)
  console.log('Added ' + added.length + ' documents to recipes')
}

main()
  .catch((err) => {
      console.error('ERROR')
      console.error(err)
  })
  .finally(() => console.log('Finished migration!'))

