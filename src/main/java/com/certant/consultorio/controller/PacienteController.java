package com.certant.consultorio.controller;


import com.certant.consultorio.models.paciente.DataListPaciente;
import com.certant.consultorio.models.paciente.DataRegisterPaciente;
import com.certant.consultorio.models.paciente.Paciente;
import com.certant.consultorio.models.paciente.PacienteRepository;
import com.certant.consultorio.models.profesionales.DataListProfesionales;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/paciente")
@RequiredArgsConstructor
public class PacienteController {

    private final PacienteRepository pacienteRepository;

    @Transactional
    @PostMapping
    public ResponseEntity registerPaciente(@RequestBody @Valid DataRegisterPaciente dataRegisterPaciente,
                                           UriComponentsBuilder uriComponentsBuilder){

        Paciente paciente = new Paciente(dataRegisterPaciente);

        paciente = pacienteRepository.save(paciente);

        URI url = uriComponentsBuilder.path("/paciente/{id}").buildAndExpand(paciente.getId()).toUri();
        return ResponseEntity.created(url).build();


    }
    @Transactional
    @GetMapping
    public ResponseEntity<Page> pacienteList(Pageable paginacion){

        return ResponseEntity.ok(pacienteRepository.findAll(paginacion).map(DataListPaciente::new));

    }



}
