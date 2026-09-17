import { Platform } from "@angular/cdk/platform";
import { Injectable, Injector } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NbDialogService, NbIconLibraries, NbSidebarService, NbToastrService } from "@nebular/theme";
import { MockBoardService } from './mock-board.service';
import { MockTaskService } from './mock-task.service';
import { MockUserService } from './mock-user.service';

@Injectable({
    providedIn: 'root'
})

export abstract class BasePage {
    protected activatedRoute: ActivatedRoute;
    protected dialogSrvc: NbDialogService;
    protected iconLibraries: NbIconLibraries;
    protected fb: FormBuilder;
    protected platform: Platform;
    protected router: Router;
    protected sidebarSrvc: NbSidebarService;
    protected boardSrvc: MockBoardService;
    protected taskSrvc: MockTaskService;
    protected toastrSrvc: NbToastrService;
    protected userSrvc: MockUserService;

    constructor(injector: Injector) {
        this.activatedRoute = injector.get(ActivatedRoute);
        this.dialogSrvc = injector.get(NbDialogService);
        this.iconLibraries = injector.get(NbIconLibraries);
        this.fb = injector.get(FormBuilder);
        this.platform = injector.get(Platform);
        this.router = injector.get(Router);
        this.sidebarSrvc = injector.get(NbSidebarService);
        this.boardSrvc = injector.get(MockBoardService);
        this.taskSrvc = injector.get(MockTaskService);
        this.toastrSrvc = injector.get(NbToastrService);
        this.userSrvc = injector.get(MockUserService);
    }
}