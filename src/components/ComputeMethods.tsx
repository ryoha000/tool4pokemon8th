import React from 'react';
import { PokemonData } from '../components/shared'
import { PokemonInBattleState } from './PokemonInBattle';
import { element } from 'prop-types';

interface Nature{
    id: number;
    name: string;
    upStatus: string;
    downStatus: string;
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

export function DamageCalculate(myState: PokemonInBattleState, oppoState: PokemonInBattleState) {

}