angular.module('nbsSearch', [])
  .directive('nbsSearch', function () {
    /**
     * The reason this has entityNameDud is to 
     * workaround the input's instantaneous update.
     */
    class NbsSearchComponent {
      constructor() {
        this.entityNameDud = '';
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
