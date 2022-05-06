<h1> HANDS ON WEEK 3 </h1>

<p>Chegou o momento de colocar em prática tudo que aprendeu sobre Back-end, bora?
Um grupo de psicólogos se juntaram e criaram a
clínica La Vie - Saúde Mental que oferece
diversos tipos de terapia.</p> <br>

<p>Para ajudar nos atendimentos, eles precisam de uma API que permita criar registros de
psicólogos, pacientes e prontuários. Em uma conversa com os Front-end e os PO foram
decididos alguns grupos de endpoints que devem ser criados.</p> <br>

<strong>BANCO DE DADOS</strong>

<p> Nossa equipe também ficará responsável por criar o banco de dados que inclui: Criação
do DER e do script SQL que gera o banco.</p> <br>

<h3>Deve ser analisado os endpoints para seja montado de acordo com a necessidade,
observando os dados que constituem a 3 entidades do sistema:</h3><br>
<li>- Pacientes</li>
<li>- Psicólogos</li>
<li>- Atendimentos</li><br>

<p>Se atentar corretamente a criação das relações das entidades</p><br>
<h1>FUNCIONALIDADES OBRIGATÓRIAS</h1><br>
<h2>1. Login</h2><br>
<p>O sistema deve permitir autenticação dos psicólogos para acessar a plataforma.
Os dados de autenticação devem ser um e-mail válido e uma senha(mínimo 6
caracteres). As informações de autenticação devem ser criadas no mesmo
momento que é feito o cadastro do psicólogo.<br>
E para formar esse sistema deve existir os seguintes endpoints:<br>
POST /login<br>
Esse endpoint irá receber no body dois parâmetros que devem ser obrigatórios:
email e senha. E devem ser validados de acordo com as informações do banco
de dados.<br>
Caso o email não exista, ou a senha não esteja correta para esse e-mail deverá
ser exibida como resposta a seguinte mensagem com o status 401:<br>
“E-mail ou senha inválido, verifique e tente novamente”
Caso as informações estejam corretas, deve ser gerado um token JWT que
contenha o id, email e nome do psicólogo que fez o login dentro do seu
conteúdo. Esse token deve ser enviado como resposta com o status 200.<p><br>
<h2>2. CRUD Psicólogos</h2>
<p>GET /psicologos<br>
Deve ser listado todos os psicólogos cadastrados no banco de dados, exibindo
todos os atributos da entidade.<br>
Caso não exista nenhum psicólogo, basta enviar um array vazio como resposta.
Em todos os casos deve ser retornado o status 200
GET /psicologos/:id<br>
Deve devolver um objeto com todas as informações do psicólogo do id
informado na url, com exceção da senha. O status deve ser 200 para resposta.<br>
Caso não exista um psicólogo com o id informado deve retornar a seguinte
menssagem de erro acompanhada do status 404:<br>
“Id não encontrado”<br>
POST /psicologos<br>
Deve receber no body da requisição um objeto com as seguintes propriedades:
<li> nome ( Campo string ) Ex: Fabricio Oliveira</li>
<li> email (Campo string) Ex: fabricio.psicologo@email.com</li>
<li> senha (Campo string) Ex: 123456</li>
<li> apresentacao (Campo String) Ex: Sou um psicólogo incrível e muito bom!</li>
Todas essas informações são obrigatórias e caso não sejam enviadas devem
exibir um status 400 indicando que há um erro na requisição.
Se o cadastro ocorrer corretamente deve devolver a resposta com o status 201 e
com as informações que foram criadas no banco.
PUT /psicologos/:id<br>
Você irá receber pelo params, o id do psicólogo que será atualizado.
Deve receber no body da requisição um objeto com as seguintes propriedades:
<li> nome ( Campo String ) Ex: Fabricio Oliveira</li>
<li> email (Campo String) Ex: fabricio.psicologo@email.com</li>
<li> senha (Campo String) Ex: 123456</li>
<li> apresentacao (Campo String) Ex: Sou um psicólogo incrível e muito bom!</li>
Todas essas informações são obrigatórias e caso não sejam enviadas devem
exibir um status 400 indicando que há um erro na requisição.<br>
Se a atualização ocorrer corretamente deve devolver a resposta com o status 200
e com as informações que foram atualizadas no banco.<br>
DELETE /psicologos/:id<br>
Você irá receber pelo params, o id do psicólogo que será deletado.<br>
Se o id existir deve ser deletado do banco de dados o psicólogo informado e
devolve como resposta o status 204.
Caso não exista um psicólogo com o id informado deve retornar a seguinte
menssagem de erro acompanhada do status 404:
“Id não encontrado”<p><br>
<h2>3. CRUD Pacientes</h2>
<p>GET /pacientes<br>
Deve ser listado todos os pacientes cadastrados no banco de dados, exibindo
todos os atributos da entidade.<br>
Caso não exista nenhum psicólogo, basta enviar um array vazio como resposta.
Em todos os casos deve ser retornado o status 200
GET /pacientes/:id<br>
Deve devolver um objeto com todas as informações do paciente do id informado
na url. O status deve ser 200 para resposta.<br>
Caso não exista um psicólogo com o id informado deve retornar a seguinte
menssagem de erro acompanhada do status 404:
“Id não encontrado”<br>
POST /pacientes<br>
Deve receber no body da requisição um objeto com as seguintes propriedades:<br>
<li> nome (Campo string) Ex: Fabricio Oliveira</li>
<li> email (Campo string) Ex: fabricio.psicologo@email.com</li>
<li> idade (Campo Date) Ex: 06/12/1997</li><br>
Todas essas informações são obrigatórias e caso não sejam enviadas devem
exibir um status 400 indicando que há um erro na requisição.<br>
Se o cadastro ocorrer corretamente deve devolver a resposta com o status 201 e
com as informações que foram criadas no banco.<br>
PUT /pacientes/:id<br>
Você irá receber pelo params, o id do paciente que será atualizado.<br>
Deve receber no body da requisição um objeto com as seguintes propriedades:
<li> nome ( Campo string ) Ex: Fabricio Oliveira</li>
<li> email (Campo string) Ex: fabricio.psicologo@email.com</li>
<li> idade (Campo Date) Ex: 06/12/1997</li><br>
Todas essas informações são obrigatórias e caso não sejam enviadas devem
exibir um status 400 indicando que há um erro na requisição.<br>
Se a atualização ocorrer corretamente deve devolver a resposta com o status 200
e com as informações que foram atualizadas no banco.<br>
DELETE /pacientes/:id<br>
Você irá receber pelo params, o id do paciente que será deletado.<br>
Se o id existir deve ser deletado do banco de dados o paciente informado e
devolve como resposta o status 204.
Caso não exista um paciente com o id informado deve retornar a seguinte
menssagem de erro acompanhada do status 404:<br>
“Id não encontrado”<p><br>
<h2>4. CRUD Atendimentos</h2>
<p>GET /atendimentos
Deve ser listado todos os atendimentos realizados por todos os psicólogos
cadastrados no banco de dados, exibindo todos os atributos da entidade.
Caso não exista nenhum atendimento, basta enviar um array vazio como resposta.<br>
Em todos os casos deve ser retornado o status 200<br>
GET /atendimentos/:id<br>
Deve devolver um objeto com todas as informações do atendimento do id
informado na url. O status deve ser 200 para resposta.<br>
Caso não exista o atendimento com o id informado deve retornar a seguinte
menssagem de erro acompanhada do status 404:
“Id não encontrado”<br>
POST /atendimentos
Deve receber no body da requisição um objeto com as seguintes propriedades:
<li> paciente_id (Campo inteiro) Ex:: 1</li>
<li> data_atendimento (Campo Data) Ex: 2020-01-01T10:10:00z</li>
<li> observação (Campo String) - Ex: Descrição do atendimento, pode ser um
campo longo.</li><br>
Além das informações recebidas no body, é preciso pegar o id do psicólogo que
está logado para associá-lo a esse atendimento. <br> 
Lembre-se que essas informações ficam presentes dentro do Token JWT. <br>
Todas essas informações são obrigatórias e caso não sejam enviadas devem
exibir um status 400 indicando que há um erro na requisição.<br>
Se o cadastro ocorrer corretamente deve devolver a resposta com o status 201 e
com as informações que foram criadas no banco.<br>
<h2>5. Documentação da API</h2>
Deve ser gerado uma documentação da api, colocando os endpoints existentes
assim como os dados que devem ser passados na requisição e o que será
devolvido pelo servidor como resposta.<br>
Para isso pode ser usado o Insomnia junto com o plugin Export HTML
Documentation (Ensinado do material assíncrono), ou o postman.<p><br>
  <a>https://documenter.getpostman.com/view/20767148/UyrGBZTv</a>
<h2>FUNCIONALIDADE OPCIONAL</h2>
<h3>Dashboard</h3><br>
<p>Deverá ser criados um grupo de endpoints a partir da rota /dashboard para cada tipo de
informação presente nesta lista:<br>
<li> Número de pacientes</li>
<li> Número de atendimentos</li>
<li> Número de psicólogos</li>
<li> Média de atendimentos por psicólogos</li><br>
Ficando por exemplo: /dashboard/numero-paciente. Os dados a serem retornando
podem ser apenas os números dos resultados em si!</p><br>
<h2>CRITÉRIOS DE AVALIAÇÃO</h2><br>
<li> Boas práticas em relação ao uso de JS</li>
<li> Boa organização do projeto usando os princípios do MVC</li>
<li> Validação dos dados que entram na api</li>
<li> Feedback de erros para os usuários</li>
<li> Divisão de tarefas entre os membros da equipe seguindo os princípios da
Metodologia Ágil Scrum</li>
<li>- Utilizar boas práticas de versionamento de código com Git</li>
<h2>Entrega:</h2>
<strong>Deverá ser enviado o link do Github pela plataforma da Gama Academy até à data
informada no slack no envio deste documento.<strong>
