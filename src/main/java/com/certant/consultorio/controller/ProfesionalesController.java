package com.certant.consultorio.controller;

import com.certant.consultorio.models.especialidad.*;
import com.certant.consultorio.models.horarios.HorariosRepository;
import com.certant.consultorio.models.profesionales.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/profesionales")
@RequiredArgsConstructor
public class ProfesionalesController {


    private final ProfesionalRepository profesionalRepository;
    private final EspecialidadRepository especialidadRepository;
    private final HorariosRepository horariosRepository;

    //Registro de profesional
    @Transactional
    @PostMapping
    public ResponseEntity registerProfesional(@RequestBody @Valid DataRegisterProfesional dataRegisterProfesional,
                                               UriComponentsBuilder uriComponentsBuilder){

        Profesional profesional = new Profesional(dataRegisterProfesional);

        profesionalRepository.save(profesional);


        URI url = uriComponentsBuilder.path("/profesionales/{id}").buildAndExpand(profesional.getId()).toUri();
        return ResponseEntity.created(url).build();
    }

    @Transactional
    @GetMapping()
    public ResponseEntity profesionalList(){




        return ResponseEntity.ok().body(profesionalRepository.findAll().stream().map(DataListProfesionales::new));

    }

    @Transactional
    @GetMapping("/{id}")
    public ResponseEntity  getProfesionalById(@PathVariable Long id){

        return ResponseEntity.ok(profesionalRepository.findById(id).map(DataListProfesionales::new));

    }



    @Transactional
    @PutMapping
    public ResponseEntity<DataResponseProfesional> updateProfesional(@RequestBody @Valid DataUpdateProfesional dataUpdateProfesional){

        Profesional profesional = profesionalRepository.getReferenceById(dataUpdateProfesional.id());

        profesional.update(dataUpdateProfesional);

        return ResponseEntity.ok().build();

    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity deleteProfesional(@PathVariable Long id){


        Profesional profesional = profesionalRepository.getReferenceById(id);
        profesional.deleteProfesional();

        return ResponseEntity.noContent().build();

    }

    @Transactional
    @PostMapping("/agregarEspecialidadProfecional")
    public ResponseEntity agregarEspecialidadProfecional(@RequestBody DataRegisterProfesionalEspecialidad dataRegisterProfesionalEspecialidad){


        Profesional profesional = profesionalRepository.getReferenceById(dataRegisterProfesionalEspecialidad.idProfesional());
        Especialidad especialidad = especialidadRepository.getReferenceById(dataRegisterProfesionalEspecialidad.idEspecialidad());

        profesional.getEspecialidad().add(especialidad);

        profesionalRepository.save(profesional);

        return ResponseEntity.ok().build();
    }


}
