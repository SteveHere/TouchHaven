angular.module('starter.controllers', [])

.controller('StartCtrl', function($scope, $state) {
  setTimeout(function() {
    $state.go('login');
  }, 2000);
})

.controller('MainCtrl', function($scope, $ionicPopup) {
  $scope.call = function(){
    //To be implemented later
    //if(there is cellular connection)
    var alertPopup = $ionicPopup.alert({
      title: 'Calling 999'
    });
    console.log("Calling 999");
    /*
    else{
      var alertPopup = $ionicPopup.alert({
        title: 'Failed to call 999'
      });
    }
    */
  };
})

.controller('TandCCtrl', function($scope, $state) {
  $scope.back = function () {
    $state.go('app.settings');
  };
})

.controller('AccountCtrl', function($scope, $state) {
  $scope.loginData = {};
 
  $scope.usernameChange = function() {
    AccountService.changeUsername($scope.loginData.username, $scope.loginData.password).success(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Change of username successfull!'
          });
      }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Change of username failed!',
              template: 'Please check your details!'
          });
      });
  };

  $scope.passwordChange = function() {
    AccountService.changePassword($scope.loginData.oldPassword, $scope.loginData.newPassword, $scope.loginData.newPassword2).success(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Change of password successfull!'
          });
      }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Change of password failed!',
              template: 'Please check your details!'
          });
      });
  };

  $scope.back = function () {
    $state.go('app.settings');
  };
})

.controller('ContactsCtrl', function($scope, $state, $ionicPopup, Contacts) {
  $scope.contacts = Contacts.all();

  $scope.remove = function(contact) {
    Contacts.remove(contact);
  };

  $scope.add = function(name, phoneNumber, image){
    var id = Math.floor(Math.random() * 60000);
    var image = 'cdn4.iconfinder.com/data/icons/defaulticon/icons/png/256x256/media-shuffle.png';
    $scope.addData = {};
    var myPopUp = $ionicPopup.alert({      
      title: 'Enter contactdetails',
      template: '<input type="text" ng-model="addData.name"><br><input type="text" ng-model="addData.number">',
      scope: $scope,
      buttons: [{
        text: '<b>Add</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.addData.name & !$scope.addData.number) {
            e.preventDefault();
          } else {
            return $scope.addData.name + ',' + $scope.addData.number;
          }
        }
      }]
    });
    myPopUp.then(function() {
      console.log($scope.addData.name + ',' + $scope.addData.number);
      Contacts.add(id, $scope.addData.name, $scope.addData.number, image);
      $state.reload();
    });
  };

  $scope.back = function () {
    $state.go('app.settings');
  };
})

.controller('DevicesCtrl', function($scope, $state, $ionicPopup, Contacts) {
  $scope.contacts = Devices.all();
  
  $scope.remove = function(device) {
    Devices.remove(device);
  };

  $scope.add = function(name, deviceID){
    var id = Devices.getNewID();
    $scope.addData = {};
    var myPopUp = $ionicPopup.alert({      
      title: 'Enter device details',
      template: '<input type="text" ng-model="addData.name"><br><input type="text" ng-model="addData.number">',
      scope: $scope,
      buttons: [{
        text: '<b>Add</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.addData.name & !$scope.addData.number) {
            e.preventDefault();
          } else {
            return $scope.addData.name + ',' + $scope.addData.number;
          }
        }
      }]
    });
    myPopUp.then(function() {
      console.log($scope.addData.name + ',' + $scope.addData.number);
      Devices.add(id, $scope.addData.name, $scope.addData.number);
      $state.reload();
    });
  };

  $scope.back = function () {
    $state.go('app.settings');
  };
})

.controller('SettingsCtrl', function($scope, $state) {
  $scope.settings = {
    enableTracking: true,
    enableAutoText: true,
    enableClosestPolice: true,
  };

  $scope.goToAccount = function() {
    $state.go('account');
  };

  $scope.goToContacts = function() {
    $state.go('contacts');
  };

  $scope.goToDevices = function() {
    $state.go('devices');
  };

  $scope.goToTandC = function() {
    $state.go('tandc');
  };
})

.controller('DevicesCtrl', function($scope, $state) {
  $scope.settings = {
    enableTracking: true,
    enableAutoText: true,
    enableClosestPolice: true,
  };

  $scope.back = function() {
    $state.go('app.settings');
  };
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {

  $scope.loginData = {};
 
  $scope.login = function() {
    LoginService.loginUser($scope.loginData.username, $scope.loginData.password).success(function(data) {
          $state.go('app.main');
      }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
          });
      });
  };

  $scope.register = function(){
    $state.go('register');
  }
})

.controller('RegisterCtrl', function($scope, RegisterService, $ionicPopup, $state) {

  $scope.registerData = {};
 
  $scope.register = function() {
    RegisterService.registerUser($scope.registerData.username, 
      $scope.registerData.password, $scope.registerData.password2).success(function(data) {
          $state.go('app.main');
      }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Register failed!',
              template: 'Please check your credentials!'
          });
      });
  };

})

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
  function initialize() {
    var myLatlng = new google.maps.LatLng(3.139,101.6869);
    
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
    
    navigator.geolocation.getCurrentPosition(function(pos) {
      var x = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      $scope.map.setCenter(x);
      var myLocation = new google.maps.Marker({
            position: x,
            map: map,
            animation: google.maps.Animation.DROP,
            title: "My Location"
        });          
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });

    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      location.reload();
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      var x = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      var map = new google.maps.Map(document.getElementById("map"),{
        center: x,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      $scope.map.setCenter(x);
      var myLocation = new google.maps.Marker({
            position: x,
            map: map,
            animation: google.maps.Animation.DROP,
            title: "My Location"
        });
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });

    $ionicLoading.hide();
  
  };     
});