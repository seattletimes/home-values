// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("angular");
var app = angular.module("home-values", []);

homeData.forEach(function(row) {
  console.log(row.percent)
  if (row.percent.indexOf("-") > -1) {
    row.down = true;
    row.percent = row.percent.replace("-", "");
  } else {
    row.up = true;
  }
});

app.controller("HomeController", ["$scope", function($scope) {
  var all = homeData;

  $scope.untouched = true;

  $scope.search = debounce(function() {
    
    var value = $scope.searchText;

    if (!value) {
      $scope.found = [];
      $scope.untouched = true;
    } else {
      value = value.toLowerCase();
      var filtered = all.filter(function(item) {
        return (item.city.toLowerCase().indexOf(value) == 0 || item.county.toLowerCase().indexOf(value) == 0);
      });
      $scope.found = filtered;
      $scope.untouched = false;
    }
    $scope.$apply();
  });

  $scope.found = [];
}]);

var debounce = function(f, interval) {
  var timeout = null;
  return function() {
    if (timeout) return;
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    timeout = setTimeout(function() {
      f.apply(null, args);
      timeout = null;
    }, interval || 400);
  };
};
