import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import './HPbar.css';
// n=2.4
export default class HPbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainHP: 240,
      confirmHP: 0, // 上の方の乱数
      randomHPRange: 0, // 乱数幅
      lostHP:240, // 下の方の乱数
      confirmHPColor: "greenyellow",
      randomHPColor: "rgb(100, 150, 26)",
      time: 1
    };
  }
  componentDidUpdate() {
    if (this.state.confirmHP !== Math.floor(this.props.confirmHP * 240) && this.props.time > this.state.time) {
      this.setState({ confirmHP: Math.floor(this.props.confirmHP * 240), randomHPRange: Math.floor(this.props.lostHP * 240), lostHP: Math.floor(this.props.lostHP * 240) })
      if (this.state.remainHP - Math.floor(this.props.confirmHP * 240) > 120) {
        this.setState({ confirmHPColor: "greenyellow", randomHPColor: "rgb(100, 150, 26)"})
      } else if (this.state.remainHP - Math.floor(this.props.confirmHP * 240) > 48) {
        this.setState({ confirmHPColor: "yellow", randomHPColor: "#DAA520"})
      } else {
        this.setState({ confirmHPColor: "red", randomHPColor: "#8B0000"})
      }
    }
    if (this.state.remainHP - Math.floor(this.props.confirmHP * 240) > 120 && this.state.confirmHPColor !== "greenyellow") {
      this.setState({ confirmHPColor: "greenyellow", randomHPColor: "rgb(100, 150, 26)"})
    } else if (!this.state.remainHP - Math.floor(this.props.confirmHP * 240) > 120 && this.state.remainHP - Math.floor(this.props.confirmHP * 240) > 48 && this.state.confirmHPColor !== "yellow") {
      this.setState({ confirmHPColor: "yellow", randomHPColor: "gold"})
    } else if (!this.state.remainHP - Math.floor(this.props.confirmHP * 240) > 48 && this.state.confirmHPColor !== "red") {
      this.setState({ confirmHPColor: "red", randomHPColor: "crimson"})
    }
  }
  onResize = (e, direction, ref, delta, position) => {
    // const minutes = Math.floor(parseInt(ref.style.width, 10) / 20) * 30;
    // const hour = Math.floor(parseInt(position.x, 10) / 40);
    this.setState({ confirmHP: ref.style.width });
  }
  handleClick = () => {
    this.setState({ randomHPRange: 240, lostHP: 0 , confirmHP: 0, remainHP: 240, confirmHPColor: "greenyellow", time: new Date().getTime() })
  }
  render() {
    return (
      <div className="AHPbar" onClick={this.handleClick}>
        <div className="container">
          {Array.from(Array(240).keys()).map(i =>
            <div className="item" key={i}>
            </div>
          )}
          <Rnd
            className="rndgr"
            default={{
              x: 0,
              y: 0,
              width: 240,
              height: '100%'
            }}
            dragAxis="none"
            enableResizing={{
              top: false, right: false, bottom: false, left: false,
              topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
            }}
            minWidth="0"
            maxWidth="240"
            style={{background: "rgb(58, 58, 58)"}}
          />
          <Rnd
            className="rnddg"
            default={{
              x: 0,
              y: 0,
            }}
            size={{
              width: this.state.remainHP - this.state.randomHPRange < 0? 0 : this.state.remainHP - this.state.randomHPRange,
              height: '100%',
            }}
            dragAxis="none"
            enableResizing={{
              top: false, right: false, bottom: false, left: false,
              topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
            }}
            bounds="parent"
            minWidth="0"
            maxWidth="240"
            style={{background: this.state.randomHPColor}}
          />
          <Rnd
            className="rndlg"
            default={{
              x: 0,
              y: 0,
            }}
            size={{
              width: this.state.remainHP - this.state.confirmHP < 0 ? 0 : this.state.remainHP - this.state.confirmHP,
              height: '100%'
            }}
            dragAxis="none"
            onResizeStop={(e, direction, ref, delta, position) => {
              this.setState({
                remainHP: ref.style.width.slice( 0, -2 ),
                time: new Date().getTime()
              });
            }}
            enableResizing={{
              top: false, right: true, bottom: false, left: false,
              topRight: false, bottomRight: false, bottomLeft: false, topLeft: false
            }}
            style={{background: this.state.confirmHPColor}}
            bounds="parent"
            resizeGrid={[1, 0]}
            minWidth="0"
            maxWidth="240"
          />
        </div>
      </div>
    );
  }
}
