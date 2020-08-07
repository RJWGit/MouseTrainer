export async function newToken() {
    //Check if access token is invlalid first before trying to retrieve new token
    const isValid = await isTokenValid();

    if (isValid !== undefined) {
        if (isValid.status !== 200) {
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

                if (result.status === 200) {
                    //Save tokens to local storage
                    const tokens = await result.json();
                    localStorage.setItem('accessToken', tokens.accessToken);

                    return result;
                }
            } catch (e) {
                console.log('error');
            }
        } else {
            return isValid;
        }
    } else {
        return isValid;
    }
}

async function isTokenValid() {
    const accessToken = localStorage.getItem('accessToken');

    try {
        const result = await fetch('http://localhost:3000/api/user/istokenvalid', {
            method: 'GET',
            mode: 'cors',
            headers: {
                Authorization: 'BEAR ' + accessToken,
            },
        });

        return result;
    } catch (e) {
        console.log('error');
    }
}
