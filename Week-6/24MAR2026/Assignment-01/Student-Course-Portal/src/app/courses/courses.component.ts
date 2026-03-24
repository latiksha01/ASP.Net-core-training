import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  selectedCourse: any = null;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courses = this.courseService.getAllCourses();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.selectedCourse = this.courseService.getCourseById(Number(id));
    }
  }
}