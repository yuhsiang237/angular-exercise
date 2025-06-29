import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';
import { ParentComponent } from './pages/parent/parent.component';
import { Child1Component } from './pages/parent/child1/child1.component';
import { Child2Component } from './pages/parent/child2/child2.component';
import { BasicComponent } from './pages/basic/basic.component';
import { SharevarComponent } from './pages/sharevar/sharevar.component';
import { CustomComponentComponent } from './pages/custom-component/custom-component.component';
import { ApiDemoComponent } from './pages/api-demo/api-demo.component';

const routes: Routes = [
  { path: '', component: BasicComponent },
  { path: 'api-demo', component: ApiDemoComponent },
  { path: 'about', component: AboutComponent },
  { path: 'basic', component: BasicComponent },
  { path: 'lifecycle', component: LifecycleComponent },
  { path: 'sharevar', component: SharevarComponent },
  { path: 'custom-component', component: CustomComponentComponent },
  {
    path: 'parent',
    component: ParentComponent,
    children: [
      { path: 'child1', component: Child1Component },
      { path: 'child2', component: Child2Component },
      { path: '', redirectTo: 'child1', pathMatch: 'full' } // 預設子路由
    ]
  },
  { path: '', redirectTo: 'angular-exercise', pathMatch: 'full' },
  // 萬用路由（未知路徑轉向）
  { path: '**', redirectTo: 'basic', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
