//var generalFunctions = require('../GeneralFunctions.js');

var AngularSite_TodoList = function () {

    this.inputTextItem = element(by.model('todoList.todoText'));
    this.button_add = element(by.buttonText('add'));
    this.TodoListItens = element.all(by.repeater('todo in todoList.todos'));

    //Esta função direciona o brownser para abrir a página a ser testada
    this.go = function () {
        browser.get('https://angularjs.org/');
    }

    this.addItemTodo = function (item_string) {
        this.inputTextItem.sendKeys(item_string);
        this.button_add.click();
    }

    this.getTodoListCount = function () {
        return this.TodoListItens.count();
    }



};

module.exports = new AngularSite_TodoList();