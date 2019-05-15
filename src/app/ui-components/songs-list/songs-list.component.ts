import { Component, OnInit, Testability } from '@angular/core';
import { HttpHandlerService } from '../../general-services/http-handler.service';
import { forkJoin } from 'rxjs';
import { SongListService } from './song-list.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {

  public songsList: Array<any> = [];
 

  constructor(private httpHandler: HttpHandlerService,
     private songListService:SongListService) { }

  ngOnInit() {
    forkJoin(
      this.httpHandler.getSongs(), this.httpHandler.getFavorites()
    ).subscribe((res) => {
      console.log(res[0])
      this.songsList = res[0];
      console.log(res[1])
      this.songListService.favoritesList = res[1];
    });
  }
}
