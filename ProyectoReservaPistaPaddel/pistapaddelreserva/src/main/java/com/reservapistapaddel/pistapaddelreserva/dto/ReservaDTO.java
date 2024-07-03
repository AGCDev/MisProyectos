package com.reservapistapaddel.pistapaddelreserva.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ReservaDTO {
    private Long id;
    private LocalDate fecha;
    private LocalTime startTime;
    private LocalTime endTime;

    public ReservaDTO(Long id, LocalDate fecha, LocalTime startTime, LocalTime endTime) {
        this.id = id;
        this.fecha = fecha;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
}
