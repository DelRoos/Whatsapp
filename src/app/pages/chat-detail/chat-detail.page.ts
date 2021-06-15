import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser';
import { UsersService } from '../../services/users.service';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {

  userId: string;
  user: IUser;
  state: string;
  connection: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UsersService,
    private authService: UserServiceService
  ) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.userId = params.id;
    });
    this.user = this.userService.getUser(this.userId);
    if(this.user.isCurrentLogged){
      this.connection = 'en ligne';
    }else{
      this.connection =  'vue le '+this.user.lastConnection.toLocaleTimeString();
      console.log(this.connection);
    }
  }

}
