/**
 * Cria clientes fakes apra nossa aplicação
 * use por ex:  node .\makeFakeClients.js -quantity=3000
 */

var faker = require('faker');
var gerarCpf = require('gerar-cpf')
var fs = require('fs');


var argsArray = process.argv.slice(2);


var argsObj = {};

argsArray.forEach(arg=> {
    let [key, value] = arg.split('=');
    argsObj[key] = value;
})

let quantity = parseInt(argsObj['-quantity']);

if(!quantity)
    quantity = 3;


function makeFakeClients(quantity) {

    let clients = Array(quantity);

    return [...clients].map((item, index)=> ({
            id: index,
            nome: faker.name.findName(),
            cpf: gerarCpf(),
            email: faker.internet.email(),
            endereco: {
                cep: faker.datatype.number(10000000, 99999999),
                rua: faker.address.streetName(),
                numero: faker.datatype.number(1000, 9999),
                bairro: faker.address.county(),
                cidade: faker.address.city(),
            }
        
    }));
}

let db = {
    "usuarios": [
        {
            "email": "teste@emaill.com.br",
            "password": "123456"
        }
    ],
    "clientes": makeFakeClients(quantity)
}

fs.writeFile("./db-generated.json", JSON.stringify(db), function(err) {
    if (err) {
        console.log(err);
    }
});


console.log(db);


