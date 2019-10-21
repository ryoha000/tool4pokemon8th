import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { datas, PokemonData } from './shared'
import { render } from 'react-dom';
import { TextField, Menu } from '@material-ui/core';
import { element } from 'prop-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }),
);

interface Props {
  handleInput: any
}

interface State {
  isOpenSuggest?: any
  nowSuggest: PokemonData[]
  nowInput: string
  open: boolean
}

export default class InputAutoPokemon extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      isOpenSuggest: null,
      nowSuggest: [],
      nowInput: "",
      open: false
    };
  }
  handleInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let updateSuggest: PokemonData[] = []
    let str: string = event.target.value
    const pst: string = event.target.value
    str = str.replace(/[\u3041-\u3096]/g, function(match) {
      const chr = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(chr);
    });
    if (event.target.value.length > 0) {
      if (this.state.nowSuggest.length > 0) {
        updateSuggest = this.state.nowSuggest.filter((element) => {
          return element.name.indexOf(str) > -1
        })
      } else {
        updateSuggest = datas.filter((element) => {
          return element.name.indexOf(str) > -1
        })
      }
    }
    if (updateSuggest.length === 0) {
      this.setState({ nowSuggest: updateSuggest , open: false, nowInput: event.target.value })
    }
    this.setState({ nowSuggest: updateSuggest , isOpenSuggest: event.currentTarget})
    this.setState({ nowInput: event.target.value })
    setTimeout(() => {
      if (this.state.nowInput === pst && this.state.nowSuggest.length != 0) {
        this.setState({ open: true })
      }
    }, 800)
  }

  handleSelect = (pokemon: PokemonData) => {
    this.props.handleInput(pokemon)
    this.setState({ nowInput: "" })
  }

  openSuggest = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ isOpenSuggest: event.currentTarget})
    console.log(event.currentTarget)
  }
  closeSuggest = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ open: false })
  }
  render() {
    return (
      <div>
        <TextField
          label="Pokemon Name"
          type="search"
          value={this.state.nowInput}
          style={{margin: 0, zIndex: 10}}
          onChange={this.handleInput()}
        />
          <Menu
            id="long-menu"
            anchorEl={this.state.isOpenSuggest}
            open={this.state.open}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={this.closeSuggest}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            PaperProps={{
              style: {
                maxHeight: 216,
                width: 200,
              },
            }}
          >
            {this.state.nowSuggest.map((element: PokemonData, indec: number, array: PokemonData[]) => {
              return (
                <MenuItem onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleSelect(element);this.closeSuggest(event);}} key={indec}>{element.name}</MenuItem>
              )
            })}
          </Menu>
      </div>
    )
  }
}
