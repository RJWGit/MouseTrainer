import React, { createRef } from 'react';

class LeaderBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: [],
        };
    }

    componentDidMount = async () => {
        const players = await this.getLeaderboard();

        this.setState({
            scores: players,
        });
    };

    getLeaderboard = async () => {
        try {
            const result = await fetch('http://localhost:3000/api/user/leaderboard', {
                method: 'Get',
                mode: 'cors',
            });
            const users = await result.json();
            return users;
        } catch (e) {
            console.log('error');
        }
    };

    renderScores = () => {
        const users = this.state.scores;
        let i = 0;
        return users.map(user => {
            const { username, score } = user;
            i += 1;
            if (i > 10) {
                return;
            }
            return (
                <tr>
                    <td>{i}</td>
                    <td>{username}</td>
                    <td>{score}</td>
                </tr>
            );
        });
    };

    render() {
        return (
            <div className="container leaderboard-page-container">
                <div className="col-12 pb-5 d-flex justify-content-around">
                    <h1 className="mode-page-title">Top 10 Leaderboard</h1>
                </div>
                <table class="table table-dark table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {//Check if data is loaded
                        this.state.scores.length === 0 ? (
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ) : (
                            this.renderScores()
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LeaderBoard;
