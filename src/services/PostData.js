export function PostData(type, userData) {
    let BaseUrl = 'http://127.0.0.1:8000/api/v1/token/';

    return new Promise((resolve, reject) => {
        fetch(BaseUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(responseJSON => {
            resolve(responseJSON);
        })
        .catch(error => {
            reject(error);
        })
    });
}