import { Audio } from "expo-av";
import store from "../store/configureStore"; // Ensure this import is without destructuring
import { setAudioState } from "../store/playerSlice"; // Redux action to update state

class AudioService {
  constructor() {
    this.sound = null;
    this.isLoaded = false;
  }

  async loadAudio(uri) {
    if (this.sound) {
      await this.sound.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync({ uri });
    this.sound = sound;
    this.isLoaded = true;
    this.sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
  }

  onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      store.dispatch(
        setAudioState({
          isPlaying: status.isPlaying,
          currentProgress: status.positionMillis / status.durationMillis,
          duration: status.durationMillis,
        })
      );
    } else {
      console.error("Playback status not loaded:", status.error);
    }
  };

  async play() {
    if (this.isLoaded) await this.sound.playAsync();
  }

  async pause() {
    if (this.isLoaded) await this.sound.pauseAsync();
  }

  async stop() {
    if (this.sound && this.isLoaded) {
      await this.sound.stopAsync();
    }
  }

  unload() {
    if (this.sound) {
      this.sound.unloadAsync();
    }
  }

  async seek(position) {
    if (this.isLoaded && this.sound) {
      try {
        await this.sound.setPositionAsync(position); // Set the desired playback position
        const status = await this.sound.getStatusAsync();

        // Check playback state and resume if playing
        if (status.isPlaying) {
          await this.sound.playAsync();
        }
      } catch (error) {
        console.error("Error during seek:", error);
      }
    } else {
      console.warn("Cannot seek: Audio is not loaded.");
    }
  }

  async playFromStart() {
    if (this.isLoaded) {
      await this.sound.setPositionAsync(0); // Reset position to the start
      await this.sound.playAsync(); // Play the audio
    }
  }

  setOnPlaybackStatusUpdate(callback) {
    if (this.sound) {
      this.sound.setOnPlaybackStatusUpdate(callback);
    }
  }
}

export default new AudioService();
