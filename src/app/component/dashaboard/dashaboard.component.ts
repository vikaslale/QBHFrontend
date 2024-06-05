import { FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddUserComponent } from "../add-user/add-user.component";
import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/service/http.service";
import Swal from 'sweetalert2';
@Component({
  selector: "app-dashaboard",
  templateUrl: "./dashaboard.component.html",
  styleUrls: ["./dashaboard.component.scss"],
})
export class DashaboardComponent implements OnInit {
  userForm: any;
  servicetext: any;
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  userList: any;
  searchTerm: any = ""
  totalRecord = 10;
  page=1;
  pageSize=2;
 

  constructor(
    private modelService: NgbModal,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  openModel(action: string, user?: any) {
    const modelRef  = this.modelService.open(AddUserComponent, {
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
    modelRef.componentInstance.operation = action;
    modelRef.componentInstance.user = user;

    modelRef.result.then((res) => {
        this.getUserList();
        console.log(res)
      }, (reason: any) => {
        console.log("reson")
      }   
    );
  }


  deleteRecord(user: any){
    Swal.fire({
      title: "Are you sure you want to delete the record?",
      showDenyButton: true,
      confirmButtonText: "Yes",
    }).then((result) => { 
      if (result.isConfirmed) {

        this.httpService.deleteData("api/customer/Delete-customerData", user.user_id).subscribe({
          next: (res) => {
            Swal.fire("Record Deleted Successfully!", "", "success");
            this.getUserList();
          },
          error: (e) => {
            Swal.fire("Something Went Wrong!", "", "error");
          },
        });
        
      } else if (result.isDenied) {
        Swal.fire("Ok", "", "info");
      }
    });
  }

  getUserList(){
    this.httpService.getData("api/customer/getall_customer",this.searchTerm).subscribe({
      next: (res) => {
        console.log(res)
        this.userList = res;
      },
      error: (e) => {
        Swal.fire("Something Went Wrong!", "", "error");
      },
    });
  }

  async download() {
   await this.httpService.downloadData("api/customer/download-pdf", this.searchTerm)
  //  .subscribe({
  //     next: (res) => {
  //       console.log("response", res)
  //       // const blob = new Blob([res], { type: 'application/pdf' });
  //       // saveAs(blob, 'customer_data.pdf');

        
  //     },
  //     error: (e) => {
  //       Swal.fire("Something Went Wrong!", "", "error");
  //     }
  //   });
  }
  onPageChange(event: any){
    this.page = event
    this.getUserList()
  }

}
