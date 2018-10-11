angular.module("app", ["ngResource", "app.constants", "app.packager", "app.calculator", "app.texter"])

.factory('APIRequests', function($resource) {
  return $resource('http://kernl.rocks/api/v2/public/entries.json?storage_id=15')
})

.run(["$rootScope", function($rootScope){

  $rootScope.sendBoxInfo = function(name){
    $rootScope.$broadcast("form:info", "Unverbindliches Angebot, Box " + name)
  }

}])

.controller("ContactCtrl", function($scope, APIRequests, $timeout){

  var reset = function() {
    $scope.form = new APIRequests({
      name: "",
      contact: "",
      message: "",
      info: ""
    })
  }
  reset()

  $scope.sent = false
  $scope.sending = false

  $scope.$on("form:info", function(evt, info){
    $scope.form.info = info
  })

  $scope.send = function(info) {
    $scope.sending = true
    if(info)
      $scope.form.info = info
    $scope.form.$save({}, function(){
      $scope.sending = false
      $scope.sent = true
      reset()
      $timeout(function(){
        $scope.sent = false
      }, 5000)
    }, function() {
      $scope.sent = false
      $scope.sending = false
    })
  }

})


.controller("CalcCtrl", [ "$scope", "$rootScope", "BOXES", "BoxFor", "BoxPriceFor", "ConfigDescriptionFor", function($scope, $rootScope, boxes, BoxFor, BoxPriceFor, ConfigDescriptionFor){

  $scope.config = {
    boxsize: "210x150",
    boxheight: "14",
    amount:      "250",
    items_count: "3",
    items: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    booklet:        false,
    booklet_format: "a6",
    booklet_pages:  "4",
    booklet_setup:  "oo",
    case:           false,
    case_print:     "0",
    finishing: {
      uv_lack:   false,
      cellophan: false,
      magnet:    false,
      hal:       false,
    },
    setup:         "boxful", // boxful, own
    box_assembling: false,
    put_items:      false,
  }

  $scope.total = null

  var boxesIndex = {
    '150x105x14': 's01x150x105x14',
    '150x105x27': 's02x150x105x27',
    '150x105x42': 's03x150x105x42',
    '210x105x14': 's04x210x105x14',
    '210x105x27': 's05x210x105x27',
    '210x105x42': 's06x210x105x42',
    '210x150x14': 's07x210x150x14',
    '210x150x27': 's08x210x150x27',
    '210x150x42': 's09x210x150x42',
    '210x210x14': 's10x210x210x14',
    '210x210x27': 's11x210x210x27',
    '210x210x42': 's12x210x210x42',
    '300x210x14': 's13x300x210x14',
    '300x210x27': 's14x300x210x27',
    '300x210x42': 's15x300x210x42',
  }

  // Watch configuration and recalculate
  $scope.$watch("config", function(){
    $scope.box = boxes[boxesIndex[$scope.config.boxsize + 'x' + $scope.config.boxheight]]
    $scope.price = BoxPriceFor($scope.config, $scope.box) / parseFloat($scope.config.amount) * 1.15
  }, true)

  $scope.sendConfig = function(){
    $rootScope.$broadcast("form:info", "Unverbindliches Angebot \n" + ConfigDescriptionFor($scope.config, boxesIndex[$scope.config.boxsize + 'x' + $scope.config.boxheight]))
  }

}])
