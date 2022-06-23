FROM mysql:8.0.29
#Adicionar a Base de dados
ENV MYSQL_DATABASE db_infographics

#copiar os scripts para serem executados na execução do container 

COPY ./scripts_baseDeDados/ /docker-entrypoint.initdb.d/