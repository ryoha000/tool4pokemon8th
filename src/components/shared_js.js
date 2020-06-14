import datastore from 'nedb-promise'
import {datas} from './shared'
import {wazaData} from './WazaData'

export async function getPokemonByName(name) {
  let DB = datastore({
    filename: './pokemon_datas.nedb',
    autoload: true
  })
  let document = await DB.findOne({ name: name })
  console.log(document)
  return document
}

export async function getPokemons() {
    let DB = datastore({
      filename: './pokemon_datas.nedb',
      autoload: true
    })
    let documents = await DB.find({})
    console.log(documents)
    return documents
}

export async function insertPokemonDatas() {
  let DB = datastore({
    filename: './pokemon_datas.nedb',
    autoload: true
  })
  await DB.insert(datas)
}

export async function getWazaByName(name) {
  let DB = datastore({
    filename: './waza_data.nedb',
    autoload: true
  })
  let document = await DB.findOne({ name: name })
  console.log(document)
  return document
}

export async function getWazas() {
    let DB = datastore({
      filename: './waza_data.nedb',
      autoload: true
    })
    let documents = await DB.find({})
    console.log(documents)
    return documents
}

export async function insertWazaDatas() {
    let DB = datastore({
       filename: './waza_data.nedb',
       autoload: true
    })
    await DB.insert(wazaData)
  }
