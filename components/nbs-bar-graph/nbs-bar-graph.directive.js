angular.module('nbsBarGraph', [])
  .directive('nbsBarGraph', function () {
    class NbsBarGraphComponent {
      constructor($scope) {
        let barGraph = document.getElementsByClassName('nbs-bar-graph')[0];
        this.barGraphD3 = d3.select(barGraph);

        /**
         * Ideally this watcher is debounced,
         * or don't watch just trigger on click
         */
        $scope.$watch(() => this.label, (newVal) => {
          this.drawGraph({ label: this.label, data: this.data });
        });
      }


      drawGraph(opts) {
        this.barGraphD3.selectAll('*').remove();
        this.barGraphD3.append('h2').text(() => `${opts.label}`).attr('class', 'nbs-bar-graph-label')
         .selectAll('div')
         .data(opts.data).enter().append('div').attr('class', 'bar')
        .transition().ease('elastic')
         .style('width', d => `${d}%`)
         .text(d => `${d}%`);
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
      // ,
      // link: function (scope) {
      //   let self = scope.ctrl;
      //   let {label, data} = self;
      //   let opts = {
      //     label,
      //     data
      //   }

      //   self.drawGraph(opts);
      // }
    };
  });
