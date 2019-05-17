const connection = require('../../database/index');
const groupBy = require('group-array');

class championshipApi {

    constructor() {
        this.where = [];
    }

    list(req, res) {

        let where = this._filtros(req);

        let select = `SELECT 
                            R.codigoRodada,
                            R.dataJogo,
                            R.horaJogo,
                            TA.nomeTime AS timeA,
                            TB.nomeTime AS timeB,
                            R.placarTimeA,
                            R.placarTimeB,
                            (SELECT 
                                    descricao
                                FROM
                                    tt_tipos_resultado AS TRE
                                WHERE
                                    TRE.codigoTipoResultado = CASE
                                        WHEN R.placarTimeA > R.placarTimeB THEN 1
                                        WHEN R.placarTimeA < R.placarTimeB THEN 2
                                        ELSE 3
                                    END) AS placar
                        FROM
                            tt_rodadas AS R
                        INNER JOIN tt_times AS TA ON TA.codigoTime = R.codigoTimeA
                        INNER JOIN tt_times AS TB ON TB.codigoTime = R.codigoTimeB
                        ${where}
                        ORDER BY R.dataJogo , R.horaJogo;`;

        connection
            .query(select)
            .then(jogos => groupBy(jogos, 'codigoRodada'))
            .then(rodadas => {
                for (let i in rodadas) {
                    rodadas[i] = {
                        totalJogos: rodadas[i].length,
                        jogos: rodadas[i]
                    };
                }
                return rodadas;
            })
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
        return `(TA.nomeTime LIKE '%${time}%' OR TB.nomeTime LIKE '%${time}%')`;
    }
}

module.exports = new championshipApi();