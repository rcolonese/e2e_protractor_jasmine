var AngularSite = function () {

    //Esta função direciona o brownser para abrir a página a ser testada
    this.go = function () {
        browser.get('https://angularjs.org/');
        //browser.get('http://www.angularjs.org');
    };

};

var angularSite = new AngularSite

describe('Exemplos de validação', function () {

    it('Validando resultados fixos com Equal', function () {
        //expect(<locator>).<função de validação (valor da função)>;

        expect(0).toEqual(0);
        expect('rapha').toEqual('rapha');

        expect(true).toBe(true);
        //O "not" pode ser usado em todos os métodos de validação
        expect(false).not.toBe(true);



    });

    it('Validando resultados fixos com Maior e Menor que', function () {
        expect(4).toBeGreaterThan(1);
        expect(3).not.toBeGreaterThan(7);

        expect(1).toBeLessThan(4);
        expect(12).not.toBeLessThan(1);
    });

    it('Validando resultados fixos com Array', function () {
        var a = ['foo', 'bar', 'baz'];
        expect(a).toContain('bar');
    });

    it('Validando resultados fixos com nullos', function () {
        expect(null).toBeNull();
        expect(2).not.toBeNull();
    });

    it('Validando resultados fixos com Exceção', function () {
        //Tratamento de exceção
        var foo = function () {
            return 1 + 2;
        };
        var bar = function () {
            return a + 1;
        };
        expect(foo).not.toThrow();
        expect(bar).toThrow();
    });

    it('Validando resultados fixos com Expressões regulares', function () {
        //Usando Regular Expressions para avaliar se "Raphael" 
        //faz parte da string "Raphael Colonese"
        expect(/Raphael/.test('Raphael Colonese')).toBe(true);
    });


    describe("A spec (with setup and tear-down)", function () {
        var foo;

        beforeEach(function () {
            foo = 0;
            foo += 1;
        });

        afterEach(function () {
            foo = 0;
        });

        it("is just a function, so it can contain any code", function () {
            expect(foo).toEqual(1);
        });

        it("can have more than one expectation", function () {
            expect(foo).toEqual(1);
            expect(true).toEqual(true);
        });
    });
});