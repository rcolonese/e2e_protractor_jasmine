# Exemplo base para Projetos E2E usando Protractor com Jasmine #

Veja aqui como preparar um projeto de testes End to End (E2E), ou seja, testes executados em browsers reais assim como um usuário faria; 

Uso o Protractor, que é adequado para testar aplicações com AngularJs, porém também pode ser usado com aplicações web não angular.

aprenda como tirar proveito do jasmine 2.x e 1.3 

A versão padrão do jasmine no protractor é a 1.3, mas basta uma modificação no arquivo de configuração que você pode usar a versão 2.x. E vale a pena! veja como [aqui](http://angular.github.io/protractor/#/jasmine-upgrade)

____
### Pra que serve esse repositório? ###
* Instalar os pré-requisitos: **Protractor**, **Jasmine** e **promise**
* Dar um exemplo de como configurar o arquivos de testes (vide testeConfig.js)
* Fazer uma introdução sobre **Jasmine**
* Fazer uma introdução sobre **Protractor** 
* Testes para aplicações não angular
* Criar um padrão para escrever os testes
* Disponibilizar exemplos de como resolver algumas situações de teste.

### Referências ###
* [Jasmine](http://jasmine.github.io/1.3/introduction.html)
* [Protractor](http://angular.github.io/protractor/#/)
* [Protractor tutorial](http://angular.github.io/protractor/#/tutorial)
* [Protractor API](http://angular.github.io/protractor/#/api?view=ProtractorBy.prototype.repeater)
* [Promise](https://www.npmjs.com/package/promise)
* [Angular E2E testing](https://docs.angularjs.org/guide/e2e-testing)

### Referências adicionais ###
* [Como estruturar os arquivos de testes](http://engineering.wingify.com/posts/angularapp-e2e-testing-with-protractor/)
* [Como testar com aplicações que não usam angular](http://ng-learn.org/2014/02/Protractor_Testing_With_Angular_And_Non_Angular_Sites/)
* [Sobre o Selenium](https://code.google.com/p/selenium/wiki/PageObjects)

### Pré requisitos ###
* Ter os pré-requisitos instalados: Node.js (v0.10.0 ou maior), JDK e Promise.
Segue abaixo o passo a passo
* [Java Development Kit (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

### Exclusões deste projeto ###

**webdriver-manager** é uma ferramenta de ajuda que facilmente inicia uma instância de um servidor Selenium. 

Porém não usarei esta ferramenta neste projeto, pois irei testar sobre o site do [angularjs](https://angularjs.org/)

O Selenium serve para ativar um servidor local onde os testes serão rodados em sua aplicação web local.

## índice
* [Parte 1 - Como eu preparo o projeto?](#parte-1)
* [Parte 2 - Como eu preparo um projeto NOVO?](#parte-2)
* [Parte 3 - Introdução ao Jasmine](#parte-3)
* [Parte 4 - Funções de teste (Expectations)](#parte-4)
* [Parte 5 - Testes Assíncronos com **Jasmine 2.x**](#parte-5)
* [Parte 6 - Testes Assíncronos com **Jasmine 1.3**](#parte-6)
* [Parte 7 - Introdução ao Protractor](#parte-7)
* [Parte 8 - Testes para aplicações não angular](#parte-8)
* [Parte 9 - Modularização dos testes](#parte-9)
* [Parte 10 - Padrão para escrever os testes](#parte-10)
* [Parte 11 - Padrão para organizar os arquivos de testes](#parte-11)
* [Parte 12 - Mantendo registros do teste](#parte-12)
* [Parte 13 - Como executo os testes desse projeto?](#parte-13)

## parte-1
voltar para o [índice](#índice)
### Como eu preparo o projeto? ###
Execute no terminal os comandos:

* npm install -g protractor

  Isso irá instalar 2 ferramentas de linha de comando, **protractor** e **webdriver-manager**

* npm install

  Isso irá instalar as dependências de desenvolvimento do projeto, que no caso é apenas o **promise**

## parte-2
voltar para o [índice](#índice)
### Como eu preparo um projeto NOVO? ###

Fora os itens acima rode os comandos abaixo no terminal

* npm install --save-dev promise

O promise será necessário para executar funções próprias que precisam trabalhar de forma assíncrona.
  

____
## parte-3
voltar para o [índice](#índice)
# Introdução ao Jasmine #

## Um pouco sobre **Jasmine** ##
Jasmine é um framework que dá suporte a estrutura de testes para javascript.

Contém uma estrutura bem simples de organizar o código do teste, e várias formas de validar tipos de conteúdos diferentes, segue abaixo um exemplo:
```javascript
describe("A spec (with setup and tear-down)", function() {
  var foo;

  beforeEach(function() {
    foo = 0;
    foo += 1;
  });

  afterEach(function() {
    foo = 0;
  });

  it("is just a function, so it can contain any code", function() {
    expect(foo).toEqual(1);
  });

  it("can have more than one expectation", function() {
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });
});
```

### Explicações sobre o código acima ###

1) **describe**

É uma função global do Jasmine que recebe 2 parâmetros, um nome e uma função.

Serve para definir um escopo de teste, um ou vários casos de teste.

É permitido aninhar **describe** dentro de **describe**, mas cuidado, aninhar demais pode deixar o código confuso.

2) **it**

É o que o Jasmine chama de spec (specification) de um teste. 

ele é declarado dentro da função do **describe**, e possui a mesma forma de declaração, ou seja, são passados 2 parâmetros: um texto e uma função

Ele deve ser enxuto o suficiente para identificar um teste específico, pois quando um teste dá errado ele é exibido no log do seu terminal com o nome do **describe** concatenado com o nome do **it**.

Se vários conceitos estivem sendo testados no memso IT você terá dificuldades de entender o resultado do seu teste.

3) **beforeEach** e **afterEach**
São executados sempre antes e depois de cada elemento aninhado no descibe, seja um **it** ou memso outro **describe**.

Muito úteis para reinicialização de variáveis.

4) **expect**

É o teste em si, essa função é que é capaz de avaliar um resultado obtido com o resultado esperado.

## parte-4
voltar para o [índice](#índice)
### Funções de teste (Expectations) ###

Existem várias formas de se fazer isso, todas elas o primeiro parâmetro é o resultado obtido e o segundo o resultado esperado, exemplo:
```javascript
//TODAS AS EXPRESSÕES ABAIXO SÃO VÁLIDAS

//******************
//*     toBe       *
//******************
//Funciona como o comparador === do javascript
expect(true).toBe(true);

//******************
//*    toEqual     *
//******************
//Serve para avaliar variáveis e literais simples

//Avaliar números
expect(10).toEqual(10);

//Avaliar textos
expect('um texto').toEqual('um texto');

//******************
//*      not       *
//******************
//Serve para negativa a lógica

expect(false).not.toBe(true);
expect(20).not.toEqual(10);

//******************
//*    toMatch     *
//******************
//Serve para avaliar expressões regulares
var message = 'foo bar baz';

expect(message).toMatch(/bar/);
expect(message).toMatch('bar');
expect(message).not.toMatch(/quux/);

//******************
//*  toBeDefined   *
//******************
//Serve para avaliar se alguma variável foi definida ou não
var a = {
   foo: 'foo'
};

expect(a.foo).toBeDefined();
expect(a.bar).not.toBeDefined();

//*****************************************
//*  Alguns exemplos que falam por si só  *
//*****************************************
expect(null).toBeNull();
expect(2).not.toBeNull();

var a = ['foo', 'bar', 'baz'];
expect(a).toContain('bar');
expect(a).not.toContain('quux');

expect(2).toBeLessThan(4);
expect(4).not.toBeLessThan(2);

expect(8).toBeGreaterThan(3);
expect(3).not.toBeGreaterThan(8);

//Comparação matemática, o segundo argumento é a precisão em casas decimais
expect(3.14).not.toBeCloseTo(2.78, 2);
expect(3.12).toBeCloseTo(2.78, 0); //2.78 é arredondado para 3, portanto é true

//Tratamento de exceção
var foo = function() {
  return 1 + 2;
};
var bar = function() {
  return a + 1;
};
expect(foo).not.toThrow();
expect(bar).toThrow();

```

____
## parte-5
voltar para o [índice](#índice)
### Testes Assíncronos com **[Jasmine 2.x](http://jasmine.github.io/2.3/introduction.html)** ###

Usando o [Protractor](http://angular.github.io/protractor/#/jasmine-upgrade) eventualmente você precisará lidar com métodos assíncronos, não tem escapatória.

```javascript
describe('Teste assíncrono', function(){
    it('teste 01', function() {
        //um código qualquer
    });

    it('teste 02', function(done) {
        //Outro código qualquer

        //função assincrona
        //    done();
        //fim função
    });

    it('teste 03', function(done) {
        //Qualquer código
        done();
    });
});
```

A função done quando injetada nas funções **it, beforeEach, afterEach ou describe** ativa o modo de espera para a próxima instrução de teste que só será executada quando o metodo injetado **done()** for invocado ou quando der timeout. 

O timeout por padrão é de 5000 milisegundos, mas pode ser alterado, veja abaixo como:

```javascript
function setJasmineTimeout (milisenconds) {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = milisenconds;
}
```

## parte-6
voltar para o [índice](#índice)
### Testes Assíncronos com **Jasmine 1.3** ###
Essa parte fica a penas a título de curiosidade ou caso precise dar uma manutenção que tenha jasmine nessa versão.

A forma do Protractor resgatar elementos do DOM é com promises, e como o promise é um processo assíncrono você terá que fazer seu código aguardar o resultado da instrução.

Para usar a forma assíncrona usaremos 2 estruturas novas dentro da funcão **it**. o **runs** e o **waitsFor** e sempre são usados nessa mesma sequência.

A função **waitsFor** aguarda que o **runs** antes dela informe true em uma variável que dará fim a espera da função **waitsFor** ou até que o timeout em milisegundos seja alcançado (o que vier primeiro).

OBS.: O **waitsFor** é executado em um loop infinito até o seu timeout ou até que a variável seja assumida com **true** (o que vier primeiro). e o código seguirá para o próximo run

No exemplo abaixo vamos usar o seletor do protractor para css para pegarmos o conteúdo de um texto e escrever no terminal antes da próxima instrução

Arquivo **HTML**
```html
<sapn class='nome'>Raphael</span>
```
Arquivo em **Javascript**
```javascript
describe('Teste assíncrono', function(){
    it('Validando um nome', function() {
        
        var seguir = false;
        var nome = '';
        
        runs(function(){
            
            element(by.css('.nome')).getText().then(
                
                function (texto) {
                    nome = texto;
                    seguir = true;
                }
                
            );
            
        });
        
        waitsFor( function () {
            return seguir;
        }, 'Um texto opcional para exibir no caso de timeout', 4000);
        
        runs(function(){
            
            //Aqui pode executar uma função que depende do resultado anterior ter sido obtido
            QualquerFuncao (nome);
            console.log ('Nome = ' + nome);
            
        });        
    });
});
```

Um outro motivo de ter que usar um método assíncrono é ter que esperar algum processo ou função concluir antes de prosseguir, para isso pode-se usar uma função de timer.

Exemplo:
```javascript
        runs(function () {
            //executa um monte de código
            
            //Aguarda 6 segundos para permitir seguir
            intId = setInterval(function () {
                seguir = true;
            }, 6000);
        });

        //Espera o runs terminar ou o Timeout de 7 segundos
        waitsFor(function () {
            return seguir;
        }, 7000);

        //Executa o restante do código
        runs(function () {
            //Qualquer código que dependa da espera anterior de 6 segundos.
        });
```
____
## parte-7
voltar para o [índice](#índice)
# Introdução ao Protractor #

## Um pouco sobre Protractor ##
É um framework para testes End to End (E2E), ou seja, executa testes na aplicação rodando em browsers reais assim como um usuário faria.

É dependente do framework de testes **Jasmine**, e feito especialmente para ser usado com aplicações em **AngularJs**

Possui espera automática de processos da aplicação, executando o passo seguinte apenas após a aplicação ter concluído seus processos, que podem inclusive ser processos $http. Isso evita usos de waits e sleeps.

Usa localizadores (locators) criados para capturar elementos no DOM e funções capazes de interagir com esses elementos, como: escrever, clicar e coletar dados.

### como selecionar elementos usando os **locators** ###

A função **element** usada com um localizador resgata um ou vários itens do DOM
```javascript
var elem;

//1) selecionando usando css
//resgata um elemento com a classe css "AlgumaClasseCSS"
elem = element(by.css('.AlgumaClasseCSS'));

//2) selecionando usando o texto de um botão
elem = element(by.buttonText('Save'));

//3) selecionando usando XPATH        
//Este exemplo pega o elemento pai da classe 'AlgumaClasseCSS'
elem = element(by.css('.AlgumaClasseCSS')).element(by.xpath('..'));

//4) selecionando usando o model do AngularJs
<input type="text" ng-model="person.name"/>
____________________________________________________
var input = element(by.model('person.name'));

//5) selecionando vários elementos
elem = element.all(by.css('.AlgumaClasseCSS'));

//6) selecionando vários elementos criados por um repeater
elem = element.all(by.repeater('cat in pets'));

//7) selecionando vários elementos filhos
//seleciono todos os elementos li dentro de uma lista que contenha a classe "AlgumaClasseCSS"

elem = element.all(by.css('.AlgumaClasseCSS li'));

//para interagir com os elementos coletados temos as funções **get(index)** e **count()**
var lenght = elem.count();
var elem01 = elem.get(2);
```
mais exemplos com repeater podem ser encontrados na [API do protractor:locators:repeater](http://angular.github.io/protractor/#/api?view=ProtractorBy.prototype.repeater)

Como observado no item 3 acima, os "element"podem ser concatenados para selecionar outros elementos, tornado possível assim pegar um ou vários elementos filhos, ou pai, ou irmãos, etc...

### como interagir com os elementos selecionados ###

vamos imaginar que um elemento já foi coletado por um locator qualquer e colocado na variável **elem**
```javascript
elem = element(locator);

//Caso o elemento seja um input text vocÊ pode escrever nele da seguinte forma
elem.sendKeys('Esse é um teste');
elem.sendKeys(543);

//Pode se coletar o texto de um elemento, seja ele qual for, um span, div, input, etc.
var texto = elem.getText();

//Pode ser enviado um click para um elemento que aceite, como uma ancora ou um botão.
elem.click();

//Limpa o conteúdo de uma elemento
elem.clear();

```
saiba mais olhando nas [APIs do protractor](http://angular.github.io/protractor/#/api)

____
## parte-8
voltar para o [índice](#índice)
# Testes para aplicações não angular #
Não é necessário aprender outras formas de codificar seu código para testar aplicações web não angular.

Basta usar o código abaixo antes de começar seus testes, como por exemplo na função **beforaEach**
```javascript
    function isAngularSite (flag) {
        browser.ignoreSynchronization = !flag;
    }
```
O comando acima quando marcado para ignorar a sincronização desativa a espera por carregamentos (dos processos do angular) o que permite usar o DSL "element <.find>" ao invés de "browser.drive <.find>"

____
## parte-9
voltar para o [índice](#índice)
## Modularização dos testes ##
É possível e eu recomendo fortemente a modularização das suas funcionalidades de forma que você não acabe com um único arquivos gigante descrevendo todo o seu teste.

A modularização irá permitir mais pessoas trabalhando simultaneamente e facilitar a manutenção do seu código. Afinal, a medida que sua aplicação cresce, seu teste também cresce.

Para modularizar uso basicamente a biblioteca **[require](https://www.npmjs.com/package/require)** que é um gerenciador de módulos para javascript.

Abaixo segue o modelo de como criar seu módulo
```javascript
//------------------------------------------
//- NOME DO SEU MÓDULO
//------------------------------------------
var MeuModulo = function () {
    
    var variavelLocal;
    this.variavelPublica;

    function FuncaoLocal() {}

    this.FuncaoPublica(){}

};

//ex.:1) Forma simples
module.exports = new MeuModulo();

ou

//Ex.:2) Forma padronizada para acessar os dados do módulo, que permite inclusive a exposição de outras instancias de classes, caso seja necessário. 
//Eu recomendo que seja mantido o mais simples/enxuto possível.
module.exports = {
    mod : new MeuModulo();
}
```

agora o exemplo de como usar:
```javascript
// ------------------------------------------------
// DEPENDÊNCIAS
// ------------------------------------------------
var meuModulo = require('./modules/MeuModulo.js');
//**************************************************

describe('1 - Nome do caso de teste: ', function () {

    it('1.1 - Nome do que será validado', function (){
        //Exemplo baseado no caso ex.:1 acima
        meuModulo.FuncaoPublica();

        //ou
        
        //Exemplo baseado no caso ex.:2 acima
        meuModulo.mod.FuncaoPublica();
    });

});

```

## parte-10
voltar para o [índice](#índice)
# Padrão para escrever os testes #
Segue abaixo algumas recomendações minhas baseadas em minha atual experiência.

* 1) Tente criar um conceito a ser atendido em cada **describe**, como por exemplo atender a um caso de uso específico, no final do texto termine com um caractere separador como ":" isso ajudará a encontrar o caso de teste quando um teste falhar.
* 2) Não perca tempo numerando os describes e os it(s), no próprio desenvolvimento do teste ou na manutenção dele isso te dará muito trabalho, preocupe-se em usar um portugues claro para definir os describes e os it(s)
* 3) Use a descrição do **it** para identificar o item sendo testado.
* 4) Declare as variáveis começando por letra minúscula.
* 5) Declare as classes e funções começando por Letras Maiúsculas.
* 6) De o mesmo nome de uma classe de um módulo para o arquivo dela.
* 7) Comente suas funções, Describe e ITs para que o próximo desenvolvedor compreenda o que você programou sem ter que ler e interpretar seu código.
* 8) Se seu código precisa de algumas variáveis/constantes para executá-lo, declare-as no topo do arquivo de teste.
* 9) Divirta-se! :p

## parte-11
voltar para o [índice](#índice)
# Padrão para organizar os arquivos de testes #
```javascript
Teste //Diretório dos arquivos de teste
__config.js //arquivo de configuração do protractor
__registros //Onde serão mantidos/criados os prints de tela dos testes.
__modulos //diretório onde todos os módulos ficarão
____pagina //Se a aplicação tem mais de uma rota coloque todos os arquivos em um diretório dessa página
__*-spec.js//Na raiz do diretório mantenha todos os seus arquivos de testes
//Exemplos
__Login-spec.js
__CRUDE-Contatos-spec.js //Spec específico para os casos de uso de CRUDE para Contatos
__CRUDE-Clientes-spec.js //Spec específico para os casos de uso de CRUDE para Clientes
```

## Parte-12
voltar para o [índice](#índice)
## Mantendo registros do teste ##
Existe uma forma de capturar prints das telas durante o processo de teste, permitindo assim manter registros sobre a execução dos testes, segue abaixo o código necessário:

```javascript
// ------------------------------------------------
// DEPENDÊNCIAS
// ------------------------------------------------
var fs = require('fs'); //para escrever em arquivo
//**************************************************

var TestFramework = function () {
    //salva em arquivo (função privada)
    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);

        stream.write(new Buffer(data, 'base64'));
        stream.end();
    };

    //Salva a tela
    this.salvarTela = function (nome) {
        browser.takeScreenshot().then(function (png) {
            writeScreenShot(png, 'tests/registros/' + nome + '.png');
        });
    };
});

//Usando a estrutura acima
var testeFw = new TestFramework();

//No parâmetro escreva o nome que deseja para o arquivo, sem a extenção
testeFw.salvarTela('NomeDoArquivos');
```
Eu recomendo que os nomes dos arquivos siga uma numeração em arvore assim como os testes para ser fácil compreender de que etapa é o registro.

Exemplo:

* 1.1-login.jpg
* 2.3.1-<nome descrito na função it>

## parte-13
voltar para o [índice](#índice)
## Como executo os testes desse projeto? ##

** Sobre os arquivos de configuração **

Este projeto possui 3 arquivos de configuração, segue abaixo a descrição de cada um
1) Config-angular.js

  Esta configuração roda apenas o spec da página do google, usa o jasmine 1.x e precisa de uma boa conexão com a internet para rodar uma vez que o recurso do site não é local
  
2) Config-basic.js
  
  Esta configuração roda 1 spec apenas usando o jasmine2, O propósito é mostrar como o Jasmine funciona, logo, não faz uso de teste sobre uma aplicação, apenas executa expectations do jasmine, ou seja, não tem uso do protractor para interagir com uma aplicação.
  
3) Config-todos.js
  
  Esta configuração roda 2 specs em sequencia, o objetivo é mostrar que é possível e recomendável que se divida o teste em vários arquivos spec para deixa-lo mais fácil de manter.
  
** Executando os testes **

Estando na raiz do seu projeto

No terminal digite: protractor <nome do arquivo de configuração>

Exemplo: protractor Config-angular.js
