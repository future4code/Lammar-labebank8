<h1 align="center">🏦 LabeBank - Sistema bancário </h1>

<h2>O que funciona no projeto:</h2>
<h3> 👤 Criar conta:</h3>
<p> Para criar uma conta no banco o usuário precisa atender os seguintes requisitos:</p>
<p><strong>Dados obrigatórios:</strong>
<li>Nome,</li>
<li>CPF, </li>
<li>Data de nascimento</li>
</p>
<img align="center" width="400px"src="https://user-images.githubusercontent.com/102433664/202825477-f49fe7a0-632e-49e2-a982-aa6ae3eb823c.png" />


<strong><p>Validações obrigatórias</strong></p>
<p>❌ O usuário deve ter idade igual ou maior do que 18 anos, caso ele não atenda esse requisito, uma mensagem irá informar o erro.</p>

<p>❌ O CPF poderá ser vinculado apenas a 1 conta.</p>

<p>✅ Caso os dados estejam corretos, uma mensagem irá informar que o usuário foi cadastrado</p>

#

<h3> 🔍 Verificar o saldo disponível:</h3>
<p> De início todos os usuários começam com o saldo em conta zerado.</p>
<p>Através do método GET, ao inserir o CPF e nome do usuário nos parâmetros será possivel verificar o saldo atual.</p>
<img align="center" width="600px"src="https://user-images.githubusercontent.com/102433664/202826853-849415a5-3ad9-4f28-b8e6-ee233edae82e.png" />

<p><strong>É necessário informar o CPF e o nome, caso contrário não será possivel encontrar o usuário dentro do banco de dados.</p></strong>

#
<h3> 💰 Inserir saldo na conta:</h3>
<p>Através do método PUT, ao inserir o CPF e nome do usuário nos parâmetros e o valorAdicionado no body será possivel alterar o saldo atual.</p>
<img align="center" width="600px"src="https://user-images.githubusercontent.com/102433664/202826422-e37f4692-20cf-405d-9497-e098d6df3d0a.png" />

<p><strong>É necessário informar o CPF e o nome, caso contrário não será possivel encontrar o usuário dentro do banco de dados.</p></strong>

#

<h3> 💳 Pagar contas </h3>
<p>Eles podem pagar uma conta, se quiserem, basta inserir o cpf da conta nos parâmetros e passar: um valor, uma descrição e uma data de pagamento no body, o valor da conta será atualizado automaticamente.</p>
<img align="center" width="400px"src="https://user-images.githubusercontent.com/102433664/202826809-5042a24c-06bf-40bf-b6f4-02984e71df9d.png" />

<p><b> O usuário só conseguirá pagar uma conta se tiver saldo suficiente para isso.</p></b>
<img align="center" width="300px"src="https://user-images.githubusercontent.com/102433664/202826665-a379c96c-fc8c-46e3-b2fe-6413ff2fe42c.png" />

#

<h3> 💸 Transferência Interna </h3>
<p>Para realizar esta transferência, o usuário deve informar o seu nome, o seu CPF, o nome do destinatário, o CPF do destinatário e o valor em si. Transferências não podem ser agendadas e devem respeitar o saldo do usuário remetente.</p>
<img align="center" width="600px"src="https://user-images.githubusercontent.com/102433664/202827025-f959bfa4-36c0-49c6-92a6-373cede673af.png" />

#

<h3>👥 Consultar todos os usuários cadastrados </h3>
<p>Função que será responsável por pegar todos os usuários existentes no banco de dados, porém ao atualizar a aplicação, os dados serão resetados (exceto os que estão inseridos no array de usuários dentro do código).</p>
<img align="center" width="400px"src="https://user-images.githubusercontent.com/102433664/202827301-f3377df9-a134-4efc-a4f6-988fcd2885e6.png" />

#

### Link da Documentação: [Labebank](https://documenter.getpostman.com/view/22530775/2s8YmSqziL)

#

### Autores:

[Bruna de Carvalho](https://github.com/BrunadeCarvalho)

[Dirlei Costa](https://github.com/Dirleisc)

[H Douglas Araújo](https://github.com/HDouglasA)
