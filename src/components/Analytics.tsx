import React, { ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import  {name2Pokemon, PokemonData, makeDB, waza, Status, MyParty, MyPokemon, MyLog}  from './shared';
import  {getPokemonByName, getWazas}  from './shared_js';
import { computeStatus, natures, Nature } from './ComputeMethods'
import { CircularProgress, Slider, ListItem, ListItemText, List, ListItemAvatar, SnackbarContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Fab, Button, Grid, Menu, MenuItem, Select, Icon, TextField, Tooltip } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InputAuto from './InputAuto';
import { AllItem, availableItems, Item } from './ItemData';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PokemonIcon from './PokemonIcon'
import { wazaData }from './WazaData';
import { ComposedChart, XAxis, YAxis, CartesianGrid, Bar, Area, Legend } from 'recharts';

interface Props {
    myLogs: MyLog[]
}

interface State {
    isOpenKP: boolean
    isOpenRate: boolean
    nowKP: KP[]
    pastLogs: MyLog[]
}

interface KP {
    number: string
    KP: number
}
interface WinRatePerM {
    year: number
    month: number
    win: number
    lose: number
    sum: number
    rate: number
}
export default class Analytics extends React.Component<Props,State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            isOpenKP: false,
            isOpenRate: false,
            nowKP: [],
            pastLogs: []
        };
    }
    componentDidUpdate = () => {
        if (this.state.pastLogs !== this.props.myLogs && this.props.myLogs.length === 0) {
            const logs: MyLog[] = this.props.myLogs
            let AllNumber: string[] = []
            logs.forEach((element: MyLog) => {
                if (element.pokemon_num_1 && element.pokemon_num_1 !== '000') {
                    AllNumber.push(element.pokemon_num_1)
                }
                if (element.pokemon_num_2 && element.pokemon_num_2 !== '000') {
                    AllNumber.push(element.pokemon_num_2)
                }
                if (element.pokemon_num_3 && element.pokemon_num_3 !== '000') {
                    AllNumber.push(element.pokemon_num_3)
                }
                if (element.pokemon_num_4 && element.pokemon_num_4 !== '000') {
                    AllNumber.push(element.pokemon_num_4)
                }
                if (element.pokemon_num_5 && element.pokemon_num_5 !== '000') {
                    AllNumber.push(element.pokemon_num_5)
                }
                if (element.pokemon_num_6 && element.pokemon_num_6 !== '000') {
                    AllNumber.push(element.pokemon_num_6)
                }
            })
            let allKP: KP[] = []
            AllNumber.forEach((element: string) => {
                if (allKP.filter((kp: KP) => {return kp.number === element}).length === 0) {
                    allKP.push({
                        number: element,
                        KP: AllNumber.filter((num: string) => {
                            return num === element
                        }).length
                    })
                }
            })
            allKP.sort(function(a, b) {
                if (a.KP > b.KP) {
                    return -1;
                } else {
                    return 1;
                }
            })
            console.log(allKP)
            console.log(allKP !== this.state.nowKP)
            this.setState({nowKP: allKP, pastLogs: logs})
        }
    }
    handleClickKP = () => {
        if (this.state.isOpenKP !== this.state.isOpenRate) {
            this.setState({isOpenRate: !this.state.isOpenRate, isOpenKP: !this.state.isOpenKP})
        } else {
            this.setState({isOpenKP: !this.state.isOpenKP})
        }
    }
    handleClickRate = () => {
        if (this.state.isOpenKP !== this.state.isOpenRate) {
            this.setState({isOpenRate: !this.state.isOpenRate, isOpenKP: !this.state.isOpenKP})
        } else {
            this.setState({isOpenRate: !this.state.isOpenRate})
        }
    }
    renderWinRate = () => {
        const lastLog: MyLog = this.state.pastLogs.slice(-1)[0];
        if (!lastLog.created_at) {
            return
        }
        const lastY: number = Number(lastLog.created_at.substr(0, 4))
        const lastM: number = Number(lastLog.created_at.substr(5, 7))
        const rangeLists = Array.from(Array(12), (v, k) => k)
        let winRates: WinRatePerM[] = []
        rangeLists.forEach((element: number) => {
            let nowM: number = lastM - element
            let nowY: number = lastY
            if (nowM < 1) {
                nowM = 12 - nowM
                nowY -= 1
            }
            winRates.push({
                year: nowY,
                month: nowM,
                win: 0,
                lose: 0,
                sum: 0,
                rate: 0
            })
        })
        let result: WinRatePerM[] = winRates
        this.props.myLogs.forEach((element: MyLog) => {
            if (element.created_at) {
                let thisY: number = Number(element.created_at.substr(0, 4));
                let thisM: number = Number(element.created_at.substr(5, 7));
                winRates.forEach((rate: WinRatePerM, i: number) => {
                    if (rate.year === thisY && rate.month === thisM) {
                        if (element.result) {
                            let n: number = rate.win + 1
                            result[i] = {
                                year: rate.year,
                                month: rate.month,
                                win: n,
                                lose: rate.lose,
                                sum: rate.win + 1 + rate.lose,
                                rate: Math.round( n / rate.lose )
                            }
                        } else if (!element.result) {
                            let n: number = rate.lose + 1
                            result[i] = {
                                year: rate.year,
                                month: rate.month,
                                win: rate.win,
                                lose: rate.lose + 1,
                                sum: rate.win + 1 + rate.lose,
                                rate: Math.round( rate.win / n )
                            }
                        }
                    }
                })
            }
        })
        return (
            <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
                width={600}  //グラフ全体の幅を指定
                height={280}  //グラフ全体の高さを指定
                data={result} //ここにArray型のデータを指定
                margin={{ top: 20, right: 0, bottom: 0, left: 0 }}  //marginを指定
            >
            <XAxis
                dataKey="month"  //Array型のデータの、X軸に表示したい値のキーを指定
            />
            <YAxis />
            {/* <Tooltip /> //hoverした時に各パラメーターの詳細を見れるように設定 */}
            {/* <Legend /> */}
            <CartesianGrid />
            <Area //面積を表すグラフ
                dataKey="rate" //Array型のデータの、Y軸に表示したい値のキーを指定
                stroke="#6495ed" ////グラフの線の色を指定
                fillOpacity={1}  ////グラフの中身の薄さを指定
                fill="#87cefa"  //グラフの色を指定
            />
            <Bar //棒グラフ
                dataKey="sum"　//Array型のデータの、Y軸に表示したい値のキーを指定
                barSize={20}  //棒の太さを指定
                stroke="#0000cd" ////レーダーの線の色を指定 
                fillOpacity={1}  //レーダーの中身の色の薄さを指定
                fill="#0000ff" ////レーダーの中身の色を指定
            />
            </ComposedChart>

        )
    }
    render() {
        return (
            <Card style={{ height: 430, width: 300 }}>
            <ListItem button onClick={this.handleClickKP}>
            <ListItemText primary="KP" />
                {this.state.isOpenKP ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.isOpenKP} timeout="auto" unmountOnExit>
                <Grid item container>
                    <List dense={true} style={{width: 140}} >
                        {this.state.nowKP.map((element: KP, i: number) => {
                            if (i < 6) {
                                return (
                                    <ListItem key={i}>
                                        <ListItemText>{i + 1}.&nbsp;&nbsp;{element.KP}&nbsp;/{this.props.myLogs.length}</ListItemText>
                                        <ListItemAvatar>
                                            <PokemonIcon number={element.number} />
                                        </ListItemAvatar>
                                    </ListItem>
                                )
                            } else {
                                return
                            }
                        })}
                    </List>
                    <List dense={true} style={{width: 140}} >
                        {this.state.nowKP.map((element: KP, i: number) => {
                            if (i > 5) {
                                if ( i < 12) {
                                    return (
                                        <ListItem key={i}>
                                            <ListItemText>{i + 1}.&nbsp;&nbsp;{element.KP}&nbsp;/{this.props.myLogs.length}</ListItemText>
                                            <ListItemAvatar>
                                                <PokemonIcon number={element.number} />
                                            </ListItemAvatar>
                                        </ListItem>
                                    )
                                }
                            } else {
                                return
                            }
                        })}
                        <ListItem />
                    </List>
                </Grid>
            </Collapse>
            <ListItem button onClick={this.handleClickRate}>
            <ListItemText primary="勝率" style={{marginTop: 3}} />
                {this.state.isOpenRate ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.isOpenRate} timeout="auto" unmountOnExit>
            </Collapse>
        </Card>
        )
    }
}
