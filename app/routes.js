function configState($stateProvider, $urlRouterProvider, $compileProvider) {

	// Optimize load start with remove binding information inside the DOM element
	$compileProvider.debugInfoEnabled(true);

	// Set default state
	$urlRouterProvider.otherwise("/manga");

	$stateProvider
  .state('contacts', {
	templateUrl: 'contacts.html',
	controller: function($scope){
	  $scope.contacts = [{ name: 'Alice' }, { name: 'Bob' }];
	}
  })
  .state('contacts.list', {
	templateUrl: 'contacts.list.html'
  });



	$stateProvider

		// Dashboard - Main page
	.state('app', {
		templateUrl: "app/views/template.html",
		data: {
			pageTitle: 'Dashboard'
		}
	})

	// index
	.state('app.manga_list', {
		url: "/manga",
		templateUrl: "app/views/page/manga-list.html",
		data: {
			pageTitle: 'Manga List'
		},
		controller: 'MangaListController'
	})

	.state('app.manga_detail', {
		url: "/manga/:manga_id",
		templateUrl: "app/views/page/manga-detail.html",
		data: {
			pageTitle: 'Manga Detail'
		},
		controller: 'MangaDetailController'
	})

	.state('app.manga_chapter', {
		url: "/manga/:manga_id/chapter",
		templateUrl: "app/views/page/manga-chapter.html",
		data: {
			pageTitle: 'Manga Chapter'
		},
		controller: 'MangaChapterController'
	})

	.state('app.manga_read', {
		url: "/manga/:manga_id/chapter/:chapter_id",
		templateUrl: "app/views/page/manga-read.html",
		data: {
			pageTitle: 'Manga Read'
		},
		controller: 'MangaChapterController'
	})

	// .state('app.index', {
	// 	url: '/manga',
	// 	views: {
	// 		'index-tab': {
	// 			templateUrl: "app/views/page/index.html",
	// 			controller: 'IndexController'
	// 		}
	// 	}
	// })

}

adminApp.config(configState)
	// .run(function($rootScope, $state, editableOptions) {
	//     $rootScope.$state = $state;
	//     editableOptions.theme = 'bs3';
	// });

adminApp.controller('MangaListController', ['$scope', '$http', function($scope, $http){
	// http://localhost/manga-api/public/api/browse
	$http.get('http://localhost/project-lumen/mangacrawler/public/api/manga').success(function(data){
		console.log(data);
		$scope.manga = {};
		$scope.result = data.result['data'];
	})
}])

adminApp.controller('MangaDetailController', ['$scope', '$http', '$state', function($scope, $http, $state){
	// http://localhost/manga-api/public/api/browse
	$http.get('http://localhost/project-lumen/mangacrawler/public/api/manga/' + $state.params.manga_id ).success(function(data){
		console.log(data);
		$scope.manga_id = $state.params.manga_id;
		$scope.item = data.data;
	})
}])

adminApp.controller('MangaChapterController', ['$scope', '$http', '$state', function($scope, $http, $state){
	// http://localhost/manga-api/public/api/browse
	$http.get('http://localhost/project-lumen/mangacrawler/public/api/manga/' + $state.params.manga_id + '/chapter' ).success(function(data){
		console.log(data);
		$scope.manga_id = $state.params.manga_id;
		$scope.result = data.result;
	})
}])

adminApp.controller('MangaReadController', ['$scope', '$http', '$state', '$window', function($scope, $http, $state, $window){
	// http://localhost/manga-api/public/api/browse
	$http.get('http://localhost/project-lumen/mangacrawler/public/api/manga/' + $state.params.manga_id + '/chapter/' + $state.params.chapter_id ).success(function(data){
		console.log(data);
		$scope.manga_id = $state.params.manga_id;
		$scope.chapter_id = $state.params.chapter_id;
		$scope.result = data.result;

		$scope.slickCurrentIndex = 0;
		$scope.slickConfig = {
			initialSlide: $scope.slickCurrentIndex,
			lazyLoad: 'progressive',
			arrows: true,
			infinite: false,
			method: {},
			event: {
				beforeChange: function (event, slick, currentSlide, nextSlide) {
				console.log('before change', Math.floor((Math.random() * 10) + 100));
				},
				afterChange: function (event, slick, currentSlide, nextSlide) {
				$scope.slickCurrentIndex = currentSlide;
				},
				breakpoint: function (event, slick, breakpoint) {
				console.log('breakpoint');
				},
				destroy: function (event, slick) {
				console.log('destroy');
				},
				edge: function (event, slick, direction) {
				console.log('edge');
				},
				reInit: function (event, slick) {
				console.log('re-init');
				},
				init: function (event, slick) {
				console.log('init');
				},
				setPosition: function (evnet, slick) {
				console.log('setPosition');
				},
				swipe: function (event, slick, direction) {
				console.log('swipe');
				}
			}
		};

		$scope.overlayClick = function(param){
			$window.scrollTo(0, 0);
			if(param=='next'){
				$scope.slickConfig.method.slickNext();
			}
			else if(param=='prev'){
				$scope.slickConfig.method.slickPrev();
			}
		}

	})
}])

