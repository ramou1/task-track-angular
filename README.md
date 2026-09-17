# TaskTrack

Sistema web em [Angular](https://angular.dev/) 18 para organizar quadros, usuários e tarefas da equipe. A interface usa [Nebular](https://akveo.github.io/nebular/) 14, com tema claro e escuro, e os dados são mockados — o CRUD funciona sem backend.

![Tela de login do TaskTrack](https://i.imgur.com/I4nJGWK.png)

![Dashboard com lista de tarefas](https://i.imgur.com/7qEPBO5.png)

![Visão em colunas](https://i.imgur.com/RDoREnV.png)

![Modal de nova tarefa](https://i.imgur.com/M7nFbOZ.png)

![Configurações do perfil](https://i.imgur.com/8KMHcxU.png)

![Página de usuários](https://i.imgur.com/ZRfypJN.png)

## Funcionalidades

- Login com contas de demonstração, sessão persistida no navegador e planos fictícios na página inicial
- Menu lateral com quadros/empresas mockados, busca e criação de quadro nesta sessão
- Dashboard do quadro com resumo (usuários, tarefas, pendentes, em andamento, concluídas e atrasadas)
- Lista estilo Monday e visão em colunas, com busca, filtro por responsável/status e ordenação por vencimento
- Clique na tarefa abre uma modal com detalhes, descrição rica, comentários mockados, edição e exclusão
- Cadastro de usuários com o mesmo fluxo de modal
- Perfil com dados pessoais, local de trabalho, idioma/região e troca de tema
- Notificações e logout no menu do avatar

## Contas mockadas

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Administrador | `admin@tasktrack.com` | `admin123` |
| Usuário | `alice@gmail.com` | `user123` |

Na tela de login, os botões de conta preenchem o formulário automaticamente.

## Stack

- Angular 18 (standalone components)
- Nebular 14 + Eva Icons
- RxJS e Angular Signals
- date-fns (datepicker)
- ngx-pagination

Os serviços `AuthService`, `MockBoardService`, `MockTaskService` e `MockUserService` simulam a persistência em memória. Recarregar a página restaura os dados iniciais de quadros, tarefas e usuários; o login permanece até você sair.

## Como executar

Pré-requisitos: [Node.js](https://nodejs.org/) 18+ e npm.

```bash
npm install
npm start
```

Abra [http://localhost:4200/](http://localhost:4200/). A aplicação recarrega ao alterar os arquivos de origem.

Outros comandos:

```bash
npm run build   # build de produção
npm test        # testes unitários (Karma)
```

## Rotas

| Rota | Acesso |
| --- | --- |
| `/login` | Pública (redireciona para o quadro atual se já estiver autenticado) |
| `/quadros/:boardId` | Autenticado — painel e lista de tarefas do quadro |
| `/users` | Autenticado — gestão de usuários |
| `/profile` | Autenticado — configurações do perfil |
| `/dashboard` e `/tasks` | Redirecionam para `/quadros/aurora` |

## Observações

Este projeto foi gerado com a [Angular CLI](https://github.com/angular/angular-cli) 18.1.4. Não há API real: alterações de tarefas, usuários, comentários e novos quadros valem apenas enquanto a aplicação estiver em execução.
