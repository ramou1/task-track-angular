import { BoardModel } from '../models/board-model';
import { TaskComment } from '../models/comment-model';
import { TaskModel } from '../models/task-model';
import { UserModel } from '../models/user-model';
import { TASK_STATUS } from './task-status';

function localDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

function localDateTime(year: number, month: number, day: number, hour: number, minute: number): Date {
  return new Date(year, month - 1, day, hour, minute);
}

const IMG = {
  landing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  database: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80',
  docs: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  performance: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  code: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
  security: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80',
  feedback: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
  ui: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80',
  servers: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
  marketing: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=900&q=80',
};

export const MOCK_USERS: UserModel[] = [
  {
    id: '100',
    name: 'Ramon Oliveira',
    email: 'admin@tasktrack.com',
    password: 'admin123',
    role: 'admin',
    gender: 'male',
    workplace: 'Agência Aurora',
    jobTitle: 'Diretor de projetos',
    city: 'Belo Horizonte, MG',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    weekStart: 'monday',
    emailNotifications: true,
    registerDate: localDate(2026, 1, 10),
  },
  {
    id: '101',
    name: 'Ana Souza',
    email: 'alice@gmail.com',
    password: 'user123',
    role: 'user',
    gender: 'female',
    workplace: 'Agência Aurora',
    jobTitle: 'Designer de produto',
    city: 'São Paulo, SP',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    weekStart: 'monday',
    emailNotifications: true,
    registerDate: localDate(2026, 3, 1),
  },
  {
    id: '102',
    name: 'Bruno Mendes',
    email: 'bruno.mendes@example.com',
    password: 'admin123',
    role: 'admin',
    gender: 'male',
    workplace: 'Agência Aurora',
    jobTitle: 'Líder de infraestrutura',
    city: 'Campinas, SP',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    weekStart: 'monday',
    emailNotifications: true,
    registerDate: localDate(2026, 3, 2),
  },
  {
    id: '103',
    name: 'Carla Ferreira',
    email: 'carla.ferreira@example.com',
    password: 'user123',
    role: 'admin',
    gender: 'female',
    workplace: 'Estúdio Lúmen',
    jobTitle: 'Documentação técnica',
    city: 'Curitiba, PR',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    weekStart: 'monday',
    emailNotifications: false,
    registerDate: localDate(2026, 2, 12),
  },
  {
    id: '104',
    name: 'Eduarda Lima',
    email: 'eduarda.lima@example.com',
    password: 'user123',
    role: 'user',
    gender: 'female',
    workplace: 'Agência Aurora',
    jobTitle: 'Analista de qualidade',
    city: 'Recife, PE',
    language: 'pt-BR',
    timezone: 'America/Recife',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    weekStart: 'monday',
    emailNotifications: true,
    registerDate: localDate(2026, 4, 3),
  },
  {
    id: '105',
    name: 'Gabriela Nunes',
    email: 'gabriela.nunes@gmail.com',
    password: 'user123',
    role: 'user',
    gender: 'female',
    workplace: 'Oficina Criativa',
    jobTitle: 'Especialista de marketing',
    city: 'Rio de Janeiro, RJ',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    weekStart: 'monday',
    emailNotifications: true,
    registerDate: localDate(2026, 4, 1),
  },
  {
    id: '106',
    name: 'Henrique Costa',
    email: 'henrique.costa@example.com',
    password: 'user123',
    role: 'user',
    gender: 'male',
    workplace: 'Agência Aurora',
    jobTitle: 'Analista de segurança',
    city: 'Brasília, DF',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    weekStart: 'monday',
    emailNotifications: true,
    registerDate: localDate(2026, 3, 23),
  },
];

export const MOCK_BOARDS: BoardModel[] = [
  {
    id: 'aurora',
    name: 'Agência Aurora',
    company: 'Agência Aurora',
    description: 'Projetos de produto, campanha e operação do time principal.',
    color: '#323259',
    icon: 'briefcase-outline',
  },
  {
    id: 'lumen',
    name: 'Estúdio Lúmen',
    company: 'Estúdio Lúmen',
    description: 'Identidade visual, documentação e experiência do produto.',
    color: '#9d50dd',
    icon: 'color-palette-outline',
  },
  {
    id: 'oficina',
    name: 'Oficina Criativa',
    company: 'Oficina Criativa',
    description: 'Conteúdo, pesquisa com usuários e lançamentos de mídia.',
    color: '#fdab3d',
    icon: 'bulb-outline',
  },
  {
    id: 'horizonte',
    name: 'Studio Horizonte',
    company: 'Studio Horizonte',
    description: 'Performance, qualidade e segurança das entregas digitais.',
    color: '#579bfc',
    icon: 'globe-outline',
  },
  {
    id: 'palmeira',
    name: 'Casa Palmeira',
    company: 'Casa Palmeira',
    description: 'Infraestrutura, backups e rotina dos servidores.',
    color: '#00c875',
    icon: 'home-outline',
  },
];

export const MOCK_TASKS: TaskModel[] = [
  {
    id: '1',
    title: 'Criar landing page',
    description: `
      <p>Design and implement the new product landing page for the <strong>Q4 launch</strong>.</p>
      <p>The page should explain the value proposition in the first viewport, then move into social proof, pricing and a clear call to action.</p>
      <ul>
        <li>Hero with product video and a single primary button</li>
        <li>Mobile-first layout, 3 breakpoints, Core Web Vitals in the green</li>
        <li>Copy in English and Portuguese, ready for A/B testing</li>
      </ul>
      <p><em>Share a clickable prototype before development starts.</em></p>
      <p><img src="${IMG.landing}" alt="Landing page reference"></p>
    `,
    expirationDate: localDate(2026, 9, 18),
    registerDate: localDate(2026, 8, 20),
    progress: 50,
    status: TASK_STATUS.IN_PROGRESS,
    responsibleId: '101',
    responsible: MOCK_USERS[1],
    boardId: 'aurora',
  },
  {
    id: '2',
    title: 'Backup do banco de dados',
    description: `
      <p>Run a <strong>full backup</strong> of the production database and store a copy in the off-site vault.</p>
      <p>Confirm restore time, encryption and the retention window with the infrastructure team before closing the task.</p>
      <ul>
        <li>Logical dump plus snapshot of the replica</li>
        <li>Test restore on the staging cluster</li>
        <li>Document the runbook in the ops wiki</li>
      </ul>
      <p><img src="${IMG.database}" alt="Database backup"></p>
    `,
    expirationDate: localDate(2026, 9, 5),
    registerDate: localDate(2026, 8, 28),
    progress: 100,
    status: TASK_STATUS.DONE,
    responsibleId: '102',
    responsible: MOCK_USERS[2],
    boardId: 'palmeira',
  },
  {
    id: '3',
    title: 'Atualizar documentação da API',
    description: `
      <p>Update the public API documentation with the latest endpoints, auth headers and error contracts.</p>
      <p>Include <strong>request/response examples</strong> for create, update and webhook payloads. Call out breaking changes from the last release in a short migration note.</p>
      <ul>
        <li>OpenAPI 3.1 as the source of truth</li>
        <li>Postman collection exported from the same spec</li>
        <li>Changelog entry for partners</li>
      </ul>
      <p><img src="${IMG.docs}" alt="API documentation"></p>
    `,
    expirationDate: localDate(2026, 9, 22),
    registerDate: localDate(2026, 9, 1),
    progress: 25,
    status: TASK_STATUS.PENDING,
    responsibleId: '103',
    responsible: MOCK_USERS[3],
    boardId: 'lumen',
  },
  {
    id: '4',
    title: 'Testes de performance',
    description: `
      <p>Run performance tests on the new application release and compare them with the previous baseline.</p>
      <p>Focus on the checkout flow and the dashboard under <strong>peak traffic</strong>. Capture p95 latency, error rate and CPU on the API nodes.</p>
      <ul>
        <li>k6 scenarios for 200, 500 and 1.000 concurrent users</li>
        <li>Attach flame graphs for the slowest endpoints</li>
        <li>Recommend caching or query changes if we miss the SLO</li>
      </ul>
      <p><img src="${IMG.performance}" alt="Performance charts"></p>
    `,
    expirationDate: localDate(2026, 9, 16),
    registerDate: localDate(2026, 9, 2),
    progress: 75,
    status: TASK_STATUS.IN_PROGRESS,
    responsibleId: '104',
    responsible: MOCK_USERS[4],
    boardId: 'horizonte',
  },
  {
    id: '5',
    title: 'Revisão de código',
    description: `
      <p>Review pull requests submitted by the development team this sprint.</p>
      <p>Look for regressions in auth, missing tests and unclear naming. Leave comments that are <em>actionable</em>, not just stylistic.</p>
      <ul>
        <li>Prioritize PRs touching billing and permissions</li>
        <li>Check accessibility on new form controls</li>
        <li>Approve only after CI is green</li>
      </ul>
      <p><img src="${IMG.code}" alt="Code review"></p>
    `,
    expirationDate: localDate(2026, 9, 8),
    registerDate: localDate(2026, 9, 3),
    progress: 100,
    status: TASK_STATUS.DONE,
    responsibleId: '101',
    responsible: MOCK_USERS[1],
    boardId: 'aurora',
  },
  {
    id: '6',
    title: 'Auditoria de segurança',
    description: `
      <p>Conduct a security audit of the web application before the next release candidate.</p>
      <p>Cover <strong>OWASP Top 10</strong>, dependency vulnerabilities and secrets in the repository. Report severity, impact and a suggested fix for each finding.</p>
      <ul>
        <li>Authenticated and anonymous scans</li>
        <li>Review CORS, cookies and session expiration</li>
        <li>Share a one-page summary with leadership</li>
      </ul>
      <p><img src="${IMG.security}" alt="Security audit"></p>
    `,
    expirationDate: localDate(2026, 9, 8),
    registerDate: localDate(2026, 9, 4),
    progress: 10,
    status: TASK_STATUS.PENDING,
    responsibleId: '106',
    responsible: MOCK_USERS[6],
    boardId: 'horizonte',
  },
  {
    id: '7',
    title: 'Análise de feedback',
    description: `
      <p>Analyze user feedback from the latest survey and support tickets from the last 30 days.</p>
      <p>Group comments by theme, highlight the top <strong>five friction points</strong> and suggest product changes we can ship this month.</p>
      <ul>
        <li>Include quotes that illustrate each theme</li>
        <li>Score impact versus effort</li>
        <li>Present findings in a short deck for the weekly meeting</li>
      </ul>
      <p><img src="${IMG.feedback}" alt="User feedback workshop"></p>
    `,
    expirationDate: localDate(2026, 9, 24),
    registerDate: localDate(2026, 9, 5),
    progress: 60,
    status: TASK_STATUS.IN_PROGRESS,
    responsibleId: '104',
    responsible: MOCK_USERS[4],
    boardId: 'oficina',
  },
  {
    id: '8',
    title: 'Revisão de UI/UX',
    description: `
      <p>Review and refine the mobile app UI/UX for onboarding and task creation.</p>
      <p>The current flow takes too many taps. Propose a tighter hierarchy, clearer empty states and a calmer color use that still keeps <strong>#323259</strong> as the brand.</p>
      <ul>
        <li>Audit contrast and tap targets</li>
        <li>Prototype the new onboarding in Figma</li>
        <li>Validate with 5 internal users</li>
      </ul>
      <p><img src="${IMG.ui}" alt="UI review"></p>
    `,
    expirationDate: localDate(2026, 9, 30),
    registerDate: localDate(2026, 9, 6),
    progress: 20,
    status: TASK_STATUS.PENDING,
    responsibleId: '106',
    responsible: MOCK_USERS[6],
    boardId: 'lumen',
  },
  {
    id: '9',
    title: 'Manutenção dos servidores',
    description: `
      <p>Perform routine maintenance on the application servers during the agreed window.</p>
      <p>Patch the OS, rotate logs and confirm that autoscaling still reacts to CPU and memory. Keep a rollback note in case a node fails to rejoin the cluster.</p>
      <ul>
        <li>Update the load balancer health checks</li>
        <li>Verify backups after the reboot</li>
        <li>Notify the team on Slack when the window closes</li>
      </ul>
      <p><img src="${IMG.servers}" alt="Server room"></p>
    `,
    expirationDate: localDate(2026, 9, 14),
    registerDate: localDate(2026, 9, 7),
    progress: 35,
    status: TASK_STATUS.IN_PROGRESS,
    responsibleId: '102',
    responsible: MOCK_USERS[2],
    boardId: 'palmeira',
  },
  {
    id: '10',
    title: 'Lançar campanha de marketing',
    description: `
      <p>Launch the new marketing campaign for the upcoming product, including ads, landing and email sequence.</p>
      <p>Coordinate copy, creative and tracking with design and growth. The first audience is <strong>agencies in Brazil and the US</strong>.</p>
      <ul>
        <li>UTM plan and conversion events in analytics</li>
        <li>Three ad variants for social and search</li>
        <li>Weekly report with CAC and sign-up rate</li>
      </ul>
      <p><img src="${IMG.marketing}" alt="Marketing campaign"></p>
    `,
    expirationDate: localDate(2026, 10, 1),
    registerDate: localDate(2026, 9, 8),
    progress: 40,
    status: TASK_STATUS.PENDING,
    responsibleId: '105',
    responsible: MOCK_USERS[5],
    boardId: 'oficina',
  },
  {
    id: '11',
    title: 'Kit de apresentação comercial',
    description: '<p>Montar o deck da <strong>Agência Aurora</strong> para reuniões com clientes novos, com cases e proposta de valor.</p>',
    expirationDate: localDate(2026, 9, 20),
    registerDate: localDate(2026, 9, 9),
    progress: 30,
    status: TASK_STATUS.IN_PROGRESS,
    responsibleId: '100',
    responsible: MOCK_USERS[0],
    boardId: 'aurora',
  },
  {
    id: '12',
    title: 'Guia de marca',
    description: '<p>Fechar o guia de marca do <strong>Estúdio Lúmen</strong> com cores, tipografia e exemplos de aplicação.</p>',
    expirationDate: localDate(2026, 9, 27),
    registerDate: localDate(2026, 9, 10),
    progress: 15,
    status: TASK_STATUS.PENDING,
    responsibleId: '103',
    responsible: MOCK_USERS[3],
    boardId: 'lumen',
  },
  {
    id: '13',
    title: 'Calendário editorial',
    description: '<p>Definir os temas de setembro e outubro para as redes da <strong>Oficina Criativa</strong>.</p>',
    expirationDate: localDate(2026, 9, 19),
    registerDate: localDate(2026, 9, 11),
    progress: 45,
    status: TASK_STATUS.IN_PROGRESS,
    responsibleId: '105',
    responsible: MOCK_USERS[5],
    boardId: 'oficina',
  },
  {
    id: '14',
    title: 'Checklist de qualidade',
    description: '<p>Padronizar o checklist de QA usado pelo <strong>Studio Horizonte</strong> antes de cada publicação.</p>',
    expirationDate: localDate(2026, 9, 21),
    registerDate: localDate(2026, 9, 11),
    progress: 100,
    status: TASK_STATUS.DONE,
    responsibleId: '104',
    responsible: MOCK_USERS[4],
    boardId: 'horizonte',
  },
  {
    id: '15',
    title: 'Inventário de acessos',
    description: '<p>Listar contas, VPNs e responsáveis da <strong>Casa Palmeira</strong> para o próximo ciclo de revisão.</p>',
    expirationDate: localDate(2026, 9, 12),
    registerDate: localDate(2026, 9, 8),
    progress: 5,
    status: TASK_STATUS.PENDING,
    responsibleId: '102',
    responsible: MOCK_USERS[2],
    boardId: 'palmeira',
  },
];

export const MOCK_COMMENTS: TaskComment[] = [
  {
    id: 'c1',
    taskId: '1',
    authorId: '100',
    author: MOCK_USERS[0],
    text: 'Ana, deixa o hero com um único CTA. Quero testar a versão em português ainda nesta semana.',
    createdAt: localDateTime(2026, 9, 11, 9, 20),
  },
  {
    id: 'c2',
    taskId: '1',
    authorId: '101',
    author: MOCK_USERS[1],
    text: 'Protótipo no Figma atualizado. A variante B ficou mais limpa no mobile.',
    createdAt: localDateTime(2026, 9, 12, 14, 5),
  },
  {
    id: 'c3',
    taskId: '1',
    authorId: '103',
    author: MOCK_USERS[3],
    text: 'Posso revisar o texto do pricing amanhã de manhã.',
    createdAt: localDateTime(2026, 9, 12, 16, 40),
  },
  {
    id: 'c4',
    taskId: '2',
    authorId: '102',
    author: MOCK_USERS[2],
    text: 'Backup completo e restore testado no staging. Runbook publicado na wiki.',
    createdAt: localDateTime(2026, 9, 5, 11, 10),
  },
  {
    id: 'c5',
    taskId: '2',
    authorId: '100',
    author: MOCK_USERS[0],
    text: 'Perfeito. Pode marcar como concluído.',
    createdAt: localDateTime(2026, 9, 5, 11, 45),
  },
  {
    id: 'c6',
    taskId: '3',
    authorId: '103',
    author: MOCK_USERS[3],
    text: 'OpenAPI já cobre os webhooks. Falta só o changelog para os parceiros.',
    createdAt: localDateTime(2026, 9, 8, 10, 15),
  },
  {
    id: 'c7',
    taskId: '3',
    authorId: '101',
    author: MOCK_USERS[1],
    text: 'Se puder, inclui um exemplo de erro 409. Isso aparece bastante no suporte.',
    createdAt: localDateTime(2026, 9, 9, 18, 2),
  },
  {
    id: 'c8',
    taskId: '4',
    authorId: '104',
    author: MOCK_USERS[4],
    text: 'No cenário de 1.000 usuários o checkout passou de 800 ms no p95. Vou anexar o gráfico.',
    createdAt: localDateTime(2026, 9, 13, 15, 30),
  },
  {
    id: 'c9',
    taskId: '4',
    authorId: '102',
    author: MOCK_USERS[2],
    text: 'Olha o cache da listagem de pedidos. Acho que é dali que vem a latência.',
    createdAt: localDateTime(2026, 9, 13, 16, 12),
  },
  {
    id: 'c10',
    taskId: '5',
    authorId: '101',
    author: MOCK_USERS[1],
    text: 'PRs de billing e permissões revisados. CI verde, já aprovei os dois.',
    createdAt: localDateTime(2026, 9, 7, 17, 50),
  },
  {
    id: 'c11',
    taskId: '6',
    authorId: '106',
    author: MOCK_USERS[6],
    text: 'Encontrei um cookie sem Secure em homologação. Relatório preliminar vai hoje.',
    createdAt: localDateTime(2026, 9, 10, 8, 40),
  },
  {
    id: 'c12',
    taskId: '6',
    authorId: '100',
    author: MOCK_USERS[0],
    text: 'Prioriza isso antes do release candidate. Me avisa se precisar de alguém de infra.',
    createdAt: localDateTime(2026, 9, 10, 9, 5),
  },
  {
    id: 'c13',
    taskId: '7',
    authorId: '104',
    author: MOCK_USERS[4],
    text: 'Os cinco temas principais estão no deck. O maior atrito ainda é o cadastro.',
    createdAt: localDateTime(2026, 9, 14, 13, 22),
  },
  {
    id: 'c14',
    taskId: '7',
    authorId: '105',
    author: MOCK_USERS[5],
    text: 'Dá para virar um post de conteúdo com esses depoimentos, se a gente anonimizar.',
    createdAt: localDateTime(2026, 9, 14, 14, 8),
  },
  {
    id: 'c15',
    taskId: '8',
    authorId: '106',
    author: MOCK_USERS[6],
    text: 'O onboarding atual tem 7 telas. Proposta nova cai para 4, com o mesmo #323259.',
    createdAt: localDateTime(2026, 9, 12, 11, 0),
  },
  {
    id: 'c16',
    taskId: '8',
    authorId: '101',
    author: MOCK_USERS[1],
    text: 'Top. Vamos validar com 5 pessoas do time amanhã.',
    createdAt: localDateTime(2026, 9, 12, 11, 18),
  },
  {
    id: 'c17',
    taskId: '9',
    authorId: '102',
    author: MOCK_USERS[2],
    text: 'Janela de manutenção confirmada para terça, 23h. Preciso de alguém de plantão.',
    createdAt: localDateTime(2026, 9, 11, 19, 30),
  },
  {
    id: 'c18',
    taskId: '9',
    authorId: '100',
    author: MOCK_USERS[0],
    text: 'Henrique fica de plantão. Me manda o checklist 2 horas antes.',
    createdAt: localDateTime(2026, 9, 11, 19, 48),
  },
  {
    id: 'c19',
    taskId: '10',
    authorId: '105',
    author: MOCK_USERS[5],
    text: 'As três variantes de anúncio estão no drive. Falta só o UTM do search.',
    createdAt: localDateTime(2026, 9, 13, 10, 12),
  },
  {
    id: 'c20',
    taskId: '10',
    authorId: '103',
    author: MOCK_USERS[3],
    text: 'A peça 2 ficou melhor no recorte quadrado. Eu usaria ela como principal.',
    createdAt: localDateTime(2026, 9, 13, 10, 40),
  },
  {
    id: 'c21',
    taskId: '11',
    authorId: '100',
    author: MOCK_USERS[0],
    text: 'Incluí os cases da Aurora no deck. Alguém revisa o slide de valores?',
    createdAt: localDateTime(2026, 9, 12, 8, 55),
  },
  {
    id: 'c22',
    taskId: '11',
    authorId: '101',
    author: MOCK_USERS[1],
    text: 'Revisei. Troquei a foto da capa e alinhei a tipografia com o kit.',
    createdAt: localDateTime(2026, 9, 12, 15, 10),
  },
  {
    id: 'c23',
    taskId: '12',
    authorId: '103',
    author: MOCK_USERS[3],
    text: 'Paleta e tipografia fechadas. Falta só exemplo de aplicação em instagram.',
    createdAt: localDateTime(2026, 9, 14, 9, 25),
  },
  {
    id: 'c24',
    taskId: '13',
    authorId: '105',
    author: MOCK_USERS[5],
    text: 'Temas de setembro ok. Outubro ainda está aberto para o cliente validar.',
    createdAt: localDateTime(2026, 9, 14, 16, 0),
  },
  {
    id: 'c25',
    taskId: '13',
    authorId: '104',
    author: MOCK_USERS[4],
    text: 'Sugiro um post de bastidores na terceira semana. Performou bem da última vez.',
    createdAt: localDateTime(2026, 9, 14, 16, 22),
  },
  {
    id: 'c26',
    taskId: '14',
    authorId: '104',
    author: MOCK_USERS[4],
    text: 'Checklist padronizado e enviado para o time. Já usamos na publicação de ontem.',
    createdAt: localDateTime(2026, 9, 12, 12, 30),
  },
  {
    id: 'c27',
    taskId: '15',
    authorId: '102',
    author: MOCK_USERS[2],
    text: 'VPN e e-mails listados. Ainda faltam dois logins de ferramenta de design.',
    createdAt: localDateTime(2026, 9, 10, 17, 15),
  },
  {
    id: 'c28',
    taskId: '15',
    authorId: '106',
    author: MOCK_USERS[6],
    text: 'Esses dois estão no 1Password da Casa Palmeira. Posso passar o cofre.',
    createdAt: localDateTime(2026, 9, 10, 17, 41),
  },
];
