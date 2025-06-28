import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BasicComponent } from './pages/basic/basic.component';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';
import { ParentComponent } from './pages/parent/parent.component';
import { Child1Component } from './pages/parent/child1/child1.component';
import { Child2Component } from './pages/parent/child2/child2.component';
import { SharevarComponent } from './pages/sharevar/sharevar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BasicComponent,
    LifecycleComponent,
    ParentComponent,
    Child1Component,
    Child2Component,
    SharevarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /**
     * 如果想在 Angular 中使用 雙向資料綁定 [(ngModel)]，就一定要先引入 FormsModule。
      ngModel 是屬於 Template-driven Form 的功能，Angular 不會自動幫你加入這個模組，你要手動在 AppModule 中引入。
     */
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
