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

//Creates a new to do on the server (faked by the API but logs to console)
function createToDo(){
  var userDropdown = $("#userId-dropdown").val();
  var titleTextbox = $("#title-textbox").val();
  const url = 'https://jsonplaceholder.typicode.com/todos';
  console.log(userDropdown, titleTextbox);
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

$(document).ready(function() {
  //When page ready load userIds to dropdown and all todos into table.
  loadUserIds();
  loadToDosToTable();
  
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
  
});