angular.module('nbsSearch', [])
  .directive('nbsSearch', function () {
    /**
     * This component is wired using a link function as well,
     * the reason is to workaround the input's instantaneous update.
     */
    class NbsSearchComponent {
      constructor() {
        this.entityNameDud = '';
      }

      searchClicked() {
        this.entityName = this.entityNameDud;
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
      controllerAs: 'ctrl',
      link: (scope) => {
        scope.ctrl.entityNameDud = scope.ctrl.entityName;
      }
    };
  });
