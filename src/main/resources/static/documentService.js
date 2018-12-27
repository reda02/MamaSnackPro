'use strict';
//var App = angular.module('uploadApp',[]);

app.factory('docService', ['$http', '$q', 'urls', function ($http, $q, urls) {
            var factory = {
                saveDoc: saveDoc,
                findDoc: findDoc,
                editDoc: editDoc
            };

            return factory;

            function saveDoc(files,dataObj) {
                var deferred = $q.defer();                
                var formData = new FormData();
                
                /*for(var i = 0; i < files.length; i++){
                	formData.append('file'+i, files[i]);
                }*/               
                alert(files);
                formData.append('file1', files);
                /*formData.append('file2', files[1]);
                formData.append('file3', files[2]);
                formData.append('file4', files[3]);
                formData.append('file5', files[4]);*/
                formData.append('json',JSON.stringify(dataObj));
                console.log(formData);
                $http.post('http://localhost:8080/addProduit', formData,{
                    transformRequest : angular.identity,
                    headers : {
                        'Content-Type' : undefined
                    }})
                    .then(
                        function (response) {
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            alert(errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
            function editDoc(file,dataObj) {
            	alert("fact");
                var deferred = $q.defer();                
                var formData = new FormData();
                formData.append('file', file);
                formData.append('json',JSON.stringify(dataObj));
                $http.post('http://localhost:8080/updateProduit', formData,{
                    transformRequest : angular.identity,
                    headers : {
                        'Content-Type' : undefined
                    }})
                    .then(
                        function (response) {
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            alert(errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function findDoc(docId) {
                var deferred = $q.defer();
                $http.get(urls.DOC_URL + '/'+docId)
                    .then(
                        function (response) {
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            alert(errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);