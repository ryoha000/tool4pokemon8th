import React from 'react';
import { datas, PokemonData, MyParty } from './shared'
import { TextField, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, DialogContent, DialogActions, IconButton, CircularProgress, Grid, CardContent, CardActions, Card, Typography, Divider, Collapse, Button } from '@material-ui/core';
import PokemonIcon from './PokemonIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
    myParties: MyParty[];
    nowInput: string
    loading: boolean
    selectedId: number
    selectPokemon: (id: number, i: number) => void
    send: (type: string, id: number) => void
}

interface State {
    isOpenParty: boolean
    openPartyId: number
    pastInput: string
}

export default class SearchParty extends React.Component<Props,State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            isOpenParty: false,
            openPartyId: 0,
            pastInput: ''
        };
    }
    componentDidUpdate = () => {
        if (this.state.pastInput !== this.props.nowInput) {
            this.setState({pastInput: this.props.nowInput})
        }
    }
    getPokemonNameFromNum = (num: string): string => {
        const pokemon: PokemonData | undefined = datas.find((element: PokemonData) => {
            return element.number === num
        })
        if (pokemon) {
            return pokemon.name
        }
        return ''
    }
    handleOpenParty = (id: number) => {
        if (this.state.openPartyId === id) {
            this.setState({isOpenParty: false, openPartyId: 0})
        } else {
            this.setState({isOpenParty: true, openPartyId: id})
        }
    }
    renderPartySearch = () => {
        if (this.props.loading) {
            return (
                <CircularProgress />
            )
        }
        let updateSuggest: MyParty[]
        let str: string = this.props.nowInput
        const pst: string = this.props.nowInput
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
        updateSuggest = this.props.myParties.filter((element: MyParty) => {
            if (
                element.name.indexOf(str) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_1 ? element.pokemon_1.number : '000').indexOf(str) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_2 ? element.pokemon_2.number : '000').indexOf(str) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_3 ? element.pokemon_3.number : '000').indexOf(str) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_4 ? element.pokemon_4.number : '000').indexOf(str) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_5 ? element.pokemon_5.number : '000').indexOf(str) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_6 ? element.pokemon_6.number : '000').indexOf(str) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_1 ? element.pokemon_1.number : '000').indexOf(eistr) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_2 ? element.pokemon_2.number : '000').indexOf(eistr) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_3 ? element.pokemon_3.number : '000').indexOf(eistr) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_4 ? element.pokemon_4.number : '000').indexOf(eistr) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_5 ? element.pokemon_5.number : '000').indexOf(eistr) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_6 ? element.pokemon_6.number : '000').indexOf(eistr) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_1 ? element.pokemon_1.number : '000').indexOf(pst) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_2 ? element.pokemon_2.number : '000').indexOf(pst) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_3 ? element.pokemon_3.number : '000').indexOf(pst) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_4 ? element.pokemon_4.number : '000').indexOf(pst) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_5 ? element.pokemon_5.number : '000').indexOf(pst) > -1 ||
                this.getPokemonNameFromNum(element.pokemon_6 ? element.pokemon_6.number : '000').indexOf(pst) > -1 ||
                (element.name.indexOf(str) > -1) ||
                (element.name.indexOf(eistr) > -1) ||
                (element.name.indexOf(pst) > -1) ||
                (element.memo.indexOf(str) > -1) ||
                (element.memo.indexOf(eistr) > -1) ||
                (element.memo.indexOf(pst) > -1)
            ) {
                return element.deleted_at === 'None'
            }
        })
        return (
            <List style={{marginLeft: 0, maxHeight: 310}} dense>
                {updateSuggest.reverse().map((element: MyParty) => {
                return (
                    <List dense>
                        <ListItem
                            style={{marginLeft: 0}}
                            button
                            selected={element.id === this.props.selectedId}
                            onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {this.handleOpenParty(element.id ? element.id : 0)}}
                        >
                            <ListItemAvatar>
                                <Grid item>
                                    <Grid container>
                                        <PokemonIcon number={element.pokemon_1 ? element.pokemon_1.number : '000'} />
                                        <PokemonIcon number={element.pokemon_2 ? element.pokemon_2.number : '000'} />
                                        <PokemonIcon number={element.pokemon_3 ? element.pokemon_3.number : '000'} />
                                        <PokemonIcon number={element.pokemon_4 ? element.pokemon_4.number : '000'} />
                                        <PokemonIcon number={element.pokemon_5 ? element.pokemon_5.number : '000'} />
                                        <PokemonIcon number={element.pokemon_6 ? element.pokemon_6.number : '000'} />
                                    </Grid>
                                </Grid>
                            </ListItemAvatar>
                        </ListItem>
                        <Collapse in={this.state.isOpenParty && this.state.openPartyId === element.id} timeout="auto" unmountOnExit>
                            <List style={{maxHeight: 300}} dense>
                                <ListItem disabled={element.pokemon_1 ? element.pokemon_1.number === '000' : true} button key={0} onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {this.props.selectPokemon(element.id ? element.id : 0, 0)}}>
                                    <ListItemAvatar>
                                        <PokemonIcon number={element.pokemon_1 ? element.pokemon_1.number : '000'}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {element.pokemon_1 ? element.pokemon_1.name : ''}
                                    </ListItemText>
                                </ListItem>
                                <ListItem disabled={element.pokemon_2 ? element.pokemon_2.number === '000' : true} button key={1} onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {this.props.selectPokemon(element.id ? element.id : 0, 1)}}>
                                    <ListItemAvatar>
                                        <PokemonIcon number={element.pokemon_2 ? element.pokemon_2.number : '000'}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {element.pokemon_2 ? element.pokemon_2.name : ''}
                                    </ListItemText>
                                </ListItem>
                                <ListItem disabled={element.pokemon_3 ? element.pokemon_3.number === '000' : true} button key={2} onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {this.props.selectPokemon(element.id ? element.id : 0, 2)}}>
                                    <ListItemAvatar>
                                        <PokemonIcon number={element.pokemon_3 ? element.pokemon_3.number : '000'}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {element.pokemon_3 ? element.pokemon_3.name : ''}
                                    </ListItemText>
                                </ListItem>
                                <ListItem disabled={element.pokemon_4 ? element.pokemon_4.number === '000' : true} button key={3} onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {this.props.selectPokemon(element.id ? element.id : 0, 3)}}>
                                    <ListItemAvatar>
                                        <PokemonIcon number={element.pokemon_4 ? element.pokemon_4.number : '000'}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {element.pokemon_4 ? element.pokemon_4.name : ''}
                                    </ListItemText>
                                </ListItem>
                                <ListItem disabled={element.pokemon_5 ? element.pokemon_5.number === '000' : true} button key={4} onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {this.props.selectPokemon(element.id ? element.id : 0, 4)}}>
                                    <ListItemAvatar>
                                        <PokemonIcon number={element.pokemon_5 ? element.pokemon_5.number : '000'}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {element.pokemon_5 ? element.pokemon_5.name : ''}
                                    </ListItemText>
                                </ListItem>
                                <ListItem disabled={element.pokemon_6 ? element.pokemon_6.number === '000' : true} button key={5} onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {this.props.selectPokemon(element.id ? element.id : 0, 5)}}>
                                    <ListItemAvatar>
                                        <PokemonIcon number={element.pokemon_6 ? element.pokemon_6.number : '000'}/>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {element.pokemon_6 ? element.pokemon_6.name : ''}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <Grid item>
                                        <Grid container>
                                            <Button disabled={this.props.loading} color='primary' style={{width: 180}} onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {this.props.send('edit', 0)}}>
                                                編集
                                            </Button>
                                            <Button disabled={this.props.loading} color='secondary' style={{width: 70}} onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {this.props.send('delete', element.id ? element.id : 0)}}>
                                                削除
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                )
                })}
                <ListItem />
            </List>
        )
    }
    render() {
        return (
            <DialogContent style={{marginLeft: 0, padding: 0}}>
                {this.renderPartySearch()}
            </DialogContent>
        )
    }
}
