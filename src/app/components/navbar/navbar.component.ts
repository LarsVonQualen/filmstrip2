import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services';
import { User } from 'firebase';

@Component({
  selector: 'fs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css'
  ]
})
export class NavbarComponent implements OnInit {
  public hasDeterminedAuthState = false;
  public isAuthed = false;
  public user: User;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  public ngOnInit() {
    this.userService.getRawAuth().subscribe(authState => {
      this.hasDeterminedAuthState = true;

      if (authState) {
        this.user = authState.auth;
      }

      this.isAuthed = authState !== null;
    });
  }

  public signOut() {
    this.userService.signOut();
  }
}
