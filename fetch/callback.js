let searchParams = new URLSearchParams(location.search);
let code = searchParams.get("code");

fetch("https://student.sbhs.net.au/api/token", {
    method: "POST",
    body: new URLSearchParams({
        code: code,
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: "http://localhost:5500/callback.html"
    })
}).then(async response => {
    if (response.ok) {
        //We have a token!
        localStorage.setItem("Token", await response.text());
        location.pathname = "/index.html";
    }
    else {
        //Something went wrong
    }
});