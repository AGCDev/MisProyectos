package com.reservapistapaddel.pistapaddelreserva.controllers;

import com.reservapistapaddel.pistapaddelreserva.dao.UsuarioDao;
import com.reservapistapaddel.pistapaddelreserva.models.Usuario;
import com.reservapistapaddel.pistapaddelreserva.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    public boolean validarToken(String token) {

        String usuarioId = jwtUtil.getKey(token);

        return usuarioId != null;

    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario) {

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        // iterations: 1, memory: 1024, parallelism: 1
        // el 1024 hay que ponerlo tambien en la BBDD en Length/Values hay que poner 255
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        // hasheamos la password del usuario
        usuario.setPassword(hash);

        usuarioDao.registrar(usuario);

    }

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {

        Usuario usuarioLogueado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);

        if (usuarioLogueado != null) {

            String tokenJwt = jwtUtil.create(String.valueOf(usuarioLogueado.getId()), usuarioLogueado.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("token", tokenJwt);
            response.put("id", usuarioLogueado.getId());
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body("{\"result\": \"FAIL\"}");

    }

}
