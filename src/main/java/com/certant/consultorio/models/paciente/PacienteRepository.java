package com.certant.consultorio.models.paciente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    Paciente findByDnipaciente(String dniPaciente);
}
