angular.module('nbsGraph', [])
  .directive('nbsGraph', function () {
    class NbsGraphComponent {
      constructor($scope) {
        console.log('nbsGraph loaded');
      }
    }

    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'components/nbs-graph//nbs-graph.html',
      scope: {
        entityName: '=',
        searchResults: '='
      },
      controller: NbsGraphComponent,
      bindToController: true,
      controllerAs: 'ctrl'
    };
  });
