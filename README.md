# [TO-DO-LIST - Gerenciador de tarefas]

> API para gerenciamento e delegação de tarefas, com controle de acesso baseado em administradores e usuários.


## Sobre o Projeto

Este projeto consiste um uma API para gerenciar o fluxo de trabalho e acompanhamento das atividades, garantindo que apenas usuários autorizados alterem o estado das tarefas. 

## Regras de Negócio 

Administrador(Admin): é o único que pode criar, excluir e finalizar tarefas e é responsável por delegá-las aos usuários.
Usuário(User):Visualiza as tarefas que foram delegadas a ele e ao concluir, muda o status para pendente, esperando a aprovação final do Admin.

# Fluxo de Tarefa

A tarefa segue o seguinte fluxo dentro da API:

1. Criada (Status: OPEN) -> Criada pelo Admin e atribuida a um usuário.
2. PENDENTE (Status: PENDING) -> Concluída pelo usuário e aguardando finalizaçaõ do Admin.
3. Finalizada (Status: FINALIZED) -> Finalizada pelo Admin.

# Tecnologias
- Node.js
- Typescript
- Express
- PostgresSQL
- TypeORM