const connection = require('../../database/index');

class teamApi {

    constructor() {
        this.where = [];
    }

    list(req, res) {

        let where = this._filtros(req);

        let select = `SELECT 
                            CURDATE() AS \`data\`,
                            T.nomeTime AS nome,
                            COUNT(R.codigoRodada) AS qtdJogos,
                            SUM(CASE
                                WHEN R.codigoTimeA = T.codigoTime THEN R.placarTimeA > R.placarTimeB
                                WHEN R.codigoTimeB = T.codigoTime THEN R.placarTimeA < R.placarTimeB
                                ELSE 0
                            END) AS qtdVitorias,
                            SUM(CASE
                                WHEN R.codigoTimeA = T.codigoTime THEN R.placarTimeA < R.placarTimeB
                                WHEN R.codigoTimeB = T.codigoTime THEN R.placarTimeA > R.placarTimeB
                                ELSE 0
                            END) AS qtdDerrotas
                        FROM
                            tt_telefonica.tt_times AS T
                        LEFT JOIN tt_rodadas AS R ON (R.codigoTimeA = T.codigoTime OR R.codigoTimeB = T.codigoTime)
                        ${where}
                        GROUP BY T.codigoTime
                        ORDER BY T.nomeTime;`;

        connection
            .query(select)
            .then(rows => res.json(rows));
    }

    _filtros(req) {

        let where = [];
        const rodada = req.query.rodada;
        const time = req.query.time;

        if (rodada !== undefined) {
            where.push(this._filtroRodada(rodada));
        }

        if (time !== undefined) {
            where.push(this._filtroTime(time));
        }

        return where.length ? 'WHERE ' + where.join(' AND ') : '';
    }

    _filtroRodada(rodada) {
        return 'R.codigoRodada = ' + rodada;
    }

    _filtroTime(time) {
        return `T.nomeTime LIKE '%${time}%'`;
    }
}

module.exports = new teamApi();