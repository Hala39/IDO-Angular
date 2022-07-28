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
      email: new FormControl('user@ido.com', Validators.required),
      password: new FormControl('Pa$$w0rd', Validators.required)
    })
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(form => {
      if (this.loginForm.valid)
        this.errorMessage = false;
    })
  } 

  loginForm: FormGroup;
  errorMessage: boolean = false;

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        error: () => {
          this.errorMessage = true;
          this.loginForm.get('password')?.reset();
        }
      });
    }
  }

}
