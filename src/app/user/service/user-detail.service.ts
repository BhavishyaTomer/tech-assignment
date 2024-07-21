import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  private userDetailsSubject = new BehaviorSubject<any[]>([]);
  userDetails$ = this.userDetailsSubject.asObservable();
  information: string | null = null;
  userUpdateInfo:any
  constructor() { }

  addUserDetail(userDetail: any): void {
    const currentDetails = this.userDetailsSubject.value;  
    const updatedDetails = [...currentDetails, userDetail]; 
    this.userDetailsSubject.next(updatedDetails); 
  
  }
  storeUserData(data:any)
  {
   
   this.userUpdateInfo=data
  }
  getUserData()
  {
   
    return this.userUpdateInfo
  }
  deleteUserDetail(userId: string): void {
    const currentDetails = this.userDetailsSubject.value;
    const updatedDetails = currentDetails.filter(detail => detail.userId !== userId);
    this.userDetailsSubject.next(updatedDetails);
  }
  updateUserDetail(updatedUser: any): void {
    const currentDetails = this.userDetailsSubject.value;
    const updatedDetails = currentDetails.map(detail =>
      detail.userId === updatedUser.userId ? updatedUser : detail
    );
    this.userDetailsSubject.next(updatedDetails);

  }
}
