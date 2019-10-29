import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { withLatestFrom, tap } from 'rxjs/operators';

import { Action, InitAction } from './file-states-actions';
import { FileStates } from '../models/file-state';
import { fileStatesReducer } from './file-states-reducer';

const INITIAL_FILE_STATES: FileStates = {};

export type FileStatesStoreEffect = (
  Command: Observable<Action>,
  fileStatesStore: FileStatesStore,
) => Observable<Action>;

export class ActionDispatcher extends BehaviorSubject<Action> {
  constructor() {
    super(new InitAction());
  }

  dispatch(command: Action) {
    this.next(command);
  }
}

export class FileStatesStore extends Observable<FileStates>
  implements Observer<Action> {
  private fileStates$: BehaviorSubject<FileStates>;
  private actionDispatcher$: ActionDispatcher;
  private subscriptions: Array<Subscription> = [];

  constructor(...effects: Array<FileStatesStoreEffect>) {
    super();

    this.fileStates$ = new BehaviorSubject(INITIAL_FILE_STATES);
    this.actionDispatcher$ = new ActionDispatcher();
    this.source = this.fileStates$;

    effects.forEach(effect => this.addSideEffect(effect));

    this.subscriptions.push(
      this.actionDispatcher$
        .pipe(
          tap(action => console.log(`Fired action: ${action.type}`)),
          withLatestFrom(this.fileStates$),
        )
        .subscribe(([action, fileStates]) =>
          this.fileStates$.next(fileStatesReducer(fileStates, action)),
        ),
    );
  }

  public next(command: Action) {
    this.actionDispatcher$.next(command);
  }

  public error(err: any) {
    this.actionDispatcher$.error(err);
  }

  public complete() {
    this.teardown();
  }

  public select<R>(
    selector: (fileStates: Observable<FileStates>) => Observable<R>,
  ): Observable<R> {
    return selector(this.fileStates$);
  }

  public teardown() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public addSideEffect(effect: FileStatesStoreEffect) {
    this.subscriptions.push(
      effect(this.actionDispatcher$, this).subscribe(this),
    );
  }
}
