export async function newToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const result = await fetch('http://localhost:3000/api/user/token', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: refreshToken,
            }),
        });

        //Save tokens to local storage
        const tokens = await result.json();
        localStorage.setItem('accessToken', tokens.accessToken);
        return result;
    } catch (e) {
        console.log('error');
    }
}

// //Example API to access restricted API
// testAPI = async () => {
//     const accessToken = await localStorage.getItem('accessToken');
//     try {
//         const result = await fetch('http://localhost:3000/api/user/testlogin', {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 Authorization: 'BEAR ' + accessToken,
//             },
//         });
//         if (result.status !== 200) {
//             const newToken = await this.newToken();
//             if (newToken.status == 200) {
//                 this.testAPI();
//             }
//         }
//     } catch (e) {
//         console.log('error');
//     }
// };
