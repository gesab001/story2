import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements OnInit {


  data = "";
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  
     this.route.paramMap.subscribe(params => { 
        this.data = params.get('data');
      

     });
  }

}
