import { animate, keyframes, style, transition, trigger } from "@angular/animations";

export const sidebarAnimations = trigger('sidebar', [
  transition(':enter', [
    animate('.3s cubic-bezier(.25,.46,.45,.94)',
      keyframes([
        style({
          offset: 0,
          transform: 'translateX(1000px)'
        }),
        style({
          offset: 1,
          transform: 'translateX(0)'
        })
      ])
    )
  ]),
  transition(':leave', [
    animate('.3s cubic-bezier(.25,.46,.45,.94)',
      keyframes([
        style({
          offset: 0,
          transform: 'translateX(0)'
        }),
        style({
          offset: 1,
          transform: 'translateX(1000px)'
        })
      ])
    )
  ])
])

