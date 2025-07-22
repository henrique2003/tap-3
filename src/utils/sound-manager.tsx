import { Audio } from "expo-av";

export class SoundManager {
  static async play(sound: any) {
    try {
      const { sound: playSound } = await Audio.Sound.createAsync(sound);
      await playSound.playAsync();
    } catch (error) {
      console.warn("Erro ao reproduzir som:", error);
    }
  }
}