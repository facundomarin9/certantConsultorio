package com.certant.consultorio.models.horarios;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface HorariosRepository extends JpaRepository<Horarios,Long> {
    List<Horarios> findByProfesionalId(Long id);
}
