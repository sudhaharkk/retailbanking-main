import React from 'react';

export default class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     handleChange(event) {
        this.props.onChange(event.target.name , event.target.value)
      }
    
     handleSubmit(event) {
        event.preventDefault();
        this.props.paySubmit();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
                <div className="col-6" style={{paddingTop: "5px",paddingLeft:"5px"}}>
                  <input type="text" id="payTo" className="form-control" placeholder="Enter PayTo" name ="payTo" value={this.props.value} onChange={this.handleChange} />
                </div>
                <div className="col-6" style={{paddingTop: "5px",paddingLeft:"5px"}}>
                  <input type="number" id="payToAmount" className="form-control" placeholder="Enter PayTo Amount" name= "amount" value={this.props.value} onChange={this.handleChange} />
                </div>
                <div  className="col-2" style={{paddingTop: "5px",paddingLeft:"5px"}}>
                    <button type="submit" className ="btn btn-primary">Submit</button>
                </div>
            </div>
            <div id="displaypayresult">{this.props.payDisplay}</div>
          </form>
        );
      }


}