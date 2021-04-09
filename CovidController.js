//Import covid Model
Covid = require('./CovidModel');

//Para index
exports.index = function (req, res) {
    var casos = [];
    var datArray = [];
    var total = 0;
    var intensivos = [];
    Covid.get(function (err, covid) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        for(var i=0; i<covid.length; i++){
            //array novos casos
            casos.push(covid[i].confirmados_novos)
            //array novos internados_uci
            intensivos.push(covid[i].internados_uci)
            //array data
            datArray.push(covid[i].data)
            //calcular total de casos de covid 
            total += Number(covid[i].confirmados_novos);
        }
        //ver o dia com mais de novos casos
        var maximo = null;
        maximo = Math.max(...casos);
        //guardar o indice em que esse dia se encontra
        var IndiceMax = casos.indexOf(maximo);
        
        //ver o dia com menos novos casos
        var minimo = null;
        minimo = Math.min(...casos);
        //guardar o indice em que esse dia se encontra
        var IndiceMin = casos.indexOf(minimo);

        //calcular a média (total/dias)
        var media = null;
        media = total/covid.length;


        res.json({
            //listagem número de novos casos
            novos_casos: casos,
            //listagem número de internados nos uci
            uci_internados: intensivos,
            //dia com mais novos casos
            Maximo: datArray[IndiceMax],
            //dia com menos novos casos
            Minimo: datArray[IndiceMin],
            //média a 6 dias
            Media: media,
            //número total de casos na semana
            Total_Casos: total
        });
    });
};

// Ver covid
exports.view = function (req, res) {
    Covid.findById(req.params.covid_id, function (err, covid) {
        if (err)
            res.send(err);
        res.json({
            message: 'Detalhes da informação',
            data: covid
        });
    });
};

//Criar nova covid
exports.add = function (req, res) {
    var covid = new Covid();
    covid.data = req.body.data? req.body.data: covid.data;
    covid.confirmados_novos = req.body.confirmados_novos;
    covid.internados_uci = req.body.internados_uci;

    //Guardar e verificar erros
    covid.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "Nova covid Adicionada!",
            data: covid
        });
    });
};
