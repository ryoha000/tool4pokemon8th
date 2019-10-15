import datastore from 'nedb-promise'
import {datas} from './shared'

export async function getPokemonByName(name) {
  let DB = datastore({
     // these options are passed through to nedb.Datastore

     filename: './pokemon_data.nedb',

     autoload: true // so that we don't have to call loadDatabase()
  })
//   let no1 = await DB.findOne({ number: "1" })
//   if (no1) {
//     await DB.insert(datas)
//   }
  let document = await DB.findOne({ name: name })
  console.log(document)
  return document
}

export async function insertDatas() {
  let DB = datastore({
     filename: './pokemon_data.nedb',
     autoload: true
  })
  await DB.insert(datas)
}
