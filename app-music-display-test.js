var app = new Vue({
  el: '#music_player',
  data: {
    audio: new Audio('Bobby.Brown_Every.Little.Step.mp3'),
    ctx_audio: new AudioContext(),
    analyser: null,
    canvas: null,
    ctx: null,
    fbc_array: null
  },
  mounted(){ this.initMp3Player() },
  methods: {
    initMp3Player(){
      this.audio.controls = true
      this.audio.autoplay = false
      this.$refs.audio_box.appendChild(this.audio)
      this.analyser = this.ctx_audio.createAnalyser()
      this.canvas = this.$refs.analyser
      this.ctx = this.canvas.getContext('2d')
      var source = this.ctx_audio.createMediaElementSource(this.audio)
      source.connect(this.analyser)
      this.analyser.connect(this.ctx_audio.destination)
      this.ctx_audio.resume()
      this.frameLooper()
    },
    frameLooper(){
      window.requestAnimationFrame(this.frameLooper)
      this.fbc_array = new Uint8Array(this.analyser.frequencyBinCount)
      this.analyser.getByteFrequencyData(this.fbc_array)
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
      this.ctx.fillStyle = '#00ccFF'
      for( i = 0; i < 100; i++ ){
        var bar_x = i * 3
        var bar_w = 2
        var bar_h = -(this.fbc_array[i] / 2)
        this.ctx.fillRect(bar_x,this.canvas.height, bar_w,bar_h)
      }
    }
  },
})