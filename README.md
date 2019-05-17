# Introdução!

Simples API construida em **NodeJS** e **MySQL** para coleta de informações do Campeonato Brasileiro.

# Iniciando
Instalando dependências. 

    npm install
    
Iniciando API. 

    npm start


## Listar os jogos do Campeonato Brasileiro
```
GET /championship
```

### Parâmetros
|Nome            |Tipo                          |Descrição                         |
|----------------|------------------------------|-------------------------|
|`time` 	     |`string`| Filtro por nome do time, pelo nome inteiro ou parte.       |
|`rodada`		 |`inteiro`| Filtro por rodada. |

### Exemplo
Simulando uma busca do jogo do **Coritiba** na **4 Rodada**.
```
localhost:3000/championship?rodada=4&time=Coritiba
```

## Listar os times do Campeonato Brasileiro
```
GET /team
```

### Parâmetros
|Nome            |Tipo                          |Descrição                         |
|----------------|------------------------------|-------------------------|
|`time` 	     |`string`| Filtro por nome do time, pelo nome inteiro ou parte.       |
|`rodada`		 |`inteiro`| Filtro por rodada. |

### Exemplo
Simulando uma busca do jogo do **Corinthians** na **8 Rodada**.
```
localhost:3000/team?time=corinthians&rodada=8
```

