/**
 * Created by nadia on 22.12.15.
 */
'use strict';
angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.dishes = menuFactory.getDishes();

        $scope.select = function (setTab) {
            $scope.tab = setTab;
            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };

    }])

    .controller('ContactController', ['$scope', function ($scope) {
        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };

        $scope.channels = [{value: "tel", label: "Tel."},
            {value: "Email", label: "Email"}];

        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', function ($scope) {
        $scope.sendFeedback = function () {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "", firstName: "", lastName: "",
                    agree: false, email: ""
                };
                $scope.feedback.mychannel = "";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };

    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory',
        function ($scope, $stateParams, menuFactory) {

            $scope.dish = menuFactory.getDish(parseInt($stateParams.id, 10));

           // $scope.dishFirst = menuFactory.getDish(0);

            $scope.userComment = {
                rating: "5",
                comment: "",
                author: "",
                date: ""
            };
            $scope.submit = function () {
                $scope.userComment.date = new Date(); // add property date
                //console.log($scope.userComment);
                $scope.userComment.rating = parseInt($scope.userComment.rating);
                $scope.userComentClone = angular.copy($scope.userComment); // save current comment to var
                $scope.dish.comments.push($scope.userComentClone); // add to array to the and current comment
                //console.log($scope.dish.comments);
                $scope.reset = function () {
                    $scope.userComment = {
                        rating: "5",
                        comment: "",
                        author: "",
                        date: ""
                    }
                };
                $scope.reset();
                $scope.commentForm.$setPristine();
            };
        }])

    .controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory',
        function ($scope, $stateParams, menuFactory, corporateFactory) {
            $scope.promos = menuFactory.getPromotion();
            $scope.dishes = menuFactory.getDishes();
            $scope.leader = corporateFactory.getLeader("Executive Chef");
            console.log("bla");
        }])

    .controller('AboutController', ['$scope', '$stateParams', 'corporateFactory',
        function ($scope, $stateParams, corporateFactory) {
            $scope.corporates = corporateFactory.getLeaders();

        }])
;