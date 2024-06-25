create table produtos (
	id int not null auto_increment,
	name varchar(20) not null unique,
    description varchar(200),
    soft_delete boolean not null default false;
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp on update current_timestamp,
    primary key (id)
    );


create table estoque (
	id int not null auto_increment,
    product_id int not null,
    price decimal(10, 2),
    quantity int not null,
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp on update current_timestamp,
    primary key(id),
    foreign key(product_id) references produtos(id)
    );
    
create table clientes(
	id int not null auto_increment,
    username varchar(20) not null,
    email varchar(100) not null,
    password varchar(200) not null,
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp on update current_timestamp,
    primary key(id)
);

create table vendas(
	id int not null auto_increment,
    client_id int not null,
	createdAt datetime default current_timestamp,
    primary key(id),
    foreign key (client_id) references clientes(id)

);

create table pedidos(
	id int not null auto_increment,
    client_id int not null,
    venda_id int not null,
    quantity int not null,
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp on update current_timestamp,
    status_order enum("pending", "in_process", "send", "delivered"),
    primary key(id),
    foreign key (venda_id) references vendas(id),
    foreign key (product_id) references produtos(id)
);

