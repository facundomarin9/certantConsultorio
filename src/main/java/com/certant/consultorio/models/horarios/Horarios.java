package com.certant.consultorio.models.horarios;

import com.certant.consultorio.models.profesionales.Profesional;
import com.certant.consultorio.models.turnos.Turno;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name="horarios")
@Entity(name="Horarios")
@Getter
@Setter
@NoArgsConstructor
public class Horarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime inicioconsulta;


    @ManyToOne
    @JoinColumn(name = "profesional_id")
    private Profesional profesional;

    @JsonIgnore
    @OneToOne(mappedBy = "horario", cascade = CascadeType.ALL, orphanRemoval = false)
    private Turno turno;

    public Horarios (DataRegisterHoras dataRegisterHoras){
        this.inicioconsulta = dataRegisterHoras.inicioConsulta();
    }

}
