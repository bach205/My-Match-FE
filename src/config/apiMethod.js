const get = (url) => {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Request fail')
            return response.json();
        })
        .catch(error => {
            throw new Error("Get API error: " + error);
        })
}

export { get }