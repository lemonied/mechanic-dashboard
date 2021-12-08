import { Observable } from 'rxjs';

const baseURI = '/api';

export const http$ = (url: string, request: RequestInit): Observable<{ code: number; data: any; }> => {
  return new Observable(subscriber => {
    const controller = new AbortController();
    const { signal } = controller;
    const req = Object.assign({
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }, request, {
      signal,
    });
    fetch(`${baseURI}${url}`, req).then(res => {
      return res.json();
    }).then(res => {
      subscriber.next(res);
      subscriber.complete();
    }).catch(err => {
      subscriber.error(err);
      subscriber.complete();
    });
    return {
      unsubscribe() {
        controller.abort();
      },
    };
  });
};

export const get$ = (url: string) => {
  return http$(url, {
    method: 'get',
  });
};

export const upload$ = (url: string, data: RequestInit['body']) => {
  return http$(url, {
    method: 'post',
    body: data,
    headers: {
      // 'Content-Type': 'multipart/form-data;',
    },
  });
};
