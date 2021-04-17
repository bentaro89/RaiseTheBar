import React from 'react';
import { getFeedback, getScore } from './textDiff.js'


class DiffRender extends React.Component{

    render(){

        var content = "<div>" + getFeedback(this.props.recorded, this.props.user) + "</div>";

        return(content);
    }

}

class del extends React.Component{

    render(){
        return (<h1>boop</h1>)
    }
}

class ins extends React.Component{

    render(){
        return (<h1>beep</h1>)
    }
}

export default DiffRender;
