package com.certant.consultorio.models.turnos;

import com.certant.consultorio.models.especialidad.Especialidad;
import com.certant.consultorio.models.horarios.Horarios;
import com.certant.consultorio.models.paciente.Paciente;
import com.certant.consultorio.models.profesionales.Profesional;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name="turno")
@Entity(name="Turno")
@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean confirmado;
    private LocalDateTime fechaturno;

    @OneToOne
    @JoinColumn(name = "horario_id")
    private Horarios horario;

    @ManyToOne
    @JoinColumn(name = "profesional_id")
    private Profesional profesional;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "especialidad_id")
    private Especialidad especialidad;


    public Turno(DataRegisterTurno dataRegisterTurno, Horarios horario) {



        this.fechaturno = dataRegisterTurno.fechaTurno();
        this.horario = horario;

        this.confirmado = true;


    }

    public void update(DataUpdateTurno dataUpdateTurno, Profesional profesional, Especialidad especialidad, Horarios horario) {


        this.fechaturno = dataUpdateTurno.fechaTurno();
        this.horario = horario;
        this.profesional = profesional;
        this.especialidad = especialidad;

    }

    public void cancelarTurno() {
        this.confirmado = false;
    }
}
