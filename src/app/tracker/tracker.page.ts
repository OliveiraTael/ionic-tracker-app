import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, Form} from '@angular/forms';
import {timer, Subscription} from 'rxjs';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {

  started:Boolean = false;
  taskForm:FormGroup;
  startTime:number;
  stopTime:number;

  timerSub:Subscription;
  time:number;

  constructor(
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(3)]]
    });
  }

  start(){
    this.started = true;
    this.startTime = new Date().getTime();

    const tm = timer(0, 1000);
    this.timerSub = tm.subscribe(val => this.time = val);

    console.log(this.startTime);
  }

  stop(){
    this.started = false;
    this.stopTime = new Date().getTime();

    this.timerSub.unsubscribe();

    console.log(this.stopTime);
  }

}
