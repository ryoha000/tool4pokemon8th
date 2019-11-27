import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Item, AllItem } from './ItemData'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { PokemonData, waza, MyParty, MyPokemon, MyLog, datas } from './shared';
import PokemonIcon from './PokemonIcon';
import InputAutoPokemon from './InputAutoPokemon'
import PokemonStatus from './PokemonStatus'
import PokemonMove from './PokemonMove'
import SearchPokemon from './SearchPokemon'
import SearchParty from './SearchParty'
import CachedIcon from '@material-ui/icons/Cached'
import { ListItemSecondaryAction, IconButton, Button, TextField, DialogActions, DialogContent, DialogTitle, Dialog, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { wazaData } from './WazaData';

export interface SendData {
    moves?: waza[];
    efforts?: Effort
    nature?: string;
    item?: Item;
    ability?: string;
    name?: string;
    id?: number
    index: number;
    memo?: string;
}

interface Effort {
    effort_h: number
    effort_a: number
    effort_b: number
    effort_c: number
    effort_d: number
    effort_s: number
}

interface Props{
    wazas: waza[];
    pokemons: PokemonData[];
    username: string
    password: string
    myPokemons: MyPokemon[];
    myParties: MyParty[];
    myLogs: MyLog[];
    handleAllData: (datas: MyPokemon | MyParty | MyLog) => void
}

interface State{
    party: PokemonData[];
    memo?: string;
    selectedPokemonIndex?: number,
    selectedPokemon?: PokemonData
    partyDetail: SendData[]
    loading: boolean
    partyName?: string
    pokemonName?: string
    spoil: string
    nowInput: string
    partyinit: boolean
    pokeinit: boolean
    selectedPokemonId: number
    selectedPartyId: number
}

export default class Confirm extends React.Component<Props,State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            selectedPartyId: 0,
            selectedPokemonId: 0,
            pokeinit: false,
            partyinit: false,
            nowInput: '',
            spoil: 'pokemon',
            loading: false,
            partyDetail: [{index: 0}, {index: 1}, {index: 2}, {index: 3}, {index: 4}, {index: 5}],
            party: [{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0},{number:"000",name:"",type1:"くさ",type2:"どく",ability1:"しんりょく",ability2:"ようりょくそ",ability3:"",base_h:45,base_a:49,base_b:49,base_c:65,base_d:65,base_s:45,heavy:0}],
        };
    }
    componentDidUpdate = () => {
        if (this.state.loading && !this.state.partyinit && !this.state.pokeinit) {
            this.setState({loading: false})
        }
    }
    handleAllData = (datas: MyPokemon | MyParty | MyLog) => {
        this.props.handleAllData(datas)
    }
    handleReload = () => {
        this.setState({ loading: true, partyinit: true, pokeinit: true })
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/pokemon', {name: this.props.username, pass: this.props.password})
            .then((res) => {
                this.setState({pokeinit: false})
                this.props.handleAllData(res.data.pokemons)
            })
            .catch((e) => {
                if (e.response.data.message) {
                alert(e.response.data.message)
                } else {
                alert(e)
                }
                this.setState({pokeinit: false})
            })
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/party', {name: this.props.username, pass: this.props.password})
            .then((res) => {
                this.setState({partyinit: false})
                this.props.handleAllData(res.data.parties)
            })
            .catch((e) => {
                if (e.response.data.message) {
                    alert(e.response.data.message)
                } else {
                    alert(e)
                }
                this.setState({partyinit: false})
            })
    }
    handleMemo = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const memo: string = event.target.value
        this.setState({memo: memo})
    }
    handlePartyName = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const partyName: string = event.target.value
        this.setState({partyName: partyName})
    }
    handlePokemonName = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const pokemonName: string = event.target.value
        this.setState({pokemonName: pokemonName})
    }
    handleSelect = (i: number, pokemon: PokemonData) => {
        this.setState({ selectedPokemonIndex: i, selectedPokemon: pokemon})
    }
    selectPokeStatus = (effort_h: number, effort_a: number, effort_b: number, effort_c: number, effort_d: number, effort_s: number, name: string | undefined, nature: string) => {
        if (this.state.selectedPokemonIndex !== undefined) {
            let nowParty: SendData[] = this.state.partyDetail
            const i: number = this.state.selectedPokemonIndex
            nowParty[i].efforts = {effort_h: effort_h, effort_a: effort_a, effort_b: effort_b, effort_c: effort_c, effort_d: effort_d, effort_s: effort_s}
            nowParty[i].name = name
            nowParty[i].nature = nature
            this.setState({partyDetail: nowParty})
        }
    }
    selectPokeMove = (move_1: waza, move_2: waza, move_3: waza, move_4: waza, item: Item, ability: string, memo: string) => {
        if (this.state.selectedPokemonIndex != undefined) {
            let nowParty: SendData[] = this.state.partyDetail
            const i: number = this.state.selectedPokemonIndex
            nowParty[i].moves = [move_1, move_2, move_3, move_4]
            nowParty[i].item = item
            nowParty[i].ability = ability
            nowParty[i].memo = memo
            this.setState({partyDetail: nowParty})
        }
    }
    makeMyPokemon = (pokemon: SendData, i: number, id: number): MyPokemon => {
        const name: string = pokemon.name ? pokemon.name : new Date().toISOString()
        if (!pokemon.efforts) {
            pokemon.efforts = {effort_h: 0, effort_a: 0, effort_b: 0, effort_c: 0, effort_d: 0, effort_s: 0}
        }
        if (!pokemon.moves) {
            const dammywaza: waza = {name:"ダミー",	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー"}
            pokemon.moves = [dammywaza, dammywaza, dammywaza, dammywaza]
        }
        // let pokemonData: JSON
        let pokemonData: MyPokemon = {
            ability: pokemon.ability ? pokemon.ability : this.state.party[i].ability1,
            effort_a: pokemon.efforts.effort_a,
            effort_b: pokemon.efforts.effort_b,
            effort_c: pokemon.efforts.effort_c,
            effort_d: pokemon.efforts.effort_d,
            effort_s: pokemon.efforts.effort_s,
            effort_h: pokemon.efforts.effort_h,
            memo: this.state.memo ? this.state.memo : '',
            item: pokemon.item ? pokemon.item.name : '',
            move_1: pokemon.moves[0].name,
            move_2: pokemon.moves[1].name,
            move_3: pokemon.moves[2].name,
            move_4: pokemon.moves[3].name,
            name: name,
            nature: pokemon.nature ? pokemon.nature : 'ようき',
            number: this.state.party[i].number,
            id: id
        }
        return pokemonData
    }
    deletePokemon = () => {
        this.setState({loading: true})
        axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/put', 
            {
                name: this.props.username,
                pass: this.props.password,
                pokemon_id: this.state.selectedPokemonId
            }
            ).then(res => {
                alert('ポケモンが削除されました')
                this.setState({loading: false})
            }).catch((e: any) => {
                alert(e)
                this.setState({ loading: false })
            })
    }
    sendPokemon = () => {
        const pokemon: SendData = this.state.partyDetail[this.state.selectedPokemonIndex ? this.state.selectedPokemonIndex : 0]
            if (pokemon.ability && pokemon.efforts && pokemon.item && pokemon.moves && pokemon.nature && !pokemon.id) {
                const name: string = pokemon.name ? pokemon.name : new Date().toISOString()
                const pokemonData: MyPokemon = {
                    ability: pokemon.ability,
                    effort_a: pokemon.efforts.effort_a,
                    effort_b: pokemon.efforts.effort_b,
                    effort_c: pokemon.efforts.effort_c,
                    effort_d: pokemon.efforts.effort_d,
                    effort_s: pokemon.efforts.effort_s,
                    effort_h: pokemon.efforts.effort_h,
                    memo: this.state.memo ? this.state.memo : '',
                    item: pokemon.item.name,
                    move_1: pokemon.moves[0].name,
                    move_2: pokemon.moves[1].name,
                    move_3: pokemon.moves[2].name,
                    move_4: pokemon.moves[3].name,
                    name: name,
                    nature: pokemon.nature,
                    number: this.state.party[this.state.selectedPokemonIndex ? this.state.selectedPokemonIndex : 0].number,
                    id: this.state.selectedPokemonId                }
                this.setState({loading: true})
                axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/put', 
                    {
                        name: this.props.username,
                        pass: this.props.password,
                        pokemons: pokemonData
                    }
                    ).then(res => {
                        alert('ポケモンが編集されました')
                        this.setState({loading: false})
                    }).catch((e: any) => {
                        alert(e)
                        this.setState({ loading: false })
                    })
            }
    }
    send = (type: string, id: number) => {
        const party: MyParty | undefined = this.props.myParties.find((element) => {
            return element.id === this.state.selectedPartyId
        })
        if (!party) {
            alert('指定されたパーティがありません')
            return
        }
        if (type === 'edit') {
            if (
                !party.pokemon_1 ||
                !party.pokemon_2 ||
                !party.pokemon_3 ||
                !party.pokemon_4 ||
                !party.pokemon_5 ||
                !party.pokemon_6
            ) {
                alert('不正なパーティです')
                return
            }if (
                !party.pokemon_1.id ||
                !party.pokemon_2.id ||
                !party.pokemon_3.id ||
                !party.pokemon_4.id ||
                !party.pokemon_5.id ||
                !party.pokemon_6.id
            ) {
                alert('不正なパーティです')
                return
            }
            const detail1 = this.makeDetail(party.pokemon_1)
            const detail2 = this.makeDetail(party.pokemon_2)
            const detail3 = this.makeDetail(party.pokemon_3)
            const detail4 = this.makeDetail(party.pokemon_4)
            const detail5 = this.makeDetail(party.pokemon_5)
            const detail6 = this.makeDetail(party.pokemon_6)
            if (!detail1 || !detail2 || !detail3 || !detail4 || !detail5 || !detail6) {
                alert('パーティのポケモンの情報が不正です')
                return
            }
            let editPokemons: MyPokemon[] = []
            let myPokemon: MyPokemon
            if (detail1 !== this.state.partyDetail[0]) {
                myPokemon = this.makeMyPokemon(this.state.partyDetail[0], 0, party.pokemon_1.id)
                editPokemons.push(myPokemon)
            }
            if (detail2 !== this.state.partyDetail[1]) {
                myPokemon = this.makeMyPokemon(this.state.partyDetail[1], 1, party.pokemon_2.id)
                editPokemons.push(myPokemon)
            }
            if (detail3 !== this.state.partyDetail[2]) {
                myPokemon = this.makeMyPokemon(this.state.partyDetail[2], 2, party.pokemon_3.id)
                editPokemons.push(myPokemon)
            }
            if (detail4 !== this.state.partyDetail[3]) {
                myPokemon = this.makeMyPokemon(this.state.partyDetail[3], 3, party.pokemon_4.id)
                editPokemons.push(myPokemon)
            }
            if (detail5 !== this.state.partyDetail[4]) {
                myPokemon = this.makeMyPokemon(this.state.partyDetail[4], 4, party.pokemon_5.id)
                editPokemons.push(myPokemon)
            }
            if (detail6 !== this.state.partyDetail[5]) {
                myPokemon = this.makeMyPokemon(this.state.partyDetail[5], 5, party.pokemon_6.id)
                editPokemons.push(myPokemon)
            }
            if (editPokemons.length === 0) {
                alert('変更がありません')
                return
            }
            this.setState({loading: true})
            axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/put', 
                {
                    name: this.props.username,
                    pass: this.props.password,
                    pokemons: editPokemons
                }
                ).then(res => {
                    alert('パーティが編集されました')
                    this.setState({loading: false})
                }).catch((e: any) => {
                    alert(e)
                    this.setState({ loading: false })
                })
        }
        if (type === 'delete') {
            this.setState({loading: true})
            axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/put', 
                {
                    name: this.props.username,
                    pass: this.props.password,
                    party_id: id
                }
                ).then(res => {
                    alert('パーティが削除されました')
                    this.setState({loading: false})
                }).catch((e: any) => {
                    alert(e)
                    this.setState({ loading: false })
                })
        }
    }
    handleChangeSpoil = () => (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        this.setState({ spoil: value, nowInput: '' })
    }
    handleInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({nowInput: event.target.value})
    }
    makeDetail = (selectedPokemon: MyPokemon): SendData | void => {
        let move_1: waza | undefined = wazaData.find((element: waza) => {
            return element.name === selectedPokemon.move_1
        })
        let move_2: waza | undefined = wazaData.find((element: waza) => {
            return element.name === selectedPokemon.move_2
        })
        let move_3: waza | undefined = wazaData.find((element: waza) => {
            return element.name === selectedPokemon.move_3
        })
        let move_4: waza | undefined = wazaData.find((element: waza) => {
            return element.name === selectedPokemon.move_4
        })
        const dammywaza: waza = {name:"ダミー",	type:"ダミー",	power:0,	accuracy:0,	species:"ダミー"}
        if (!move_1) { move_1 = dammywaza }
        if (!move_2) { move_2 = dammywaza }
        if (!move_3) { move_3 = dammywaza }
        if (!move_4) { move_4 = dammywaza }
        let item: Item | undefined = AllItem.find((element: Item) => {
            return element.name === selectedPokemon.item
        })
        const detail: SendData = {
            moves: [move_1, move_2, move_3, move_4],
            efforts: {
                effort_h: selectedPokemon.effort_h,
                effort_a: selectedPokemon.effort_a,
                effort_b: selectedPokemon.effort_b,
                effort_c: selectedPokemon.effort_c,
                effort_d: selectedPokemon.effort_d,
                effort_s: selectedPokemon.effort_s,
            },
            ability: selectedPokemon.ability,
            memo: selectedPokemon.memo,
            item: item,
            index: 0,
            nature: selectedPokemon.nature,
            name: selectedPokemon.name,
        }
        return detail
    }
    selectPokemon = (id: number, i: number) => {
        if (i < -1 || i > 5) { return }
        if (i === -1) {
            const selectedPokemon: MyPokemon | undefined = this.props.myPokemons.find((element: MyPokemon) => {
                return element.id === id
            })
            if (!selectedPokemon) {
                alert('内部エラーです。報告していただけると嬉しいです')
                return
            }
            const pokemonData: PokemonData | undefined = datas.find((element: PokemonData) => {
                return element.number === selectedPokemon.number
            })
            if (!pokemonData) {
                alert('指定された図鑑番号のポケモンが存在しません')
                return
            }
            const detail = this.makeDetail(selectedPokemon)
            if (!detail) {
                return
            }
            let nowDetail: SendData[] = this.state.partyDetail
            nowDetail[0] = detail
            this.setState({
                partyDetail: nowDetail,
                selectedPokemonId: selectedPokemon.id ? selectedPokemon.id : 0,
                selectedPokemonIndex: 0,
                selectedPokemon: pokemonData,
                selectedPartyId: 0
            })
            return
        }
        const selectedParty: MyParty | undefined = this.props.myParties.find((element: MyParty) => {
            return element.id === id
        })
        if (!selectedParty) {
            alert('内部エラーです。報告していただけると嬉しいです')
            return
        }
        let pokemon: MyPokemon
        if (i === 0 && selectedParty.pokemon_1) {
            pokemon = selectedParty.pokemon_1
        }
        if (i === 1 && selectedParty.pokemon_2) {
            pokemon = selectedParty.pokemon_2
        }
        if (i === 2 && selectedParty.pokemon_3) {
            pokemon = selectedParty.pokemon_3
        }
        if (i === 3 && selectedParty.pokemon_4) {
            pokemon = selectedParty.pokemon_4
        }
        if (i === 4 && selectedParty.pokemon_5) {
            pokemon = selectedParty.pokemon_5
        }
        if (i === 5 && selectedParty.pokemon_6) {
            pokemon = selectedParty.pokemon_6
        }
        if (
            !selectedParty.pokemon_1 ||
            !selectedParty.pokemon_2 ||
            !selectedParty.pokemon_3 ||
            !selectedParty.pokemon_4 ||
            !selectedParty.pokemon_5 ||
            !selectedParty.pokemon_6
        ) {
            alert('不正なパーティです')
            return
        }
        const detail1 = this.makeDetail(selectedParty.pokemon_1)
        const detail2 = this.makeDetail(selectedParty.pokemon_2)
        const detail3 = this.makeDetail(selectedParty.pokemon_3)
        const detail4 = this.makeDetail(selectedParty.pokemon_4)
        const detail5 = this.makeDetail(selectedParty.pokemon_5)
        const detail6 = this.makeDetail(selectedParty.pokemon_6)
        if (!detail1 || !detail2 || !detail3 || !detail4 || !detail5 || !detail6) {
            alert('パーティのポケモンの情報が不正です')
            return
        }
        const nowDetail: SendData[] = [detail1, detail2, detail3, detail4, detail5, detail6]
        const pokemonData: PokemonData | undefined = datas.find((element) => {
            return element.number === pokemon.number
        })
        this.setState({
            partyDetail: nowDetail,
            selectedPokemonId: 0,
            selectedPokemonIndex: i,
            selectedPokemon: pokemonData,
            selectedPartyId: id
        })
        return
    }
    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <Paper style={{ height: 430,width: 300 }}>
                                <FormControl component="fieldset">
                                    <Grid item>
                                        <Grid container>
                                            <RadioGroup aria-label="position" name="position" value={this.state.spoil} onChange={this.handleChangeSpoil()} row>
                                                <FormControlLabel
                                                    value="pokemon"
                                                    control={<Radio color="primary"/>}
                                                    label="Pokemon"
                                                    labelPlacement="end"
                                                />
                                                <FormControlLabel
                                                    value="party"
                                                    control={<Radio color="primary"/>}
                                                    label="Party"
                                                    labelPlacement="end"
                                                />
                                            </RadioGroup>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                                <Grid item>
                                    <Grid container>
                                        <TextField
                                            placeholder="keyword"
                                            style={{marginLeft:30}}
                                            value={this.state.nowInput}
                                            onChange={this.handleInput()}
                                        />
                                        <IconButton onClick={this.handleReload} disabled={this.state.loading}>
                                            <CachedIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                {this.state.spoil === 'pokemon' ? 
                                    <SearchPokemon
                                        selectPokemon={this.selectPokemon}
                                        selectedId={this.state.selectedPokemonId}
                                        nowInput={this.state.nowInput}
                                        loading={this.state.loading}
                                        myPokemons={this.props.myPokemons}
                                    />
                                :
                                    <SearchParty
                                        selectPokemon={this.selectPokemon}
                                        selectedId={this.state.selectedPokemonId}
                                        nowInput={this.state.nowInput}
                                        loading={this.state.loading}
                                        myParties={this.props.myParties}
                                        send={this.send}
                                    />
                                }
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper style={{ height: 430,width: 300 }}>
                                <PokemonStatus
                                    nowDetail={this.state.selectedPokemonIndex !== undefined ? this.state.partyDetail[this.state.selectedPokemonIndex] : undefined}
                                    sendPokemonStatus={this.selectPokeStatus}
                                    color="primary"
                                    pokemon={this.state.selectedPokemon}
                                    wazas={this.props.wazas}
                                    pokemons={this.props.pokemons}
                                />
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper style={{ height: 430,width: 300}}>
                                <PokemonMove
                                    buttonLabel='このポケモンを編集'
                                    buttonNone={this.state.selectedPartyId === 0 ? false : true}
                                    deleteExist={this.state.selectedPokemonId === 0 ? false : true}
                                    deleteFunc={this.deletePokemon}
                                    nowDetail={this.state.selectedPokemonIndex !== undefined ? this.state.partyDetail[this.state.selectedPokemonIndex] : undefined}
                                    sendPokeMove={this.selectPokeMove}
                                    openModal={this.sendPokemon}
                                    color="primary"
                                    pokemon={this.state.selectedPokemon}
                                    wazas={this.props.wazas}
                                    pokemons={this.props.pokemons}
                                    loading={this.state.loading}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
