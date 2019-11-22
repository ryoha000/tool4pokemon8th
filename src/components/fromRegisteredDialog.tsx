/* eslint no-unused-expressions: "off" */
import React from 'react';
import { datas, PokemonData, MyPokemon, MyParty, MyLog } from './shared'
import { TextField, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, DialogContent, DialogActions, IconButton, CircularProgress, Grid } from '@material-ui/core';
import PokemonIcon from './PokemonIcon';
import CachedIcon from '@material-ui/icons/Cached';
import axios from 'axios';

interface ITree {
  [key: string]: ITree | string;
}

const tree: ITree = {
  a: 'ア', i: 'イ', u: 'ウ', e: 'エ', o: 'オ',
  k: {
    a: 'カ', i: 'キ', u: 'ク', e: 'ケ', o: 'コ',
    y: { a: 'キャ', i: 'キィ', u: 'キュ', e: 'キェ', o: 'キョ' },
  },
  s: {
    a: 'サ', i: 'シ', u: 'ス', e: 'セ', o: 'ソ',
    h: { a: 'シャ', i: 'シ', u: 'シュ', e: 'シェ', o: 'ショ' },
    y: { a: 'キャ', i: 'キィ', u: 'キュ', e: 'キェ', o: 'キョ' },
  },
  t: {
    a: 'タ', i: 'チ', u: 'ツ', e: 'テ', o: 'ト',
    h: { a: 'テャ', i: 'ティ', u: 'テュ', e: 'テェ', o: 'テョ' },
    y: { a: 'チャ', i: 'チィ', u: 'チュ', e: 'チェ', o: 'チョ' },
    s: { a: 'ツァ', i: 'ツィ', u: 'ツ', e: 'ツェ', o: 'ツォ' },
  },
  c: {
    a: 'カ', i: 'シ', u: 'ク', e: 'セ', o: 'コ',
    h: { a: 'チャ', i: 'チ', u: 'チュ', e: 'チェ', o: 'チョ' },
    y: { a: 'チャ', i: 'チィ', u: 'チュ', e: 'チェ', o: 'チョ' },
  },
  q: {
    a: 'クァ', i: 'クィ', u: 'ク', e: 'クェ', o: 'クォ',
  },
  n: {
    a: 'ナ', i: 'ニ', u: 'ヌ', e: 'ネ', o: 'ノ', n: 'ン',
    y: { a: 'ニャ', i: 'ニィ', u: 'ニュ', e: 'ニェ', o: 'ニョ' },
  },
  h: {
    a: 'ハ', i: 'ヒ', u: 'フ', e: 'ヘ', o: 'ホ',
    y: { a: 'ヒャ', i: 'ヒィ', u: 'ヒュ', e: 'ヒェ', o: 'ヒョ' },
  },
  f: {
    a: 'ファ', i: 'フィ', u: 'フ', e: 'フェ', o: 'フォ',
    y: { a: 'フャ', u: 'フュ', o: 'フョ' },
  },
  m: {
    a: 'マ', i: 'ミ', u: 'ム', e: 'メ', o: 'モ',
    y: { a: 'ミャ', i: 'ミィ', u: 'ミュ', e: 'ミェ', o: 'ミョ' },
  },
  y: { a: 'ヤ', i: 'イ', u: 'ユ', e: 'イェ', o: 'ヨ' },
  r: {
    a: 'ラ', i: 'リ', u: 'ル', e: 'レ', o: 'ロ',
    y: { a: 'リャ', i: 'リィ', u: 'リュ', e: 'リェ', o: 'リョ' },
  },
  w: { a: 'ワ', i: 'ウィ', u: 'ウ', e: 'ウェ', o: 'ヲ' },
  g: {
    a: 'ガ', i: 'ギ', u: 'グ', e: 'ゲ', o: 'ゴ',
    y: { a: 'ギャ', i: 'ギィ', u: 'ギュ', e: 'ギェ', o: 'ギョ' },
  },
  z: {
    a: 'ザ', i: 'ジ', u: 'ズ', e: 'ゼ', o: 'ゾ',
    y: { a: 'ジャ', i: 'ジィ', u: 'ジュ', e: 'ジェ', o: 'ジョ' },
  },
  j: {
    a: 'ジャ', i: 'ジ', u: 'ジュ', e: 'ジェ', o: 'ジョ',
    y: { a: 'ジャ', i: 'ジィ', u: 'ジュ', e: 'ジェ', o: 'ジョ' },
  },
  d: {
    a: 'ダ', i: 'ヂ', u: 'ヅ', e: 'デ', o: 'ド',
    h: { a: 'デャ', i: 'ディ', u: 'デュ', e: 'デェ', o: 'デョ' },
    y: { a: 'ヂャ', i: 'ヂィ', u: 'ヂュ', e: 'ヂェ', o: 'ヂョ' },
  },
  b: {
    a: 'バ', i: 'ビ', u: 'ブ', e: 'ベ', o: 'ボ',
    y: { a: 'ビャ', i: 'ビィ', u: 'ビュ', e: 'ビェ', o: 'ビョ' },
  },
  v: {
    a: 'ヴァ', i: 'ヴィ', u: 'ヴ', e: 'ヴェ', o: 'ヴォ',
    y: { a: 'ヴャ', i: 'ヴィ', u: 'ヴュ', e: 'ヴェ', o: 'ヴョ' },
  },
  p: {
    a: 'パ', i: 'ピ', u: 'プ', e: 'ペ', o: 'ポ',
    y: { a: 'ピャ', i: 'ピィ', u: 'ピュ', e: 'ピェ', o: 'ピョ' },
  },
  x: {
    a: 'ァ', i: 'ィ', u: 'ゥ', e: 'ェ', o: 'ォ',
    y: {
      a: 'ャ', i: 'ィ', u: 'ュ', e: 'ェ', o: 'ョ',
    },
    t: {
      u: 'ッ',
      s: {
        u: 'ッ',
      },
    },
  },
  l: {
    a: 'ァ', i: 'ィ', u: 'ゥ', e: 'ェ', o: 'ォ',
    y: {
      a: 'ャ', i: 'ィ', u: 'ュ', e: 'ェ', o: 'ョ',
    },
    t: {
      u: 'ッ',
      s: {
        u: 'ッ',
      },
    },
  },
};

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
  handleAllData: (datas: MyPokemon | MyParty | MyLog) => void
  username: string
  password: string
}

interface State {
  nowInput: string
  nowPokemonSuggest: MyPokemon[]
  nowPartySuggest: MyParty[]
  loading: boolean
}

export default class FromRegisteredDialog extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      nowInput: '',
      nowPokemonSuggest: [],
      nowPartySuggest: [],
      loading: false
    };
  }
  handleClose = () => {
    this.props.onClose()
  }
  renderPokemonSearch = () => {
    let nowSuggest: MyPokemon[]
    let updateSuggest: MyPokemon[]
    let str: string = this.state.nowInput
    const pst: string = this.state.nowInput
    str = str.replace(/[\u3041-\u3096]/g, function(match) {
      const chr = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(chr);
    });
    let result = '';
    let tmp = '';
    let index = 0;
    const len = str.length;
    let node = tree;
    const push = (char: string, toRoot = true) => {
      result += char;
      tmp = '';
      node = toRoot ? tree : node;
    };
    while (index < len) {
      const char = str.charAt(index);
      if (char.match(/[a-z]/)) { // 英数字以外は考慮しない
        if (char in node) {
          const next = node[char];
          if (typeof next === 'string') {
            push(next);
          } else {
            tmp += pst.charAt(index);
            node = next;
          }
          index++;
          continue;
        }
        const prev = str.charAt(index - 1);
        if (prev && (prev === 'n' || prev === char)) { // 促音やnへの対応
          push(prev === 'n' ? 'ン' : 'ッ', false);
        }
        if (node !== tree && char in tree) { // 今のノードがルート以外だった場合、仕切り直してチェックする
          push(tmp);
          continue;
        }
      }
      push(tmp + char);
      index++;
    }
    tmp = tmp.replace(/n$/, 'ン'); // 末尾のnは変換する
    push(tmp);
    const eistr: string = result;
    if (this.state.nowPokemonSuggest.length > 0) {
      nowSuggest = this.state.nowPokemonSuggest
    } else {
      nowSuggest = this.props.myPokemons
    }
    // 処理を入れるならココ
    if (this.state.nowInput === '') {
      updateSuggest = this.props.myPokemons
    } else {
      updateSuggest = nowSuggest.filter((element: MyPokemon) => {
        return (
          element.name.indexOf(str) > -1 ||
          this.pokemonNameInParty(element.number).indexOf(str) > -1 ||
          this.pokemonNameInParty(element.number).indexOf(eistr) > -1 ||
          this.pokemonNameInParty(element.number).indexOf(pst) > -1
        )
      })
    }
    return (
      <List>
        {updateSuggest.map((element: MyPokemon, i: number) => {
          return (
            <ListItem
              key={i}
              onClick={(event: React.MouseEvent<HTMLElement>) => {this.props.selectPokemon(element, this.props.index);this.props.onClose()}}
              button
            >
              <ListItemAvatar>
                <PokemonIcon number={element.number} />
              </ListItemAvatar>
              <ListItemText>
                {element.name}
              </ListItemText>
            </ListItem>
          )
        })}
      </List>
    )
  }
  handleInput = () => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({nowInput: event.target.value})
  }
  handleReload = () => {
    console.log('aaa')
    this.setState({ loading: true })
    axios.post('https://us-central1-tool4pokemon8th.cloudfunctions.net/' + this.props.type, {name: this.props.username, pass: this.props.password})
      .then((res) => {
        if (this.props.type === 'pokemon') {
          if (res.data.pokemons) {
            this.props.handleAllData(res.data.pokemons)
          }
        }
        if (this.props.type === 'party') {
          if (res.data.parties) {
            this.props.handleAllData(res.data.parties)
          }
        }
        this.setState({ loading: false })
      })
      .catch(e => {
        if (e.data.message) {
          alert(e.data.message)
        } else {
          alert(e)
        }
        this.setState({ loading: false })
      })
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
    let str: string = this.state.nowInput
    const pst: string = this.state.nowInput
    str = str.replace(/[\u3041-\u3096]/g, function(match) {
      const chr = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(chr);
    });
    let result = '';
    let tmp = '';
    let index = 0;
    const len = str.length;
    let node = tree;
    const push = (char: string, toRoot = true) => {
      result += char;
      tmp = '';
      node = toRoot ? tree : node;
    };
    while (index < len) {
      const char = str.charAt(index);
      if (char.match(/[a-z]/)) { // 英数字以外は考慮しない
        if (char in node) {
          const next = node[char];
          if (typeof next === 'string') {
            push(next);
          } else {
            tmp += pst.charAt(index);
            node = next;
          }
          index++;
          continue;
        }
        const prev = str.charAt(index - 1);
        if (prev && (prev === 'n' || prev === char)) { // 促音やnへの対応
          push(prev === 'n' ? 'ン' : 'ッ', false);
        }
        if (node !== tree && char in tree) { // 今のノードがルート以外だった場合、仕切り直してチェックする
          push(tmp);
          continue;
        }
      }
      push(tmp + char);
      index++;
    }
    tmp = tmp.replace(/n$/, 'ン'); // 末尾のnは変換する
    push(tmp);
    const eistr: string = result;
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
          (element.pokemon_6 ? element.pokemon_6.name.indexOf(str) > -1 : false) ||
          (element.pokemon_1 ? element.pokemon_1.name.indexOf(eistr) > -1 : false) ||
          (element.pokemon_2 ? element.pokemon_2.name.indexOf(eistr) > -1 : false) ||
          (element.pokemon_3 ? element.pokemon_3.name.indexOf(eistr) > -1 : false) ||
          (element.pokemon_4 ? element.pokemon_4.name.indexOf(eistr) > -1 : false) ||
          (element.pokemon_5 ? element.pokemon_5.name.indexOf(eistr) > -1 : false) ||
          (element.pokemon_6 ? element.pokemon_6.name.indexOf(eistr) > -1 : false) ||
          (element.pokemon_1 ? element.pokemon_1.name.indexOf(pst) > -1 : false) ||
          (element.pokemon_2 ? element.pokemon_2.name.indexOf(pst) > -1 : false) ||
          (element.pokemon_3 ? element.pokemon_3.name.indexOf(pst) > -1 : false) ||
          (element.pokemon_4 ? element.pokemon_4.name.indexOf(pst) > -1 : false) ||
          (element.pokemon_5 ? element.pokemon_5.name.indexOf(pst) > -1 : false) ||
          (element.pokemon_6 ? element.pokemon_6.name.indexOf(pst) > -1 : false)
        )
      })
    }
    return (
      <List>
        {updateSuggest.map((element: MyParty) => {
          return (
            <ListItem
              button
              onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {this.props.selectParty(element)}}
            >
              <ListItemText>
                {element.name}
              </ListItemText>
              <ListItemAvatar>
                <Grid item container>
                  <PokemonIcon number={element.pokemon_1 ? element.pokemon_1.number : ''} />
                  <PokemonIcon number={element.pokemon_2 ? element.pokemon_2.number : ''} />
                  <PokemonIcon number={element.pokemon_3 ? element.pokemon_3.number : ''} />
                  <PokemonIcon number={element.pokemon_4 ? element.pokemon_4.number : ''} />
                  <PokemonIcon number={element.pokemon_5 ? element.pokemon_5.number : ''} />
                  <PokemonIcon number={element.pokemon_6 ? element.pokemon_6.number : ''} />
                </Grid>
              </ListItemAvatar>
            </ListItem>
          )
        })}
      </List>
    )
  }
  renderContent = () => {
    if (this.state.loading) {
      return (
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      )
    } else {
      return (
        <DialogContent>
          {this.props.type === 'pokemon' ? this.renderPokemonSearch() : this.renderPartySearch()}
        </DialogContent>
      )
    }
  }
  render() {
    return (
      <Dialog maxWidth='xs' fullWidth onClose={this.handleClose} open={this.props.isOpen}>
        <DialogTitle>
          登録済みから選択
          <IconButton onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleReload()}} edge="end">
            <CachedIcon />
          </IconButton>
        </DialogTitle>
        {/* <DialogContent> */}
          <TextField
            autoFocus
            margin="dense"
            label="keyword"
            fullWidth
            value={this.state.nowInput}
            onChange={this.handleInput()}
          />
        {/* </DialogContent> */}
        {this.renderContent()}
      </Dialog>
    )
  }
}
