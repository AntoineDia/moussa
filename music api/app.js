var app = new Vue({
  el: '#app',
  data(){
    return {
      searchWord: '',
      apiUrl: 'https://api.discogs.com/database/',
      key: 'UFLgyPUBEJKxNqmjwDmg',
      secret: 'ABFIqpBcvTZWcRVCRLbTOWoFJnKijFRM'
    }
  },
  methods: {
    search(){
      const auth = `&key=${this.key}&secret=${this.secret}`
      const url = `${this.apiUrl}/search?q=${this.searchWord+auth}`
      fetch(url)
        .then(r => r.json())
        .then(data => console.log(data))
    }
  },
})