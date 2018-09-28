import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class CloudProvider {
  files:any = [
    { url: 'https://dijaanjayawahi.com/wp-content/uploads/2018/09/intro_song.mp3', 
      name: 'Sai Song'
    },
    {
      url: 'https://dijaanjayawahi.com/wp-content/uploads/2018/09/EveningAarti.mp3',
      name: 'Shirdi Sai Baba- Evening Aarti - DHOOP AARTI'
    },
    { url: 'https://dijaanjayawahi.com/wp-content/uploads/2018/09/Kakad_Aarti.mp3',
      name: 'Kakad-Aarti'
    }
  ];
  getFiles() {
   return of(this.files);
  }
}