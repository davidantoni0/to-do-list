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
2. PENDENTE (Status: PENDING) -> Concluída pelo usuário e aguardando finalização do Admin.
3. Finalizada (Status: FINALIZED) -> Finalizada pelo Admin.

# Tecnologias
- Node.js
- Typescript
- Express
- PostgresSQL
- TypeORM

# Intruções de instalação e uso
OBS: tenha certeza de que todas as ferramentas estejam instaladas antes de executar os próximos passos.

1- Clone o repositório e use o comando 'npm i' no prompt de comando para instalar todas as dependências necessárias.

2- copie todos os elementos do arquivo .env.example e crie um novo arquivo .env na raiz do projeto. para a criação da JWT_PASS, o comando 'node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"' pode ser executado no prompt de comando para a criação da secret.

3- para exeutar o projeto, basta executar o comando 'npm run dev'.

4- As rotas para testes de requisição estão na pasta 'src/tests'. para a execução da maioria dos testes, será necessário a criação de usuarios/administradores, além da geração de tokens que podem ser geradas pela rota de login. ao gerar o token, lembre -se de colar o mesmo no elemento @authToken que se encontra nas pastas de teste.

5- O sistema atualmente é fortemente focado nas permissões de administrador, portanto, certos elementos estarão bloqueados à usuarios. ao executar o comando post para criação de usuarios, deve-se alterar o cargo 'role' de 'usuario' para 'admin' diretamente no banco de dados. Essa medida foi criada afim de evitar a criação de admins diretamente pela rota de criação. novos administradores podem ser criados caso o token da requisição for de outro administrador.