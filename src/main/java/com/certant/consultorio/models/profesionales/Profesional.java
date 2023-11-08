package com.certant.consultorio.models.profesionales;

import com.certant.consultorio.models.especialidad.Especialidad;
import com.certant.consultorio.models.horarios.Horarios;
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

@Table(name="profesional")
@Entity(name="Profesional")
@Getter
@Setter
@NoArgsConstructor
public class Profesional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;
    private String consultorio;
    private String matricula;
    private Boolean activo;
    private LocalDate fechabaja;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(name = "profesional_especialidad",
            joinColumns = @JoinColumn(name = "profesional_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "especialidad_id", referencedColumnName = "id"))
    private List<Especialidad> especialidad = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "profesional")
    private List<Horarios> horarios = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "profesional")
    private Set<Turno> turnos = new HashSet<>();



    public Profesional (DataRegisterProfesional dataRegisterProfesional){

    this.nombre = dataRegisterProfesional.nombre();
    this.apellido = dataRegisterProfesional.apellido();
    this.consultorio = dataRegisterProfesional.consultorio();
    this.matricula = dataRegisterProfesional.matricula();
    this.activo = true;

    }

    public void addTurno(Turno turno){
        turnos.add(turno);
        turno.setProfesional(this);
    }

    public void addHora(Horarios hora){

        horarios.add(hora);
        hora.setProfesional(this);

    }

    public void update(DataUpdateProfesional dataUpdateProfesional) {

        this.nombre = dataUpdateProfesional.nombre();
        this.apellido = dataUpdateProfesional.apellido();
        this.consultorio = dataUpdateProfesional.consultorio();
        this.matricula = dataUpdateProfesional.matricula();

    }

    public void deleteProfesional() {

        this.activo = false;
        this.fechabaja = LocalDate.now();

    }
}
