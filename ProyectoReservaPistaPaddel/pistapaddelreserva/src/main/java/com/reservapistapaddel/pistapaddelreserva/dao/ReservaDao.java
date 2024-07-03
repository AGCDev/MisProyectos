package com.reservapistapaddel.pistapaddelreserva.dao;

import com.reservapistapaddel.pistapaddelreserva.models.Reserva;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

public interface ReservaDao {
    List<Reserva> getReservas();
    void eliminar(Long id);
    void registrar(Reserva reserva);
    boolean existeReserva(LocalDate fecha, LocalTime startTime, LocalTime endTime);

    List<Reserva> obtenerReservas();
}
