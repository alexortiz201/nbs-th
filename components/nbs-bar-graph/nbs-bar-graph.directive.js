angular.module('nbsBarGraph', [])
  .directive('nbsBarGraph', function () {
    class NbsBarGraphComponent {
      constructor($scope) {
        let currLabel = '';
        let barGraph = document.getElementsByClassName('nbs-bar-graph')[0];
        this.barGraphD3 = d3.select(barGraph);

        /**
         * label is being changed only when search is clicked
         */
        $scope.$watch(() => this.data, () => {
          if (!this.data ||
              !this.data.length ||
              this.label === currLabel) {
            return;
          }

          currLabel = this.label;

          this.drawGraph({
            label: this.label,
            data: this.data
          });
        });
      }

      drawGraph(opts) {
        this.barGraphD3.selectAll('*').remove();
        this.barGraphD3.append('h2').text(() => `${opts.label}`).attr('class', 'nbs-bar-graph-label')
         .selectAll('div')
         .data(opts.data).enter().append('div').attr('class', 'bar')
        .transition().ease('elastic')
         .style('width', d => `${d.value}%`)
         .text(d => `${d.label}`);
      }
    }

    return {
      restrict: 'E',
      templateUrl: 'components/nbs-bar-graph/nbs-bar-graph.html',
      scope: {
        label: '=',
        data: '='
      },
      controller: NbsBarGraphComponent,
      bindToController: true,
      controllerAs: 'ctrl'
    };
  });
