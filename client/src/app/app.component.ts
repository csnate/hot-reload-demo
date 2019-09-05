import { Component } from '@angular/core';
import { Model } from '@shared/model';

@Component({
    selector: 'cia-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = new Model().title;
}
