import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root, Tab4Root } from '../';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;

  tab1Title = "Home";
  tab2Title = "Chords of Consciousness";
  tab3Title = "SAIBISA Initiatives";
  tab4Title = "We Heal";

  constructor(public navCtrl: NavController, public translateService: TranslateService, public events: Events) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE']).subscribe(values => {
      this.tab1Title = this.withDefault(values, 'TAB1_TITLE', this.tab1Title);
      this.tab2Title = this.withDefault(values, 'TAB2_TITLE', this.tab2Title);
      this.tab3Title = this.withDefault(values, 'TAB3_TITLE', this.tab3Title);
      this.tab4Title = this.withDefault(values, 'TAB4_TITLE', this.tab4Title);
    });
  }

  withDefault(values:any, key:string, def: string) {
    return (key == values[key]) ? def : values[key];
  }

  tabChange(tab: any){
    this.events.publish('tab-switch', tab);
  }
}
