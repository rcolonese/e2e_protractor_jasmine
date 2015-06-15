//***********************************************
//*                Pré-Requisitos               *
//***********************************************
var angularSite = require('./modules/moduleAngularJs.js');
var generalFunctions = require('./GeneralFunctions.js');
//-----------------------------------------------

describe('Acessando o site', function () {

    it('angularJs', function () {
        angularSite.go();
        //Faço um teste para ver se a navegação funcionou

        browser.driver.getCurrentUrl().then(function (url) {
            console.log('Acessou o site: ' + url);
            expect(/angularjs.org/.test(url)).toEqual(true);
        });
    });

});

describe("Todo List: ", function () {

    //Faço um inserção e uma comparação
    it("adicionar um terceiro item", function () {

        angularSite.getTodoListCount().then(function (total) {

            angularSite.addItemTodo('Raphael');

            expect(angularSite.getTodoListCount()).toEqual(total + 1);

        });

    });

    //Faço uma inserção e uma comparação, porem tb escrevo um log.
    it("adicionar um quarto item", function () {
        var TotalItensOriginal;
        var seguir = false;

        runs(function () {
            angularSite.getTodoListCount().then(function (total) {
                TotalItensOriginal = total;
                //angularSite.addItemTodo('colonese');
                angularSite.inputTextItem.sendKeys('Jaguaribe');
                angularSite.button_add.click().then(function () {
                    seguir = true;
                });

            });
        });

        waitsFor(function () {
            return seguir;
        }, 'Não conseguiu clicar no botão add', 2000);

        runs(function () {
            seguir = false;
            angularSite.getTodoListCount().then(function (total) {
                console.log('Total original : ' + TotalItensOriginal + ', Novo total = ' + total);
                seguir = true;
            });
        });

        waitsFor(function () {
            return seguir;
        }, 1000);

        runs(function () {
            seguir = false;

            expect(angularSite.getTodoListCount()).toEqual(TotalItensOriginal + 1);
        });

    });

    //Faço um inserção e uma comparação
    it("adicionar um quinto item", function () {
        var seguir = false;

        runs(function () {
            angularSite.getTodoListCount().then(function (total) {

                angularSite.addItemTodo('Colonese');

                expect(angularSite.getTodoListCount()).toEqual(total + 1);

            });
        });

    });

    //Apenas aguarda 4 seg para poder dar tempo de ver o resultado na tela
    //Porém é mais eficiente gravar um print como registro do teste
    it('Aguardando para permitir tempo de visualizar', function () {
        var seguir = false;

        runs(function () {
            generalFunctions.wait(4000).then(function () {
                seguir = true;
            });
        });

        waitsFor(function () {
            return seguir;
        });
    });

});