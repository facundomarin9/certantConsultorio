create table turno(

    id bigint not null auto_increment,
    horafechaturno DATETIME not null,
    confirmado tinyint,
    paciente_id bigint not null,
    profesional_id bigint not null,


    primary key(id)


);