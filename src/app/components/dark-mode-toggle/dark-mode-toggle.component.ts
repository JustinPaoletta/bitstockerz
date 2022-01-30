import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss'],
})
export class DarkModeToggleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  toggleDarkMode() {
    const app = document.getElementsByTagName('body')[0];
    if (app.classList.contains('light-mode')) {
      app.classList.remove('light-mode');
      app.classList.add('dark-mode');
    } else {
      app.classList.remove('dark-mode');
      app.classList.add('light-mode');
    }
  }
}
