import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class CloudProvider {
  files:any = [
    { url: 'https://www.worldshirdisaibaba.org/wp-content/uploads/2018/05/intro_song.mp3', 
      name: 'Sai Song'
    },
    {
      url: 'http://www.bhajan.mobi/Sai%20Bhajan/Shirdi%20Sai%20Baba-%20Evening%20Aarti%20-%20DHOOP%20AARTI/Shirdi%20Sai%20Baba-%20Evening%20Aarti%20-%20DHOOP%20AARTI.mp3',
      name: 'Shirdi Sai Baba- Evening Aarti - DHOOP AARTI'
    },
    { url: 'https://docs.google.com/uc?export=download&id=0B5LaDFnVTmRfV3VVeDRYOXFJMGs',
      name: 'Kakad-Aarti'
    },
    { url: 'https://docs.google.com/uc?export=download&id=0B5LaDFnVTmRfY1doYWo5dWRZTTg',
      name: 'Madhyan-Aarti'
    },
    { url: 'https://docs.google.com/uc?export=download&id=0B5LaDFnVTmRfQlpCT1d1UXRXekE',
      name: 'Dhoop-Aarti'
    },
    { url: 'https://docs.google.com/uc?export=download&id=0B5LaDFnVTmRfanJ2YnVwYVZ4VDA',
      name: 'Shej-Aarti'
    }
  ];
  getFiles() {
   return of(this.files);
  }
}