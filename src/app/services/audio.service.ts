import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private readonly audio = new Audio('assets/audio/music.mp3');

  constructor() {
    this.audio.loop = true;
  }

  async play(): Promise<void> {
    try {
      await this.audio.play();
    } catch {
      // El navegador puede bloquear la reproducción si no reconoce el gesto del usuario.
    }
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}