import { Request, Response, NextFunction } from 'express';
import { Books } from '../models/book';

export class BookRoute {

    public bookRoute(app): void {
      app.route('/api/:id').get((req: Request, res: Response, next: NextFunction) => {
        Books.findById(req.params.id, (err, book) => {
          if (err) { return next(err); }
          res.json(book);
        });
      });

      app.route('/api/:id').put((req: Request, res: Response, next: NextFunction) => {
        Books.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
          if (err) { return next(err); }
          res.json(book);
        });
      });

      app.route('/api/:id').delete((req: Request, res: Response, next: NextFunction) => {
        Books.findByIdAndRemove(req.params.id, req.body, (err, book) => {
          if (err) { return next(err); }
          res.json(book);
        });
      });

      app.route('/api/').get((req: Request, res: Response, next: NextFunction) => {
        Books.find((err, books) => {
          if (err) { return next(err); }
          res.json(books);
        });
      });

      app.route('/api/').post((req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        Books.create(req.body, (err, book) => {
          if (err) { return next(err); }
          res.json(book);
        });
      });

    }
  }
