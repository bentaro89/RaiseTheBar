import React from 'react';
import { getFeedback } from './textDiff.js'
import parse from 'html-react-parser';

class DiffRender extends React.Component{

    constructor(props){
        super()
        this.state = {
            currentLine: "",
            totalText: ""
        }
    }

    render(){

        if(this.props.user === this.state.currentLine){

        }else if(this.props.user === ""){
            this.setState({
                totalText: this.state.totalText + this.props.user,
                currentLine: ""
            });
        } else {
            this.setState({
                currentLine: this.props.user
            });
        }

        var content = getFeedback(this.props.recorded, this.state.currentLine)

        return(<div><div>{parse(getFeedback(this.props.recorded, this.state.totalText))}</div>{parse(content)}</div>);
    }
}

export default DiffRender;
