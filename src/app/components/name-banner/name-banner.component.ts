import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PersonalizationService } from '../../services/personalization.service';

@Component({
  selector: 'app-name-banner',
  standalone: true,
  templateUrl: './name-banner.component.html',
  styleUrl: './name-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameBannerComponent {
  readonly personalization = inject(PersonalizationService);
}