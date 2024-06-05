import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from "src/app/service/common.service";
import { HttpService } from "src/app/service/http.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  @Input() operation?: string;
  @Input() user: any;
  userForm: any;
 
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    public activeModal: NgbActiveModal,
    private httpService: HttpService,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@[a-zA-Z0-9_]+?\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/)]],
      address: ["",Validators.required],
      mobile_number: ["", [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      
    });

    if (this.operation == "edit") {
      this.patchValue();
    } else {
      this.addStrength();
    }
  }


  addStrength() {
 
  }

  getFormFieldError(formGroup: string, docIdName: string) {
    const fg: FormGroup = (this as any)[formGroup];
    return this.commonService.getFormFieldErrorMessage(fg, docIdName);
  }

  adduser() {

    let payload = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      mobile_number: this.userForm.value.mobile_number,
      address: this.userForm.value.address,
    };

    if (this.operation == "edit") {
      let payload = {
        userId: this.user.user_id,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        mobile_number: this.userForm.value.mobile_number,
        address: this.userForm.value.address,
      };
      this.httpService.updateData("api/customer/update-customerData", payload).subscribe({
        next: (res) => {
         // Swal.fire({text: res.title, icon: "success"})
          this.activeModal.close({response: res})
        },
        error: (e) => {
          Swal.fire({text: e.error.title, icon: "error"})
        },
      });
    }else{
      this.httpService.addData("api/customer/Add-customer", payload).subscribe({
        next: (res) => {
          Swal.fire('User added sussfully!..')
          this.activeModal.close({response: res})
        },
        error: (e) => {
          Swal.fire('Something Went Wrong!..')
        },
      });
    }    
  }

  patchValue() {
    console.log("user", this.user)
    debugger
    this.userForm.patchValue({
       name: this.user.name,
       email: this.user.email,
      mobile_number: this.user.mobile_number,
      address: this.user.address,
    });

    for (let i = 0; i <= this.user.skills.length - 1; i++) {
      this.addStrength();
      this.userForm.controls.strength.controls[i]
        .get("skill")
        .patchValue(this.user?.skills?.[i]?.skill);
      this.userForm.controls.strength.controls[i]
        .get("level")
        .patchValue(this.user?.skills?.[i]?.level);
    }
  }
}
