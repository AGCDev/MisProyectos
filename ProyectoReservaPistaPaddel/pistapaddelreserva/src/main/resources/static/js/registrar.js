// Call the dataTables jQuery plugin
$(document).ready(function() {
    // on ready
});

//codigo para esta funcion buscada en stackoverflow fetch example para que nos devuelva los datos de usuario en json
async function registrarUsuario(){

       let datos = {};
       datos.nombre = document.getElementById('txtNombre').value;
       datos.apellidos = document.getElementById('txtApellidos').value;
       datos.email = document.getElementById('txtEmail').value;
       datos.password = document.getElementById('txtPassword').value;
       datos.unidad = document.getElementById('txtUnidad').value;
       datos.telefono = document.getElementById('txtTelefono').value;

       let repetirPassword = document.getElementById('txtRepetirPassword').value;

       if(repetirPassword != datos.password){
            alert('Contraseña diferente.');
            return;

       }

      const request = await fetch('api/usuarios', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)

      });

      alert("Registro completado.");

      window.location.href = 'login.html'


}

