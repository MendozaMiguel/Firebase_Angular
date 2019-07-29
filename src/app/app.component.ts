import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses: AngularFireList<any>;
  courses$;
  authors$;
  authors;
  constructor(private db: AngularFireDatabase) {
    this.courses = db.list('courses');
    this.courses$ = db.list('/courses').snapshotChanges(); // to get key
    this.authors$ = db.list('/authors').valueChanges().subscribe(datas => {
      this.authors = datas;
    }); // afficher les value
    console.log(this.authors$);
  }

  add(course: string, courseELEMENT: HTMLInputElement) {
    this.courses.push(
      course,
      // price: 150,
      // isLive: true,
      // sections: [
      //   { title: 'Components' },
      //   { title: 'Directives' },
      //   { title: 'Templates' }
      // ]
    );
    courseELEMENT.value = '';
  }

  update(course, value) {
    console.log(course.key, value);
    this.db.object('/courses/' + course.key).set(value);
  }

  delete(course) {
    this.db.object('/courses/' + course.key).remove();
  }

}
