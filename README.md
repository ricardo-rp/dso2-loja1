# dso2-loja1
Projeto de implementacao com nodejs, express e react

 para rodar a aplicacao e necessarios executar os seguintes comandos:

 para rodar o servidor do backend : yarn dev
 
 rodando o servidor rode tambem : yarn sequelize db:migrate 
 
 confira se o docker esta rodando o container caso não estiver, rodar o seguinte comando:
 docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres 
 
 caso o container estiver parado rodar: docker start database
 
 para rodar o frontend : yarn start
