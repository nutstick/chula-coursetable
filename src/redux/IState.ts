import { IActionState } from './action/reducers';
import { IIntlState } from './intl/reducers';
import { IRuntimeState } from './runtime/reducers';
import { IUIState } from './ui/reducers';
import { IUserState } from './user/reducers';

export {
  IActionState,
  IIntlState,
  IRuntimeState,
  IUIState,
  IUserState,
};

export interface IState {
  action?: IActionState;
  routing?: any;
  ui?: IUIState;
  user?: IUserState;
  runtime?: IRuntimeState;
  intl?: IActionState;
}
