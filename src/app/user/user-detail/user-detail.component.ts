import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserDetailService } from '../service/user-detail.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['userId', 'firstName', 'gender', 'dob', 'address', 'country', 'age','action'];
  dataSource = new MatTableDataSource<any>([]);
  isModalOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userDetailService: UserDetailService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchData() {
    this.userDetailService.userDetails$.subscribe(details => {
      console.log("Received details:", details);
      this.dataSource.data = details;
    });
  }
  deleteRecord(element: any) {
    this.userDetailService.deleteUserDetail(element.userId);
  }
  editReccord(element:any)
  {
    console.log(element)
    this.userDetailService.storeUserData(element)
    this.isModalOpen=true
    
  }
  closeModal() {
    this.isModalOpen = false;
  }


}
