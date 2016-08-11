angular.module('nbsSearch', [])
  .directive('nbsSearch', function () {
    class NbsSearchComponent {
      searchClicked() {
        this.searchFn();
      }
    }

    return {
      restrict: 'E',
      templateUrl: 'components/nbs-search/nbs-search.html',
      scope: {
        entityName: '=',
        searchFn: '&'
      },
      controller: NbsSearchComponent,
      bindToController: true,
      controllerAs: 'ctrl'
    };
  });
