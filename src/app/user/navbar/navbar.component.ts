import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  menuIcon = 'menu';

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuIcon = this.isMenuOpen ? 'close' : 'menu';
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
