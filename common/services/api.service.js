angular.module('apiService', [])
  .value('apiRouteConstants', (function() {
    const domain = 'https://api.nextbigsound.com';

    return {
     TIME_SERIES_ENTITIES: `${domain}/metrics/v1/entityData?start=2013-01-01&end=2014-01-01&metrics=11,28&entities=`,
     ENTITY_EVENT_DATA: `${domain}/events/v1/artists/$_ID?start=15706&end=16075`,
     SEARCH_ARTIST: `${domain}/search/v1/artists/?limit=15&query=`
   };
  }()))
  .factory('apiService', function ($http, apiRouteConstants) {
    const api = apiRouteConstants;
    const apiService = function () {
      let _authenticated = false;
      let _token = '';

      /**
       * check to see if token is set,
       * if token is not set user is not authd
       * else authenticate user
       * @return {boolean}
       *
       * NOTE: decorators would be lovely for this
       */
      function isAuthd() {
        if (!_token) {
          return false;
        }

        _authenticated = true;
        return true;
      }

      /**
       * use setter to set access token
       * @param {string} tkn access token string
       */
      function setToken(tkn) {
        _token = tkn || '';
      }

      // normalize query
      function cleanQuery(query) { 
        query = query.toLowerCase().trim();
        query = query.replace(' ', '+');

        return query;
      }

      /**
       * http fetch
       * @param  {string} url resource url
       * @return {Promise}
       */
      function fetchData(url) {
        if (!isAuthd()) {
          return Promise.reject('You Need Authentication for this!');
        }

        return $http({
          method: 'GET',
          cache: true,
          url: `${url}&access_token=${_token}`
        });
      }

      /**
       * fetches Entities by name
       * defaults to kid cudi
       *
       * @param  {String} query name of artist
       * @return {Promse}       promise resolving 
       * with artist's info
       */
      function fetchEntitiesByName(query = 'kid cudi') {
        const url =`${api.SEARCH_ARTIST}${cleanQuery(query)}`;
        return fetchData(url);
      }

      /**
       * Fetches Entities' fb likes and twitter followers
       * defaults to Beyonce, Kanye West, Taylor Swift
       *
       * @param  {Array}  idArray array of entity ids
       * @return {Promise}
       */
      function fetchEntitiesByIds(idArray = [510,356,143]) {
        const url =`${api.TIME_SERIES_ENTITIES}${idArray.join(',')}`;
        return fetchData(url);
      }

      /**
       * Fetches event data for Enity
       * defaults to Beyonce R&B Artist' events
       *
       * @param  {Array}  idArray array of entity ids
       * @return {Promise}
       */
      function fetchEventsByEntityId(id = 510) {
        const url =`${api.ENTITY_EVENT_DATA.replace('$_ID', id)}`;
        return fetchData(url);
      }

      function fetchAllData() {
        console.log('getSomething...', apiRouteConstants);
      }

      return {
        setToken,
        fetchEntitiesByName,
        fetchEntitiesByIds,
        fetchEventsByEntityId,
        fetchAllData
      };
    };

    return apiService();
  });
