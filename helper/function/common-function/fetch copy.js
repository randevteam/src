export const fetch_url_post = async (url, data) => {
    var body = JSON.stringify(data);
    var retour = null;
    await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    }).then((response) => response.json())
    .then((json) => {
        retour = json
    }).catch((error) => {
        return error;
    });
    if(retour) return retour;
}

export const fetch_url_get = async (url, data = null) => {
    var data = null;
    await fetch(url)
        .then((response) => response.json())
        .then((json) => {
            data = json;
        }).catch((error) => {
            return error;
        });
    if(data) return data;
}