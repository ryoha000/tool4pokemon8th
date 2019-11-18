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
import { CircularProgress, Slider, ListItem, ListItemText, List, ListItemAvatar, SnackbarContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Fab, Button, Grid, Menu, MenuItem, Select, Icon, TextField } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InputAuto from './InputAuto';
import { AllItem, availableItems, Item } from './ItemData';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PokemonIcon from './PokemonIcon'
import { wazaData }from './WazaData';

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
        if (this.state.pastLogs !== this.props.myLogs) {
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
