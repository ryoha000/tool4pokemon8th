import React from 'react';
import { PokemonData, Status, waza } from '../components/shared'
import { PokemonInBattleState } from './PokemonInBattle';
import { element } from 'prop-types';
import { powerNature, powerItem, powerWaza } from './CalculateData'
import { border } from '@material-ui/system';

interface Nature{
    id: number;
    name: string;
    upStatus: string;
    downStatus: string;
}

export interface CheckOptions {
	attackWaza: boolean
	attackItem: boolean
	defenceItem: boolean
	attackNature: boolean
	defenceNature: boolean
}

export const natures: Nature[] = [
    {
        id: 1,
        name: "さみしがり",
        upStatus: "A",
        downStatus: "B"
    },
    {
        id: 2,
        name: "いじっぱり",
        upStatus: "A",
        downStatus: "C"
    },
    {
        id: 3,
        name: "やんちゃ",
        upStatus: "A",
        downStatus: "D"
    },
    {
        id: 4,
        name: "ゆうかん",
        upStatus: "A",
        downStatus: "S"
    },
    {
        id: 5,
        name: "ずぶとい",
        upStatus: "B",
        downStatus: "A"
    },
    {
        id: 6,
        name: "わんぱく",
        upStatus: "B",
        downStatus: "C"
    },
    {
        id: 7,
        name: "のうてんき",
        upStatus: "B",
        downStatus: "D"
    },
    {
        id: 8,
        name: "のんき",
        upStatus: "B",
        downStatus: "S"
    },
    {
        id: 9,
        name: "ひかえめ",
        upStatus: "C",
        downStatus: "A"
    },
    {
        id: 10,
        name: "おっとり",
        upStatus: "C",
        downStatus: "B"
    },
    {
        id: 11,
        name: "うっかりや",
        upStatus: "C",
        downStatus: "D"
    },
    {
        id: 12,
        name: "れいせい",
        upStatus: "C",
        downStatus: "S"
    },
    {
        id: 13,
        name: "おだやか",
        upStatus: "D",
        downStatus: "A"
    },
    {
        id: 14,
        name: "おとなしい",
        upStatus: "D",
        downStatus: "B"
    },
    {
        id: 15,
        name: "しんちょう",
        upStatus: "D",
        downStatus: "C"
    },
    {
        id: 16,
        name: "なまいき",
        upStatus: "D",
        downStatus: "S"
    },
    {
        id: 17,
        name: "おくびょう",
        upStatus: "S",
        downStatus: "A"
    },
    {
        id: 18,
        name: "せっかち",
        upStatus: "S",
        downStatus: "B"
    },
    {
        id: 19,
        name: "ようき",
        upStatus: "S",
        downStatus: "C"
    },
    {
        id: 20,
        name: "むじゃき",
        upStatus: "S",
        downStatus: "D"
    },
    {
        id: 21,
        name: "がんばりや",
        upStatus: "",
        downStatus: ""
    },
    {
        id: 22,
        name: "すなお",
        upStatus: "",
        downStatus: ""
    },
    {
        id: 23,
        name: "てれや",
        upStatus: "",
        downStatus: ""
    },
    {
        id: 24,
        name: "きまぐれ",
        upStatus: "",
        downStatus: ""
    },
    {
        id: 25,
        name: "まじめ",
        upStatus: "",
        downStatus: ""
    },
]

export function computeStatus(pokemon: PokemonInBattleState): PokemonInBattleState {
    pokemon.status.statusH = pokemon.pokemonData.base_h + pokemon.IndividualH / 2 + pokemon.effortHP / 8 + 60
    pokemon.status.statusA = pokemon.pokemonData.base_a + pokemon.IndividualA / 2 + pokemon.effortA / 8 + 5
    pokemon.status.statusB = pokemon.pokemonData.base_b + pokemon.IndividualB / 2 + pokemon.effortB / 8 + 5
    pokemon.status.statusC = pokemon.pokemonData.base_c + pokemon.IndividualC / 2 + pokemon.effortC / 8 + 5
    pokemon.status.statusD = pokemon.pokemonData.base_d + pokemon.IndividualD / 2 + pokemon.effortD / 8 + 5
    pokemon.status.statusS = pokemon.pokemonData.base_s + pokemon.IndividualS / 2 + pokemon.effortS / 8 + 5
    const nature: any = natures.find((element) => {
        return element.name === pokemon.natureName
    })
    if (nature.upStatus === "A") {
        pokemon.status.statusA *= 1.1
    }
    if (nature.upStatus === "B") {
        pokemon.status.statusB *= 1.1
    }
    if (nature.upStatus === "C") {
        pokemon.status.statusC *= 1.1
    }
    if (nature.upStatus === "D") {
        pokemon.status.statusD *= 1.1
    }
    if (nature.upStatus === "S") {
        pokemon.status.statusS *= 1.1
    }
    if (nature.downStatus === "A") {
        pokemon.status.statusA *= 0.9
    }
    if (nature.downStatus === "B") {
        pokemon.status.statusB *= 0.9
    }
    if (nature.downStatus === "C") {
        pokemon.status.statusC *= 0.9
    }
    if (nature.downStatus === "D") {
        pokemon.status.statusD *= 0.9
    }
    if (nature.downStatus === "S") {
        pokemon.status.statusS *= 0.9
    }
    return pokemon
}

export function DamageCalculate(attackStatus: Status, defenceStatus: Status, attackWaza: waza, attackPokemon: PokemonData, defencePokemon: PokemonData, attackRank: number, defenceRank: number, field: string, attackItem: string, defenceItem: string, attackNature: string, defenceNature: string, checkOptions: CheckOptions, other: string): number[] {
	// level=50
	const level: number = 50 * 2 / 5 + 2
	console.log(level)
	let power: number = attackWaza.power
	let item = powerItem.find((element) => {return(element.name === attackItem)})
	if (checkOptions.attackItem) {
		if (item) {
			power = Math.round(power * item.number / 4096)
		}
	}
	if (power < 1) {power = 1}
	item = powerItem.find((element) => {return(element.name === defenceItem)})
	if(checkOptions.defenceItem) {
		if (item) {
			power = Math.round(power * item.number / 4096)
		}
	}
	if (power < 1) {power = 1}
	let nature = powerNature.find((element) => {return(element.name === attackNature)})
	if (checkOptions.attackNature) {
		if (nature) {
			power = Math.round(power * nature.number / 4096)
		}
	}
	if (power < 1) {power = 1}
	nature = powerNature.find((element) => {return(element.name === defenceNature)})
	if (checkOptions.defenceNature) {
		if (nature) {
			power = Math.round(power * nature.number / 4096)
		}
	}
	if (power < 1) {power = 1}
	let waza = powerWaza.find((element) => {return(element.name === attackWaza.name)})
	if (checkOptions.attackWaza) {
		if (waza) {
			power = Math.round(power * waza.number / 4096)
		}
	}
	if (power < 1) {power = 1}
	if (other === "みずあそび" || attackWaza.type === "ほのお") {
		power = Math.round(power * 1352 / 4096)
	}
	if (power < 1) {power = 1}
	if (other === "どろあそび" || attackWaza.type === "でんき") {
		power = Math.round(power * 1352 / 4096)
	}
	if (power < 1) {power = 1}
	if (other === "クロスサンダー+クロスフレイムの後") {
		power = Math.round(power * 8192 / 4096)
	}
	if (power < 1) {power = 1}
	if (field === "エレキ") {
		if (attackWaza.type === "でんき") {
			power = Math.round(power * 6144 / 4096)
		}
		if (attackWaza.name === "しぜんのちから") {
			attackWaza = {name:"10まんボルト",	type:"でんき",	power:90,	accuracy:100,	species:"特殊"}
		}
	}
	if (power < 1) {power = 1}
	if (field === "グラス") {
		if (attackWaza.type === "くさ") {
			power = Math.round(power * 6144 / 4096)
		}
		if (attackWaza.name === "しぜんのちから") {
			attackWaza = {name:"エナジーボール",	type:"くさ",	power:90,	accuracy:100,	species:"特殊"}
		}
		if (attackWaza.name === "じしん" || attackWaza.name === "じならし" || attackWaza.name === "マグニチュード") {
			power = Math.round(power * 2048 / 4096)
		}
	}
	if (power < 1) {power = 1}
	if (field === "ミスト") {
		if (attackWaza.type === "ドラゴン") {
			power = Math.round(power * 2048 / 4096)
		}
		if (attackWaza.name === "しぜんのちから") {
			attackWaza = {name:"ムーンフォース",	type:"フェアリー",	power:95,	accuracy:100,	species:"特殊"}
		}
	}
	if (power < 1) {power = 1}
	if (field === "サイコ") {
		if (attackWaza.type === "エスパー") {
			power = Math.round(power * 6144 / 4096)
		}
		if (attackWaza.name === "しぜんのちから") {
		  attackWaza = {name:"サイコキネシス",	type:"エスパー",	power:90,	accuracy:100,	species:"特殊"}
		}
	}
	if (power < 1) {power = 1}
	let AorC: number = 0
	let BorD: number = 0
	if (attackWaza.species === "物理") {
		AorC = attackStatus.statusA
		BorD = defenceStatus.statusB
	}
	if (attackWaza.species === "特殊") {
		AorC = attackStatus.statusC
		BorD = defenceStatus.statusD
	}
	if (attackWaza.species === "変化") {
		// return 000
	}
	let rankA: number = 1
	let rankD: number = 1
	if (attackRank > 0) {
		rankA = (2 + attackRank) / 2
	}
	if (attackRank < 0) {
		rankA = 2 / (2 - attackRank)
	}
	if (defenceRank > 0) {
		rankD = (2 + defenceRank) / 2
	}
	if (defenceRank < 0) {
		rankD = 2 / (2 - defenceRank)
	}
	AorC = Math.floor(AorC * rankA)
	BorD = Math.floor(BorD * rankD)
	if (attackNature === "はりきり" || checkOptions.attackNature) {
		AorC = Math.floor(AorC * 6144 / 4096)
	}
	let damage: number = Math.floor(level * power * AorC / BorD / 50)
	// 天候
	// 急所
	// 乱数
	if (attackWaza.type === attackPokemon.type1 || attackWaza.type === attackPokemon.type2) {
    damage = Math.floor(damage * 1.5)
  }
	// *威力の補正/4096 五捨五超入 1より小さいなら1 x done
	// その他[{name: "みずあそび"},{name: "どろあそび"}, {name: クロスサンダー＋クロスフレイムの後}]
  // こうげき*ランク　切り捨て
  // はりきりだけ例外処理
  // *攻撃の補正/4096 五捨五超入 1より小さいなら1 y
  // ぼうぎょ*ランク　切り捨て
  // 砂嵐の例外処理
  // *防御の補正/4096 五捨五超入 1より小さいなら1 z
  // 22
  // *x*y/z　切り捨て
  // /50 + 2 切り捨て
  // ダブルバトル処理
  // 天候処理 五捨五超入
  // 急所処理 五捨五超入
  // 乱数 切り捨て
  // 一致　五捨五超入
  // 相性　切り捨て
  // やけど　五捨五超入
  // *ダメージ補正 五捨五超入
  // http://pokemon-wiki.net/%E3%83%80%E3%83%A1%E3%83%BC%E3%82%B8%E8%A8%88%E7%AE%97%E5%BC%8F
  damage = Math.floor(damage * TypeCompatibility(attackWaza.type, defencePokemon))
  return damage
}

export function TypeCompatibility(attackType: string, defencePokemon: PokemonData): number {
	let imahitotu: string[] = []
	let batugun: string[] = []
  let mukou: string[] = []
  if (attackType === "ノーマル") {
    mukou = ["ゴースト"]
		imahitotu = ["はがね","いわ"]
		batugun = []
	}
	if (attackType === "ほのお") {
		imahitotu = ["ほのお","みず","いわ","ドラゴン"]
		batugun = ["くさ","こおり","むし","はがね"]
	}
	if (attackType === "みず") {
		imahitotu = ["くさ","みず","ドラゴン"]
		batugun = ["ほのお","じめん","いわ"]
	}
	if (attackType === "でんき") {
		mukou = ["じめん"]
		imahitotu = ["でんき","くさ","ドラゴン"]
		batugun = ["みず","ひこう"]
	}
	if (attackType === "くさ") {
		mukou = []
		imahitotu = ["ほのお","くさ","ドラゴン","ひこう","どく","むし","はがね"]
		batugun = ["みず","じめん","いわ"]
	}
	if (attackType === "こおり") {
		mukou = []
		imahitotu = ["ほのお","みず","こおり","はがね"]
		batugun = ["くさ","じめん","ドラゴン","ひこう"]
	}
	if (attackType === "かくとう") {
		mukou = ["ゴースト"]
		imahitotu = ["どく","ひこう","エスパー","むし","フェアリー"]
		batugun = ["ノーマル","こおり","はがね","いわ","あく"]
	}
	if (attackType === "どく") {
		mukou = ["はがね"]
		imahitotu = ["どく","じめん","いわ","ゴースト"]
		batugun = ["くさ","フェアリー"]
	}
	if (attackType === "じめん") {
		mukou = ["ひこう"]
		imahitotu = ["くさ","むし"]
		batugun = ["ほのお","でんき","どく","いわ","はがね"]
	}
	if (attackType === "ひこう") {
		mukou = []
		imahitotu = ["でんき","いわ","はがね"]
		batugun = ["くさ","かくとう","むし"]
	}
	if (attackType === "エスパー") {
		mukou = ["あく"]
		imahitotu = ["エスパー","はがね"]
		batugun = ["かくとう","どく"]
	}
	if (attackType === "むし") {
		mukou = []
		imahitotu = ["ほのお","かくとう","どく","ひこう","フェアリー","ゴースト","はがね"]
		batugun = ["くさ","エスパー","あく"]
	}
	if (attackType === "いわ") {
		mukou = []
		imahitotu = ["かくとう","じめん","はがね"]
		batugun = ["ほのお","こおり","むし","ひこう"]
	}
	if (attackType === "ゴースト") {
		mukou = ["ノーマル"]
		imahitotu = ["あく"]
		batugun = ["エスパー","ゴースト"]
	}
	if (attackType === "ドラゴン") {
		mukou = ["フェアリー"]
		imahitotu = ["はがね"]
		batugun = ["ドラゴン"]
	}
	if (attackType === "あく") {
		mukou = []
		imahitotu = ["かくとう","フェアリー","あく"]
		batugun = ["エスパー","ゴースト"]
	}
	if (attackType === "はがね") {
		mukou = []
		imahitotu = ["ほのお","みず","でんき","はがね"]
		batugun = ["いわ","フェアリー","こおり"]
	}
	if (attackType === "フェアリー") {
		mukou = []
		imahitotu = ["ほのお","どく","はがね"]
		batugun = ["あく","かくとう","ドラゴン"]
	}
	if (imahitotu.length === 0) { alert("attackType is null") }
	if (mukou.find((element) => {return (element === defencePokemon.type1 || element === defencePokemon.type2)})) {
		return 0
	}
	if (imahitotu.find((element) => {return (element === defencePokemon.type1)})) {
		if (imahitotu.find((element) => {return (element === defencePokemon.type2)})) {
			return 0.25
		}
		return 0.5
	}
	if (imahitotu.find((element) => {return (element === defencePokemon.type2)})) {
		if (imahitotu.find((element) => {return (element === defencePokemon.type1)})) {
			return 0.25
		}
		return 0.5
	}
	if (batugun.find((element) => {return (element === defencePokemon.type1)})) {
		if (batugun.find((element) => {return (element === defencePokemon.type2)})) {
			return 4
		}
		return 2
	}
	if (batugun.find((element) => {return (element === defencePokemon.type2)})) {
		if (batugun.find((element) => {return (element === defencePokemon.type1)})) {
			return 4
		}
		return 2
	}
	return 1
}