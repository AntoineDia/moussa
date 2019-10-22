var app = new Vue({
  el: '#music_player_app',
  data: {
    files: [],
    currentSong: '',
    mediaTags: window.jsmediatags,
  },
  methods: {
    loadFiles: function(files) {
      this.files = Array.from(files).reduce((acc, file) => {
        console.log({acc, file})
        // file.type.includes('audio')
      }, [])
      // this.files.forEach(file => {
      //   Vue.set(file, 'url', URL.createObjectURL(file))
      // })
      // this.currentSong = this.files[0].url

      // jsmediatags.read(this.files[0], {
      //   onSuccess: (tag) => {
      //     console.log(tag);
      //   },
      //   onError: (error) => {
      //     console.log(error);
      //   }
      // });
    }
  },
})