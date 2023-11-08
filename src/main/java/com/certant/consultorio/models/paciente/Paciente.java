package com.certant.consultorio.models.paciente;

import com.certant.consultorio.models.turnos.Turno;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Table(name="paciente")
@Entity(name="Paciente")
@Getter
@Setter
@NoArgsConstructor
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombrepaciente;
    private String apellidopaciente;
    private String dnipaciente;

    @JsonIgnore
    @OneToMany(mappedBy = "paciente")
    private Set<Turno> turnos = new HashSet<>();
//ACA LO ULTIMO
    public void addTurno(Turno turno){
        turnos.add(turno);
        turno.setPaciente(this);
    }


    public Paciente (DataRegisterPaciente dataRegisterPaciente){

        this.nombrepaciente = dataRegisterPaciente.nombrePaciente();
        this.apellidopaciente = dataRegisterPaciente.apellidoPaciente();
        this.dnipaciente = dataRegisterPaciente.dniPaciente();

    }

}
