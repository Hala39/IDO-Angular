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
      email: new FormControl(null, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {} 

  loginForm: FormGroup;
  errorMessage: boolean = false;

  login() {
    if (this.loginForm.valid) {
      
    }
    this.errorMessage = true;
    this.loginForm.get('password')?.reset();
  }

}
