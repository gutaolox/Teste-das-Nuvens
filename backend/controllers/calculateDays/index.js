'use strict';

//Gera as posições iniciais dos aeroportos e nuvens
function defineInitialPosition(paramsObj) {
    let res = {
        airportsCoord: [],
        cloudsCoord: []
    }

    for (let i = 0; i < paramsObj.airportsQtd; i++) {

        generateCoords(res.airportsCoord, res.cloudsCoord, paramsObj.maxXRange, paramsObj.maxYRange);
    }

    for (let i = 0; i < paramsObj.cloudsQtd; i++) {
        generateCoords(res.cloudsCoord, res.airportsCoord, paramsObj.maxXRange, paramsObj.maxYRange);
    }
    return res;
}


function generateCoords(referenceArray, comparativeArray, maxXRange, maxYRange) {
    var newCoord = {
        x: Math.floor(Math.random() * (maxXRange + 1)),
        y: Math.floor(Math.random() * (maxYRange + 1))
    };
    while (referenceArray.filter(item => item.x === newCoord.x && item.y === newCoord.y).length !== 0 
    || comparativeArray.filter(item => item.x === newCoord.x && item.y === newCoord.y).length !== 0) {
        newCoord = {
            x: Math.floor(Math.random() * (maxXRange + 1)),
            y: Math.floor(Math.random() * (maxYRange + 1))
        };
    }
    referenceArray.push(newCoord);
}

//Calcula quantos dias serão cobertos o primeiro aeroporto e o ultimo aeroporto 
function calculateDayToCover(coords, maxXRange, maxYRange) {
    var controlQueue = [];
    var visitedNodes = [];
    //for adiciona os primeiros itens a fila
    for (let i = 0; i < coords.cloudsCoord.length; i++) {
        controlQueue.push({
            ...coords.cloudsCoord[i],
            nivel: 1
        });
    }
    var daysTillCoverOne = 0;
    var daysTillCoverAll = 0;
    var count = 0;
    while (controlQueue) {
        //remove o primeiro item da fila e ja salva como nó visitado
        var removedItem = controlQueue.shift();
        visitedNodes.push(removedItem)
        //se o nó removido estiver na posição do aeroporto soma como um aeroporto coberto e salvando em variaveis quando é o primeiro e o ultimo aeroporto
        if (coords.airportsCoord.filter(airport => airport.x === removedItem.x && airport.y === removedItem.y).length !== 0) {
            count++;
            if (count === 1) daysTillCoverOne = removedItem.nivel;
            if (count === coords.airportsCoord.length) {
                daysTillCoverAll = removedItem.nivel;
                break;
            };
        }
        //gera os POSSIVEIS próximos nós da fila
        var newNodes = [{
            x: removedItem.x + 1,
            y: removedItem.y,
            nivel: removedItem.nivel + 1
        }, {
            x: removedItem.x - 1,
            y: removedItem.y,
            nivel: removedItem.nivel + 1
        }, {
            x: removedItem.x,
            y: removedItem.y + 1,
            nivel: removedItem.nivel + 1
        }, {
            x: removedItem.x,
            y: removedItem.y - 1,
            nivel: removedItem.nivel + 1
        }];
        //Checa se os novos nós são validos, caso seja valido o nó é adicionado a fila
        for (let i = 0; i < newNodes.length; i++) {
            if ((newNodes[i].x <= maxXRange && newNodes[i].x >= 0) &&
                (newNodes[i].y <= maxYRange && newNodes[i].y >= 0) &&
                visitedNodes.filter(node => node.x === newNodes[i].x && node.y === newNodes[i].y).length === 0 &&
                controlQueue.filter(node => node.x === newNodes[i].x && node.y === newNodes[i].y).length === 0) {
                controlQueue.push(newNodes[i]);
            }
        }

    }
    return {
        oneAirportDays: daysTillCoverOne,
        allAirportsDays: daysTillCoverAll,
        nodesList: visitedNodes
    }
}

module.exports = function (router) {


    router.post('/', async function (req, res) {
        const refParemeters = req.body;
        const coordenates = defineInitialPosition(refParemeters);
        const coverDays = calculateDayToCover(coordenates, refParemeters.maxXRange, refParemeters.maxYRange);
        res.json({
            initialCoordSet: coordenates,
            daysToCover: coverDays
        })
    });
};