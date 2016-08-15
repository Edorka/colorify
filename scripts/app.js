"use strict";

var SETTINGS = {};

var app = document.app = (function(settings){
    settings = settings || SETTINGS;

    var textEntry = null, textOutput = null;
    var containers = [];
    var colorsStyle = null
    function init(){
        console.log(event, this);
        textEntry = document.getElementById('text-entry'); 
        textOutput = document.getElementById('text-output'); 
        document.getElementById('edition').classList.add('on');
        containers = document.getElementsByClassName('switch');
        colorsStyle = document.getElementById('colors');
        
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
        var classes = colors(['red', 'blue']);
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
        switchTo: switchTo      
    };
    return _methods;
}());

document.addEventListener("DOMContentLoaded", app.init);
