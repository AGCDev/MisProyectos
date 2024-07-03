package com.reservapistapaddel.pistapaddelreserva.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//import javax.persistence.*;
import java.time.*;
import java.util.Date;


@Entity
@Table(name="reservas")
@ToString @EqualsAndHashCode
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private Long id;
    @Temporal(TemporalType.DATE)
    @Getter @Setter @Column(name = "fecha")
    private LocalDate fecha;
    @Temporal(TemporalType.TIME)
    @Getter @Setter @Column(name = "start_time")
    private LocalTime start_time;
    @Temporal(TemporalType.TIME)
    @Getter @Setter @Column(name = "end_time")
    private LocalTime end_time;
    @Transient
    @Getter @Setter
    private String token;

    @ManyToOne
    @JoinColumn(name = "fk_usuario_id", nullable = false)
    @Getter @Setter
    private Usuario usuario;

}

