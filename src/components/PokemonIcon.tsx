import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { CircularProgress } from '@material-ui/core';

interface Props{
  number: string;
}

interface State{
  number: string
  propsNumber: string
  loading: boolean
}

export default class PokemonIcon extends React.Component<Props,State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      number: "",
      propsNumber: "",
      loading: false
    };
  }
  componentDidMount() {
    this.setState({loading: true})
    if (this.props.number != this.state.propsNumber) {
      console.log(this.state.number)
      console.log(this.props.number)
      this.setState({propsNumber: this.props.number})
      if (this.props.number.length === 1) {
        this.setState({number: "00" + this.state.propsNumber})
      }
      if (this.props.number.length === 2) {
        this.setState({number: "0" + this.props.number})
      }
      if (this.props.number.length > 2) {
        this.setState({number: this.props.number})
      }
      this.setState({loading: false})
      if (this.props.number === "7") {
        this.setState({ number: "007" })
      }
      if (this.props.number === "1") {
        this.setState({ number: "001" })
      }
    } 
  }
  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (this.props.number != this.state.propsNumber) {
      this.setState({loading: true})
      console.log(this.state.number)
      console.log(this.props.number)
      this.setState({propsNumber: this.props.number})
      if (this.props.number.length === 1) {
        console.log("length === 1")
        this.setState({number: "00" + this.props.number})
      }
      if (this.props.number.length === 2) {
        this.setState({number: "0" + this.props.number})
      }
      if (this.props.number.length > 2) {
        this.setState({number: this.props.number})
      }
      this.setState({loading: false})
      console.log(this.state.number)
      // if (this.props.number === "7") {
      //   this.setState({ number: "007" })
      // }
      // if (this.props.number === "1") {
      //   this.setState({ number: "001" })
      // }
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <CircularProgress/>
      )
    } else {
      return (
        <Avatar style={{marginLeft: 1, marginRight: 1}} src={"/assets/" + this.state.number + ".png"}/>
      );
    }
  }
}
