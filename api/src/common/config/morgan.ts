import morgan from "morgan";
import { AccessLogStream } from "./logger";

export default morgan(
  `:remote-addr ":method :url HTTP/:http-version" :status :res[content-length] DUR=":response-time ms" ":referrer" ":user-agent"`,
  { stream: new AccessLogStream() }
);
