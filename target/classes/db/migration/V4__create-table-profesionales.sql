create table profesionales(

    id bigint not null auto_increment,
    nombre varchar(100) not null,
    apellido varchar(100) not null,
    consultorio varchar(10) not null,
    matricula varchar(100) not null,
    activo tinyint,
    fechabaja DATE,



    primary key(id)


);