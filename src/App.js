import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React,{Component} from 'react';
import Login from './components/login';
import Topup from './components/topup';
import Pay from './components/pay'
import axios from 'axios';


class App extends Component   {

  constructor(props) {
      super (props);
      this.state = {
        login: {
            name:"",
            balance:"0",
            loginResponse:  "",
            loginResponseName: ""
        },
        topup:{
            amount:"",
            topupResponse: ""
        },
        pay: {
            payTo: "",
            amount:"",
            payResponse: ""
        }
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLoginResponse = this.handleLoginResponse.bind(this);

    this.handleTopup = this.handleTopup.bind(this);
    this.handleTopupSubmit = this.handleTopupSubmit.bind(this);
    this.handleTopupResponse = this.handleTopupResponse.bind(this);

    this.handlePay = this.handlePay.bind(this);
    this.handlePaySubmit = this.handlePaySubmit.bind(this);
    this.handlePayResponse = this.handlePayResponse.bind(this);


  }
  handleLogin(value){
    this.setState(prevState =>{
      let login = Object.assign({}, prevState.login);
      login.name =value;
      return {login};
    });
  }
  handleTopup(value){
    this.setState(prevState =>{
      let topup = Object.assign({}, prevState.topup);
      topup.amount =value;
      return {topup};
    });
 }
 handlePay(name,value){

  this.setState(prevState =>{
    let pay = Object.assign({}, prevState.pay);
    pay[name] = value;
    return {pay};
  });

}
  handleLoginResponse(data){
    this.setState(prevState =>{
      let login = Object.assign({}, prevState.login);
      login.loginResponseName = data.name;
      login.loginResponse = JSON.stringify(data);
      return {login};
    });
  }
  handleTopupResponse(data){
    this.setState(prevState =>{
      let topup = Object.assign({}, prevState.topup);
      topup.topupResponse = JSON.stringify(data);
      return {topup};
    });
  }
  handlePayResponse(data){
    this.setState(prevState =>{
        let pay = Object.assign({}, prevState.pay);
        pay.payResponse = JSON.stringify(data);
        return {pay};
    });
  }
  handleLoginSubmit(){

      let requestConfig = {};
      requestConfig.method="post";
      requestConfig.url="http://localhost:11016/xyzbank/api/login?name="+this.state.login.name;
      requestConfig.headers={"Content-Type": "application/json" };
      requestConfig.headers={"Access-Control-Allow-Origin":"*"};

      axios(requestConfig)
      .then(response => {
        this.handleLoginResponse(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  handleTopupSubmit(){

    if(this.state.login.name == null || this.state.login.name == ''){
      window.alert("Kindly login to topup");
      return false;
    }else if(this.state.topup.amount =="0"){
      window.alert("Kindly enter more than 0");
      return false;
    }

   
        let requestConfig = {};
        requestConfig.method="post";
        requestConfig.url="http://localhost:11016/xyzbank/api/topup";
        requestConfig.data={};  
        requestConfig.data.name=this.state.login.name;
        requestConfig.data.amount = this.state.topup.amount;
        requestConfig.headers={"Content-Type": "application/json" };
    
        axios(requestConfig)
        .then(response => {
          this.handleTopupResponse(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    

}
handlePaySubmit(){

  if(this.state.login.name == null || this.state.login.name == ''){
    window.alert("Kindly login to topup");
    return false;
  }else if(this.state.pay.payTo == null || this.state.pay.payTo ==''){
    window.alert("Kindly enter PayTo");
    return false;
  }else if(this.state.pay.amount =="0"){
    window.alert("Kindly enter more than 0");
    return false;
  }

      let requestConfig = {};
      requestConfig.method="post";
      requestConfig.url="http://localhost:11016/xyzbank/api/pay";
      requestConfig.data={};  
      requestConfig.data.name=this.state.login.name;
      requestConfig.data.payTo = this.state.pay.payTo;
      requestConfig.data.amount = this.state.pay.amount;
      requestConfig.headers={"Content-Type": "application/json" };
  
      axios(requestConfig)
      .then(response => {
        this.handlePayResponse(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  

}

  componentDidMount() {
     console.log("Login Comp Mounted");
  }

  render(){
      return (
        <div id="retailbankingroot">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="navbar-brand">
                Retail Banking
              </div>
            </nav>
            <h3>Login</h3>
            <Login value={this.state.login.name} onChange={this.handleLogin}
             loginDisplay={this.state.login.loginResponse} 
            loginResonseName={this.state.login.loginResponseName}
            loginSubmit={this.handleLoginSubmit}></Login>
            <h3>Top Up</h3>
            <Topup value={this.state.topup.amount} onChange={this.handleTopup} topupDisplay={this.state.topup.topupResponse} topupSubmit={this.handleTopupSubmit}></Topup>
            <h3> Pay </h3>
            <Pay  payTOalue={this.state.pay.payTo} onChange={this.handlePay} payDisplay={this.state.pay.payResponse} paySubmit={this.handlePaySubmit}></Pay>
        </div>
      )
  }
 
}

export default App;
