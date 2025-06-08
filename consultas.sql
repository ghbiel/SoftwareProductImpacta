CREATE TABLE tbAnimais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tp_animal varchar(10) NOT NULL,
    nome varchar(100) NOT NULL,
    raca varchar (30) NOT NULL,
    data_nascimento DATE,
    nome_tutor varchar(30) NOT NULL,
    telefone_tutor char(11),
    rua varchar(100),
    numero int,
    bairro varchar(50),
    cidade varchar(30),
    cep char(8),
    complemento varchar(30)
);

CREATE TABLE tbUsuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE tbConsultas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_animal VARCHAR(30) NOT NULL,
    raca_animal varchar(30) NOT NULL,
    tipo_animal varchar(10) NOT NULL,
    tipo_consulta varchar(20) NOT NULL,
<<<<<<< HEAD
    nome_tutor VARCHAR(30) NOT NULL,
=======
    cpf_tutor char(11) NOT NULL,
    nome_tutor VARCHAR(50) NOT NULL,
>>>>>>> 11cc247 (segunda ac)
    email VARCHAR(100) NOT NULL,
    telefone char(11) NOT NULL,
    data_consulta DATE NOT NULL,
    hora_consulta time NOT NULL,
    veterinario varchar(30) NOT NULL
<<<<<<< HEAD
=======
);

CREATE TABLE tbTutores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_tutor VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone char(11) NOT NULL,
    cpf_tutor char(11) NOT NULL
>>>>>>> 11cc247 (segunda ac)
);