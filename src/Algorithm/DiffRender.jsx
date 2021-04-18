import React from 'react';
import { getFeedback } from './textDiff.js'
import parse from 'html-react-parser';

class DiffRender extends React.Component{

    render(){

        var content = getFeedback(this.props.recorded, this.props.user)

        return(<div>{parse(content)}</div>);
    }
}

export default DiffRender;
