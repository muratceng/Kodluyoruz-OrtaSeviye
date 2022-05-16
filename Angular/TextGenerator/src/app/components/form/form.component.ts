import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
 
  textForm !:FormGroup;
  text!:String
  constructor(private textService: TextService) { }

  ngOnInit(): void {
    this.textForm = new FormGroup({
      isHtml: new FormControl("No",),
      count: new FormControl(1, Validators.min(1) )
    })

    this.textService.getText(1,"text").subscribe((res)=>{
      this.text=res as String;
    })

    this.onChanges();
  }

  onChanges(): void {
    this.textForm.valueChanges.subscribe(val => {
      if(val.isHtml == "No"){
        this.textService.getText(val.count,"text").subscribe((res)=>{
          this.text=res as String;
        })
      }
      else{
        this.textService.getText(val.count,"html").subscribe((res)=>{
          this.text=res as String;
        })
      }
    });
  }

  onSubmit(){
    console.log("send")
  }
}
