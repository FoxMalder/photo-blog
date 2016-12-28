import {Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TitleService} from '../../../shared/services/title';
import {SyncProcessService, SyncProcessServiceProvider} from '../../../shared/services/sync-process';
import {NavigatorService, NavigatorServiceProvider} from '../../../shared/services/navigator';
import {PagerService, PagerServiceProvider} from '../../../shared/services/pager';
import {AuthProviderService} from '../../../shared/services/auth';
import {PhotoService} from '../../services/photo.service';
import {PhotoModel} from '../../models/photo-model';

@Component({
    selector: 'photos',
    template: require('./photos.component.html'),
})
export class PhotosComponent {
    protected empty:boolean;
    protected queryParams:any = {};
    protected pagerService:PagerService;
    protected syncProcessService:SyncProcessService;
    protected navigatorService:NavigatorService;

    constructor(@Inject(ActivatedRoute) protected route:ActivatedRoute,
                @Inject(TitleService) protected titleService:TitleService,
                @Inject(AuthProviderService) protected authUserProvider:AuthProviderService,
                @Inject(PagerServiceProvider) protected pagerServiceProvider:PagerServiceProvider,
                @Inject(SyncProcessServiceProvider) protected syncProcessServiceProvider:SyncProcessServiceProvider,
                @Inject(NavigatorServiceProvider) protected navigatorServiceProvider:NavigatorServiceProvider,
                @Inject(PhotoService) protected photoService:PhotoService) {
        this.navigatorService = this.navigatorServiceProvider.getInstance();
        this.pagerService = this.pagerServiceProvider.getInstance();
        this.syncProcessService = this.syncProcessServiceProvider.getInstance();
    }

    ngOnInit() {
        this.titleService.setTitle('All Photos');

        this.route.queryParams
            .map((queryParams) => queryParams['page'])
            .subscribe((page:string) => {
                this.pagerService.setPage(Number(page));
            });

        this.route.queryParams
            .map((queryParams) => queryParams['show'])
            .subscribe((show:string) => {
                this.queryParams.show = Number(show);
            });

        this.load(this.pagerService.getLimitForPage(this.pagerService.getPage()), this.pagerService.getOffset())
            .then((photos:PhotoModel[]) => {
                this.empty = photos.length === 0;
            });
    }

    protected loadPhotos = (take:number, skip:number) => {
        return this.photoService
            .getAll(take, skip)
            .then((photos:PhotoModel[]) => this.pagerService.appendItems(photos));
    };

    protected getPhotos = () => this.pagerService.getItems();

    load = (take:number, skip:number) => {
        return this.syncProcessService
            .process(() => this.loadPhotos(take, skip))
            .then((result:any) => {
                this.setPageNumber();
                return result;
            });
    };

    loadMore = () => this.load(this.pagerService.getLimit(), this.pagerService.getOffset());

    setPageNumber = () => {
        let page = this.pagerService.getPage();
        if (page > 1) {
            this.navigatorService.setQueryParam('page', page);
        }
    };

    isEmpty = ():boolean => !this.syncProcessService.isProcessing() && this.empty === true;

    isLoading = ():boolean => this.syncProcessService.isProcessing();

    onShowPhoto = (photo:PhotoModel) => {
        this.navigatorService.setQueryParam('show', photo.id);
    };

    onHidePhoto = () => {
        this.navigatorService.unsetQueryParam('show');
    };

    navigateToEditPhoto = (photo:PhotoModel) => {
        this.navigatorService.navigate(['photo/edit', photo.id]);
    };
}
