import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root } from '../';

const tabTitleKeys = ['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE', 'TAB5_TITLE'];

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
  tab5Root: any = Tab5Root;

  tab1Title = "Home";
  tab2Title = "Di Jaan";
  tab3Title = "Our Seva";
  tab4Title = "We Heal";
  tab5Title = "Music";

  tab1Icon = "fa-fal-home";
  tab2Icon = "fa-fal-dijaan";
  tab3Icon = "fa-fal-initiatives";
  tab4Icon = "fa-fal-healing";
  tab5Icon = "fa-fal-audio";

  tab2PostData = {articleId: '1538910075447'};

  constructor(public navCtrl: NavController, public translateService: TranslateService, public events: Events) {
    translateService.get(tabTitleKeys).subscribe(values => {
      this.tab1Title = this.withDefault(values, 'TAB1_TITLE', this.tab1Title);
      this.tab2Title = this.withDefault(values, 'TAB2_TITLE', this.tab2Title);
      this.tab3Title = this.withDefault(values, 'TAB3_TITLE', this.tab3Title);
      this.tab4Title = this.withDefault(values, 'TAB4_TITLE', this.tab4Title);
      this.tab5Title = this.withDefault(values, 'TAB5_TITLE', this.tab5Title);
    });
  }

  withDefault(values:any, key:string, def: string) {
    return (key == values[key]) ? def : values[key];
  }

  tabChange(tab: any){
    this.events.publish('tab-switch', tab);
  }
}
