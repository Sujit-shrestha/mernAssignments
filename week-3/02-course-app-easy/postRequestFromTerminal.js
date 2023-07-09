

function callback(resp){
  if(!resp.ok){
    throw new Error('Network response was not ok')
  }
  resp.json().then(parsedResponse)
}
function parsedResponse(data){
  console.log(data);
}
fetch('http://localhost:3000/admin/login' , {
  method:'POST',
  headers: {
    "Content-Type":"application/json",
    "username" : "admin",
    "password": "pass"
  }
}).then(callback);
