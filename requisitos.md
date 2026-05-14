# To-do list(lista de afazeres)

## Descrição

 O objetivo do projeto é criar uma lista de afazeres gerais. O administador terá que gerar as suas próprias tarefas, que podem ser delegadas a diferentes usuários.


## Requisitos funcionais(RF)

- RF01: O sistema deve permitir o cadastro/exclusão de usuarios. 
- RF02: O sistema deve permitir o cadastro/exclusão de tarefas. 
- RF03: O sistema deve apresentar apenas a lista de tarefas vinculadas aos usuários/administradores

## Requisitos não funcionais(RNF)
- RNF01: O sistema utilizará o banco de dados Postgres.
- RNF02: O sistema utilizará a linguagem de programação Typescript
- RNF03: O sistema utilizará a ORM TypeORM

## Regras de negócio(RN)
- RN01: O sistema deverá separar administradores de usuarios.
- RN02: O cadastro/exclusão tarefas só deve ser permitida à administradores. 
- RN03: Apenas administradores poderão delegar as tarefas aos outros usuários.