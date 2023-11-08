create table especialidades(

    id bigint not null auto_increment,
    especialidad varchar(100) not null unique,
    descripcion varchar(500) not null,



    primary key(id)


);