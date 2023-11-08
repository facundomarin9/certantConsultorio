package com.certant.consultorio.models.especialidad;

import com.certant.consultorio.models.profesionales.Profesional;
import com.certant.consultorio.models.turnos.Turno;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name="especialidad")
@Entity(name="Especialidad")
@Getter
@NoArgsConstructor
public class Especialidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String especialidad;
    private String descripcion;
    private Boolean activo;
    private LocalDate fechabaja;


    @JsonIgnore
    @ManyToMany(mappedBy = "especialidad")
    private List<Profesional> profesionales = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "especialidad" )
    private Set<Turno> turnos = new HashSet<>();

    public void addTurno(Turno turno){
        turnos.add(turno);
        turno.setEspecialidad(this);
    }

    public Especialidad(DataRegisterEspecialidad dataRegisterEspecialidad){

        this.especialidad = dataRegisterEspecialidad.especialidad();
        this.descripcion = dataRegisterEspecialidad.descripcion();
        this.activo = true;



    }

    public void update(DataUpdateEspecialidad dataUpdateEspecialidad) {

        this.especialidad = dataUpdateEspecialidad.especialidad();
        this.descripcion = dataUpdateEspecialidad.descripcion();

    }

    public void deleteEspecialidad() {

        this.activo = false;
        this.fechabaja = LocalDate.now();
    }
}
