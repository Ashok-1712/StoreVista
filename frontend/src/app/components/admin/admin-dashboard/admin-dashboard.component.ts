import { Component } from '@angular/core';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  activeTab: string = 'products'; 

  
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
