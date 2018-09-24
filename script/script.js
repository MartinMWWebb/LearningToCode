//Calls jsonplaceholder and loads list of user id's into dropdown
function loadUserIds() {
  var userDropdown = $("#userId-dropdown");
  //ensure dropdown is empty of values
  userDropdown.empty();
  //Set defaut non selecable option to 'choose user'
  userDropdown.append('<option selected="true" disabled>Choose User</option>');
  userDropdown.prop('selectedIndex', 0);
  //set URL to collect data from
  const url = 'https://jsonplaceholder.typicode.com/users';
  //Populate dropdown with list of userIds
  $.getJSON(url, function (data) {
    var uniqueUserIds = $.unique(data.map(function (i) {
      return i.id;
    }));
    $.each(uniqueUserIds, function (key, val) {
    userDropdown.append($('<option></option>').text(val).val(val));
    })
  });
};

//Calls jsonplaceholder and loads list of todos into table
function loadToDosToTable() {
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
    $('#toDoTable tr:last').after(toDos);
  });
};

function loadToDosToTableEdit() {
  $.getJSON('https://jsonplaceholder.typicode.com/todos', function (data) {
    var toDos = [];
    $.each(data, function (key, val) {
      toDos.push(
        '<tr contenteditable="true">'
        + '<td style="display:none">' + (JSON.stringify(val.id)) + "</td>"
        + '<td>' + (JSON.stringify(val.userId) + "</td>" 
        + '<td>' + (JSON.stringify(val.title)) + "</td>"
        + '<td>' + (JSON.stringify(val.completed)) + "</td>"
        + "</tr>"
      ));
    });
    $('#toDoTable-editable tr:last').after(toDos);
  });
};

//Work in progress to have multiple dropdowns working to filter data
function filter(){
  var userData, completeData, userFilter, completeFilter
  
  userFilter = $("#userId-dropdown option:selected").text();
  completeFilter = $("#completed-dropdown option:selected").text();
  userData = $("#toDoTable td:nth-child(2)").text();
  completeData = $("#toDoTable td:nth-child(4)").text();
  console.log (
    "UF", userFilter,
    "CF", completeFilter,
    "UD", userData,
    "CD", completeData
  );
  
  if (userData != userFilter && completeData != completeFilter){
    $(this).parent().hide();
  }
  else {
    $(this).parent().show();
  }
};

//Creates a new to do on the server (faked by the API but logs to console as a success)
function createToDo(){
  var userDropdown = $("#userId-dropdown").val();
  var titleTextbox = $("#title-textbox").val();
  var result = ("");
  const url = 'https://jsonplaceholder.typicode.com/todos';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
    userId: userDropdown,
    title: titleTextbox,
    completed: 'false'
  }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
};

//Testing updating server 
function updateToDos(){
  var myObjects = [];
  myObjects = getAllRows();
  console.log(myObjects);
  const url = 'https://jsonplaceholder.typicode.com/todos';
  fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({
    id: myObjects.id,
    userId: myObjects.userId,
    title: myObjects.title,
    completed: myObjects.completed
  }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
};


function getAllRows(){
  var myObjects = [];
  $('#toDoTable-editable tr').each(function (index, value){
    var row = getRow(index);
    myObjects.push(row);
  });
  //Removes the heading row
  myObjects.shift();
  return myObjects;
};

// Read the row into an object
function getRow(rowNum){
  var row = $('#toDoTable-editable tr').eq(rowNum);
  var myObject = {};
  myObject.id = row.find('td:eq(0)').text();
  myObject.userId = row.find('td:eq(1)').text();
  myObject.title = row.find('td:eq(2)').text();
  myObject.completed = row.find('td:eq(3)').text();
  return myObject;
};


$(document).ready(function() {
  //When page ready load userIds to dropdown and all todos into table.
  loadUserIds();
  loadToDosToTable();
  loadToDosToTableEdit();
  
  //When userID is changed filter items in table
  $("#userId-dropdown").on("change",function(){
    var a = $(this).find("option:selected").html();
    $("#toDoTable tr td:nth-child(2)").each(function(){
      if($(this).html() != a){
        $(this).parent().hide();
      }
      else{
        $(this).parent().show();
      };
    });
  });
  
  //--for editable table test--- When userID is changed filter items in table
  $("#userId-dropdown").on("change",function(){
    var a = $(this).find("option:selected").html();
    $("#toDoTable-editable tr td:nth-child(2)").each(function(){
      if($(this).html() != a){
        $(this).parent().hide();
      }
      else{
        $(this).parent().show();
      };
    });
  });

});