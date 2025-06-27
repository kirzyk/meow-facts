import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollerModule } from 'primeng/scroller';
import { ToastModule } from 'primeng/toast';
import { CatsService } from '../services/cats/cats.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    ToastModule,
    ScrollerModule,
    CardModule,
    CommonModule,
    ProgressSpinnerModule,
    NgOptimizedImage,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('factAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '900ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'none' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent {
  public facts: Array<{ id: string; fact: string }> = [];
  public factsLoading = false;

  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadInitialFacts();
  }

  public logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  public onScroll(container: HTMLElement): void {
    const threshold = 100;
    const position = container.scrollTop + container.clientHeight;
    const height = container.scrollHeight;

    if (height - position <= threshold && !this.factsLoading) {
      this.loadFact();
    }
  }

  private loadInitialFacts(): void {
    for (let i = 0; i < 10; i++) {
      this.loadFact();
    }
  }

  private loadFact(): void {
    this.factsLoading = true;
    this.catsService.getFact().subscribe({
      next: (fact) => {
        const exists = this.facts.some((f) => f.id === fact.id);
        if (!exists) {
          this.facts.push(fact);
        } else {
          this.loadFact();
        }
      },
      complete: () => {
        this.factsLoading = false;
      },
      error: (err) => {
        this.factsLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load cat fact. Please try again.',
        });
      },
    });
  }
}
