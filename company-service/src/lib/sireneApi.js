import axios from 'axios';

async function authenticate() {
    return await axios.post(
        'https://api.insee.fr/token',
        new URLSearchParams({
            'grant_type': 'client_credentials'
        }),
        {
            headers: {
                'Authorization': `Basic ${process.env.SIRENE_API_BASIC_AUTH}`
            }
        }
    ).catch(err => {
        console.log(err);
    }).then(res => {
        return res.data.access_token;
    });
}

exports.getSirene = async (siret) => {
    const token = process.env.SIRENE_API_TOKEN
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://api.insee.fr/entreprises/sirene/V3/siret/'+siret,
            headers: { 
              'Authorization': 'Bearer ' + token,
            }
          };
        
          axios(config)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            resolve(null)
          });
    })
}

