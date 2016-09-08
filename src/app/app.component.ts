import 'jquery';
import 'bootstrap';

import { AuthService, LoginModalService, RepositoryService } from './shared';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  providers: [
    AuthService,
    LoginModalService,
    RepositoryService
  ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent { }
