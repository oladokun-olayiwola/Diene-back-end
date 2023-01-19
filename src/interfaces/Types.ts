export interface ErrorMiddleware {
 statusCode: number,
 code: number,
 msg: string,
 keyValue: object,
 message: string,
 name: string,
 errors: [], 
 value: string 
}

export interface user {
  name: string;
  _id: Object;
}

export interface files {
  image: files
}