import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     handleChange(event) {
        this.props.onChange(event.target.value)
      }
    
     handleSubmit(event) {
        event.preventDefault();
        this.props.loginSubmit();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
                <div className="col-6" style={{paddingTop: "5px",paddingLeft:"5px"}}>
                  <input type="text" id="login" className="form-control" placeholder="Enter Name for Login" value={this.props.value} onChange={this.handleChange} />
                </div>
                <div  className="col-2" style={{paddingTop: "5px",paddingLeft:"5px"}}>
                    <button type="submit" className ="btn btn-primary">Submit</button>
                </div>
            </div>
             <div id="displayloginresult" >
        <div >{this.props.loginResonseName != '' ?'Hi':''} {this.props.loginResonseName} </div>
                <div>{this.props.loginDisplay}</div>
            </div>
          </form>
        );
      }


}