import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list.routing.module';

import { TitleModule } from '../title/title.module';
import { ContentModule } from '../content/content.module';
import { ListRawModule } from '../list-raw/list-raw.module';

import { ListComponent } from './list/list.component';
 

@NgModule({
    declarations: [
        ListComponent,
    ],
    imports: [
        CommonModule,
        TitleModule,
        ContentModule,
        ListRawModule,
        ListRoutingModule,
    ],
    exports: [
        ListComponent,
    ],
})
export class ListModule { }