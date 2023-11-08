package com.certant.consultorio.models.turnos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;

public interface TurnoRepository extends JpaRepository<Turno,Long> {
    Page<Turno> findByConfirmadoTrue(Pageable paginacion);

    ArrayList<Turno> findByPacienteId(Long id);

    ArrayList<Turno> findByEspecialidadId(Long id);

    ArrayList<Turno> findByProfesionalId(Long id);

    Turno findByHorarioId(Long id);

    Turno findByFechaturno(LocalDateTime localDateTime);
}
