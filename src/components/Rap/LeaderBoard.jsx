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
        if (this.state.scores !== null){
            for (const [, value] of Object.entries(this.state.scores)){
                this.setState({ sortedScores: { ...this.state.sortedScores, [value.name] : value.score } })
            }
        }
    }

    render() {
        let totalScores = null
        if (this.state.sortedScores !== null){
            totalScores = Object.entries(this.state.sortedScores).sort((a,b) => b[1]-a[1]).map(value => {
                return(
                    <div>
                        <h2>{value[0]} : {value[1]}</h2>
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