interface FormatArguments {
  uri: string;
  taskSessions: string[];
}

interface TaskSessions {
  [key: string]: string;
}

export interface AWCTaskSessionClient {
  createTaskSessionWithProvidedId: (
    searchTaskSessionName: string,
    sessionId: string,
  ) => void;
  formatTaskSessionQueryString: (args: FormatArguments) => string;
  getAllTaskSessions: () => TaskSessions;
}

export const noopTaskSessionClient: AWCTaskSessionClient = {
  createTaskSessionWithProvidedId: () => {},
  formatTaskSessionQueryString: ({ uri, taskSessions }) => uri,
  getAllTaskSessions: () => ({}),
};
