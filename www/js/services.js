angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'user' && pw == 'secret') {
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
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var contacts = [{
    id: 0,
    name: 'Ben Sparrow',
    phoneNumber: '012-234 5678',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    phoneNumber: '013-999 0981',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    phoneNumber: '015-677 9231',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    phoneNumber: '013-345 6666',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    phoneNumber: '013-913 9112',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
        return contacts;
    },
    add: function(id, name, phoneNumber, image) {
        var x = { 
            id,
            name,
            phoneNumber,
            image
        };
        contacts.splice(0, 0, x);
    },
    remove: function(contact) {
        contacts.splice(contacts.indexOf(contact), 1);
    }
  };
});
