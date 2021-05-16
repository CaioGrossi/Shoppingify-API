# Shoppingify - API
Shoppingify-API foi construida para manipular os dados da aplicação Shoppingify. A aplicação foi construida com NestJs e tem como responsabilidades lidar com as requisições do lado do cliente, como autenticação de usuário, criação, remocação e consulta de listas por usuário, criação de items e categorias e etc (melhor explorado nos tópicos abaixo que falaram sobre as rotas da API).

## Pré-requisitos
Ter uma versão atualizada do NodeJS instalada em sua máquina e um gerenciador de pacotes (yarn ou npm).

## Como executar
Vá até a paste do projeto e digite:
```
yarn ou npm install
```
para instalar as dependencias
```
yarn start:dev ou npm run start:dev
```
para executar o projeto.

## Aviso
Para rodar corretamente e não ter erro de banco de dados não encontrado pelo TypeORM, substitua as informações no arquivo de cofiguração do typeorm colocando as informações do seu banco de dados.

## Habilidades desenvolvidas/aprimadoras com o desenvolvimento desse projeto

### Arquitetura
O framework usado (NestJs) tem com uma de suas principais características a arquitetura que ele "impõe" para gente, sendo essa de modularização. O codigo todo é dividido em módulos, onde cada um tem um serviço (que cuida da lógica desse módulo), pode ter ou não um controller (que cuida da parte das requisições feitas pelo client), e um arquivo para entity (se esse módulo representar uma entidade no seu banco de dados). Como foi a primeira vez que utilizei esse framework e essa arquitetura, causou um pouco de estranhamento mas com o desenvolvimento do projeto pude me adaptar e até gostei dessa abordagem para contruir API's.

### Injeção de dependências
Como falado no tópico acima, o framework impõe uma arquitetura que além de módulos tem como uma das principais características a injeção de dependecias. Funciona de maneira simples e bem intuitiva. Por exemplo, você tem um servico 'a' que pertence ao módulo 'A', mas precisa de funções desse serviço 'a' em um serviço 'b' que pertence a um módulo 'B'. Mas como fazer isso? Simples! Com a injeção de dependêcias proposta pelo NestJs, podemos facilmente export o serviço 'a' e importalo no módulo 'B' e usar no serviço 'b'. A injeção é feita por meio do construtor da classe do serviço.

### Uso de Guards (funcionam como middlewares)
O framework introduz esse conceito de Guards, que tem a única responsabilidade de determinar por quem a requisição será tratada. A primeira vista não parece tão importante, mas se tornam esseciais quando falamos de rotas protegidas. Por exemplo, pego as rotas que usam uma Guard de JWT, ou seja, se a requisição não tiver um JWT válido a própria guard já retorna uma resposta como não autorizado. E isso tudo é feito de maneira simples, apenas com um deocorator!

### TypeORM
Pela utilização de TypeORM, foi possivel explorar toda a parte de criação de entidades usando sua sintaxe própria e de manipulação de repositórios. Apesar de toda adaptação ser já feita pelo framework, algumas coisas com configuração tem que ser tratadas manualmente.

### Deploy
O deploy foi feito na plataforma do Heroku, que é bem simples de usar. Os principais pontos que tive que prestar mais atenção foi na parte de variáveis de ambiente (da Url do banco dados principalmente), adicionar um addon do banco postgres ao app no heroku, rodar as migrations iniciais na máquina hospedada no heroku e algumas configurações do TypeORM para rodar em produção.

## Tópicos estudados
* NestJS
* Injeção de dependências
* Arquitetura de módulos para construção de API (controllers, serviços, entidades)
