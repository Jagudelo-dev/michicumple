import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-balloon-border',
  standalone: true,
  templateUrl: './balloon-border.component.html',
  styleUrl: './balloon-border.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalloonBorderComponent {}