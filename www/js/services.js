angular.module('starter.services', [])

//Initialises the username and password as coded and saves them in sessionStorage
.service('StoreService', function(){
    //check if the 4 values are there in sessionStorage
    var dataExists = sessionStorage.getItem('username') != null && sessionStorage.getItem('password') != null 
        && sessionStorage.getItem('contacts') != null && sessionStorage.getItem('devices') != null;
    //if the data does not exist or the sessionStorage is not just the 4 values, clear it all and put in new values 
    if(dataExists != true || sessionStorage.length != 4){
        sessionStorage.clear();
        //Store default data if data does not exist
        sessionStorage.setItem('username', 'user');
        sessionStorage.setItem('password', 'secret');
        var contacts = [{
            id: 0,    name: 'Ben Sparrow',    phoneNumber: '012-234 5678',    face: 'img/ben.png'
        }, {
            id: 1,    name: 'Max Lynx',    phoneNumber: '013-999 0981',    face: 'img/max.png'
        }, {
            id: 2,    name: 'Adam Bradleyson',    phoneNumber: '015-677 9231',    face: 'img/adam.jpg'
        }, {
            id: 3,    name: 'Perry Governor',    phoneNumber: '013-345 6666',    face: 'img/perry.png'
        }, {
            id: 4,    name: 'Mike Harrington',    phoneNumber: '013-913 9112',    face: 'img/mike.png'
        }];
        var devices = [{
            id: 0,    name: 'Belt',    deviceID: 1233
        }, {
            id: 1,    name: 'Watch',    deviceID: 1244
        }, {
            id: 2,    name: 'WristBand',    deviceID: 1255
        }];
        sessionStorage.setItem('contacts', JSON.stringify(contacts));
        sessionStorage.setItem('devices', JSON.stringify(devices));
    }
})

.service('LoginService', function($q) {
    var username = sessionStorage.getItem('username');
    var password = sessionStorage.getItem('password');

    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == username && pw == password) {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.service('RegisterService', function($q) {
    //Temporary thing, will implement actual one later 
    return {
        registerUser: function(name, pw, pw2) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if(pw == pw2){
                sessionStorage.setItem('username', name);
                sessionStorage.setItem('password', pw);
                sessionStorage.setItem('contacts', JSON.stringify([]));
                sessionStorage.setItem('devices', JSON.stringify([]));
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Different password inputs.')
            }
            
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.factory('Contacts', function() {
  // Some fake testing data
  var contacts = JSON.parse(sessionStorage.getItem('contacts'));

  return {
    all: function() {
        return contacts;
    },
    getNewID: function(){
        return contacts.length ;
    },
    add: function(id, name, phoneNumber, image) {
        var x = { 
            id,
            name,
            phoneNumber,
            image
        };
        contacts.splice(0, 0, x);
        sessionStorage.setItem('contacts', JSON.stringify(contacts));
    },
    remove: function(contact) {
        contacts.splice(contacts.indexOf(contact), 1);
        sessionStorage.setItem('contacts', JSON.stringify(contacts));
    }
  };
})

.factory('Devices', function() {
  // Some fake testing data
  var devices = JSON.parse(sessionStorage.getItem('devices'));

  return {
    all: function() {
        return devices;
    },
    getNewID: function(){
        return devices.length;
    },
    add: function(id, name, deviceID) {
        var x = { 
            id,
            name,
            deviceID
        };
        devices.splice(0, 0, x);
        sessionStorage.setItem('devices', JSON.stringify(devices));
    },
    remove: function(device) {
        devices.splice(devices.indexOf(device), 1);
        sessionStorage.setItem('devices', JSON.stringify(devices));
    }
  };
})

.service('AccountService', function($q) {
    return {
        changeUsername: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name != sessionStorage.getItem('username') && pw == sessionStorage.getItem('password')) {
                deferred.resolve('Username change successfull, ' + name + ' !');
                sessionStorage.setItem('username', name)
            } else {
                deferred.reject('Wrong details.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },

        changePassword: function(oldPw, newPw, newPw2) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (oldPw == sessionStorage.getItem('password')) {
                if (newPw == newPw2){
                    deferred.resolve('Password change successfull!');
                    sessionStorage.setItem('password', newPw);
                }
                else{
                    deferred.reject('New passwords do not match.');
                }
            } else {
                deferred.reject('Incorrect password');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    };
});
