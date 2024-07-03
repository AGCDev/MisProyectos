package com.reservapistapaddel.pistapaddelreserva.dao;

import com.reservapistapaddel.pistapaddelreserva.models.Reserva;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
@Transactional
public class ReservaDaoImp implements ReservaDao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Reserva> getReservas() {
        String query = "FROM Reserva";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        Reserva reserva = entityManager.find(Reserva.class, id);
        entityManager.remove(reserva);
    }

    @Override
    @Transactional
    public void registrar(Reserva reserva) {
        entityManager.merge(reserva);
    }

    @Override
    public boolean existeReserva(LocalDate fecha, LocalTime startTime, LocalTime endTime) {
        String query = "SELECT COUNT(r) FROM Reserva r WHERE r.fecha = :fecha AND r.start_time = :start_time AND r.end_time = :end_time";
        Long count = (Long) entityManager.createQuery(query)
                .setParameter("fecha", fecha)
                .setParameter("start_time", startTime)
                .setParameter("end_time", endTime)
                .getSingleResult();
        return count > 0;
    }

    @Override
    public List<Reserva> obtenerReservas() {
        String query = "FROM Reserva";
        return entityManager.createQuery(query, Reserva.class).getResultList();
    }
}
