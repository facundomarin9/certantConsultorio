package com.certant.consultorio.controller;

import com.certant.consultorio.models.especialidad.Especialidad;
import com.certant.consultorio.models.especialidad.EspecialidadRepository;
import com.certant.consultorio.models.horarios.Horarios;
import com.certant.consultorio.models.horarios.HorariosRepository;
import com.certant.consultorio.models.paciente.Paciente;
import com.certant.consultorio.models.paciente.PacienteRepository;
import com.certant.consultorio.models.profesionales.Profesional;
import com.certant.consultorio.models.profesionales.ProfesionalRepository;
import com.certant.consultorio.models.turnos.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


import java.net.URI;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/turnos")
@RequiredArgsConstructor
public class TurnosController {

    private final TurnoRepository turnoRepository;
    private final ProfesionalRepository profesionalRepository;
    private final PacienteRepository pacienteRepository;
    private final EspecialidadRepository especialidadRepository;
    private final HorariosRepository horariosRepository;


    @Transactional
    @PostMapping
    public ResponseEntity registerTurno(@RequestBody @Valid DataRegisterTurno dataRegisterTurno,
                                        UriComponentsBuilder uriComponentsBuilder){

        LocalDateTime horaActual = LocalDateTime.now();
                //.withHour(15).withMinute(30).withSecond(00);



        /*.withHour(23).withMinute(01).withSecond(00);;*/ //SETEAR LA HORA
        /*.with(TemporalAdjusters.next(DayOfWeek.SUNDAY)); //SETEAR CON UN DIA DE LA SEMANA
        System.out.println("DIA ACTUAL: " + horaActual.getDayOfWeek());*/

        LocalDateTime horaApertura = LocalDateTime.now().withHour(8).withMinute(00).withSecond(00);
        LocalDateTime horaCerrar = LocalDateTime.now().withHour(23).withMinute(00).withSecond(00);


       /* System.out.println("HORA ACTUAL " + horaActual);
        System.out.println("HORA APERTURA " + horaApertura);
        System.out.println("HORA CERRAR " + horaCerrar);*/

        if(horaActual.isAfter(horaApertura) && horaActual.isBefore(horaCerrar) && horaActual.getDayOfWeek() != DayOfWeek.SUNDAY){

            if(dataRegisterTurno.fechaTurno().isAfter(horaActual)){

                Profesional profesional = profesionalRepository.getReferenceById(dataRegisterTurno.idProfesional());

                Paciente paciente = pacienteRepository.findByDnipaciente(dataRegisterTurno.dniPaciente());

                Especialidad especialidad = especialidadRepository.getReferenceById(dataRegisterTurno.idEspecialidad());

                Horarios horario = horariosRepository.getReferenceById(dataRegisterTurno.idHoraTurno());

                List<Turno> allTurnos = turnoRepository.findAll();



                if(dataRegisterTurno.fechaTurno().getDayOfWeek() != DayOfWeek.SUNDAY) {

                    for (Turno turnosFor : allTurnos) {

                        turnosFor.getFechaturno().withHour(00).withMinute(00).withSecond(00);

                        if (turnosFor.getHorario() == horario && turnosFor.getFechaturno().equals(dataRegisterTurno.fechaTurno())) {

                            System.out.println("ESTE TURNO YA ESTA ASIGNADO");
                            return ResponseEntity.badRequest().body("Horario no disponible");

                        }


                    }

                    Turno turno = new Turno(dataRegisterTurno, horario);

                    especialidad.addTurno(turno);
                    paciente.addTurno(turno);
                    horario.setTurno(turno);
                    profesional.addTurno(turno);


                    turnoRepository.save(turno);

                    URI url = uriComponentsBuilder.path("/turnos/{id}").buildAndExpand(turno.getId()).toUri();

                    return ResponseEntity.created(url).build();

                }else{
                    return ResponseEntity.badRequest().body("La clinica no atiende los Domingos");
                }

            }else{

                return ResponseEntity.badRequest().body("Dia elegido no valido");

            }






        }

        return ResponseEntity.badRequest().body("Por favor, cargar turnos dentro del rango horario de: 08:00 a 23:00");
    }

    @Transactional
    @GetMapping
    public ResponseEntity<Page> listarTurnos(Pageable paginacion){



        return ResponseEntity.ok(turnoRepository.findByConfirmadoTrue(paginacion).map(DataListTurnos::new));
    }

    @Transactional
    @PutMapping
    public ResponseEntity updateTurno(@RequestBody @Valid DataUpdateTurno dataUpdateTurno){

        Turno turno = turnoRepository.getReferenceById(dataUpdateTurno.id());



        LocalDateTime horaFechaTurno =  LocalDateTime.now().withDayOfMonth(turno.getFechaturno().getDayOfMonth())
                .withMonth(turno.getFechaturno().getMonthValue())
                .withYear(turno.getFechaturno().getYear())
                .withHour(turno.getHorario().getInicioconsulta().getHour())
                .withMinute(turno.getHorario().getInicioconsulta().getMinute())
                .withSecond(turno.getHorario().getInicioconsulta().getSecond());
        LocalDateTime horaLimite = horaFechaTurno.minusHours(1);
        LocalDateTime horaActual = LocalDateTime.now();

        System.out.println(horaFechaTurno);

       if (horaActual.isBefore(horaLimite)) {
            Profesional profesional = profesionalRepository.getReferenceById(dataUpdateTurno.idProfesional());
            Especialidad especialidad = especialidadRepository.getReferenceById(dataUpdateTurno.idEspecialidad());
            Horarios horario = horariosRepository.getReferenceById(dataUpdateTurno.idHoraTurno());
            turno.update(dataUpdateTurno, profesional,especialidad, horario);

            return ResponseEntity.ok().build();
        }


        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se puede actualizar. Hora limite superada");





    }
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity cancelarTurno(@PathVariable Long id){

        Turno turno = turnoRepository.getReferenceById(id);

        LocalDateTime horaFechaTurno =  LocalDateTime.now().withDayOfMonth(turno.getFechaturno().getDayOfMonth())
                .withMonth(turno.getFechaturno().getMonthValue())
                .withYear(turno.getFechaturno().getYear())
                .withHour(turno.getHorario().getInicioconsulta().getHour())
                .withMinute(turno.getHorario().getInicioconsulta().getMinute())
                .withSecond(turno.getHorario().getInicioconsulta().getSecond());
        LocalDateTime horaLimite = horaFechaTurno.minusHours(1);
        LocalDateTime horaActual = LocalDateTime.now();

        if (horaActual.isBefore(horaLimite)) {

            turno.cancelarTurno();

            return ResponseEntity.noContent().build();
        }


        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se puede cancelar el turno. Hora limite superada");









    }


    @Transactional
    @PostMapping("/turnosPorPaciente")
    public ResponseEntity listarTurnosPorPaciente (@RequestBody DataListTurnosByPaciente dataListTurnosByPaciente){



        Paciente paciente = pacienteRepository.findByDnipaciente(dataListTurnosByPaciente.dniPaciente());

        return ResponseEntity.ok(turnoRepository.findByPacienteId(paciente.getId()).stream().map(DataListTurnos::new));

    }


    @Transactional
    @PostMapping("/turnosPorEspecialidad")
    public ResponseEntity listarTurnosPorEspecialidad (@RequestBody DataListTurnosByEspecialidad dataListTurnosByEspecialidad){

        Especialidad especialidad = especialidadRepository.getReferenceById(dataListTurnosByEspecialidad.idEspecialidad());

        return ResponseEntity.ok(turnoRepository.findByEspecialidadId(especialidad.getId()).stream().map(DataListTurnos::new));

    }

    @Transactional
    @PostMapping("/turnosPorProfesional")
    public ResponseEntity listarTurnosPorProfesional(@RequestBody DataListTurnosByProfesional dataListTurnosByProfesional){

        Profesional profesional = profesionalRepository.getReferenceById(dataListTurnosByProfesional.idProfesional());
        return ResponseEntity.ok(turnoRepository.findByProfesionalId(profesional.getId()).stream().map(DataListTurnos::new));

    }

    @Transactional
    @GetMapping("/{id}")
    public ResponseEntity listarTurnosById(@PathVariable Long id){

        Turno turno = turnoRepository.getReferenceById(id);

        return ResponseEntity.ok(turno.getHorario());



    }


}
