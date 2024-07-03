// Call the dataTables jQuery plugin
$(document).ready(function() {
    // on ready
});


async function iniciarSesion(){

       let datos = {};

       datos.email = document.getElementById('txtEmail').value;
       datos.password = document.getElementById('txtPassword').value;


      const request = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)

      });

      const respuesta = await request.json();

      if(respuesta.result != 'FAIL'){

        //localStorage sirve para guardar la informacion recibida en el browser del usuario
        localStorage.userid = respuesta.id;
        localStorage.token = respuesta.token;
        localStorage.email = datos.email;
        window.location.href = 'index.html'

      }else{
        alert("Las credenciales son incorrectas.");
      }



}
