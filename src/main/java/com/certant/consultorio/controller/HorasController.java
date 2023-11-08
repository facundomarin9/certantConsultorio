package com.certant.consultorio.controller;

import com.certant.consultorio.models.horarios.DataListHorarios;
import com.certant.consultorio.models.horarios.DataRegisterHoras;
import com.certant.consultorio.models.horarios.Horarios;
import com.certant.consultorio.models.horarios.HorariosRepository;
import com.certant.consultorio.models.profesionales.DataListProfesionales;
import com.certant.consultorio.models.profesionales.Profesional;
import com.certant.consultorio.models.profesionales.ProfesionalRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/horas")
@RequiredArgsConstructor
public class HorasController {

    private final HorariosRepository horariosRepository;
    private final ProfesionalRepository profesionalRepository;

    @Transactional
    @PostMapping
    public ResponseEntity cargarHorasProfesional(@RequestBody @Valid DataRegisterHoras dataRegisterHoras) {

        Profesional profesional = profesionalRepository.getReferenceById(dataRegisterHoras.idProfesional());
        List<Horarios> horariosProfesional = profesional.getHorarios();



                for (Horarios horariosFor : horariosProfesional) {

                    horariosFor.getInicioconsulta().withDayOfMonth(05).withMonth(11).withYear(2023);


                    if (horariosFor.getInicioconsulta().equals(dataRegisterHoras.inicioConsulta())) {

                        return ResponseEntity.badRequest().body("No se puede repetir horario");

                    }

                    }

        Horarios horario = new Horarios(dataRegisterHoras);

        profesional.addHora(horario);

        horariosRepository.save(horario);

        return ResponseEntity.ok().build();

    }

    @Transactional
    @GetMapping("/{id}")
    public ResponseEntity getHorasProfesionalById(@PathVariable Long id){

        Profesional profesional = profesionalRepository.getReferenceById(id);


        return ResponseEntity.ok(profesional.getHorarios());



    }


}
