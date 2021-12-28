import {Component, OnInit} from '@angular/core';
import {logProjectName} from '../../../../../shared';
import Author from '../../../../../shared/author/Author';
import {findAll} from '../../../../../shared/author/AuthorMockService';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    console.log(logProjectName);
    console.log("***");
    logProjectName("test");
    const author: Author =   {
      id: 1,
      firstname: "Brandon",
      lastname: "Sanderson",
      isPenName: false,
      birthDate: new Date("1975-12-19"),
      birthLocation: "Lincoln, Nebraska, The United States",
      website: "http://brandonsanderson.com",
      note: "Brandon Sanderson (born December 19, 1975) is an American author of epic fantasy and science fiction. He is best known for the Cosmere fictional universe, in which most of his fantasy novels, most notably the Mistborn series and The Stormlight Archive, are set. Outside of the Cosmere, he has written several young adult[a] and juvenile series including The Reckoners, the Skyward series, and the Alcatraz series. He is also known for finishing Robert Jordan's high fantasy series The Wheel of Time and has created several graphic novel fantasy series including the White Sand and Dark One.\n" +
          "\n" +
          "He created Sanderson's Laws of Magic and popularized the terms \"hard and soft magic systems\". In 2008, Sanderson started a podcast with author Dan Wells and cartoonist Howard Tayler called Writing Excuses, involving topics about creating genre writing and webcomics."
    };
    console.log(author);

    console.log(findAll());
    // findAll().subscribe(
    //     (authors:Author[]) => {
    //       console.log("findAll", authors);
    //     },
    // );

    // findAll().subscribe((a: Author[]) => console.log(a));
  }

}
