import { PokemonData, Status, waza } from '../components/shared'
import { PokemonInBattleState } from './PokemonInBattle';
import { powerNature, powerItem, powerWaza, attackItems, attackNatures, defenceItems, defenceNatures, damageNature, damageItem } from './CalculateData'

export interface Nature{
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
	many: boolean
	reflect: boolean
	light: boolean
	aurora: boolean
	scald: boolean
	water: boolean
	mad: boolean
	cross: boolean
	dmax: boolean
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

export function DamageCalculate(attackStatus: Status, defenceStatus: Status, attackWaza: waza, attackPokemon: PokemonData, defencePokemon: PokemonData, attackRank: number, defenceRank: number, field: string, attackItem: string, defenceItem: string, attackNature: string, defenceNature: string, checkOptions: CheckOptions, weather: string): number[][] {
	// level=50
	if (checkOptions.attackNature && attackNature === 'フェアリースキン') {
		attackWaza.type = 'フェアリー'
	}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "ファイヤーメモリ") {attackPokemon.type1 = "ほのお"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "ウオーターメモリ") {attackPokemon.type1 = "みず"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "グラスメモリ") {attackPokemon.type1 = "くさ"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "エレクトロメモリ") {attackPokemon.type1 = "でんき"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "アイスメモリ") {attackPokemon.type1 = "こおり"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "ファイトメモリ") {attackPokemon.type1 = "かくとう"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "ポイズンメモリ") {attackPokemon.type1 = "どく"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "グラウンドメモリ") {attackPokemon.type1 = "じめん"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "フライングメモリ") {attackPokemon.type1 = "ひこう"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "サイキックメモリ") {attackPokemon.type1 = "エスパー"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "バグメモリ") {attackPokemon.type1 = "むし"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "ロックメモリ") {attackPokemon.type1 = "いわ"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "ゴーストメモリ") {attackPokemon.type1 = "ゴースト"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "ドラゴンメモリ") {attackPokemon.type1 = "ドラゴン"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "ダークメモリ") {attackPokemon.type1 = "あく"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "スチールメモリ") {attackPokemon.type1 = "はがね"}
	if (attackPokemon.name === "シルヴァディ" && attackItem === "フェアリーメモリ") {attackPokemon.type1 = "フェアリー"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "ファイヤーメモリ") {defencePokemon.type1 = "ほのお"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "ウオーターメモリ") {defencePokemon.type1 = "みず"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "グラスメモリ") {defencePokemon.type1 = "くさ"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "エレクトロメモリ") {defencePokemon.type1 = "でんき"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "アイスメモリ") {defencePokemon.type1 = "こおり"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "ファイトメモリ") {defencePokemon.type1 = "かくとう"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "ポイズンメモリ") {defencePokemon.type1 = "どく"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "グラウンドメモリ") {defencePokemon.type1 = "じめん"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "フライングメモリ") {defencePokemon.type1 = "ひこう"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "サイキックメモリ") {defencePokemon.type1 = "エスパー"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "バグメモリ") {defencePokemon.type1 = "むし"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "ロックメモリ") {defencePokemon.type1 = "いわ"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "ゴーストメモリ") {defencePokemon.type1 = "ゴースト"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "ドラゴンメモリ") {defencePokemon.type1 = "ドラゴン"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "ダークメモリ") {defencePokemon.type1 = "あく"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "スチールメモリ") {defencePokemon.type1 = "はがね"}
	if (defencePokemon.name === "シルヴァディ" && defenceItem === "フェアリーメモリ") {defencePokemon.type1 = "フェアリー"}
	const level: number = 50 * 2 / 5 + 2
	let wazapower: number = attackWaza.power
	if (checkOptions.dmax) {
		const p: number = attackWaza.power
		const t: string = attackWaza.type
		if (p > 9) {
			if (p < 41) {
				if (t === 'かくとう' || t === 'どく') {
					wazapower = 70
				} else {
					wazapower = 90
				}
			} else if (p < 51) {
				if (t === 'かくとう' || t === 'どく') {
					wazapower = 75
				} else {
					wazapower = 100
				}
			} else if (p < 61) {
				if (t === 'かくとう' || t === 'どく') {
					wazapower = 80
				} else {
					wazapower = 110
				}
			} else if (p < 71) {
				if (t === 'かくとう' || t === 'どく') {
					wazapower = 85
				} else {
					wazapower = 120
				}
			} else if (p < 101) {
				if (t === 'かくとう' || t === 'どく') {
					wazapower = 90
				} else {
					wazapower = 130
				}
			} else if (p < 141) {
				if (t === 'かくとう' || t === 'どく') {
					wazapower = 95
				} else {
					wazapower = 140
				}
			} else if (p < 251) {
				if (t === 'かくとう' || t === 'どく') {
					wazapower = 100
				} else {
					wazapower = 150
				}
			}
		}
		const n: string = attackWaza.name
		if (n === 'つっぱり') {
			wazapower = 70
		}
		if (n === 'トリプルキック' || n === 'にどげり') {
			wazapower = 80
		}
		if (n === 'おうふくビンタ' || n === 'みずしゅりけん') {
			wazapower = 90
		}
		if (n === 'ダブルニードル' || n === 'ふくろだたき' || n === 'みだれひっかき' || n === 'れんぞくパンチ') {
			wazapower = 100
		}
		if (n === 'ダブルアタック' || n === 'とげキャノン') {
			wazapower = 120
		}
		if (
			n === 'ギアソーサー' ||
			n === 'スイープビンタ' ||
			n === 'タネマシンガン' ||
			n === 'ダブルチョップ' ||
			n === 'つららばり' ||
			n === 'ドラゴンアロー' ||
			n === 'ロックブラスト' ||
			n === 'ミサイルばり' ||
			n === 'ボーンラッシュ'
			) {
			wazapower = 130
		}
		if (
			n === 'きしかいせい' ||
			n === 'けたぐり' ||
			n === 'なげつける' ||
			n === 'はきだす' ||
			n === 'プレゼント'
			) {
			wazapower = 100
		}
		if (
			n === 'じたばた' ||
			n === 'くさむすび' ||
			n === 'エレキボール' ||
			n === 'ジャイロボール' ||
			n === 'ヒートスタンプ' ||
			n === 'ヘビーボンバー'
			) {
			wazapower = 130
		}
		if (n === 'カウンター' || n === 'ちきゅうなげ') {
			wazapower = 75
		}
		if (
			n === 'サイコウェーブ' ||
			n === 'ナイトヘッド' ||
			n === 'いのちがけ' ||
			n === 'ミラーコート' ||
			n === 'メタルバースト'
			) {
			wazapower = 100
		}
		if (
			n === 'じわれ' ||
			n === 'ぜったいれいど' ||
			n === 'つのドリル' ||
			n === 'ハサミギロチン' ||
			n === 'いかりのまえば' ||
			n === 'がむしゃら'
			) {
			wazapower = 130
		}
	}
	let power: number = wazapower * 4096
	let item = powerItem.find((element) => {return(element.name === attackItem)})
	if (checkOptions.attackItem) {
		if (item) {
			power = Math.round(power * item.number / 4096)
		}
	}
	item = powerItem.find((element) => {return(element.name === defenceItem)})
	if(checkOptions.defenceItem) {
		if (item) {
			power = Math.round(power * item.number / 4096)
		}
	}
	let nature = powerNature.find((element) => {return(element.name === attackNature)})
	if (checkOptions.attackNature) {
		if (nature) {
			power = Math.round(power * nature.number / 4096)
		}
	}
  	// 例外 とうそうしん
	nature = powerNature.find((element) => {return(element.name === defenceNature)})
	if (checkOptions.defenceNature) {
		if (nature) {
			power = Math.round(power * nature.number / 4096)
		}
	}
	let waza = powerWaza.find((element) => {return(element.name === attackWaza.name)})
	if (checkOptions.attackWaza) {
		if (waza) {
			power = Math.round(power * waza.number / 4096)
		}
	}
	if (checkOptions.water && attackWaza.type === "ほのお") {
		power = Math.round(power * 1352 / 4096)
	}
	if (checkOptions.mad && attackWaza.type === "でんき") {
		power = Math.round(power * 1352 / 4096)
	}
	if (checkOptions.cross) {
		power = Math.round(power * 8192 / 4096)
	}
	if (field === "エレキ") {
		if (attackWaza.type === "でんき") {
			power = Math.round(power * 6144 / 4096)
		}
		if (attackWaza.name === "しぜんのちから") {
			attackWaza = {name:"10まんボルト",	type:"でんき",	power:90,	accuracy:100,	species:"特殊"}
		}
	}
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
	if (field === "ミスト") {
		if (attackWaza.type === "ドラゴン") {
			power = Math.round(power * 2048 / 4096)
		}
		if (attackWaza.name === "しぜんのちから") {
			attackWaza = {name:"ムーンフォース",	type:"フェアリー",	power:95,	accuracy:100,	species:"特殊"}
		}
	}
	if (field === "サイコ") {
		if (attackWaza.type === "エスパー") {
			power = Math.round(power * 6144 / 4096)
		}
		if (attackWaza.name === "しぜんのちから") {
		  attackWaza = {name:"サイコキネシス",	type:"エスパー",	power:90,	accuracy:100,	species:"特殊"}
		}
	}
	power = pushOver5(power / 4096)
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
	if (attackWaza.name === 'ボディプレス') {
		AorC = attackStatus.statusB
	}
	if (attackWaza.name !== "しぜんのちから" && attackWaza.species === "変化") {
		return [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
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
	if (attackNature === "はりきり" && checkOptions.attackNature && attackWaza.species === "物理") {
		AorC = Math.floor(AorC * 6144 / 4096)
	}
	AorC = AorC * 4096
	if (attackNature === 'すいほう' && checkOptions.attackNature && attackWaza.type === 'みず') {
		AorC = Math.round(AorC * 8192 / 4096)
	}
	if (defenceNature === 'すいほう' && checkOptions.defenceNature && attackWaza.type === 'ほのお') {
		AorC = Math.round(AorC * 2048 / 4096)
	}
	nature = attackNatures.find((element) => {return(element.name === attackNature)})
	if (checkOptions.attackNature) {
		if (nature && nature.name !== 'すいほう') {
			AorC = Math.round(AorC * nature.number / 4096)
		}
	}
	nature = attackNatures.find((element) => {return(element.name === defenceNature)})
	if (checkOptions.defenceNature) {
		if (nature) {
			AorC = Math.round(AorC * nature.number / 4096)
		}
	}
	item = attackItems.find((element) => {return(element.name === attackItem)})
	if (checkOptions.attackItem) {
		if (item) {
			if (attackItem.indexOf('こだわり') > -1 && checkOptions.dmax) {
			} else {
				AorC = Math.round(AorC * item.number / 4096)
			}
		}
	}
	item = attackItems.find((element) => {return(element.name === defenceItem)})
	if (checkOptions.defenceItem) {
		if (item) {
			AorC = Math.round(AorC * item.number / 4096)
		}
	}
	if (weather === "すなあらし") {
		if (defencePokemon.type1 = "いわ" || defencePokemon.type2 === "いわ") {
			BorD = Math.floor(BorD * 6144 / 4096)
		}
	}
	BorD = BorD * 4096
	nature = defenceNatures.find((element) => {return(element.name === defenceNature)})
	if (checkOptions.defenceNature) {
		if (nature) {
			if (defenceNature === 'フラワーギフト' && weather === 'はれ' && attackWaza.species === '特殊') {
				BorD = Math.round(BorD * nature.number / 4096)
			}
			if (defenceNature === "ふしぎなうろこ" && attackWaza.species === '物理') {
				BorD = Math.round(BorD * nature.number / 4096)
			}
			if (defenceNature === "くさのけがわ" && field === 'グラス' && attackWaza.species === '物理') {
				BorD = Math.round(BorD * nature.number / 4096)
			}
			if (defenceNature === "ファーコート" && attackWaza.species === '物理') {
				BorD = Math.round(BorD * nature.number / 4096)
			}
		}
	}
	item = defenceItems.find((element) => {return(element.name === defenceItem)})
	if (checkOptions.defenceNature) {
		if (item) {
			BorD = Math.round(BorD * item.number / 4096)
		}
	}
	AorC = pushOver5(AorC / 4096)
	BorD = pushOver5(BorD / 4096)
	let damage: number = Math.floor(level * power * AorC / BorD)
	damage = Math.floor(damage / 50 + 2)
	if (checkOptions.many) {
		damage = pushOver5(damage * 3072 / 4096)
	}
	if (weather === "はれ") {
		if (attackWaza.type === "ほのお") {
			damage = pushOver5(damage * 6144 / 4096)
		}
		if (attackWaza.type === "みず") {
			damage = pushOver5(damage * 2048 / 4096)
		}
	}
	if (weather === "あめ") {
		if (attackWaza.type === "ほのお") {
			damage = pushOver5(damage * 2048 / 4096)
		}
		if (attackWaza.type === "みず") {
			damage = pushOver5(damage * 6144 / 4096)
		}
	}
	let criticalDamage: number = pushOver5(damage * 6144 / 4096)
	let damages: number[] = []
	for (let i = 0; i < 16; i++) {
		damages.push(Math.floor(damage * (0.85 + i * 0.01)))
	}
	let criticalDamages: number[] = []
	for (let i = 0; i < 16; i++) {
		criticalDamages.push(Math.floor(criticalDamage * (0.85 + i * 0.01)))
	}
	if (attackWaza.type === attackPokemon.type1 || attackWaza.type === attackPokemon.type2) {
		if (attackNature === "てきおうりょく" && checkOptions.attackNature) {
			for (let i = 0; i < 16; i++) {
				damages[i] = pushOver5(damages[i] * 8192 / 4096)
			}
			for (let i = 0; i < 16; i++) {
				criticalDamages[i] = pushOver5(criticalDamages[i] * 8192 / 4096)
			}
		} else {
			for (let i = 0; i < 16; i++) {
				damages[i] = pushOver5(damages[i] * 6144 / 4096)
			}
			for (let i = 0; i < 16; i++) {
				criticalDamages[i] = pushOver5(criticalDamages[i] * 6144 / 4096)
			}
		}
	}
	for (let i = 0; i < 16; i++) {
		damages[i] = Math.floor(damages[i] * TypeCompatibility(attackWaza.type, defencePokemon))
	}
	for (let i = 0; i < 16; i++) {
		criticalDamages[i] = Math.floor(criticalDamages[i] * TypeCompatibility(attackWaza.type, defencePokemon))
	}
	if (checkOptions.scald && attackWaza.species === "物理") {
		for (let i = 0; i < 16; i++) {
			damages[i] = pushOver5(damages[i] * 2048 / 4096)
		}
		for (let i = 0; i < 16; i++) {
			criticalDamages[i] = Math.round(criticalDamages[i] * 2048 / 4096)
		}
	}
	for (let i = 0; i < 16; i++) {
		damages[i] = damages[i] * 4096
	}
	for (let i = 0; i < 16; i++) {
		criticalDamages[i] = criticalDamages[i] * 4096
	}
	if (checkOptions.reflect && attackWaza.species === "物理") {
		for (let i = 0; i < 16; i++) {
			damages[i] = Math.round(damages[i] * 2048 / 4096)
		}
		for (let i = 0; i < 16; i++) {
			criticalDamages[i] = Math.round(criticalDamages[i] * 2048 / 4096)
		}
	}
	if (checkOptions.light && attackWaza.species === "特殊") {
		for (let i = 0; i < 16; i++) {
			damages[i] = Math.round(damages[i] * 2048 / 4096)
		}
		for (let i = 0; i < 16; i++) {
			criticalDamages[i] = Math.round(criticalDamages[i] * 2048 / 4096)
		}
	}
	if (checkOptions.aurora) {
		for (let i = 0; i < 16; i++) {
			damages[i] = Math.round(damages[i] * 2048 / 4096)
		}
		for (let i = 0; i < 16; i++) {
			criticalDamages[i] = Math.round(criticalDamages[i] * 2048 / 4096)
		}
	}
	nature = damageNature.find((element) => {return(element.name === attackNature)})
	if (nature && checkOptions.attackNature) {
		for (let i = 0; i < 16; i++) {
			damages[i] = Math.round(damages[i] * nature.number / 4096)
		}
		for (let i = 0; i < 16; i++) {
			criticalDamages[i] = Math.round(criticalDamages[i] * nature.number / 4096)
		}
	}
	if (defenceNature === 'もふもふ' && checkOptions.defenceNature) {
		if (attackWaza.type === 'ほのお') {
			for (let i = 0; i < 16; i++) {
				damages[i] = Math.round(damages[i] * 8192 / 4096)
			}
			for (let i = 0; i < 16; i++) {
				criticalDamages[i] = Math.round(criticalDamages[i] * 8192 / 4096)
			}
		}
		if (attackWaza.species === '物理') {
			for (let i = 0; i < 16; i++) {
				damages[i] = Math.round(damages[i] * 2048 / 4096)
			}
			for (let i = 0; i < 16; i++) {
				criticalDamages[i] = Math.round(criticalDamages[i] * 2048 / 4096)
			}
		}
	}
	nature = damageNature.find((element) => {return(element.name === defenceNature)})
	if (nature && checkOptions.defenceNature && defenceNature !== 'もふもふ') {
		for (let i = 0; i < 16; i++) {
			damages[i] = Math.round(damages[i] * nature.number / 4096)
		}
		for (let i = 0; i < 16; i++) {
			criticalDamages[i] = Math.round(criticalDamages[i] * nature.number / 4096)
		}
	}
	item = damageItem.find((element) => {return(element.name === attackItem)})
	if (item && checkOptions.attackItem) {
		if (TypeCompatibility(attackWaza.type, defencePokemon) < 2 && attackItem === 'たつじんのおび') {
		} else {
			for (let i = 0; i < 16; i++) {
				damages[i] = Math.round(damages[i] * item.number / 4096)
			}
			for (let i = 0; i < 16; i++) {
				criticalDamages[i] = Math.round(criticalDamages[i] * item.number / 4096)
			}
		}
	}
	item = damageItem.find((element) => {return(element.name === defenceItem)})
	if (item && checkOptions.defenceItem) {
		for (let i = 0; i < 16; i++) {
			damages[i] = Math.round(damages[i] * item.number / 4096)
		}
		for (let i = 0; i < 16; i++) {
			criticalDamages[i] = Math.round(criticalDamages[i] * item.number / 4096)
		}
	}
	for (let i = 0; i < 16; i++) {
		damages[i] = pushOver5(damages[i] / 4096)
	}
	for (let i = 0; i < 16; i++) {
		criticalDamages[i] = pushOver5(criticalDamages[i] / 4096)
	}
	return [damages, criticalDamages]
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
	if (attackType === "ダミー") {
		return 0
	}
	if (imahitotu.length === 0) {
		alert("attackType is null")
		return 0
  }
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
			return 4.0
		}
		return 2.0
	}
	if (batugun.find((element) => {return (element === defencePokemon.type2)})) {
		if (batugun.find((element) => {return (element === defencePokemon.type1)})) {
			return 4.0
		}
		return 2.0
	}
	return 1
}

export function pushOver5(n: number): number {
	let afterN: number = Math.floor(n)
	if (n - afterN > 0.5) {
		return Math.ceil(n)
	} else {
		return Math.floor(n)
	}
}