'use strict';
angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
            
        $scope.showDetails = false;
        $scope.tab = 1;
        $scope.filtText = '';
            
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
        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
        var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])

        .controller('FeedbackController', ['$scope', function ($scope) {
        $scope.sendFeedback = function () {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
                    $scope.feedback.mychannel = "";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
        };
    }])

        .controller('DishCommentController', ['$scope', function ($scope) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
        $scope.survey = {rating: "5", comment: "", author: "", date: ""};
            
        $scope.$watch('survey.rating', function(val, old){    // Store rating as a number    
            $scope.survey.rating = parseInt(val)});
            
        $scope.submitComment = function () {
                //Step 2: This is how you record the date
            $scope.survey.date = new Date().toISOString();
            console.log($scope.survey);
                
                // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push($scope.survey);
                
                //Step 4: reset your form to pristine
            $scope.commentForm.$setPristine();
                
                //Step 5: reset your JavaScript object that holds your comment
            $scope.survey = {rating: "5", comment: "", author: "", date: ""};
                
        };
    }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
            
            var dish= menuFactory.getDish(parseInt($stateParams.id,10));
            $scope.dish = dish;
             
    }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            
            $scope.dish = menuFactory.getDish(0);    
            $scope.promo = menuFactory.getPromotion(0);  
            $scope.chef = corporateFactory.getLeader(3);
            
    }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
        
            $scope.leaders = corporateFactory.getLeaders();
            
    }])

;


