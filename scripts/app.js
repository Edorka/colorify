"use strict";

var app = document.app = (function(settings){
    var SETTINGS = {
        validColors: validCSSColors
    };
    settings = settings || SETTINGS;
    var textEntry = null, textOutput = null;
    var saveButton = null;
    var containers = [];
    var colorsStyle = null;
    var errorsList = null, colorsInput = null;
    function init(){
        console.log(event, this);
        textEntry = document.getElementById('text-entry'); 
        textOutput = document.getElementById('text-output'); 
        document.getElementById('edition').classList.add('on');
        containers = document.getElementsByClassName('switch');
        colorsStyle = document.getElementById('colors');
        colorsInput = document.getElementById('colors-input');
        saveButton = document.getElementById('save-button');
        errorsList = document.getElementById('errors-list');
    }
    var nameSeqEx = /^([a-zA-Z]+)((?:,\s?)?[a-zA-Z]+)*$/;
    function verifyColors(input, event){
        console.log(input.value);
        var errors = [];
        console.log('names', names);
        if (!  input.value.match(nameSeqEx) ){
            errors = errors || {};
            errors.push('insert color names separated by a comma');
        } else {
            var names = input.value.split(', ');
            for (var current = 0; current < names.length; current ++){
                var name = names[current];
                if ( settings.validColors.indexOf(name) === -1 ){
                    errors.push('color '+ name +' is not recognized as color');
                }
            }
        } 
        var list = "";
        if ( errors.length > 0 ){
            for (var current = 0; current < errors.length; current ++){
                var error = errors[current];
                list += '<li>'+error;
            }
            saveButton.disabled = true;
        } else {
            saveButton.disabled = false;
        }
        errorsList.innerHTML = list;
    }
    function colors(colors){
        colors = colors || [];
        var styling = '';
        var classes = [];
        for (var current = 0; current < colors.length; current ++){
            var classname = "a"+current;
            var color = colors[current];
            styling += '.'+classname+'{ color:'+color+';}';
            classes.push(classname);
        }
        colorsStyle.innerHTML = styling;
        return classes;
    }
    function randomChoice(elements, except){
        var result = null;
        var posibilities = elements.length;
        if (posibilities > 1){
            while ( result === null ){
                var election = Math.floor((Math.random() * posibilities));
                var choice = elements[election];
                result = (choice !== except) ? choice : null; 
            } 
        } else {
            result = elements[0];
        }
        return result;
    }
    function save(){
        var classes = colors(colorsInput.value.split(', '));
        var source = textEntry.value;
        var lastClass = null;
        for (var current = 0; current < source.length; current ++){
            var letter = source[current];
            var colorClass = randomChoice(classes, /*except*/lastClass);
            lastClass = colorClass;
            textOutput.innerHTML += '<span class="'+colorClass+'">'+letter+'</span>';
        } 
        switchTo('output');
    }
    function edit(){
        switchTo('edition');
    }
    function switchTo(id){
        for (var current = 0; current < containers.length; current ++){
            var container = containers[current];
            if ( container.id === id ){
                container.classList.add('on');
            } else {
                container.classList.remove('on');
            }
        }
    }
    var _methods = {
        init: init,
        edit: edit,
        save: save,
        colors: colors,
        switchTo: switchTo,
        verifyColors: verifyColors     
    };
    return _methods;
}());

document.addEventListener("DOMContentLoaded", app.init);

