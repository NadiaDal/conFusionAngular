/**
 * Created by nadia on 22.12.15.
 */
'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")

    .service('menuFactory', ['$http', 'baseURL', function($http,baseURL) {
   
        this.getDishes = function(){
          return $http.get(baseURL+"dishes");
        };
        this.getDish = function (index) {
          return $http.get(baseURL+"dishes/"+index);

        };

	this.getPromotion = function(){
		return $http.get(baseURL + "promotions");
};
    }])

    .factory('corporateFactory', ['baseURL', '$http', function (baseURL, $http ) {
        var corfac = {};
       
        corfac.getLeaders = function () {
            return $http.get(baseURL + "leadership");
        }

        corfac.getLeader = function (index) {
            return $http.get(baseURL + "leadership/" +index)    
	};
 
        return corfac;

    }])
;
