import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  modalRef: NgbModalRef;

  password: string;
  rememberMe = true;
  username: string;
  authenticationError: boolean;
  alertLoginFailed = '';

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit() {
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().subscribe(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.loginService
      .login({
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          this.router.navigate(['/cliente/new']);

          this.eventManager.broadcast({
            name: 'authenticationSuccess',
            content: 'Sending Authentication Success'
          });

          this.ngOnInit();
        },
        (error: HttpErrorResponse) => {
          this.alertLoginFailed = 'USUARIO Y/O CONTRASEÑA INCORRECTOS';
          setTimeout(() => (this.alertLoginFailed = null), 5000);
        }
      );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.eventManager.destroy(this.authSubscription);
    }
  }
}
