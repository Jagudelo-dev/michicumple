import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class PersonalizationService {
  readonly name = signal('Arihanna Michel');

  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const requestedName = params.get('name');
        if (requestedName !== null) {
          this.name.set(requestedName);
        }
      });
  }
}