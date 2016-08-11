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
  function search(searchString) {
    main.artistName = searchString;

    apiService
      .fetchEntitiesByName(searchString)
      .then(({data}) => {
        console.log(data);
        // Stash artist array
        main.searchResults = (data && data.artists) ?
          data.artists : [];
      })
      .catch(err => console.log(err));
  }

  apiService.setToken(accessToken);

  // defaults
  let main = this;
  main.artistName = 'kid cudi';
  main.search = search;
  main.searchResults = [];

});
