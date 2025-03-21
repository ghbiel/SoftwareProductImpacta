from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import DataError
from flask_bcrypt import Bcrypt
import random
import re

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost/clinicaVivaPet'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app) 
app.secret_key = '98046618'

vet_names = [
    "Ana Costa",
    "João Silva",
    "Mariana Oliveira",
    "Carlos Almeida",
    "Beatriz Santos",
    "Fernando Pereira"
]

class Animal(db.Model):
    __tablename__ = 'tbAnimais' 
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    raca = db.Column(db.String(30), nullable=False)
    data_nascimento = db.Column(db.Date, nullable=False)
    nome_tutor = db.Column(db.String(30), nullable=False)
    telefone_tutor = db.Column(db.String(11)) 
    rua = db.Column(db.String(100))
    numero = db.Column(db.Integer)
    bairro = db.Column(db.String(50))
    cidade = db.Column(db.String(30))
    cep = db.Column(db.String(8))
    complemento = db.Column(db.String(30))

class Usuario(db.Model):
    __tablename__ = 'tbUsuarios'  # Nome da tabela no banco de dados

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # ID do usuário
    nome = db.Column(db.String(30), nullable=False)  # Nome do usuário
    email = db.Column(db.String(100), nullable=False, unique=True)  # Email do usuário
    senha = db.Column(db.String(255), nullable=False)  # Senha do usuário

class Consulta(db.Model):
    __tablename__ = 'tbConsultas'  # Nome da tabela no banco de dados

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # ID da consulta
    nome_animal = db.Column(db.String(30), nullable=False)  # Nome do animal
    raca_animal = db.Column(db.String(30), nullable=False)  # Raça do animal
    tipo_animal = db.Column(db.String(10), nullable=False)  # Tipo do animal (Cachorro, Gato, etc.)
    tipo_consulta = db.Column(db.String(20), nullable=False)  # Tipo consulta
    nome_tutor = db.Column(db.String(30), nullable=False)  # Nome do tutor
    email = db.Column(db.String(100), nullable=False)  # Email do tutor
    telefone = db.Column(db.String(11), nullable=False)  # Telefone do tutor
    data_consulta = db.Column(db.Date, nullable=False)  # Data da consulta
    hora_consulta = db.Column(db.Time, nullable=False)  # Hora da consulta
    veterinario = db.Column(db.String(30), nullable=False) 

@app.route('/')
def redirecionar():
    if 'usuario_id' in session:
        return redirect(url_for('home'))
    else:
        return render_template('login.html')

@app.route('/sign-in')
def index():
    if 'usuario_id' in session:
        return redirect(url_for('home'))
    else:
        return render_template('login.html')

@app.route('/criar-conta')
def criar_conta():
    return render_template("Criar_conta.html")

@app.route('/cadastrar_novo_usuario', methods=['POST'])
def cadastrar_novo_usuario():
    nome = request.form.get('nomeUsuario')
    emailCadastro = request.form.get('criarEmail')
    senhaCadastro = request.form.get('criarSenha')
    senha_hasheada = bcrypt.generate_password_hash(senhaCadastro).decode('utf-8')
    novo_usuario = Usuario(nome=nome, email=emailCadastro, senha=senha_hasheada)
    
    usuario_existente = Usuario.query.filter_by(email=emailCadastro).first()
    if usuario_existente:
        flash('Este usuário já existe. Tente novamente!', 'danger')
        return redirect(url_for('criar_conta'))        
    
    try:
        db.session.add(novo_usuario)
        db.session.commit()
        flash('Conta criada com sucesso!', 'success')
        session.pop('usuario_id', None)
        return redirect(url_for('index'))
    except DataError:
        db.session.rollback()
        return "Erro: Dados inválidos ou excedendo o limite de tamanho.", 400

@app.route('/logar', methods=['POST'])
def logar():
    email = request.form.get('loginEmail')
    senha = request.form.get('loginSenha')
    
    usuario = Usuario.query.filter_by(email=email).first()
    
    if usuario and bcrypt.check_password_hash(usuario.senha, senha):
        session['usuario_id'] = usuario.id 
        session.permanent = False
        return redirect(url_for('home'))
    else:
        flash('E-mail e/ou senha incorretos. Tente novamente.', 'danger')
        return redirect(url_for('index'))

@app.route('/home')
def home():
    if 'usuario_id' not in session:
        return redirect(url_for('index')) 
    
    usuario_id = session['usuario_id']
    usuario = Usuario.query.get(usuario_id)
    if usuario:
        return render_template("Home.html", user_name=usuario.nome.split()[0])
    
@app.route('/marcar-agendamento')
def marcar_agendamento():
    if 'usuario_id' not in session:
        return redirect(url_for('index')) 
    
    usuario_id = session['usuario_id']
    usuario = Usuario.query.get(usuario_id)
    if usuario:
        return render_template("marcar-agendamento.html", user_name=usuario.nome.split()[0])
    
@app.route('/agendar', methods=['POST'])
def agendar():
    dados = request.json
    
    nome_animal = dados.get('nome_animal', '').strip()
    especie_animal = dados.get('especie_animal', '').strip()
    raca_animal = dados.get('raca_animal', '').strip()
    tipo_consulta = dados.get('tipo_consulta', '').strip()
    nome_tutor = dados.get('nome_tutor', '').strip()
    email_tutor = dados.get('email', '').strip()
    telefone_tutor = dados.get('telefone')
    data = dados.get('data_consulta', '').strip()
    hora = dados.get('hora_consulta', '').strip() 

    telefone_tutor = re.sub(r'\D', '', telefone_tutor) if telefone_tutor else ''
        
    veterinarios_ocupados = db.session.query(Consulta.veterinario).filter(
        Consulta.data_consulta == data,
        Consulta.hora_consulta == hora
    ).all()
    
    ocupados_set = {vet[0] for vet in veterinarios_ocupados}
    
    veterinario_disponivel = next((vet for vet in vet_names if vet not in ocupados_set), None)
    
    veterinario = veterinario_disponivel
    
    nova_consulta = Consulta(
    nome_animal=nome_animal,
    raca_animal=raca_animal,
    tipo_animal=especie_animal, 
    tipo_consulta=tipo_consulta,
    nome_tutor=nome_tutor,
    email=email_tutor,
    telefone=telefone_tutor,
    data_consulta=data,
    hora_consulta=hora,
    veterinario=veterinario
    )
    
    try:
        db.session.add(nova_consulta)
        db.session.commit()
        return jsonify({
            "success": True,
            #"redirect_url": url_for('home')
        }),200
    except DataError:
        db.session.rollback()
        return "Erro: Dados inválidos ou excedendo o limite de tamanho.", 400
    

@app.route('/verificar_horario', methods=['POST'])
def verificar():
    dados = request.get_json()
    data = dados.get("data")
    hora = dados.get("hora")
    
    veterinarios_ocupados = db.session.query(Consulta.veterinario).filter(
        Consulta.data_consulta == data,
        Consulta.hora_consulta == hora
    ).all()
    
    ocupados_set = {vet[0] for vet in veterinarios_ocupados}
    veterinario_disponivel = next((vet for vet in vet_names if vet not in ocupados_set), None)
    
    if not veterinario_disponivel:
        return jsonify({"disponivel": False})
    else:
        return jsonify({"disponivel": True})

@app.route('/listar-agendamentos')
def listar_agendamentos():
    if 'usuario_id' not in session:
        return redirect(url_for('index'))
    
    consultas = Consulta.query.all()
    
    return render_template("listar-agendamentos.html", consultas=consultas)

@app.route('/excluir-consulta', methods=['DELETE'])
def excluir_consulta():
    dados = request.get_json()
    id = dados.get("id")
    
    consulta = Consulta.query.get(id)

    if consulta:
        db.session.delete(consulta)
        db.session.commit() 
        return jsonify({"success": True}), 200
    else:
        return jsonify({"success": False}), 404
    
@app.route('/editar-consulta', methods=['PUT'])
def editar_consulta():
    dados = request.get_json()
    id = dados.get("id")
    
    consulta = db.session.query(Consulta).filter(Consulta.id == id).first()
    print(dados.get('telefone', '').strip() + " <===ERRO")
    
    if consulta:
            consulta.nome_animal = dados['nome_animal']
            consulta.tipo_animal = dados['especie_animal']
            consulta.raca_animal = dados['raca_animal']
            consulta.tipo_consulta = dados['tipo_consulta']
            consulta.nome_tutor = dados['nome_tutor']
            consulta.email = dados['email']
            consulta.telefone = dados['telefone']
            consulta.data_consulta = dados['data_consulta']  # Convertendo para tipo Date
            consulta.hora_consulta = dados['hora_consulta']
    
    try:
            db.session.commit()
            return jsonify({
            "success": True,
            #"redirect_url": url_for('home')
        }),200
    except DataError:
        db.session.rollback()
        return "Erro: Dados inválidos ou excedendo o limite de tamanho.", 400

            

@app.route('/logout')
def logout():
    session.pop('usuario_id', None)  # Remove a chave 'usuario_id' da sessão
    flash('Você foi desconectado com sucesso!', 'success')
    return redirect(url_for('index'))  # Redireciona para a página de login
    

if __name__ == '__main__':
    app.run(debug=True)