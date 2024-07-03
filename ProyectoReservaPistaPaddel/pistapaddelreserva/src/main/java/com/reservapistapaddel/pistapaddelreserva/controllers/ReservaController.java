package com.reservapistapaddel.pistapaddelreserva.controllers;


import com.reservapistapaddel.pistapaddelreserva.dao.ReservaDao;
import com.reservapistapaddel.pistapaddelreserva.dto.ReservaDTO;
import com.reservapistapaddel.pistapaddelreserva.models.Reserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
//@RequestMapping("/api")
public class ReservaController {

    @Autowired
    private ReservaDao reservaDao;

    @Autowired
    private UsuarioController conUser;

    //@PostMapping("/reservar")
    @RequestMapping(value = "api/reservas", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> reservar(@RequestBody Reserva reserva) {
        Map<String, Object> response = new HashMap<>();

        if(!conUser.validarToken(reserva.getToken())){
            response.put("success", false);
            response.put("message", "Usuario no autentificado.");
            return ResponseEntity.badRequest().body(response);
        }

        if (reservaDao.existeReserva(reserva.getFecha(), reserva.getStart_time(), reserva.getEnd_time())) {
            response.put("success", false);
            response.put("message", "La casilla ya está reservada por otro usuario.");
            return ResponseEntity.badRequest().body(response);
        }

        reservaDao.registrar(reserva);
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "api/reservas", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> reservas() {
        Map<String, Object> response = new HashMap<>();

        List<Reserva> reservas = reservaDao.getReservas();

        List<ReservaDTO> reservasDTO = reservas.stream()
                .map(reserva -> new ReservaDTO(
                        reserva.getId(),
                        reserva.getFecha(),
                        reserva.getStart_time(),
                        reserva.getEnd_time()
                ))
                .collect(Collectors.toList());

        // Agregar la lista de reservas a la respuesta
        response.put("reservas", reservasDTO);
        response.put("success", true);
        return ResponseEntity.ok(response);
    }
}
