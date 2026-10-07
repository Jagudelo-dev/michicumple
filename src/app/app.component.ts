import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { MainComponent } from './components/main/main.component';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoaderComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly started = signal(false);

  private readonly audioService = inject(AudioService);

  onStarted(): void {
    void this.audioService.play();
    this.started.set(true);
  }
}
