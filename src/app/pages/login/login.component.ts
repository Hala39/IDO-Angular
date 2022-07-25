import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) { 
    this.loginForm = this.fb.group({
      email: new FormControl('user@ido.com', 
        [
          Validators.required, 
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ]),
      password: new FormControl('Pa$$w0rd', [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {} 

  loginForm: FormGroup;
  errorMessage: boolean = false;

  login() {
    if (this.loginForm.valid) {
      this.authService.login({
        email: this.loginForm.get('email')?.value, 
        password: this.loginForm.get('password')?.value
      }).subscribe();
    }
    // this.errorMessage = true;
    // this.loginForm.get('password')?.reset();
  }

}
