import { Component } from '@angular/core';
import { CourseService } from '../course.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  student = {
    name: 'Rahul Joshi',
    id: 'STU-2024-089',
    email: 'rahul.joshi@student.edu',
    batch: 'Batch 12 - 2024'
  };

  enrolledCourses: any[] = [];

  constructor(private courseService: CourseService) {
    this.enrolledCourses = this.courseService.getAllCourses().slice(0, 2);
  }
}