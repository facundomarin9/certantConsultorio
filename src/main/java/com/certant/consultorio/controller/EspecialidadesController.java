package com.certant.consultorio.controller;

import com.certant.consultorio.models.especialidad.*;
import com.certant.consultorio.models.profesionales.Profesional;
import com.certant.consultorio.models.profesionales.ProfesionalRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/especialidades")
@RequiredArgsConstructor
public class EspecialidadesController {

    private final EspecialidadRepository especialidadRepository;
    private final ProfesionalRepository profesionalRepository;


    //Registro de especialidad
    @Transactional
    @PostMapping
    public ResponseEntity registerEspecialidad(@RequestBody @Valid DataRegisterEspecialidad dataRegisterEspecialidad,
                                               UriComponentsBuilder uriComponentsBuilder){

        Especialidad especialidad = new Especialidad(dataRegisterEspecialidad);

        especialidad = especialidadRepository.save(especialidad);

        URI url = uriComponentsBuilder.path("/especialidades/{id}").buildAndExpand(especialidad.getId()).toUri();
        return ResponseEntity.created(url).build();

    }

    //Listado de especialidades activas

    @Transactional
    @GetMapping()
    public ResponseEntity<Page<DataListEspecialidades>> especialidadesList(Pageable paginacion){


        return ResponseEntity.ok(especialidadRepository.findByActivoTrue(paginacion).map(DataListEspecialidades::new));

    }


    //Modificar una especialidad
    @Transactional
    @PutMapping
    public ResponseEntity<DataResponseEspecialidad> updateEspecialidad(@RequestBody @Valid DataUpdateEspecialidad dataUpdateEspecialidad){

        Especialidad especialidad = especialidadRepository.getReferenceById(dataUpdateEspecialidad.id());
        especialidad.update(dataUpdateEspecialidad);

        return ResponseEntity.ok(new DataResponseEspecialidad(especialidad.getId(), especialidad.getEspecialidad(), especialidad.getDescripcion()));

    }

    //Borrado logico de una especialidad
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity deleteEspecialidad(@PathVariable Long id){

        Especialidad especialidad = especialidadRepository.getReferenceById(id);
        especialidad.deleteEspecialidad();

        return ResponseEntity.noContent().build();

    }

    @Transactional
    @GetMapping("/{id}")
    public List<Especialidad> listEspecialidadesByIdProfesional(@PathVariable Long id){

        Profesional profesional = profesionalRepository.getReferenceById(id);

        List<Especialidad> especialidadList = especialidadRepository.findAll();

        List<Especialidad> enviarEspecialidades = new ArrayList<>();

        for(Especialidad especialidad : especialidadList){

            for(Profesional prof : especialidad.getProfesionales()){

                if(profesional.getId().equals(prof.getId())){
                    enviarEspecialidades.add(especialidad);
                    System.out.println(especialidad.getEspecialidad());
                }

            }

        }


        return enviarEspecialidades;
    }

}
