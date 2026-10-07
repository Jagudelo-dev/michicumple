import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cake',
  standalone: true,
  templateUrl: './cake.component.html',
  styleUrl: './cake.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CakeComponent {}