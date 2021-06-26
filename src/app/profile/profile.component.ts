import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ChecklistService } from '../services/checklist.service';

@Component({
  selector: 'dm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  categories$ = this.checklistService.getChecklistCategories()
    .pipe(
      map(items => items as any[])
    );

  constructor(private checklistService: ChecklistService) {

  }

  ngOnInit(): void {
  }

}
