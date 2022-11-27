create table employee
(
    join_data       date                 null,
    is_active       tinyint(1)           null,
    exit_date       date                 null,
    full_name       varchar(255)         not null,
    date_of_birth   date                 not null,
    position        varchar(255)         not null,
    employee_id     int auto_increment
        primary key,
    organization_id int                  not null,
    is_admin        tinyint(1) default 0 not null,
    email           varchar(255)         not null,
    password        varchar(255)         not null,
    constraint employee_pk
        unique (email),
    constraint organization_fk
        foreign key (organization_id) references organization (organization_id)
)
    collate = utf8mb4_unicode_ci;

create table organization
(
    organization_id      int auto_increment
        primary key,
    name                 varchar(255)         not null,
    inn                  varchar(16)          not null,
    contact_full_name    varchar(255)         not null,
    contact_phone_number varchar(16)          null,
    password             varchar(255)         null,
    accepted             tinyint(1) default 0 not null,
    constraint organization_pk
        unique (inn)
)
    collate = utf8mb4_unicode_ci;

create table register_link
(
    register_link_id int auto_increment
        primary key,
    email            varchar(255)                  not null,
    link_key         varchar(255)                  not null,
    organization_id  int                           not null,
    status           varchar(255) default 'UNUSED' not null,
    constraint register_link_organization_null_fk
        foreign key (organization_id) references organization (organization_id)
)
    collate = utf8mb4_unicode_ci;




