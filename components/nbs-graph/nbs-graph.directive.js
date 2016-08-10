angular.module('nbsGraph', [])
  .directive('nbsGraph', function () {
    class NbsGraphComponent {
      constructor($scope) {
        console.log('nbsGraph loaded');
      }
    }

    return {
      restrict: 'E',
      template: `<div>
        <h1>"{{ctrl.entityName}}"!</h1>
        <div class="results" 
          ng-if="ctrl.searchResults.length >= 1">
          <ul class="result-items">
          <li
            class="result"
            ng-repeat="result in ctrl.searchResults">
            {{result.name}}
          </li>
        </div>
      </div>`,
      scope: {
        entityName: '=',
        searchResults: '='
      },
      controller: NbsGraphComponent,
      bindToController: true,
      controllerAs: 'ctrl'
    };
  });
