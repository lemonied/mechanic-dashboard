import { Subject } from 'rxjs';

const subject = new Subject<any>();

export const centralEventbus = {
  on: (channel: string) => {
    return subject;
  },
  emit: (channel: string, data?: any) => {
    return subject;
  },
};
