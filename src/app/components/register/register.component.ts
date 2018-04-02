import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../../_services/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                  if (data.success) {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                  } else {
                    this.alertService.error(data.msg);
                    this.loading = false;
                  }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
