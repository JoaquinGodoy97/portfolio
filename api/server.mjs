export default function handler(req, res) {
    res.status(200).send({
        "repoList": [
            { "name": "Repo1", "url": "http://repo1.com" },
            { "name": "Repo2", "url": "http://repo2.com" }
        ]
    });
}
