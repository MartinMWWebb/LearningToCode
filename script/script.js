
function loadUserIds() {
  let userDropdown = $("#userId-dropdown");
  userDropdown.empty();
  userDropdown.append('<option selected="true" disabled>Choose User</option>');
  userDropdown.prop('selectedIndex', 0);
  const url = 'https://jsonplaceholder.typicode.com/users';
// Populate dropdown with list of userIds
  $.getJSON(url, function (data) {
    var uniqueUserIds = $.unique(data.map(function (i) {
      return i.id;
    }));
    $.each(uniqueUserIds, function (key, val) {
    userDropdown.append($('<option></option>').text(val).val(val));
    })
  });
};

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

$(document).ready(function() {
  loadUserIds();
  
  loadToDosToTable();
  
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