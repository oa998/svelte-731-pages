/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/app/data": {
    get: operations["AppController_data"];
  };
  "/app/bucket-insert": {
    get: operations["AppController_b"];
  };
  "/app/upload": {
    post: operations["AppController_uploadFile"];
  };
  "/auth/sign-out": {
    get: operations["AuthController_signout"];
  };
  "/trivia/login-pw": {
    post: operations["TriviaController_loginPW"];
  };
  "/trivia/read": {
    post: operations["TriviaController_getAllByDay"];
  };
  "/trivia/read-day-list": {
    post: operations["TriviaController_getAllDays"];
  };
  "/trivia/upsert": {
    post: operations["TriviaController_upsert"];
  };
  "/trivia/delete": {
    post: operations["TriviaController_delete"];
  };
  "/cats/read": {
    post: operations["CatsController_getAllByDay"];
  };
  "/cats/insert": {
    post: operations["CatsController_upsert"];
  };
  "/cats/delete": {
    post: operations["CatsController_delete"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    PasswordLoginRequest: {
      password: string;
    };
    ReadRequest: {
      triviaDay: string;
    };
    UpsertRequest: {
      triviaDay: string;
      roundNumber: number;
      questionNumber: number;
      category: string;
      question: string;
      answer: string;
      wager: number;
      correct: number;
    };
    DeleteRequest: {
      triviaDay: string;
      roundNumber: number;
      questionNumber: number;
    };
    HashRequest: {
      hash: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  AppController_data: {
    responses: {
      200: {
        content: never;
      };
    };
  };
  AppController_b: {
    responses: {
      200: {
        content: never;
      };
    };
  };
  AppController_uploadFile: {
    requestBody: {
      content: {
        "multipart/form-data": {
          /** Format: binary */
          file?: string;
        };
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  AuthController_signout: {
    responses: {
      200: {
        content: never;
      };
    };
  };
  TriviaController_loginPW: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["PasswordLoginRequest"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  TriviaController_getAllByDay: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ReadRequest"];
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  TriviaController_getAllDays: {
    responses: {
      200: {
        content: never;
      };
    };
  };
  TriviaController_upsert: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpsertRequest"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  TriviaController_delete: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["DeleteRequest"];
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  CatsController_getAllByDay: {
    parameters: {
      header?: {
        "x-cloud-function-token"?: string;
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  CatsController_upsert: {
    parameters: {
      header?: {
        "x-cloud-function-token"?: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["HashRequest"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  CatsController_delete: {
    parameters: {
      header?: {
        "x-cloud-function-token"?: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["HashRequest"];
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
}