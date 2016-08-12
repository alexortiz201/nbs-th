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
.controller('MainController', function (accessToken,apiService) {
  let main = this;

  function search(searchString) {
    if (!searchString) {
      return;
    }

    main.artistName = searchString;

    apiService
      .fetchEntitiesByName(searchString)
      .then(({data}) => {
        // Stash result array
        main.searchResults = (data && data.artists) ?
          data.artists : [];

        // pick first from array for now, using stage for analytics
        // not all artists return stage
        if (main.searchResults[0] && main.searchResults[0]['stage']) {
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

  // defaults
  main.artistName = 'kid cudi';
  main.search = search;
  main.searchResults = [];
  main.data = [];

  apiService.setToken(accessToken);

  search('kid cudi');
});
