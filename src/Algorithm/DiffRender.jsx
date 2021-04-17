import React from 'react';
import { getFeedback, getScore } from './textDiff.js'
import parse from 'html-react-parser';

class DiffRender extends React.Component{

    constructor(props){
        super()
        this.state = {
            recorded: this.props.recorded,
            user: this.props.user
        }
    }

    updateText(addition){
        this.setState({
            user: this.state.user + addition
        });
    }

    render(){

        var content = getFeedback(this.props.recorded, this.props.user)

        return(<div>{parse(content)}</div>);
    }

}

export default DiffRender;
