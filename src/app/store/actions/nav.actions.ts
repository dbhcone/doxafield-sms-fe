import {createAction, props} from '@ngrx/store';

const updateTitle = createAction("Update [Nav Title]", props<{title: string}>());

export {updateTitle}