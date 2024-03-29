var app = new Vue({
  el: '#music_player_app',
  data() {
    return{
      currentTime: 0,
      audio: null,
      isPlaying: false,
      audioContext: '',
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
      if(ev.buttons === 1) this.updateAudioTime(ev.target.value)
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
      if(ev.keyCode == 32 && ev.target == document.body) {
        ev.preventDefault()
        ev.stopPropagation()
      }
      if(!this.currentSong) return
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
    changeSong(track){
      this.currentSong = track
      setTimeout(()=>app.isPlaying ? app.audio.play() : '')
    },
    nextSong(){
      const i = this.playlist.indexOf(this.currentSong)
      this.playlist[i+1] ?
        this.currentSong = this.playlist[i+1] :
        this.currentSong = this.playlist[0]
      setTimeout(()=>app.isPlaying ? app.audio.play() : '')
    },
    loadFiles: async function(files) {
      this. audioContext = new AudioContext()
      for (const file of files) {
        if(!file.type.includes('audio')) continue
        const loadTrack = this.getTrackInfo(file)
        loadTrack.then( track => {
          if(!this.currentSong) {
            this.currentSong = track
            setTimeout(() => {
              app.audio.play()
              app.isPlaying = true
            } )
          }
          this.playlist.push(track)
        } )
      }
    },
  },
})