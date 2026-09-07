import { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/api/')) {
    req = req.clone({
      setHeaders: { 'X-API-KEY': 'gudar-devs-demo-key' }
    });
  }
  return next(req);
};
