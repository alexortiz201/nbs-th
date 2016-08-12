angular.module('main', [
  'apiService',
  'nbsSearch',
  'nbsGraph',
  'nbsBarGraph'
])
.value('accessToken', (function () {
  // put here for ease of use,
  // Config.token is unique
  return (window.nbsConfig && nbsConfig.token) ?
    nbsConfig.token : '';
}()))
.controller('MainController', function(accessToken,apiService) {
  // defaults
  let main = this;

  function search(searchString) {
    if (!searchString) {
      return;
    }

    main.artistName = searchString;

    apiService
      .fetchEntitiesByName(searchString)
      .then(({data}) => {
        console.log(data);
        // Stash artist array
        // also pick first from array for now
        main.searchResults = (data && data.artists) ?
          data.artists : [];

        if (main.searchResults[0]) {
          let dataObj = main.searchResults[0]['stage']['benchmarks'];

          // normalize data, which needs to be an array
          // of object with at least label and value
          main.data = Object.keys(dataObj).map((key) => {
            let stats = dataObj[key];

            return {
              id: stats.metric.id,
              label: stats.metric.full_name,
              value: stats.mean
            };
          });
        } else {
          main.data = [];
        }
      })
      .catch(err => console.log(err));
  }

  main.artistName = '';
  main.search = search;
  main.searchResults = [];
  main.data = [];

  apiService.setToken(accessToken);
});
