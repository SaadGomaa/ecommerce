import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const _ToastrService = inject(ToastrService);

  return next(req).pipe(catchError( (err) => {

    if (!req.url.includes('auth') && !req.url.includes('users/updateMe') ) {
      _ToastrService.error(err.error.message, '', {
        timeOut: 1900, 
        closeButton: true,
        progressBar: true,
      })
    }

    return throwError( () => err )
  }));

};
