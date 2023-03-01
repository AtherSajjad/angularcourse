import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert-component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  @ViewChild('f') authForm: NgForm;
  isLoading = false;
  error: string = null;

  @ViewChild(PlaceholderDirective, { static: false })
  placeholder: PlaceholderDirective;
  alertComponentSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router //private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = null; // clean up

    let authObservable: Observable<AuthResponseData>;
    let email = this.authForm.value['email'];
    let password = this.authForm.value['password'];
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      (authResponse) => {
        this.isLoading = false;
        console.log(authResponse);
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
      }
    );
    this.authForm.reset();
  }

  onClose() {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string) {
    /*
       steps to dynamically load component
       1. create a placehoder directive
       2. get ref to placeholder using view child
       3. get container ref from placeholder
       4. add element using containerRef.createComonent 
       5. add data and event using componentRef.instance.*
    */

    const viewContainerRef = this.placeholder.viewContainerRef;
    viewContainerRef.clear();

    const componentRef =
      viewContainerRef.createComponent<AlertComponent>(AlertComponent);
    componentRef.instance.message = errorMessage;

    this.alertComponentSubscription = componentRef.instance.close.subscribe(
      () => {
        this.alertComponentSubscription.unsubscribe();
        viewContainerRef.clear();
      }
    );

    // Course shows this, but this way its deprecated to use component factory resolver
    // const alertComponent =
    //   this.componentFactoryResolver.resolveComponentFactory(
    //     AlertComponentComponent
    //   );

    // const viewContainerRef = this.placeholder.viewContainerRef;
    // viewContainerRef.clear();

    // const componentRef = viewContainerRef.createComponent(alertComponent);
    // componentRef.instance.message = errorMessage;
    // this.alertComponentSubscription = componentRef.instance.close.subscribe(
    //   () => {
    //     this.alertComponentSubscription.unsubscribe();
    //     viewContainerRef.clear();
    //   }
    // );
  }

  ngOnDestroy(): void {
    if (this.alertComponentSubscription)
      this.alertComponentSubscription.unsubscribe();
  }
}
