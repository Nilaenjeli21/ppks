import express from 'express';
import RouterServer from './routes';
import path from 'path';

const port = process.env.PORT || 5000;

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();
    this.configureStaticFiles();
    const server = new RouterServer();
    this.app.use(server.router);
  }

  private configureStaticFiles(): void {
    this.app.use('/img', express.static(path.join(__dirname, '..', 'img')));
  }

  public startApp(): void {
    this.app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
}

export default App;
