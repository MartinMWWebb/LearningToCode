
function loadButton1() {
  $.getJSON('https://jsonplaceholder.typicode.com/todos/1', function (data) {
    var text = `UserId : ${data.userId}<br>
                    id : ${data.id}<br>
                    Title : ${data.title}<br>
                    Completed : ${data.completed}`
        $(".toDoData").html(text);
          });
      };

function loadButton2() {
  $.getJSON('https://jsonplaceholder.typicode.com/todos/2', function (data) {
    var text = `UserId : ${data.userId}<br>
                    id : ${data.id}<br>
                    Title : ${data.title}<br>
                    Completed : ${data.completed}`
        $(".toDoData").html(text);
          });
      };

function loadToTable() {
  $.getJSON('https://jsonplaceholder.typicode.com/todos', function (data) {
    var toDos = [];
    $.each(data, function (key, val) {
      toDos.push(
        "<tr>"
        + "<td>" + (JSON.stringify(val.id)) + "</td>"
        + "<td>" + (JSON.stringify(val.userId) + "</td>" 
        + "<td>" + (JSON.stringify(val.title)) + "</td>"
        + "<td>" + (JSON.stringify(val.completed)) + "</td>"
        + "</tr>"
      ));
    });
    //$('.toDos').html(toDos);
    $('#toDoTable tr:last').after(toDos);
  });
};


/*
//--No longer in use--//
function loadButton3() {
  $.getJSON('https://jsonplaceholder.typicode.com/posts', function (data) {
    var toDos = [];
    $.each(data, function (key, val) {
      toDos.push("<p>" + (JSON.stringify(val)) + "</p>");
    });
    $('.toDos').html(toDos);
  });
};
*/