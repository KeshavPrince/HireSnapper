export function verifyToken(token) {
  fetch("http://localhost:4000/api/authenticate/verify?token=" + token)
    .then(res => res.json())
    .then((json) => {
        console.log(json);
      if(json.success) {
        console.log("kp");
        return true;
      } else {
        
      }
    })
    .catch((err) => {
      console.log(err);
    });
    
}


// const data = new Promise((resolve, reject) => {
//     fetch("http://localhost:4000/api/authenticate/verify?token=" + token).then(res => {
//         resolve(res.json());
//     }).catch(err => {
//         reject(err);
//     })
// });

// data.then(e => {
//     console.log(e);
// }).catch(err =>  {
//     console.log(err);
// });
