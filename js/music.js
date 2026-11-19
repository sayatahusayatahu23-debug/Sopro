// EDIT DAFTAR LAGU DI SINI. Simpan file audio di folder assets/music/.
// Contoh: { title: 'Lagu Favorit', artist: 'Nama Artis', src: 'assets/music/lagu.mp3' }
const studyPlaylist = [
  { title: 'Haru no Uta', artist: 'Ayane', src: 'assets/music/song.m4a' },
];
const audio = document.getElementById('studyAudio');
const titleEl = document.getElementById('trackTitle');
const artistEl = document.getElementById('trackArtist');
const indexEl = document.getElementById('trackIndex');
const hintEl = document.getElementById('musicHint');
const playBtn = document.getElementById('playTrack');
const prevBtn = document.getElementById('prevTrack');
const nextBtn = document.getElementById('nextTrack');
const seek = document.getElementById('musicSeek');
const volume = document.getElementById('musicVolume');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
let trackIndex = 0;
const fmt = n => `${Math.floor((n||0)/60)}:${String(Math.floor((n||0)%60)).padStart(2,'0')}`;
function setTrack(i, autoplay=false){
  if(!studyPlaylist.length) return;
  trackIndex=(i+studyPlaylist.length)%studyPlaylist.length;
  const track=studyPlaylist[trackIndex]; audio.src=track.src; titleEl.textContent=track.title||'Untitled'; artistEl.textContent=track.artist||'Unknown artist';
  indexEl.textContent=`${String(trackIndex+1).padStart(2,'0')} / ${String(studyPlaylist.length).padStart(2,'0')}`;
  if(autoplay) audio.play().catch(()=>{}); else {playBtn.textContent='▶';playBtn.setAttribute('aria-label','Putar lagu');}
}
if(studyPlaylist.length){[playBtn,prevBtn,nextBtn].forEach(b=>b.disabled=false);hintEl.textContent='Pilih putar untuk mulai mendengarkan.';setTrack(0);}
playBtn.addEventListener('click',()=>{if(!studyPlaylist.length)return;if(audio.paused)audio.play().catch(()=>{});else audio.pause();});
prevBtn.addEventListener('click',()=>setTrack(trackIndex-1,true));nextBtn.addEventListener('click',()=>setTrack(trackIndex+1,true));
audio.addEventListener('play',()=>{playBtn.textContent='Ⅱ';playBtn.setAttribute('aria-label','Jeda lagu');});audio.addEventListener('pause',()=>{playBtn.textContent='▶';playBtn.setAttribute('aria-label','Putar lagu');});
audio.addEventListener('timeupdate',()=>{if(!audio.duration)return;seek.value=audio.currentTime/audio.duration*100;currentTimeEl.textContent=fmt(audio.currentTime);durationEl.textContent=fmt(audio.duration);});
audio.addEventListener('ended',()=>setTrack(trackIndex+1,true));seek.addEventListener('input',()=>{if(audio.duration)audio.currentTime=Number(seek.value)/100*audio.duration;});volume.addEventListener('input',()=>audio.volume=Number(volume.value));audio.volume=Number(volume.value);
