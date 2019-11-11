/* eslint no-unused-expressions: "off" */
import React from 'react';
import { datas, PokemonData, MyPokemon, MyParty, MyLog } from './shared'
import { TextField, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, DialogContent } from '@material-ui/core';
import PokemonIcon from './PokemonIcon';

interface Props {
  isOpen: boolean;
  index: number;
  onClose: () => void;
  selectPokemon: (pokemon: MyPokemon, index: number) => void;
  selectParty: (party: MyParty) => void
  // pokemon or party
  type: string
  myPokemons: MyPokemon[];
  myParties: MyParty[];
}

interface State {
  nowInput: string
  nowPokemonSuggest: MyPokemon[]
  nowPartySuggest: MyParty[]
}

export default class FromRegisteredDialog extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      nowInput: '',
      nowPokemonSuggest: [],
      nowPartySuggest: []
    };
  }
  handleClose = () => {
    this.props.onClose()
  }
  renderPokemonSearch = () => {
    let nowSuggest: MyPokemon[]
    let updateSuggest: MyPokemon[]
    const str: string = this.state.nowInput
    if (this.state.nowPokemonSuggest.length > 0) {
      nowSuggest = this.state.nowPokemonSuggest
    } else {
      nowSuggest = this.props.myPokemons
    }
    if (this.state.nowInput === '') {
      updateSuggest = this.props.myPokemons
    } else {
      updateSuggest = nowSuggest.filter((element: MyPokemon) => {
        return (
          element.name.indexOf(str) > -1 ||
          this.pokemonNameInParty(element.number).indexOf(str) > -1
        )
      })
    }
    return (
      <List>
        {updateSuggest.map((element: MyPokemon) => {
          <ListItem
            onClick={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {this.props.selectPokemon(element, this.props.index)}}
          >
            <ListItemAvatar>
              <PokemonIcon number={element.number} />
            </ListItemAvatar>
            <ListItemText>
              {element.name}
            </ListItemText>
          </ListItem>
        })}
      </List>
    )
  }
  handleInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({nowInput: event.target.value})
  }
  pokemonNameInParty = (num: string): string => {
    const pokemon: PokemonData | undefined = datas.find((element: PokemonData) => {
      return element.number === num
    })
    if (pokemon) {
      return pokemon.name
    }
    return ''
  }
  renderPartySearch = () => {
    let nowSuggest: MyParty[]
    let updateSuggest: MyParty[]
    const str: string = this.state.nowInput
    if (this.state.nowPartySuggest.length > 0) {
      nowSuggest = this.state.nowPartySuggest
    } else {
      nowSuggest = this.props.myParties
    }
    if (this.state.nowInput === '') {
      updateSuggest = this.props.myParties
    } else {
      updateSuggest = nowSuggest.filter((element: MyParty) => {
        return (
          element.name.indexOf(str) > -1 ||
          this.pokemonNameInParty(element.pokemon_1 ? element.pokemon_1.number : '').indexOf(str) > -1 ||
          this.pokemonNameInParty(element.pokemon_2 ? element.pokemon_2.number : '').indexOf(str) > -1 ||
          this.pokemonNameInParty(element.pokemon_3 ? element.pokemon_3.number : '').indexOf(str) > -1 ||
          this.pokemonNameInParty(element.pokemon_4 ? element.pokemon_4.number : '').indexOf(str) > -1 ||
          this.pokemonNameInParty(element.pokemon_5 ? element.pokemon_5.number : '').indexOf(str) > -1 ||
          this.pokemonNameInParty(element.pokemon_6 ? element.pokemon_6.number : '').indexOf(str) > -1 ||
          (element.pokemon_1 ? element.pokemon_1.name.indexOf(str) > -1 : false) ||
          (element.pokemon_2 ? element.pokemon_2.name.indexOf(str) > -1 : false) ||
          (element.pokemon_3 ? element.pokemon_3.name.indexOf(str) > -1 : false) ||
          (element.pokemon_4 ? element.pokemon_4.name.indexOf(str) > -1 : false) ||
          (element.pokemon_5 ? element.pokemon_5.name.indexOf(str) > -1 : false) ||
          (element.pokemon_6 ? element.pokemon_6.name.indexOf(str) > -1 : false)
        )
      })
    }
    return (
      <List>
        {updateSuggest.map((element: MyParty) => {
          <ListItem
            onClick={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {this.props.selectParty(element)}}
          >
            <ListItemText>
              {element.name}
            </ListItemText>
            <ListItemAvatar>
              <PokemonIcon number={element.pokemon_1 ? element.pokemon_1.number : ''} />
              <PokemonIcon number={element.pokemon_2 ? element.pokemon_2.number : ''} />
              <PokemonIcon number={element.pokemon_3 ? element.pokemon_3.number : ''} />
              <PokemonIcon number={element.pokemon_4 ? element.pokemon_4.number : ''} />
              <PokemonIcon number={element.pokemon_5 ? element.pokemon_5.number : ''} />
              <PokemonIcon number={element.pokemon_6 ? element.pokemon_6.number : ''} />
            </ListItemAvatar>
          </ListItem>
        })}
      </List>
    )
  }
  render() {
    return (
      <Dialog onClose={this.handleClose} open={this.props.isOpen}>
        <DialogTitle>登録済みのものからの選択</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="keyword"
            fullWidth
            value={this.state.nowInput}
            onChange={this.handleInput()}
          />
        </DialogContent>
        <DialogContent dividers={true}>
          {this.props.type === 'pokemon' ? this.renderPokemonSearch() : this.renderPartySearch()}
        </DialogContent>
      </Dialog>
    )
  }
}
