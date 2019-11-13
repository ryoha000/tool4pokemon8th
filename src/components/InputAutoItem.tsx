import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Menu } from '@material-ui/core';
import { wazaData } from './WazaData';
import {AllItem, Item} from './ItemData'

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
  handleInput: any
  disabled: boolean
}

interface State {
  isOpenSuggest?: any
  nowSuggest: Item[]
  nowInput: string
  open: boolean
}

export default class InputAutoItem extends React.Component<Props,State> {
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
    let updateSuggest: Item[] = []
    let str: string = event.target.value
    const pst: string = event.target.value
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
    const hira: string = eistr.replace(/[\u30a1-\u30f6]/g, function(match) {
      var chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
    if (event.target.value.length > 0) {
      if (this.state.nowSuggest.length > 0) {
        updateSuggest = this.state.nowSuggest.filter((element) => {
          return (element.name.indexOf(str) > -1 || element.name.indexOf(pst) > -1 || element.name.indexOf(eistr) > -1 || element.name.indexOf(hira) > -1)
        })
      } else {
        updateSuggest = AllItem.filter((element) => {
          return (element.name.indexOf(str) > -1 || element.name.indexOf(pst) > -1 || element.name.indexOf(eistr) > -1 || element.name.indexOf(hira) > -1)
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

  handleSelect = (nature: Item) => {
    this.props.handleInput(nature.name)
    this.setState({ nowInput: nature.name })
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
          disabled={this.props.disabled}
          value={this.state.nowInput}
          style={{margin: 0, zIndex: 10, marginTop: 3}}
          onChange={this.handleInput()}
          placeholder="アイテム"
          type="search"
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
            {this.state.nowSuggest.map((element: Item, indec: number, array: Item[]) => {
              return (
                <MenuItem onClick={(event: React.MouseEvent<HTMLElement>) => {this.handleSelect(element);this.closeSuggest(event);}} key={indec}>{element.name}</MenuItem>
              )
            })}
          </Menu>
      </div>
    )
  }
}
