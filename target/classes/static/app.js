app.controller('docController',
    ['$scope', '$rootScope','docService','$http','$cookies', function($scope, $rootScope, docService, $http,$cookies) {

        $scope.file = '';        
       $scope.upload = function(){
    	 var fimport=document.getElementById("image1").src;
    	  // $(function(){
    		   //var fimport=$scope.file1;    		   
    		   //var fimport=$(".img-field div:nth-child(1) img").attr("src");    		
    		   //var fimport=$("#image1").attr("src");
    		  // fimage3=$(".img-field img:nth-child(3)").attr("src");
    	   
            alert(fimport);
            var select=false
     		if(document.getElementById("selected").checked)
     			select=true;     		
                        
            var dataObj={
         		   "designation": document.getElementById("designation").value,
         		    "description": document.getElementById("description").value,
         		    "prix": document.getElementById("prix").value,
         		    "steleted": select,
         		    "photo1": $cookies.get("idUser")+document.getElementById("description").value,
         		   "photo2": "photo2",
        		    "photo3": "photo3",
        		    "photo4": "photo4",
        		   "photo5": "photo5",
         		    "quantite": document.getElementById("quantite").value,
         		    "categorie": {"idCategorie":$scope.selectedCat},
         		    "cuisine":{"idCuisine":$scope.selectedCui},
         		    "user":{"idUser":$cookies.get("idUser")}
     		};          
            //var files=[fimport,null,null,null,null];
            docService.saveDoc(fimport,dataObj)
                .then(
                    function (response) {
                        alert("file uploaded successfully.");
                        alert(response.data);
                        $http.get("http://localhost:8080/doc").success(
                            function(response) {
                            	alert("success");
                                $rootScope.docList = response.data;
                            });
                    },
                    function (errResponse) {
                    		alert("err");
                    }
                );
    	   //});
        };
        
        $scope.edit = function(id){
        	
        	var fimport = document.getElementById("image1").src;
            var select=false
     		if(document.getElementById("select").checked)
     			select=true;     		
            
            var dataObj={
            		"idProduit":id,
         		   	"designation": $scope.selectedProduct.designation,
         		    "description": $scope.selectedProduct.description,
         		    "prix": $scope.selectedProduct.prix,
         		    "steleted": select,
         		    "photo1": $scope.selectedProduct.photo1,
         		    "photo2": "photo2",
         		    "photo3": "photo3",
         		    "photo4": "photo4",
         		    "photo5": "photo5",
         		    "quantite": $scope.selectedProduct.quantite,
         		   // "categorie": {"idCategorie":$scope.selectedCat},
         		    "cuisine":{"idCuisine":$scope.selectedCui},
         		    "user":{"idUser":$cookies.get("idUser")}
     		};
            var files=[fimport,null,null,null,null];
            docService.editDoc(files,dataObj)
                .then(
                    function (response) {
                        alert("file uploaded successfully.");
                        $http.get("http://localhost:8080/doc").success(
                            function(response) {
                            	alert("success");
                                $rootScope.docList = response.data;
                            });
                    },
                    function (errResponse) {
                    		alert("err");
                    }
                );
        };
    }
    ]);

app.constant('urls', {
    DOC_URL: 'http://localhost:8080/doc/'
});

app.directive('fileModel', [ '$parse', function($parse) {
    return {
        restrict : 'A',
        link : function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
} ]);

app.run(function($rootScope, $http) {
    $http.get("http://localhost:8080/doc")
	 .then(function(res){
		 $rootScope.docList = res.data;		 
	 });	 
    
});
