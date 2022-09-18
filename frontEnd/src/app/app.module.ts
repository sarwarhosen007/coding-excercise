import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule  } from '@angular/material/progress-spinner';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { MatTableModule } from '@angular/material/table';
import { UserDetailsComponent } from './components/user-details/user-details.component'
import {MatTabsModule} from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
 

 
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
