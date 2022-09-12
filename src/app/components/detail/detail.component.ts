import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Route, Params, Router } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url : string;
  public project!: Project;   
  public confirm : boolean;

  constructor(
    private _projectService : ProjectService,
     private _router:Router,
     private _route : ActivatedRoute
  ) {
    this.url= Global.url;
    this.confirm = false;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params['id'];
       
      this.getProject(id);
    });
  }

  getProject(id:any){
    this._projectService.getProject(id).subscribe({
      next: (response) => {
        this.project = response.project; 
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteProject(id:string){
    this._projectService.deleteProject(id).subscribe({
      next: (response) => {
        if(response.project){
          this._router.navigate(['/proyectos']);
        }
        
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setConfirm(confirm:boolean){
this.confirm = confirm;

  }

}
