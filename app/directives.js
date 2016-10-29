adminApp.directive('includeReplace', function () {
	return {
		require: 'ngInclude',
		restrict: 'A', /* optional */
		link: function (scope, el, attrs) {
			el.replaceWith(el.children());
		}
	};
})
.directive('sidebarTree', function () {
	return {
		// restrict: 'A', /* optional */
		link: function (scope, el, attrs) {
			
			$AdminLTE.tree('.'+attrs.class);

		}
	};
})
.directive('sidebarToggle', function () {
	return {
		restrict: 'A', /* optional */
		link: function (scope, el, attrs) {
			
			$AdminLTE.pushMenu.activate(el);

		}
	};
})
.directive('sameHeight', function ($window, $timeout) {
	var sameHeight = {
		restrict: 'A',
		groups: {},
		link: function (scope, element, attrs) {
			$timeout(getHighest); // make sure angular has proceeded the binding
			angular.element($window).bind('resize', getHighest);

			function getHighest() {
				if (!sameHeight.groups[attrs.sameHeight]) { // if not exists then create the group
					sameHeight.groups[attrs.sameHeight] = {
						height: 0,
						elems:[]
					};
				}
				sameHeight.groups[attrs.sameHeight].elems.push(element);
				element.css('height', ''); // make sure we capture the origin height

				if (sameHeight.groups[attrs.sameHeight].height < element.outerHeight()) {
					sameHeight.groups[attrs.sameHeight].height = element.outerHeight();
				}
			  
				if(scope.$last){ // reinit the max height
				   angular.forEach(sameHeight.groups[attrs.sameHeight].elems, function(elem){
						elem.css('height', sameHeight.groups[attrs.sameHeight].height);
					  
					});
					sameHeight.groups[attrs.sameHeight].height = 0;
				}
			}
		}
	};
	return sameHeight;
})
.directive('myslick', function($timeout) {
	return {
		restrict: 'A',
		scope: {
			config: '='
		},
		link: function(scope, el, attrs) {
			$timeout((function() {
				el.slick(scope.config);
			}), 1000);
		}
	}
});