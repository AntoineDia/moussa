var app = new Vue({
  el: '#music_player_app',
  data() {
    return{
      currentTime: 0,
      audio: null,
      isPlaying: false,
      audioContext: new AudioContext(),
      playlist: [],
      currentSong: '',
      icons: {
        folder: 'https://img.icons8.com/metro/26/f1e7ed/photos-folder.png',
        music: './icons/music.png',
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', this.controls)
    this.init()
  },
  methods: {
    clickUpdate(ev){
      this.updateAudioTime(ev.target.value)
    },
    moveUpdate(ev){
      if( ev.buttons === 1 ) this.updateAudioTime(ev.target.value)
    },
    updateAudioTime(value){
      this.audio.currentTime = value
    },
    updateCurrentTime(){
      this.currentTime = this.audio.currentTime
    },
    init(){
      this.audio = document.getElementById('audioPlayer')
    },
    controls(ev){
      switch(ev.code){
        case "Space":
          this.isPlaying ? this.audio.pause() : this.audio.play()
          this.isPlaying = !this.isPlaying
          break;
        default: break;
      }
    },
    getTags(file){
      return new Promise(resolve => jsmediatags.read(file, {
        onSuccess: tag => resolve(tag.tags),
        onError: function(error) { console.log(error) }
      }))
    },
    getAlbumArtUrl(picture){
      if(!picture) return this.icons.music
      const byteArray = new Uint8Array(picture.data)
      const blob = new Blob([byteArray], {type: picture.type})
      return URL.createObjectURL(blob)
    },
    getTrackInfo: async function(file){
      const tags = await this.getTags(file)
      return {
        url: URL.createObjectURL(file),
        albumArtUrl: this.getAlbumArtUrl(tags.picture),
        name: file.name,
        title: tags.title,
        artist: tags.artist,
        album: tags.album
      }
    },
    loadFiles: async function(files) {
      for (const file of files) {
        if(!file.type.includes('audio')) continue
        const loadTrack = this.getTrackInfo(file)
        loadTrack.then( track => {
          if(!this.currentSong) this.currentSong = track
          this.playlist.push(track)
        } )
      }
    },
  },
})