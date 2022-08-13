import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import {useState, useEffect} from 'react';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello world</h1>
      <input type="button" value="remove func" onClick={function(){
        setFuncShow(false);
      }}></input>
      <input type="button" value="remove class" onClick={function(){
        setClassShow(false);
      }}></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

var funcStyle ='color:blue'
var funcId =0;
function FuncComp(props){
  const[number, setNumber] = useState(props.initNumber);
  const[date, setDate] = useState((new Date()).toString());
  
  //class의 componentDidMount 만 호출 (콤포넌트 생성시 1회만 호출)
  useEffect(function(){
    console.log('%c func => useEffect number (componentDidMount) ' + (++funcId), funcStyle)
    document.title = number;

    // 이 useEffect에서는 componentWillUnmount 와 같은(소멸시 1번만 호출)
    return function cleanup() {
      console.log('%c func => useEffect number return (componentWillUnmount)' + (++funcId), funcStyle)
    }
  }, [])  //배열안의 빈 인자를 넣으면 콤포넌트 생성시 1회만 호출

  //class의 componentDidMount, componentDidUpdate 와 같은 기능 (render 실행 후 )
  //side effect 임
  useEffect(function(){
    console.log('%c func => useEffect number (componentDidMount, componentDidUpdate ) ' + (++funcId), funcStyle)
    document.title = number;

    // (clean up ) useEffect 가 다시 실행될때 먼져 실행됨. 마치 이전 useEffect 작업을 정리하는 느낌. 
    return function cleanup() {
      console.log('%c func => useEffect number return (componentDidMount, componentDidUpdate )' + (++funcId), funcStyle)
    }
  }, [number, date])  //배열안의 인자의 값이 바뀌었을때만 호출되도록 shouldComponentUpdate 와 비슷

  // // 여러개 가능
  // useEffect(function(){
  //   console.log('%c func => useEffect B' + (++funcId), funcStyle)
  //   document.title = number+ ':' + date;
  // })

  console.log('%c func => render' + (++funcId), funcStyle)
  return (
    <div className="container">
      <h2>function style component</h2>
      <p> Number: {number}</p>
      <p> Date: {date}</p>

      <input type="button" value="random" onClick={event=>{
        setNumber(Math.random())
      }}></input>

      <input type="button" value="date" onClick={event=>{
        setDate((new Date()).toString())
      }}></input>

    </div>
  );
}

var classStyle = 'color:red'
class ClassComp extends Component {
  state = {
    number:this.props.initNumber,
    date:(new Date()).toString()
  }
  // render 호출되기 전 (첫번째 호출( 첫 dom 에 표현될때 초기작업 개념) (생성)
  componentWillMount(){
    console.log('%c class => componentWillMount', classStyle)
  }
  // render 호출된 후 (첫번째 호출(첫 dom 에 표현될때 초기작업 개념) (생성)
  componentDidMount() {
    console.log('%c class => componentDidMount', classStyle)
  }
  // 콤포넌트가 소멸땔때 한번만 호출 (소멸)
  componentWillUnmount() {
    console.log('%c class => componentWillUnmount', classStyle)
  }


  // render 를 호출할 필요가 있는지 없는지 판단.
  shouldComponentUpdate(nextProps, nextState) { 
    console.log('%c class => shouldComponentUpdate', classStyle)
    // if (nextProps.data === this.props.data) {
    //   return false; // return false; 은 처음만 render가 호출되고 나머지는 호출이 안된다.
    // } 
    return true; // return true; 은 호출
  }
  // state, props 의 값이 바뀌어 render 가 다시 호출되기 전
  componentWillUpdate(nextProps, nextState) {
    console.log('%c class => componentWillUpdate', classStyle)
  }
  // state, props 의 값이 바뀌어 render 가 다시 호출된 후
  componentDidUpdate(nextProps, nextState) {
    console.log('%c class => componentDidUpdate', classStyle)
  }    

  render() {
    console.log('%c class => render', classStyle)
    return (
      <div className="container">
        <h2>class style component</h2>
        <p> Number: {this.state.number}</p>
        <p> Date : {this.state.date} </p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)
        }></input>

        <input type="button" value="date" onClick={
          function(){
            this.setState({date:(new Date()).toString()})
          }.bind(this)
        }></input>
      </div>
    );
  }
}

export default App;
