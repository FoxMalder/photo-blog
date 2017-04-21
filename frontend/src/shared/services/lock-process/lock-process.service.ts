import {Injectable} from '@angular/core';
import {LockerService} from '../locker';

@Injectable()
export class LockProcessService {
    constructor(protected locker:LockerService) {
    }

    process = (callback:any, args?:any):Promise<any> => {
        return this.startProcess(callback, args)
            .then(this.endProcess)
            .catch(this.handleProcessErrors);
    };

    isProcessing = ():boolean => {
        return this.locker.isLocked();
    };

    protected startProcess = (callback:any, args?:any):Promise<any> => {
        return new Promise((resolve, reject) => {
            if (!this.locker.isLocked()) {
                this.locker.lock();
                resolve(callback(...args));
            }
        });
    };

    protected endProcess = (result:any):any => {
        this.locker.unlock();
        return result;
    };

    protected handleProcessErrors = (error:any):Promise<any> => {
        this.locker.unlock();
        return Promise.reject(error);
    };
}
