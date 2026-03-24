import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses = [
    { id: 1, title: 'React Fundamentals', category: 'Frontend',     duration: '8 weeks',  instructor: 'Priya Mehta',  enrolled: 342, rating: 4.8, description: 'Master React hooks and component architecture.' },
    { id: 2, title: 'Node.js Backend',    category: 'Backend',      duration: '10 weeks', instructor: 'Arjun Sharma', enrolled: 210, rating: 4.6, description: 'Build REST APIs with Express and MongoDB.'        },
    { id: 3, title: 'UI/UX Design',       category: 'Design',       duration: '6 weeks',  instructor: 'Sneha Kapoor', enrolled: 189, rating: 4.9, description: 'Learn Figma, prototyping and user research.'      },
    { id: 4, title: 'Python for Data',    category: 'Data Science', duration: '12 weeks', instructor: 'Rohan Verma',  enrolled: 415, rating: 4.7, description: 'NumPy, Pandas and machine learning basics.'        },
    { id: 5, title: 'DevOps Essentials',  category: 'Cloud',        duration: '8 weeks',  instructor: 'Kavita Singh', enrolled: 156, rating: 4.5, description: 'CI/CD, Docker, Kubernetes, AWS fundamentals.'     },
    { id: 6, title: 'Flutter Mobile',     category: 'Mobile',       duration: '9 weeks',  instructor: 'Aditya Patel', enrolled: 278, rating: 4.7, description: 'Cross-platform iOS and Android with Flutter.'     },
  ];

  getAllCourses() {
    return this.courses;
  }

  getCourseById(id: number) {
    return this.courses.find(c => c.id === id);
  }
}