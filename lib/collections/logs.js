Logs = new Mongo.Collection('logs');
// log structure: 
//  - t: timestamp
//  - u: user id
//  - o: operation:
//  - t: target
//  - i: the target identity