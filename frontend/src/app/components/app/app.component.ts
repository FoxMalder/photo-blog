import {Component, OnInit} from '@angular/core'
import {Router, NavigationEnd} from '@angular/router';
import {MetaTagsService} from '../../../core';
import {TransferState} from '../../../sys';
import {NoticesService} from '../../../lib';
import {
    AppService,
    TitleService,
    AuthProviderService,
    EnvironmentDetectorService,
    ScrollFreezerService,
    ScreenDetectorService,
} from '../../../shared';
import '../../../../assets/static/img/meta_image.jpg'
declare let ga:Function;

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
    protected appContentStyles:{overflow:string} = {overflow: ''};

    constructor(protected cache:TransferState,
                protected router:Router,
                protected app:AppService,
                protected title:TitleService,
                protected metaTags:MetaTagsService,
                protected authProvider:AuthProviderService,
                protected environmentDetector:EnvironmentDetectorService,
                protected screenDetector:ScreenDetectorService,
                protected scrollFreezer:ScrollFreezerService,
                protected notices:NoticesService) {
    }

    ngOnInit():void {
        this.initMeta();
        this.initRouterSubscribers();
        this.initScrollFreezerSubscribers();
        this.cache.set('state-transfer', true);
    }

    protected initMeta = ():void => {
        this.metaTags.setWebsiteName(this.app.getName());
        this.metaTags.setUrl(this.app.getUrl());
        this.metaTags.setTitle(this.title.getPageName());
        this.metaTags.setDescription(this.app.getDescription());
        this.metaTags.setImage(this.app.getUrl() + '/assets/static/meta_image.jpg');
    };

    protected initRouterSubscribers = ():void => {
        this.router.events
            .filter((event:any) => event instanceof NavigationEnd)
            .subscribe((event:NavigationEnd) => this.metaTags.setUrl(this.app.getUrl() + event.urlAfterRedirects));

        this.router.events
            .filter((event:any) => event instanceof NavigationEnd)
            .subscribe((event:NavigationEnd) => this.notices.deleteAll());

        if (this.environmentDetector.isBrowser()) {
            this.router.events
                .filter((event:any) => event instanceof NavigationEnd)
                .subscribe((event:NavigationEnd) => {
                    ga('set', 'page', event.urlAfterRedirects);
                    ga('send', 'pageview');
                });
        }
    };

    protected initScrollFreezerSubscribers = ():void => {
        this.scrollFreezer.freezed.subscribe(() => this.appContentStyles.overflow = 'hidden');
        this.scrollFreezer.unfreezed.subscribe(() => this.appContentStyles.overflow = '');
    };

    protected onShowSideBar = (event:any):void => {
        this.screenDetector.isSmallScreen() && this.scrollFreezer.freeze()
    };

    protected onHideSideBar = (event:any):void => {
        this.scrollFreezer.unfreeze();
    };

    protected onToggleSideBar = (event:any):void => {
        event.isVisible ? this.onShowSideBar(event) : this.onHideSideBar(event);
    };
}
