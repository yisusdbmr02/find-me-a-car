import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Find me a car';
  constructor(private translate:TranslateService,private modalService: NgbModal) {
    this.setAppLenguage();
  }
  setAppLenguage(){
    this.translate.setDefaultLang('en')
    this.translate.use(this.translate.getBrowserLang()||'')
  }
  public open(modal: any): void {

    this.modalService.open(modal);

  }
}
