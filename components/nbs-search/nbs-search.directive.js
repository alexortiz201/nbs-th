angular.module('nbsSearch', [])
  .directive('nbsSearch', function () {
    class NbsSearchComponent {
      searchClicked() {
        this.searchFn();
      }
    }

    return {
      restrict: 'E',
      template: `<div class="search-container">
          <label>Name:</label>
          <input type="text" ng-model="ctrl.entityName" placeholder="Enter a name here" />
          <button ng-click="ctrl.searchClicked()">Search</button>
          <hr>
        </div>`,
      scope: {
        entityName: '=',
        searchFn: '&'
      },
      controller: NbsSearchComponent,
      bindToController: true,
      controllerAs: 'ctrl'
    };
  });
