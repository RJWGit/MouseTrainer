import React, { createRef } from 'react';

class Login extends React.Component {
    postData = async () => {
        try {
            let result = await fetch('https://webhook.site/eda25444-b10a-4d50-afda-1b59fc5cb529', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    Accept: 'application.json',
                },
                body: JSON.stringify({
                    key1: 'login',
                }),
            });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    };

    // componentDidMount() {
    //     fetch(`https://webhook.site/eda25444-b10a-4d50-afda-1b59fc5cb529 `).then(res => res.json());
    // }
    render() {
        return (
            <div className="container">
                <button onClick={this.postData}>Test </button>
            </div>
        );
    }
}

export default Login;
