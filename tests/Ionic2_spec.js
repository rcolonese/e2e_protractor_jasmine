//***********************************************
//*                Pré-Requisitos               *
//***********************************************
var generalFunctions = require('./GeneralFunctions.js');
//-----------------------------------------------

var conteudo = 'não tem';

describe('Caso 1', function () {

    var contador = 0;

    //done é uma função recebida do Protractor que permite controlar o fluxo de dados
    it('- passo 1', function (done) {

        console.log('passo 1.1: ' + new Date() + ', conteúdo = ' + conteudo);

        while (contador < 10) {
            contador++;
        }

        console.log('passo 1.2: ' + new Date());
        done()
    });

    it('- passo 2', function (done) {

        console.log('passo 2.1: ' + new Date());

        setTimeout(function () {
            console.log('passo 2.2: ' + new Date() + ', 4 segundos depois');
            done();
        }, 4000);

        console.log('passo 2.3: ' + new Date());

    });

    it('- passo 3', function (done) {

        console.log('passo 3.1: ' + new Date());

        generalFunctions.wait(2000).then(function () {
            console.log('passo 3.2: ' + new Date() + ', 2 segundos depois');
            done();
        });

        console.log('passo 3.3: ' + new Date());
        conteudo = 'Bananas';

    });

    it('- passo 4', function (done) {
        console.log('passo 4.1: ' + new Date());

        generalFunctions.wait(4000).then(function () {
            console.log('passo 4.2: ' + new Date() + ', 4 segundos depois');
            conteudo = 'fantastico';
            done();
        });

        console.log('passo 4.3: ' + new Date());
    });

});

describe('Caso 2', function () {
    var sincCount = 0;

    it('- step 1', function (done) {
        console.log('step 1 - ' + new Date() + ', conteúdo = ' + conteudo);
        done();
    });

    it('- step 2', function (done) {
        //(1) a imprimir
        console.log('step 2.1 - ' + new Date() + ', conteúdo = ' + conteudo);

        generalFunctions.wait(3000).then(function () {
            //(3) a imprimir
            console.log('step 2.2 - ' + new Date() + ', 3 segundos depois');

            sincCount++;

            generalFunctions.wait(1000).then(function () {
                //(5) a imprimir
                console.log('step 2.3 - ' + new Date() + ', 1 segundo depois');

                sincCount++;
                done();
            });

            //(4) a imprimir
            console.log('step 2.4 - ' + new Date());
        });

        //(2) a imprimir
        console.log('step 2.5 - ' + new Date());


    });

    it('- step 3', function (done) {
        console.log(
            'step 3 - ' + 
            new Date() + ', sincCount (2 = ' + 
            sincCount + ') = ' + (sincCount == 2)
        );
        done();
    });
    
    it('- step 4', function(){
        console.log('CONLCUÍDO, sem usar o done');
    });
    
});