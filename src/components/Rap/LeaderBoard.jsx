import React, { Component } from 'react';
import '../Styles/Leaderboard.css';
import * as db from '../../dataStorage/datastore';


class Leaderboard extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            scores: null,
            sortedScores: {}
        }
    }
    componentDidMount() {
        db.fetchScores(this.fetchedScores);
    }
    fetchedScores = (user) => {
        this.setState({scores: user});
        this.reOrganizeScores();
    }

    reOrganizeScores = () => {
        let objectScores = []

        if (this.state.scores !== null){
            for (const [key, value] of Object.entries(this.state.scores)){
                console.log(value.name);
                this.setState({ sortedScores: { ...this.state.sortedScores, [value.name] : value.score } })
            }
        }
        console.log(this.state.sortedScores);
    }

    render() {
        let totalScores = null
        if (this.state.scores !== null){
            //console.log(this.state.scores)
            totalScores = Object.entries(this.state.sortedScores).sort((a,b) => b[1]-a[1]).map(value => {
                return(
                    <div>
                        <h1>{value[0]} : {value[1]}</h1>
                    </div>
                )
                }
            )
        }
        return (
            <div>
                {totalScores}
            </div>
        );
    }
}

export default Leaderboard;