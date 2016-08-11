angular.module('nbsBarGraph', [])
  .directive('nbsBarGraph', function () {
    class NbsBarGraphComponent {
      constructor($scope) {
        console.log('nbsBarGraph loaded');
      }
    }

    return {
      restrict: 'E',
      templateUrl: 'components/nbs-bar-graph/nbs-bar-graph.html',
      scope: {
        data: '='
      },
      controller: NbsBarGraphComponent,
      bindToController: true,
      controllerAs: 'ctrl',
      link: function (scope, element, attrs) {
        let barGraph = document.getElementsByClassName('nbs-bar-graph')[0];
        let barGraphD3 = d3.select(barGraph);
        let data = scope.ctrl.data;

        barGraphD3
         .selectAll('div')
         .data(data).enter().append('div').attr('class', 'bar')
        .transition().ease('elastic')
         .style('width', d => `${d}%`)
         .text(d => `${d}%`);
      }
    };
  });
