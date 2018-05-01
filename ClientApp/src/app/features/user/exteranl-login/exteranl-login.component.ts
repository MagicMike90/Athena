import { Component, Inject, OnInit, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

declare var window: any;
@Component({
  selector: 'app-exteranl-login',
  templateUrl: './exteranl-login.component.html',
  styleUrls: ['./exteranl-login.component.css']
})
export class ExteranlLoginComponent implements OnInit {
  externalProviderWindow: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    // inject the local zone
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // close previously opened windows (if any)
    this.closePopUpWindow();

    // instantiate the externalProviderLogin function
    // (if it doesn't exist already)
    if (!window.externalProviderLogin) {
      window.externalProviderLogin = (auth: TokenResponse) => {
        this.zone.run(() => {
          console.log('External Login successful!');
          this.authService.setAuth(auth);
          this.router.navigate(['']);
        });
      };
    }
  }

  closePopUpWindow() {
    if (this.externalProviderWindow) {
      this.externalProviderWindow.close();
    }
    this.externalProviderWindow = null;
  }

  callExternalLogin(providerName: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const url = this.baseUrl + 'api/Token/ExternalLogin/' + providerName;
    // minimalistic mobile devices support
    const w = (screen.width >= 1050) ? 1050 : screen.width;
    const h = (screen.height >= 550) ? 550 : screen.height;
    const params = 'toolbar=yes,scrollbars=yes,resizable=yes,width=' + w + ', height=' + h;
    // close previously opened windows (if any)
    this.closePopUpWindow();
    this.externalProviderWindow = window.open(url, 'ExternalProvider', params, false);
  }

}
