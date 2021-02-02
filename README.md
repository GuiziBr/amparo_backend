
# Api para manutenção de atividades e pacientes

Api construída no padrão Repository para manutenção de atividades e pacientes

## Tecnologias

* NodeJs 12
* Typescript
* Express
* Typeorm
* Postgresql
* Docker

## Guia de instalação

### Pré-requisitos
- NodeJs 12
- Docker

1. Faça o clone do projeto
2. Execute o comando "docker build -t amparo/postgres ." para criar a imagem base do container postgres
3. Execute o comando "docker run -d -p5438:5432 amparo/postgres" para executar o container
4. Execute o comando "npm run typeorm -- migration:run" para executar as migrations que irão criar as tabelas necessárias
5. Execute o comando "npm run dev:server" para iniciar o servidor

## Funcionalidades

### Gerenciamento de cadastro de pacientes
* Para cadastrar um novo paciente, faça uma requisição POST na rota /patients com o seguinte payload:
```
{
  "name": "[nome do paciente]",
  "document": "[cpf do paciente]",
}
```
* Para consultar um paciente, faça uma requisição GET na rota /patients/[cpf do paciente

### Gerenciamento de atividades

* Para cadastrar uma novo atividade, faça uma requisição POST na rota /activities com o seguinte payload:
```
{
  "patient": "[cpf do paciente]",
  "description": "[Desrição da atividade]",
  "schedule": "[Data da atividade no formato YYYY-MM-DD]",
  "status": "[status da atividade - open/delayed/closed]"
}
```

* Para listar as atividades, faça uma requisição GET na rota /activities
